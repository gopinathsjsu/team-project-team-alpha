package com.booking.alpha.service;

import com.booking.alpha.entity.HotelEntity;
import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.respository.HotelRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService( HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    public HotelEntry convertToEntry(HotelEntity hotelEntity) {
        HotelEntry hotelEntry = new HotelEntry();
        BeanUtils.copyProperties( hotelEntity, hotelEntry);
        return hotelEntry;
    }

    public HotelEntity convertToEntity(HotelEntry hotelEntry) {
        HotelEntity hotelEntity = new HotelEntity();
        BeanUtils.copyProperties( hotelEntry, hotelEntity);
        return hotelEntity;
    }

    public HotelEntry findOneById( Long id) {
        System.out.println(" Looking up for Id "+id);
        HotelEntity hotelEntity = hotelRepository.findById(id).get();
        return convertToEntry(hotelEntity);
    }
}
