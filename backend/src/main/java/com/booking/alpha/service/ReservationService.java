package com.booking.alpha.service;

import com.booking.alpha.configuration.SQSConfiguration;
import com.booking.alpha.constant.BillingType;
import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.ConsumerKeys;
import com.booking.alpha.constant.HotelServiceType;
import com.booking.alpha.entity.ReservationEntity;
import com.booking.alpha.entry.*;
import com.booking.alpha.respository.ReservationRepository;
import com.booking.alpha.utils.AccountingUtils;
import com.booking.alpha.utils.BillingEvaluator;
import com.booking.alpha.utils.BillingEvaluatorFactory;
import com.booking.alpha.utils.SQSUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.text.ParseException;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final AccountingUtils accountingUtils;

    private final RoomService roomService;

    private final HotelService hotelService;

    private final SQSUtils sqsUtils;

    private final SQSConfiguration sqsConfiguration;

    private final UserService userService;

    private final BillingEvaluatorFactory billingEvaluatorFactory;

    public ReservationService( ReservationRepository reservationRepository, AccountingUtils accountingUtils,
            RoomService roomService, HotelService hotelService, SQSUtils sqsUtils,
            SQSConfiguration sqsConfiguration, UserService userService, BillingEvaluatorFactory billingEvaluatorFactory) {
        this.reservationRepository = reservationRepository;
        this.accountingUtils = accountingUtils;
        this.roomService = roomService;
        this.hotelService = hotelService;
        this.sqsUtils = sqsUtils;
        this.sqsConfiguration = sqsConfiguration;
        this.userService = userService;
        this.billingEvaluatorFactory = billingEvaluatorFactory;
    }

    public ReservationEntry convertToEntry(ReservationEntity reservationEntity) {
        ReservationEntry reservationEntry = new ReservationEntry();
        BeanUtils.copyProperties( reservationEntity, reservationEntry);
        return reservationEntry;
    }

    public ReservationEntity convertToEntity( ReservationEntry reservationEntry) {
        ReservationEntity reservationEntity = new ReservationEntity();
        BeanUtils.copyProperties( reservationEntry, reservationEntity);
        return reservationEntity;
    }

    public ReservationEntry findOneById( Long reservationId) {
        return convertToEntry(reservationRepository.findById(reservationId).get());
    }

    public ReservationEntry patchUpdate( Long id, ReservationEntry reservationEntry) {
        ReservationEntry existingEntry = findOneById(id);
        if(!ObjectUtils.isEmpty(reservationEntry.getServiceList())) {
            existingEntry.setServiceList(reservationEntry.getServiceList());
        }
        if(!ObjectUtils.isEmpty(reservationEntry.getTransactionId())) {
            existingEntry.setTransactionId(reservationEntry.getTransactionId());
        }
        if(!ObjectUtils.isEmpty(reservationEntry.getBookingState())) {
            existingEntry.setBookingState(reservationEntry.getBookingState());
        }
        ReservationEntry updatedEntry = convertToEntry(reservationRepository.save(convertToEntity(existingEntry)));
        return updatedEntry;
    }

    @Transactional
    public void expireBooking( UnreservingMessageEntry unreservingMessageEntry) {
        ReservationEntry reservationEntryExisting  = findOneById(unreservingMessageEntry.getReservationId());
        if(reservationEntryExisting.getBookingState().equals(BookingState.PENDING)) {
            patchUpdate( reservationEntryExisting.getId(), new ReservationEntry( null, null, null, null, null, null, BookingState.EXPIRED, null));
        }
        if(reservationEntryExisting.getBookingState().equals(BookingState.PENDING) || reservationEntryExisting.getBookingState().equals(BookingState.CANCELLED)) {
            userService.updateRewards( reservationEntryExisting.getUserId(), unreservingMessageEntry.getCustomLoyaltyCredit());
        }
    }

    public List<ReservationEntry> getReservationsForUser( Long userId, Set<BookingState> bookingStates) {
        List<ReservationEntity> reservationEntities = reservationRepository.getAllByUserIdAndAndBookingStateIn(userId, bookingStates);
        if(reservationEntities.isEmpty()) {
            return new ArrayList<>();
        }
        return reservationEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
    }

    public ReservationEntry getAnyReservationForUser( Long user, Set<BookingState> bookingStates) {
        ReservationEntity reservationEntity = reservationRepository.findFirstByUserIdAndBookingStateIn( user, bookingStates);
        if(ObjectUtils.isEmpty(reservationEntity)) {
            return null;
        }
        return convertToEntry(reservationEntity);
    }

    public List<ReservationDetailsEntry> convertToDetails( List<ReservationEntry> reservationEntries) {
        if(ObjectUtils.isEmpty(reservationEntries)) {
            return new ArrayList<>();
        }
        List<RoomEntry> roomEntries = roomService.findAllById(reservationEntries.stream().map(ReservationEntry::getRoomId).collect(Collectors.toSet()));
        List<HotelEntry> hotelEntries = hotelService.findAllByIds(roomEntries.stream().map(RoomEntry::getHotelId).collect(Collectors.toSet()));
        List<UserEntry> userEntries = userService.findAllById(reservationEntries.stream().map(ReservationEntry::getUserId).collect(Collectors.toSet()));
        Map<Long, HotelEntry> hotelIdMap = hotelEntries.stream().collect(Collectors.toMap(HotelEntry::getId, hotelEntry -> hotelEntry));
        Map<Long, RoomEntry> roomIdMap = roomEntries.stream().collect(Collectors.toMap(RoomEntry::getId, roomEntry -> roomEntry));
        Map<Long, UserEntry> userIdMap = userEntries.stream().collect(Collectors.toMap(UserEntry::getId, userEntry -> userEntry));
        return reservationEntries.stream()
                .map(reservationEntry ->{
                    Long roomId = reservationEntry.getRoomId();
                    Long hotelId = roomIdMap.get(roomId).getHotelId();
                    Long duration = accountingUtils.getDurationInDays(reservationEntry.getStartTime(), reservationEntry.getEndTime());
                    Set<HotelServiceType> serviceTypesAvailed = reservationEntry.getServiceList().stream().map(ServiceEntry::getType).collect(Collectors.toSet());
                    List<ServiceEntry> serviceEntries = new ArrayList<>();
                    if(!ObjectUtils.isEmpty(reservationEntry.getServiceList())) {
                        serviceEntries = hotelIdMap.get(hotelId).getServiceList()
                                .stream()
                                .filter(serviceEntry -> serviceTypesAvailed.contains(serviceEntry.getType()))
                                .collect(Collectors.toList());
                    }
                    Long totalCost = accountingUtils.getTotalCost(roomIdMap.get(roomId),serviceEntries)*duration;
                    return new ReservationDetailsEntry(
                        reservationEntry.getTransactionId(),
                        reservationEntry.getId(),
                        userIdMap.get(reservationEntry.getUserId()),
                        hotelIdMap.get(hotelId),
                        roomIdMap.get(roomId),
                        accountingUtils.convertToString(reservationEntry.getStartTime()),
                        accountingUtils.convertToString(reservationEntry.getEndTime()),
                        duration,
                        totalCost,
                        reservationEntry.getServiceList());
                }).collect(Collectors.toList());
    }

    public List<ReservationDetailsEntry> getReservationDetails( Long userId, Set<BookingState> bookingStates) {
        List<ReservationEntry> reservationEntries = getReservationsForUser( userId, bookingStates);
        return convertToDetails(reservationEntries);
    }

    public List<ReservationDetailsEntry> getReservationForHotel( Long hotelId) {
        List<ReservationEntity> reservationEntities = reservationRepository.getAllByHotelIdAndBookingState(hotelId, BookingState.CONFIRMED.toString());
        if(reservationEntities.isEmpty()) {
            return new ArrayList<>();
        }
        List<ReservationEntry> reservationEntries = reservationEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
        return convertToDetails(reservationEntries);
    }

    @Transactional
    public ReservationDetailsEntry reserve(BookingRequestEntry bookingRequestEntry) throws ParseException, JsonProcessingException {
        Long userId = bookingRequestEntry.getUserId();
        Long roomId = bookingRequestEntry.getRoomId();
        Long startDate = accountingUtils.getCheckInTime(bookingRequestEntry.getStartDate()).getTime();
        Long endDate = accountingUtils.getCheckOutTime(bookingRequestEntry.getEndDate()).getTime();
        Long duration = accountingUtils.getDurationInDays( startDate, endDate);
        UserEntry userEntry = userService.findOneById(userId);
        if(ObjectUtils.isEmpty(bookingRequestEntry.getCustomLoyaltyCredit())) {
            bookingRequestEntry.setCustomLoyaltyCredit(0L);
        } else {
            bookingRequestEntry.setCustomLoyaltyCredit(Math.min(bookingRequestEntry.getCustomLoyaltyCredit(), userEntry.getRewardPoints()));
        }
        bookingRequestEntry.setCustomLoyaltyCredit(Math.max(0L, bookingRequestEntry.getCustomLoyaltyCredit()));
        Set<HotelServiceType> bookingRequestHotelServiceTypeSet = bookingRequestEntry.getServiceTypeSet();
        RoomEntry roomEntryLocked = roomService.findOneByIdWithLock(roomId);
        Long hotelId = roomEntryLocked.getHotelId();
        RoomEntry roomToBook = roomService.findOneAvailable( roomId, startDate, endDate);
        if(ObjectUtils.isEmpty(roomToBook)) {
            return null;
        }
        HotelEntry hotelEntry = hotelService.findOneById(hotelId);
        BillingType billingType = billingEvaluatorFactory.getBillingType( startDate, endDate);
        billingEvaluatorFactory.getBillingEvaluator(billingType).normaliseHotels(Collections.singletonList(hotelEntry), duration);
        billingEvaluatorFactory.getBillingEvaluator(billingType).normaliseRooms(Collections.singletonList(roomToBook), duration);
        List<ServiceEntry> hotelEntryServiceList = hotelEntry.getServiceList();
        Map<HotelServiceType, ServiceEntry> serviceTypeServiceEntryMap = hotelEntryServiceList.stream().collect(Collectors.toMap(ServiceEntry::getType, serviceEntry -> serviceEntry));
        List<ServiceEntry> serviceEntriesToCreate = new ArrayList<>();
        if(!ObjectUtils.isEmpty(bookingRequestEntry.getServiceTypeSet())) {
            for(HotelServiceType hotelServiceType: bookingRequestHotelServiceTypeSet) {
                serviceEntriesToCreate.add(serviceTypeServiceEntryMap.get(hotelServiceType));
            }
        }
        ReservationEntry reservationEntryToCreate = new ReservationEntry(null, null, bookingRequestEntry.getUserId(), roomToBook.getId(), startDate, endDate, BookingState.PENDING, serviceEntriesToCreate);
        ReservationEntry existingReservation = getAnyReservationForUser( userId, new HashSet<>(Collections.singletonList(BookingState.PENDING)));
        if(!ObjectUtils.isEmpty(existingReservation)) {
            reservationEntryToCreate.setTransactionId(existingReservation.getTransactionId());
        }
        ReservationEntry reservationCompleted = convertToEntry(reservationRepository.save(convertToEntity(reservationEntryToCreate)));
        if(ObjectUtils.isEmpty(existingReservation)) {
            reservationCompleted.setTransactionId(reservationCompleted.getId());
            reservationCompleted = patchUpdate( reservationCompleted.getId(), reservationCompleted);
        }
        userService.updateRewards( userId, bookingRequestEntry.getCustomLoyaltyCredit()*(-1));
        publishForRemoval( reservationCompleted.getId(), bookingRequestEntry.getCustomLoyaltyCredit());
        return convertToDetails(Collections.singletonList(reservationCompleted)).get(0);
    }

    public List<ReservationDetailsEntry> makeBooking( Long userId) {
        List<ReservationEntity> reservationEntities = reservationRepository.getAllByUserIdAndAndBookingStateIn(
                userId,
                new HashSet<>(Collections.singletonList(BookingState.PENDING)));
        List<ReservationEntry> reservationEntries = reservationEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
        for(ReservationEntry reservationEntry: reservationEntries) {
            reservationEntry.setBookingState(BookingState.CONFIRMED);
        }
        List<ReservationEntity> updatedEntities = reservationRepository.saveAll(reservationEntries.stream().map(this::convertToEntity).collect(Collectors.toList()));
        List<ReservationEntry> updatedEntries = updatedEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
        return convertToDetails(updatedEntries);
    }

    public void publishForRemoval( Long reservationId, Long customLoyaltyCredit) throws JsonProcessingException {
        UnreservingMessageEntry unreservingMessageEntry = new UnreservingMessageEntry( reservationId, customLoyaltyCredit);
        sqsUtils.publishMessage( sqsConfiguration.getGetUnReservingQueueUrl(), null, unreservingMessageEntry, 120);
    }
}
