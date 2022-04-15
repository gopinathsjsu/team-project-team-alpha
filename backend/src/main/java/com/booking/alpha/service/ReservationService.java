package com.booking.alpha.service;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.entity.ReservationEntity;
import com.booking.alpha.entry.BookingRequestEntry;
import com.booking.alpha.entry.ReservationEntry;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.respository.ReservationRepository;
import com.booking.alpha.utils.AccountingUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final AccountingUtils accountingUtils;

    private final RoomService roomService;

    public ReservationService( ReservationRepository reservationRepository, AccountingUtils accountingUtils, RoomService roomService) {
        this.reservationRepository = reservationRepository;
        this.accountingUtils = accountingUtils;
        this.roomService = roomService;
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

    public List<ReservationEntry> getReservationsForUser( Long userId) {
        List<ReservationEntity> reservationEntities = reservationRepository.getAllByUserIdAndAndBookingStateIs(userId, BookingState.CONFIRMED);
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

    public ReservationEntry reserve(BookingRequestEntry bookingRequestEntry) throws ParseException {
        Date startDate = accountingUtils.getCheckInTime(bookingRequestEntry.getStartDate());
        Date endDate = accountingUtils.getCheckOutTime(bookingRequestEntry.getEndDate());
        RoomEntry roomToBook = roomService.findOneAvailable( bookingRequestEntry.getHotelId(), bookingRequestEntry.getRoomType(), startDate.getTime(), endDate.getTime());
        if(ObjectUtils.isEmpty(roomToBook)) {
            return null;
        }
        ReservationEntry reservationEntry = new ReservationEntry(null, bookingRequestEntry.getUserId(), roomToBook.getId(), startDate.getTime(), endDate.getTime(), BookingState.PENDING);
        ReservationEntry reservationCompleted = convertToEntry(reservationRepository.save(convertToEntity(reservationEntry)));
        return reservationCompleted;
    }

    public ReservationEntry unreserve( Long reservationId) {
        ReservationEntry reservationEntry = findOneById(reservationId);
        reservationEntry.setBookingState(BookingState.EXPIRED);
        ReservationEntry updatedReservationEntry = convertToEntry(reservationRepository.save(convertToEntity(reservationEntry)));
        return updatedReservationEntry;
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
}
