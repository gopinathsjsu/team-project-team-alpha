package com.booking.alpha.utils;

import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.entry.ServiceEntry;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class WeekendBillingEvaluator extends BillingEvaluator {

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
            List<ServiceEntry> scaledServiceEntries = new ArrayList<>();
            for(ServiceEntry serviceEntry: serviceEntries) {
                Long newCost = serviceEntry.getCost() + serviceEntry.getCost()/5;
                newCost = duration*newCost;
                scaledServiceEntries.add(new ServiceEntry(newCost, serviceEntry.getType()));
            }
            hotelEntry.setServiceList(scaledServiceEntries);
        }
    }

    @Override
    public void normaliseRooms(List<RoomEntry> roomEntries, Long duration) {
        if(ObjectUtils.isEmpty(roomEntries)) {
            return;
        }
        for(RoomEntry roomEntry: roomEntries) {
            Long newCost = roomEntry.getCost() + roomEntry.getCost()/5;
            newCost = duration*newCost;
            roomEntry.setCost(newCost);
        }
    }
}
