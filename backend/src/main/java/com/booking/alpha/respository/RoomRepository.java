package com.booking.alpha.respository;

import com.booking.alpha.entity.RoomEntity;
import com.booking.alpha.entry.RoomEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {

    @Query(value = "  SELECT * FROM   room LEFT JOIN reservation ON room.id = reservation.room_id AND ( ( ( :startDate <= reservation.start_time ) AND ( reservation.start_time <= :endDate ) ) OR ( ( :startDate <= reservation.end_time ) AND ( reservation.end_time <= :endDate ) ) OR ( ( reservation.start_time <= :startDate ) AND ( :endDate <= reservation.end_time ) ) ) AND ( reservation.booking_state in :bookingStates ) WHERE room.id = :roomId AND reservation.room_id IS NULL limit 1", nativeQuery = true)
    public RoomEntity findOneAvailable(@Param("roomId") Long roomId, @Param("bookingStates") Set<String> bookingStates, @Param("startDate") Long startDate, @Param("endDate") Long endDate);

    @Query(value = "  SELECT * FROM   room LEFT JOIN reservation ON room.id = reservation.room_id AND ( ( ( :startDate <= reservation.start_time ) AND ( reservation.start_time <= :endDate ) ) OR ( ( :startDate <= reservation.end_time ) AND ( reservation.end_time <= :endDate ) ) OR ( ( reservation.start_time <= :startDate ) AND ( :endDate <= reservation.end_time ) ) ) AND ( reservation.booking_state in :bookingStates ) WHERE room.hotel_id in :hotelIds AND reservation.room_id IS NULL", nativeQuery = true)
    public List<RoomEntity> findAllAvailable( @Param("hotelIds") Set<Long> hotelIds, @Param("bookingStates") Set<String> bookingStates, @Param("startDate") Long startDate, @Param("endDate") Long endDate);

    List<RoomEntity> findByHotelIdIs( Long hotelId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public Optional<RoomEntity> findById(Long roomId);
}
