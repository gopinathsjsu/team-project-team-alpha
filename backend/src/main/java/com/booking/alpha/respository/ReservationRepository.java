package com.booking.alpha.respository;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.entity.ReservationEntity;
import com.booking.alpha.entry.ReservationEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {

    public List<ReservationEntity> getAllByUserIdAndAndBookingStateIn(Long userId, Set<BookingState> bookingStates);

    public ReservationEntity findFirstByUserIdAndBookingStateIn( Long userId, Set<BookingState> bookingStates);

    @Query(value = " SELECT * FROM   reservation JOIN room ON reservation.room_id = room.id AND room.hotel_id = :hotelId AND reservation.booking_state = :bookingState ", nativeQuery = true)
    public List<ReservationEntity> getAllByHotelIdAndBookingState(@Param("hotelId") Long hotelId, @Param("bookingState") String bookingState);
}
