package com.booking.alpha.entry;

import com.booking.alpha.constant.HotelServiceType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class ServiceEntry {

    Long cost;

    HotelServiceType type;
}
