package com.booking.alpha.service;

import com.booking.alpha.entity.ReservationEntity;
import com.booking.alpha.entry.HotelAvailabilityMapping;
import com.booking.alpha.entry.ReservationEntry;
import com.booking.alpha.respository.ReservationRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReservationService {

    private final ObjectMapper objectMapper;

    private final ReservationRepository reservationRepository;

    public ReservationService( ReservationRepository reservationRepository, ObjectMapper objectMapper) {
        this.reservationRepository = reservationRepository;
        this.objectMapper = objectMapper;
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

    public List<HotelAvailabilityMapping> getAvailableHotelRooms( Long startTime, Long endTime, Set<Long> hotelIds) {
        List<HotelAvailabilityMapping> hotelAvailabilityMappings = new ArrayList<>();
        List<Object[]> res = reservationRepository.lookupAvailabilityForHotels(startTime, endTime, hotelIds);
        for(Object[] ob: res) {
            HashMap<String,Object> hm = new HashMap<>();
            hm.put("hotelId", ob[0]);
            hm.put("type", ob[1]);
            hm.put("count", ob[2]);
            hotelAvailabilityMappings.add(objectMapper.convertValue(hm, new TypeReference<HotelAvailabilityMapping>() {}));
        }
        return hotelAvailabilityMappings;
    }
}
