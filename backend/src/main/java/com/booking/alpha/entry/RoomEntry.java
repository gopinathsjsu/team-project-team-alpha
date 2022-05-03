package com.booking.alpha.entry;

import com.booking.alpha.constant.RoomType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Setter
@Getter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class RoomEntry {

    Long id;

    Long hotelId;

    RoomType type;

    Long cost;

    String name;

    String description;

    Long maxOccupants;

    Long adults;

    Long children;

    String imageUrl;
}
