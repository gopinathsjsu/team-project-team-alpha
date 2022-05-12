package com.booking.alpha.utils;

import com.booking.alpha.entry.HotelEntry;

import java.util.List;

public abstract class BillingEvaluator {

    public abstract void normalise(List<HotelEntry> hotelEntryList);
}
