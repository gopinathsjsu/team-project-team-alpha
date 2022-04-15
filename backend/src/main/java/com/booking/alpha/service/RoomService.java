package com.booking.alpha.service;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.RoomEntity;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.respository.RoomRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Arrays;
import java.util.HashSet;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
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

    public RoomEntry findOneAvailable(Long hotelId, RoomType roomType, Long startDate, Long endDate) {
        RoomEntity roomEntity = roomRepository.findOneAvailable(hotelId, roomType.toString(),
                new HashSet<String>(Arrays.asList(BookingState.CONFIRMED.toString(),
                        BookingState.PENDING.toString())),
                startDate, endDate);
        if(ObjectUtils.isEmpty(roomEntity)) {
            return null;
        }
        return convertToEntry(roomEntity);
    }
}
