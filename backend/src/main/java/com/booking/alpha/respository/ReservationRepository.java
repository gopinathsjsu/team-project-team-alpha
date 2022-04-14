package com.booking.alpha.respository;

import com.booking.alpha.entity.ReservationEntity;
import com.booking.alpha.entry.HotelAvailabilityMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {

    @Query(value = " SELECT room.hotel_id as hotelId, room.type as type, count(*) as count FROM room LEFT JOIN reservation ON room.id = reservation.room_id and (((:startTime<=reservation.start_time) and (reservation.start_time<=:endTime)) or ((:startTime<=reservation.end_time) and (reservation.end_time<=:endTime))) and room.hotel_id in :hotelIds WHERE reservation.room_id IS NULL GROUP BY room.hotel_id, room.type ", nativeQuery = true)
    public List<Object[]> lookupAvailabilityForHotels(@Param("startTime") Long startTime, @Param("endTime") Long endTime, @Param("hotelIds") Set<Long> hotelIds);
}
