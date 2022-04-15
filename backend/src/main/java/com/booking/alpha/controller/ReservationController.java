package com.booking.alpha.controller;

import com.booking.alpha.entry.ReservationEntry;
import com.booking.alpha.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/v1/reservation")
@RestController
public class ReservationController {

    private ReservationService reservationService;

    public ReservationController( ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/user/{userId}")
    ResponseEntity<List<ReservationEntry>> getReservationForUser(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>( reservationService.getReservationsForUser(userId), HttpStatus.OK);
    }

    @GetMapping("/hotel/{hotelId}")
    ResponseEntity<List<ReservationEntry>> getReservationForHotel(@PathVariable("hotelId") Long hotelId) {
        return new ResponseEntity<>( reservationService.getReservationForHotel(hotelId), HttpStatus.OK);
    }
}
