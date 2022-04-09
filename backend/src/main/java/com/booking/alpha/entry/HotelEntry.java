package com.booking.alpha.entry;

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
public class HotelEntry {

    Long id;

    String name;

    String contactNo;

    String emailId;

    String city;

    String country;

    String zipCode;
}
