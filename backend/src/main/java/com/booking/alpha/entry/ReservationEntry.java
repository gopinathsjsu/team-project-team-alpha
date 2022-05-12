package com.booking.alpha.entry;

import com.booking.alpha.constant.BookingState;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class ReservationEntry {

    Long id;

    Long transactionId;

    Long userId;

    Long roomId;

    Long startTime;

    Long endTime;

    BookingState bookingState;

    List<ServiceEntry> serviceList;
}
