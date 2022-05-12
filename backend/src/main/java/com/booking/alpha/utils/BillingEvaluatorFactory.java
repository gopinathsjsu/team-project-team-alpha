package com.booking.alpha.utils;

import com.booking.alpha.constant.BillingType;
import com.booking.alpha.entry.HolidayDateEntry;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class BillingEvaluatorFactory {

    private final BillingEvaluator holidayBillingEvaluator;

    private final BillingEvaluator offSeasonBillingEvaluator;

    private final BillingEvaluator vacationBillingEvaluator;

    private final BillingEvaluator weekendBillingEvaluator;

    public BillingEvaluatorFactory( HolidayBillingEvaluator holidayBillingEvaluator,
                                    OffSeasonBillingEvaluator offSeasonBillingEvaluator,
                                    VacationBillingEvaluator vacationBillingEvaluator,
                                    WeekendBillingEvaluator weekendBillingEvaluator) {
        this.holidayBillingEvaluator = holidayBillingEvaluator;
        this.offSeasonBillingEvaluator = offSeasonBillingEvaluator;
        this.vacationBillingEvaluator = vacationBillingEvaluator;
        this.weekendBillingEvaluator = weekendBillingEvaluator;
    }

    public BillingEvaluator BillingEvaluatorFactory(BillingType billingType) {
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
}
