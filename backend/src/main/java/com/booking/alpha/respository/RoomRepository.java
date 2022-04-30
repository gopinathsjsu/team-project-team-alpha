package com.booking.alpha.respository;

import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.ReservationEntity;
import com.booking.alpha.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {

    @Query(value = "  SELECT * FROM   room LEFT JOIN reservation ON room.id = reservation.room_id AND ( ( ( :startDate <= reservation.start_time ) AND ( reservation.start_time <= :endDate ) ) OR ( ( :startDate <= reservation.end_time ) AND ( reservation.end_time <= :endDate ) ) OR ( ( reservation.start_time <= :startDate ) AND ( :endDate <= reservation.end_time ) ) ) AND ( reservation.booking_state in :bookingStates ) WHERE room.hotel_id = :hotelId AND room.type = :roomType AND reservation.room_id IS NULL limit 1", nativeQuery = true)
    public RoomEntity findOneAvailable(@Param("hotelId") Long hotelId, @Param("roomType") String roomType, @Param("bookingStates") Set<String> bookingStates, @Param("startDate") Long startDate, @Param("endDate") Long endDate);

    @Query(value = "  SELECT * FROM   room WHERE room.hotel_id = :hotelId" , nativeQuery = true)
    List<RoomEntity> getAllRoomsOfAHotel(@Param("hotelId") Long hotelId);

}
