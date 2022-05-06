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
public class ReservationDetailsEntry {

    Long userId;

    RoomEntry roomEntry;

    Long startTime;

    Long endTime;
}