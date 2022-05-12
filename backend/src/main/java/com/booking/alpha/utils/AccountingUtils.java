package com.booking.alpha.utils;

import com.booking.alpha.entry.HolidayDateEntry;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Date;
import java.util.TimeZone;
import java.util.Calendar;
import java.util.GregorianCalendar;

@Service
public class AccountingUtils {

    private final List<HolidayDateEntry> holidayDateEntries;

    public AccountingUtils() {
        holidayDateEntries = Arrays.asList(
                new HolidayDateEntry( 1, 17),
                new HolidayDateEntry( 5, 30),
                new HolidayDateEntry( 7, 4),
                new HolidayDateEntry( 9, 5),
                new HolidayDateEntry( 11, 24),
                new HolidayDateEntry( 12, 25)
        );
    }

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

    public String convertToString( Long currentTime) {
        Date date = new Date(currentTime);
        TimeZone timeZone = TimeZone.getTimeZone("GMT-7");
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        dateFormat.setTimeZone(timeZone);
        return dateFormat.format(date);
    }

    public Date getDate(Integer year, HolidayDateEntry holidayDateEntry) {
        Calendar calendar = new GregorianCalendar();
        TimeZone timeZone = TimeZone.getTimeZone("GMT-7");
        calendar.setTimeZone(timeZone);
        calendar.set( year, holidayDateEntry.getMonth(), holidayDateEntry.getDay(), 1, 0);
        return calendar.getTime();
    }
}
