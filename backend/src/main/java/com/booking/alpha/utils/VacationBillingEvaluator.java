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
    public void normaliseHotels(List<HotelEntry> hotelEntryList, Long duration) {
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
                newCost = duration*newCost;
                serviceEntry.setCost(newCost);
            }
        }
    }

    @Override
    public void normaliseRooms(List<RoomEntry> roomEntries, Long duration) {
        if(ObjectUtils.isEmpty(roomEntries)) {
            return;
        }
        for(RoomEntry roomEntry: roomEntries) {
            Long newCost = roomEntry.getCost() + roomEntry.getCost()/10;
            newCost = duration*newCost;
            roomEntry.setCost(newCost);
        }
    }
}
