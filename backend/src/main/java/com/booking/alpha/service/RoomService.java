package com.booking.alpha.service;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.HotelEntity;
import com.booking.alpha.entity.RoomEntity;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.entry.RoomSearchPagedRequest;
import com.booking.alpha.respository.RoomRepository;
import com.booking.alpha.utils.AccountingUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    private final AccountingUtils accountingUtils;

    public RoomService(RoomRepository roomRepository, AccountingUtils accountingUtils) {
        this.roomRepository = roomRepository;
        this.accountingUtils = accountingUtils;
    }

    RoomEntity convertToEntity( RoomEntry roomEntry) {
        RoomEntity roomEntity = new RoomEntity();
        BeanUtils.copyProperties( roomEntry, roomEntity);
        return roomEntity;
    }

    RoomEntry convertToEntry( RoomEntity roomEntity) {
        RoomEntry roomEntry = new RoomEntry();
        BeanUtils.copyProperties( roomEntity, roomEntry);
        return roomEntry;
    }

    public List<RoomEntry> findAllAvailable(RoomSearchPagedRequest roomSearchPagedRequest) throws ParseException {

        Long startDate = accountingUtils.getCheckInTime(roomSearchPagedRequest.getStartDate()).getTime();
        Long endDate = accountingUtils.getCheckOutTime(roomSearchPagedRequest.getEndDate()).getTime();

        List<RoomEntity> roomEntities = roomRepository.findAllAvailable( new HashSet<>(Arrays.asList(roomSearchPagedRequest.getHotelId())),
                new HashSet<String>(Arrays.asList(BookingState.CONFIRMED.toString(), BookingState.PENDING.toString())),
                startDate,
                endDate);
        if(ObjectUtils.isEmpty(roomEntities)) {
            return new ArrayList<>();
        }
        return roomEntities.stream().map(this::convertToEntry).collect(Collectors.toList());
    }

    /*
    * DO NOT put transactional on this method
    * */
    public RoomEntry findOneByIdWithLock( Long roomId) {
        return convertToEntry(roomRepository.findById(roomId).get());
    }

    public RoomEntry findOneAvailable( Long roomId, Long startDate, Long endDate) {
        RoomEntity roomEntity = roomRepository.findOneAvailable(
                roomId,
                new HashSet<String>(Arrays.asList(BookingState.CONFIRMED.toString(), BookingState.PENDING.toString())),
                startDate,
                endDate);
        if(ObjectUtils.isEmpty(roomEntity)) {
            return null;
        }
        return convertToEntry(roomEntity);
    }


    public RoomEntry addRoom(RoomEntry roomEntry){
        RoomEntity roomEntity = convertToEntity(roomEntry);
        RoomEntity createdRoomEntity = roomRepository.save(roomEntity);
        return convertToEntry(createdRoomEntity);
    }


    public List<RoomEntity> getAllRoomsOfAHotel(Long hotelId){
        List<RoomEntity> rooms = roomRepository.findByHotelIdIs(hotelId);
        return rooms;
    }

}
