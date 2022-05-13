package com.booking.alpha.utils;

import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.entry.ServiceEntry;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
public class VacationBillingEvaluator extends BillingEvaluator{

    @Override
    public void normaliseHotels(List<HotelEntry> hotelEntryList) {
        if(ObjectUtils.isEmpty(hotelEntryList)) {
            return;
        }
        for( HotelEntry hotelEntry: hotelEntryList) {
            List<ServiceEntry> serviceEntries = hotelEntry.getServiceList();
            if(ObjectUtils.isEmpty(serviceEntries)) {
                continue;
            }
            for(ServiceEntry serviceEntry: serviceEntries) {
                Long newCost = serviceEntry.getCost() + serviceEntry.getCost()/10;
                serviceEntry.setCost(newCost);
            }
        }
    }

    @Override
    public void normaliseRooms(List<RoomEntry> roomEntries) {
        if(ObjectUtils.isEmpty(roomEntries)) {
            return;
        }
        for(RoomEntry roomEntry: roomEntries) {
            Long newCost = roomEntry.getCost() + roomEntry.getCost()/10;
            roomEntry.setCost(newCost);
        }
    }
}
