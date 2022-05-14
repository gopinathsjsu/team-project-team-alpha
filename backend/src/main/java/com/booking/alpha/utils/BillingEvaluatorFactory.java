package com.booking.alpha.utils;

import com.booking.alpha.constant.BillingType;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class BillingEvaluatorFactory {

    private final BillingEvaluator holidayBillingEvaluator;

    private final BillingEvaluator offSeasonBillingEvaluator;

    private final BillingEvaluator vacationBillingEvaluator;

    private final BillingEvaluator weekendBillingEvaluator;

    private final AccountingUtils accountingUtils;

    public BillingEvaluatorFactory( HolidayBillingEvaluator holidayBillingEvaluator,
                                    OffSeasonBillingEvaluator offSeasonBillingEvaluator,
                                    VacationBillingEvaluator vacationBillingEvaluator,
                                    WeekendBillingEvaluator weekendBillingEvaluator,
                                    AccountingUtils accountingUtils) {
        this.holidayBillingEvaluator = holidayBillingEvaluator;
        this.offSeasonBillingEvaluator = offSeasonBillingEvaluator;
        this.vacationBillingEvaluator = vacationBillingEvaluator;
        this.weekendBillingEvaluator = weekendBillingEvaluator;
        this.accountingUtils = accountingUtils;
    }

    public BillingEvaluator getBillingEvaluator(BillingType billingType) {
        if(billingType.equals(BillingType.HOLIDAY)) {
            return holidayBillingEvaluator;
        } else if(billingType.equals(BillingType.VACATION)) {
            return vacationBillingEvaluator;
        } else if(billingType.equals(BillingType.WEEKEND)) {
            return weekendBillingEvaluator;
        } else {
            return offSeasonBillingEvaluator;
        }
    }

    public BillingType getBillingType( Long startDate, Long endDate) {
        if(accountingUtils.isWithinInHoliday( new Date(startDate), new Date(endDate))) {
            return BillingType.HOLIDAY;
        } else if(accountingUtils.isWithinVacations( new Date(startDate), new Date(endDate))) {
            return BillingType.VACATION;
        } else  if(accountingUtils.isOverWeekend( new Date(startDate), new Date(endDate))) {
            return BillingType.WEEKEND;
        } else {
            return BillingType.OFF_SEASON;
        }
    }
}
