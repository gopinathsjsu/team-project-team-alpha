package com.booking.alpha.entity;

import com.booking.alpha.constant.BookingState;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
@Table(name="reservation")
@Getter
@Setter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class ReservationEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column
    @NonNull
    Long userId;

    @Column
    @NonNull
    Long roomId;

    @Column
    @NonNull
    Long startTime;

    @Column
    @NonNull
    Long endTime;

    @Column
    @NotNull
    @Enumerated(EnumType.STRING)
    BookingState bookingState;
}
