package com.booking.alpha.entry;

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
public class HotelEntry {

    Long id;

    String name;

    String contactNo;

    String description;

    String emailId;

    String city;

    String country;

    String zipCode;

    String password;

    String imageUrl;

    List<ServiceEntry> serviceList;
}
