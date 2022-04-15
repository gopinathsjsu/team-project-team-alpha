package com.booking.alpha.respository;

import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {

//    @Query(value = "   ", nativeQuery = true)
//    public RoomEntity findOneAvailable(@Param("hotelId") Long hotelId,@Param("roomType") RoomType roomType,@Param("startDate") Long startDate,@Param("endDate") Long endDate);
}
