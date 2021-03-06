package com.booking.alpha.entity;

import com.booking.alpha.constant.RoomType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;

@Entity
@Table(name="room")
@Getter
@Setter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class RoomEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column
    @NonNull
    Long hotelId;

    @Column
    @NonNull
    @Enumerated(EnumType.STRING)
    RoomType type;

    @Column
    @NonNull
    Long cost;

    @Column
    String name;

    @Column
    String description;

    @Column
    Long maxOccupants;

    @Column
    Long adults;

    @Column
    Long children;
}
