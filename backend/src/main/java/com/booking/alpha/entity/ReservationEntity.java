package com.booking.alpha.entity;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.entry.ServiceEntry;
import com.sun.istack.NotNull;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="reservation")
@Getter
@Setter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class ReservationEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column
    Long transactionId;

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

    @Type(type = "json")
    @Column(columnDefinition = "json")
    List<ServiceEntry> serviceList;

    @Column
    @NonNull
    Long rewardPoints;
}
