package com.booking.alpha.respository;

import com.booking.alpha.entity.HotelEntity;
import com.booking.alpha.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HotelRepository extends JpaRepository<HotelEntity, Long> {

    Optional<HotelEntity> findById(Long id);
    Optional<HotelEntity> findByEmailId(String emailId);
}
