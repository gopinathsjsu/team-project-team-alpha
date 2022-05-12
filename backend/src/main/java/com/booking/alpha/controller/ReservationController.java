package com.booking.alpha.controller;

import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entry.BookingRequestEntry;
import com.booking.alpha.entry.ReservationDetailsEntry;
import com.booking.alpha.entry.ReservationEntry;
import com.booking.alpha.service.ReservationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Arrays;

@RequestMapping("/v1/reservation")
@RestController
public class ReservationController {

    private ReservationService reservationService;

    public ReservationController( ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationEntry> get(@PathVariable("id") Long id) {
        return new ResponseEntity<>(reservationService.findOneById(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ReservationEntry> patchUpdate(@PathVariable("id") Long id, @RequestBody ReservationEntry reservationEntry) {
        return new ResponseEntity( reservationService.patchUpdate( id, reservationEntry), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    ResponseEntity<List<ReservationDetailsEntry>> getReservationForUser(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>( reservationService.getReservationDetails(userId, new HashSet<>(Arrays.asList(BookingState.CONFIRMED, BookingState.PENDING))), HttpStatus.OK);
    }

    @GetMapping("/hotel/{hotelId}")
    ResponseEntity<List<ReservationDetailsEntry>> getReservationForHotel(@PathVariable("hotelId") Long hotelId) {
        return new ResponseEntity<>( reservationService.getReservationForHotel(hotelId), HttpStatus.OK);
    }

    @GetMapping("/user-cart/{userId}")
    ResponseEntity<List<ReservationDetailsEntry>> getUserCart(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>( reservationService.getReservationDetails(userId, new HashSet<>(Arrays.asList(BookingState.PENDING))), HttpStatus.OK);
    }

    @PostMapping("/add-to-cart")
    public ResponseEntity<ReservationDetailsEntry> reserveOne(@RequestBody BookingRequestEntry bookingRequestEntry) throws ParseException, JsonProcessingException {
        return new ResponseEntity<>( reservationService.reserve(bookingRequestEntry), HttpStatus.OK);
    }

    @PostMapping("/book/{userId}")
    public ResponseEntity<List<ReservationDetailsEntry>> makeBooking(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>( reservationService.makeBooking(userId), HttpStatus.OK);
    }

    @PostMapping("/remove-from-cart/{id}")
    public ResponseEntity<ReservationDetailsEntry> unreserve(@PathVariable("id") Long reservationId) {
        ReservationEntry updatedReservationEntry = reservationService.patchUpdate(reservationId, new ReservationEntry( null, null, null, null, null, null, BookingState.CANCELLED, null));
        return new ResponseEntity<>( reservationService.convertToDetails(Collections.singletonList(updatedReservationEntry)).get(0), HttpStatus.OK);
    }
}
