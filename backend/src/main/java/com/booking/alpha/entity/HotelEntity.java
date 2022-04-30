package com.booking.alpha.entity;

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
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.lang.NonNull;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import java.util.List;

@Entity
@Table(name="hotel")
@Getter
@Setter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class HotelEntity {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column
    //@NonNull
    String name;

    @Column
    //@NonNull
    String contactNo;

    @Column
    //@NonNull
    String description;

    @Column
    @NonNull
    String emailId;

    @Column
    //@NonNull
    String city;

    @Column
    //@NonNull
    String country;

    @Column
    //@NotNull
    String zipCode;

    @Column
    @NonNull
    String password;

    @Column
    String imageUrl;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    List<ServiceEntry> serviceList;
}
