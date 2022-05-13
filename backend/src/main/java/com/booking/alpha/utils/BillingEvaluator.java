package com.booking.alpha.utils;

import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.RoomEntry;

import java.util.List;

public abstract class BillingEvaluator {

    public abstract void normaliseHotels(List<HotelEntry> hotelEntryList);

    public abstract void normaliseRooms(List<RoomEntry> roomEntries);
}
