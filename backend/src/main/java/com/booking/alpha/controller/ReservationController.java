package com.booking.alpha.controller;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entry.BookingRequestEntry;
import com.booking.alpha.entry.ReservationEntry;
import com.booking.alpha.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
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
        return new ResponseEntity<>( reservationService.getReservationsForUser(userId, BookingState.CONFIRMED), HttpStatus.OK);
    }

    @GetMapping("/hotel/{hotelId}")
    ResponseEntity<List<ReservationEntry>> getReservationForHotel(@PathVariable("hotelId") Long hotelId) {
        return new ResponseEntity<>( reservationService.getReservationForHotel(hotelId), HttpStatus.OK);
    }

    @GetMapping("/user-cart/{userId}")
    ResponseEntity<List<ReservationEntry>> getUserCart(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>( reservationService.getReservationsForUser(userId, BookingState.PENDING), HttpStatus.OK);
    }

    @PostMapping("/add-to-cart")
    public ResponseEntity< ReservationEntry > reserveOne(@RequestBody BookingRequestEntry bookingRequestEntry) throws ParseException {
        return new ResponseEntity<>( reservationService.reserve(bookingRequestEntry), HttpStatus.OK);
    }

    @PostMapping("/book/{userId}")
    public ResponseEntity<List<ReservationEntry>> makeBooking(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>( reservationService.makeBooking(userId), HttpStatus.OK);
    }

    @PostMapping("/remove-from-cart/{id}")
    public ResponseEntity<ReservationEntry> unreserve(@PathVariable("id") Long reservationId) {
        return new ResponseEntity<>( reservationService.unreserve(reservationId), HttpStatus.OK);
    }
}
