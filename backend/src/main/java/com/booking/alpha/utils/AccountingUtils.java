package com.booking.alpha.utils;

import com.booking.alpha.entry.HolidayDateEntry;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.entry.ServiceEntry;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Set;
import java.util.List;
import java.util.HashSet;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;
import java.util.Calendar;

@Service
public class AccountingUtils {

    private final Set<Integer> weekendDays;

    private final Set<Integer> vacationMonths;

    private final List<HolidayDateEntry> holidayDateEntries;

    private final Long DAY_IN_MILLISECONDS;

    private final TimeZone timeZone;

    public AccountingUtils() {

        weekendDays = new HashSet<>(Arrays.asList( 0, 6));

        vacationMonths = new HashSet<>(Arrays.asList( 4, 5, 11));

        holidayDateEntries = Arrays.asList(
                new HolidayDateEntry( 1, 1),
                new HolidayDateEntry( 1, 17),
                new HolidayDateEntry( 5, 30),
                new HolidayDateEntry( 7, 4),
                new HolidayDateEntry( 9, 5),
                new HolidayDateEntry( 11, 24),
                new HolidayDateEntry( 12, 25),
                new HolidayDateEntry( 12, 31)
        );

        DAY_IN_MILLISECONDS = 24L*60L*60L*1000L;

        timeZone = TimeZone.getTimeZone("PST");
    }

    public Date getCheckInTime(String startDate) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        dateFormat.setTimeZone(timeZone);
        return new DateTime(dateFormat.parse(startDate)).withZone(DateTimeZone.forTimeZone(timeZone)).withTimeAtStartOfDay().plusHours(12).toDate();
    }

    public Date getCheckOutTime(String endDate) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        dateFormat.setTimeZone(timeZone);
        return new DateTime(dateFormat.parse(endDate)).withZone(DateTimeZone.forTimeZone(timeZone)).withTimeAtStartOfDay().plusHours(12).plusMillis(-1).toDate();
    }

    public String convertToString( Long currentTime) {
        Date date = new Date(currentTime);
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        dateFormat.setTimeZone(timeZone);
        return dateFormat.format(date);
    }

    public Long getTotalCost(List<ServiceEntry> serviceEntries) {
        Long cost = 0L;
        if(!ObjectUtils.isEmpty(serviceEntries)) {
            for(ServiceEntry serviceEntry: serviceEntries) {
                cost = cost + serviceEntry.getCost();
            }
        }
        return cost;
    }

    public Long getDurationInDays( Long startTime, Long endTime) {
        Long diff = endTime - startTime + 1;
        return diff/DAY_IN_MILLISECONDS;
    }

    public Date getDate(Integer year, HolidayDateEntry holidayDateEntry) {
        Calendar calendar = Calendar.getInstance();
        TimeZone timeZone = TimeZone.getTimeZone("PST");
        calendar.setTimeZone(timeZone);
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, holidayDateEntry.getMonth()-1);
        calendar.set(Calendar.DAY_OF_MONTH, holidayDateEntry.getDay());
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public Boolean isIntersecting( Date queryStartDate, Date queryEndDate, HolidayDateEntry holidayDateEntry) {
        List<Integer> years = Arrays.asList(
                1900+queryStartDate.getYear()-1,
                1900+queryStartDate.getYear(),
                1900+queryStartDate.getYear()+1
        );
        for(Integer year: years) {
            Date holidayStartDate = getDate( year, holidayDateEntry);
            Date holidayEndDate = new DateTime(holidayStartDate).plusHours(24).plusMillis(-1).toDate();
            if((holidayEndDate.before(queryStartDate)) || (queryEndDate.before(holidayStartDate))) {
                continue;
            } else {
                return true;
            }
        }
        return false;
    }

    public Boolean isWithinInHoliday( Date startDate, Date endDate) {
        for( HolidayDateEntry holidayDateEntry: holidayDateEntries) {
            if(isIntersecting( startDate, endDate, holidayDateEntry)) {
                return true;
            }
        }
        return false;
    }

    public Boolean isWithinVacations( Date startDate, Date endDate) {
        Integer startMonth = startDate.getMonth();
        Integer endMonth = endDate.getMonth();
        return vacationMonths.contains(startMonth) || vacationMonths.contains(endMonth);
    }

    public Boolean isOverWeekend( Date startDate, Date endDate) {
        Integer startDateDay = startDate.getDay();
        Integer endDateDay = endDate.getDay();
        Integer currDateDay = startDateDay;
        while(true){
            if (weekendDays.contains(currDateDay)) {
                return true;
            }
            if(currDateDay==endDateDay) {
                break;
            }
            currDateDay = (currDateDay+1)%7;
        }
        return false;
    }
}
