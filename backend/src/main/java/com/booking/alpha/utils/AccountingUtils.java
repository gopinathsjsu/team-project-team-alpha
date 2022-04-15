package com.booking.alpha.utils;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Service
public class AccountingUtils {

    public Date getCheckInTime(String startDate) throws ParseException {
        TimeZone timeZone = TimeZone.getTimeZone("GMT-7");
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        dateFormat.setTimeZone(timeZone);
        return new DateTime(dateFormat.parse(startDate)).withZone(DateTimeZone.forTimeZone(timeZone)).withTimeAtStartOfDay().plusHours(12).toDate();
    }

    public Date getCheckOutTime(String endDate) throws ParseException {
        TimeZone timeZone = TimeZone.getTimeZone("GMT-7");
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        dateFormat.setTimeZone(timeZone);
        return new DateTime(dateFormat.parse(endDate)).withZone(DateTimeZone.forTimeZone(timeZone)).withTimeAtStartOfDay().plusHours(12).plusMillis(-1).toDate();
    }
}
