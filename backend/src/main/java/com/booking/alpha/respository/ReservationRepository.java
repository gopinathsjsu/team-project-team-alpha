package com.booking.alpha.respository;

import com.booking.alpha.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {

    public List<ReservationEntity> getAllByUserId(Long userId);

    @Query(value = " SELECT * FROM   reservation JOIN room ON reservation.room_id = room.id AND room.hotel_id = :hotelId  ", nativeQuery = true)
    public List<ReservationEntity> getAllByHotelId(@Param("hotelId") Long hotelId);
}
