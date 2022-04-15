package com.booking.alpha.respository;

import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {

    @Query(value = "  SELECT * FROM   room LEFT JOIN reservation ON room.id = reservation.room_id AND ( ( ( :startDate <= reservation.start_time ) AND ( reservation.start_time <= :endDate ) ) OR ( ( :startDate <= reservation.end_time ) AND ( reservation.end_time <= :endDate ) ) ) WHERE room.hotel_id = :hotelId AND room.type = :roomType AND reservation.room_id IS NULL limit 1", nativeQuery = true)
    public RoomEntity findOneAvailable(@Param("hotelId") Long hotelId, @Param("roomType") String roomType,@Param("startDate") Long startDate,@Param("endDate") Long endDate);
}
