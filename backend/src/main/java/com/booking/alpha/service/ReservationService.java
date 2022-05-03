package com.booking.alpha.service;

import com.booking.alpha.configuration.SQSConfiguration;
import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.ConsumerKeys;
import com.booking.alpha.constant.HotelServiceType;
import com.booking.alpha.entity.ReservationEntity;
import com.booking.alpha.entry.*;
import com.booking.alpha.respository.ReservationRepository;
import com.booking.alpha.utils.AccountingUtils;
import com.booking.alpha.utils.SQSUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.text.ParseException;
import java.util.Set;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final AccountingUtils accountingUtils;

    private final RoomService roomService;

    private final HotelService hotelService;

    private final SQSUtils sqsUtils;

    private final SQSConfiguration sqsConfiguration;

    public ReservationService( ReservationRepository reservationRepository, AccountingUtils accountingUtils,
            RoomService roomService, HotelService hotelService, SQSUtils sqsUtils, SQSConfiguration sqsConfiguration) {
        this.reservationRepository = reservationRepository;
        this.accountingUtils = accountingUtils;
        this.roomService = roomService;
        this.hotelService = hotelService;
        this.sqsUtils = sqsUtils;
        this.sqsConfiguration = sqsConfiguration;
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
        return convertToEntry(reservationRepository.getById(reservationId));
    }

    public ReservationEntry removeReservation( Long reservationId) {
        ReservationEntry reservationEntry = findOneById(reservationId);
        reservationEntry.setBookingState(BookingState.EXPIRED);
        return convertToEntry(reservationRepository.save(convertToEntity(reservationEntry)));
    }

    public List<ReservationEntry> getReservationsForUser( Long userId, BookingState bookingState) {
        List<ReservationEntity> reservationEntities = reservationRepository.getAllByUserIdAndAndBookingStateIs(userId, bookingState);
        if(reservationEntities.isEmpty()) {
            return new ArrayList<>();
        }
        return reservationEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
    }

    public List<ReservationEntry> getReservationForHotel( Long hotelId) {
        List<ReservationEntity> reservationEntities = reservationRepository.getAllByHotelIdAndBookingState(hotelId, BookingState.CONFIRMED.toString());
        if(reservationEntities.isEmpty()) {
            return new ArrayList<>();
        }
        return reservationEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
    }

    @Transactional
    public ReservationEntry reserve(BookingRequestEntry bookingRequestEntry) throws ParseException {
        Long roomId = bookingRequestEntry.getRoomId();
        Long startDate = accountingUtils.getCheckInTime(bookingRequestEntry.getStartDate()).getTime();
        Long endDate = accountingUtils.getCheckOutTime(bookingRequestEntry.getEndDate()).getTime();
        Set<HotelServiceType> bookingRequestHotelServiceTypeSet = bookingRequestEntry.getServiceTypeSet();
        RoomEntry roomEntryLocked = roomService.findOneByIdWithLock(roomId);
        Long hotelId = roomEntryLocked.getHotelId();
        RoomEntry roomToBook = roomService.findOneAvailable( roomId, startDate, endDate);
        if(ObjectUtils.isEmpty(roomToBook)) {
            return null;
        }
        HotelEntry hotelEntry = hotelService.findOneById(hotelId);
        List<ServiceEntry> hotelEntryServiceList = hotelEntry.getServiceList();
        Map<HotelServiceType, ServiceEntry> serviceTypeServiceEntryMap = hotelEntryServiceList.stream().collect(Collectors.toMap(ServiceEntry::getType, serviceEntry -> serviceEntry));
        List<ServiceEntry> serviceEntriesToCreate = new ArrayList<>();
        if(!ObjectUtils.isEmpty(bookingRequestEntry.getServiceTypeSet())) {
            for(HotelServiceType hotelServiceType: bookingRequestHotelServiceTypeSet) {
                serviceEntriesToCreate.add(serviceTypeServiceEntryMap.get(hotelServiceType));
            }
        }
        ReservationEntry reservationEntryToCreate = new ReservationEntry(null, bookingRequestEntry.getUserId(), roomToBook.getId(), startDate, endDate, BookingState.PENDING, serviceEntriesToCreate);
        ReservationEntry reservationCompleted = convertToEntry(reservationRepository.save(convertToEntity(reservationEntryToCreate)));
        publishForRemoval( reservationCompleted.getId());
        return reservationCompleted;
    }

    public List<ReservationEntry> makeBooking( Long userId) {
        List<ReservationEntity> reservationEntities = reservationRepository.getAllByUserIdAndAndBookingStateIs(userId, BookingState.PENDING);
        List<ReservationEntry> reservationEntries = reservationEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
        for(ReservationEntry reservationEntry: reservationEntries) {
            reservationEntry.setBookingState(BookingState.CONFIRMED);
        }
        List<ReservationEntity> updatedEntities = reservationRepository.saveAll(reservationEntries.stream().map(this::convertToEntity).collect(Collectors.toList()));
        return updatedEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
    }

    public void publishForRemoval( Long reservationId) {
        HashMap<String, Object> messageAttributes = new HashMap<>();
        messageAttributes.put(ConsumerKeys.RESERVATION_ID_KEY, reservationId);
        sqsUtils.publishMessage( sqsConfiguration.getGetUnReservingQueueUrl(), messageAttributes, null);
    }
}
