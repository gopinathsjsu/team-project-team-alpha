package com.booking.alpha.entity;

import com.sun.istack.NotNull;
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

@Entity
@Table(name="hotel")
@Getter
@Setter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class HotelEntity {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column
    @NonNull
    String name;

    @Column
    @NonNull
    String contactNo;

    @Column
    @NonNull
    String emailId;

    @Column
    @NonNull
    String city;

    @Column
    @NonNull
    String country;

    @Column
    @NotNull
    String zipCode;
}
