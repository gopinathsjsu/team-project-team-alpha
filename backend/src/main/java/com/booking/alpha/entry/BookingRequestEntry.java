package com.booking.alpha.entry;

import com.booking.alpha.constant.HotelServiceType;
import com.booking.alpha.constant.RoomType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequestEntry {

    Long userId;

    Long customLoyaltyCredit;

    Long roomId;

    String startDate;

    String endDate;

    Set<HotelServiceType> serviceTypeSet;
}
