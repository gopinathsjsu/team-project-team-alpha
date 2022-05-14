package com.booking.alpha.respository;

import com.booking.alpha.entity.HotelEntity;
import com.booking.alpha.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface HotelRepository extends JpaRepository<HotelEntity, Long> {

    Optional<HotelEntity> findById(Long id);

    Optional<HotelEntity> findByEmailId(String emailId);

    @Query(value = "  select distinct city from hotel ", nativeQuery = true)
    public List<String> findAllCities();
}
