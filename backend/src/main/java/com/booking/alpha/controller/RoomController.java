package com.booking.alpha.controller;


import com.booking.alpha.constant.BillingType;
import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.RoomEntity;
import com.booking.alpha.entry.BookingRequestEntry;
import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.entry.RoomSearchPagedRequest;
import com.booking.alpha.service.RoomService;
import com.booking.alpha.utils.AccountingUtils;
import com.booking.alpha.utils.BillingEvaluatorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/v1/room")
@RestController
public class RoomController {


    @Autowired
    RoomService roomService;

    @Autowired
    AccountingUtils accountingUtils;

    @Autowired
    BillingEvaluatorFactory billingEvaluatorFactory;

    @GetMapping("/type")
    public ResponseEntity<List<RoomType>> getType() {
        return new ResponseEntity<>(Arrays.asList(RoomType.values()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomEntry> getRoom(@PathVariable("id") Long id) {
        RoomEntry roomEntry = roomService.findRoom(id);
        return new ResponseEntity<>( roomEntry, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RoomEntry> addRoom(@RequestBody RoomEntry roomEntry) {
        RoomEntry newRoomEntry = roomService.addRoom(roomEntry);
        return new ResponseEntity<>( newRoomEntry, HttpStatus.CREATED);
    }

    @GetMapping("/hotel/{hotel_id}")
    public  ResponseEntity<List<RoomEntry>> getAllRoomsOfAHotel(@PathVariable("hotel_id") Long hotel_id){
        List<RoomEntry> rooms = roomService.getAllRoomsOfAHotel(hotel_id);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping("/get-available-rooms")
    public ResponseEntity<List<RoomEntry>> getRoomsAvailable(@RequestBody RoomSearchPagedRequest roomSearchPagedRequest) throws ParseException {
        return new ResponseEntity<>( roomService.findAllAvailable(roomSearchPagedRequest), HttpStatus.OK);
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<RoomEntry> uploadImage(@PathVariable("id") Long id, @RequestBody MultipartFile file){
        RoomEntry roomEntry = roomService.uploadImage(file,id);
        if(roomEntry != null){
            return new ResponseEntity<>( roomEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PutMapping("/{id}")
    public ResponseEntity<RoomEntry> updateHotel(@PathVariable("id") Long id, @RequestBody RoomEntry roomEntry){
        RoomEntry updatedRoomEntry = roomService.updateRoom(id, roomEntry);
        if(updatedRoomEntry != null){
            return new ResponseEntity<>( updatedRoomEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable("id") Long id){
        Boolean deleted = roomService.deleteRoom(id);
        if(deleted){
            return new ResponseEntity<>( "Room with id: " + id + " deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/test")
    public ResponseEntity<BillingType> test(@RequestBody BookingRequestEntry bookingRequestEntry) throws Exception{
        Date startDate = accountingUtils.getCheckInTime(bookingRequestEntry.getStartDate());
        Date endDate = accountingUtils.getCheckOutTime(bookingRequestEntry.getEndDate());
        return new ResponseEntity<>( billingEvaluatorFactory.getBillingType( startDate.getTime(), endDate.getTime()), HttpStatus.OK);
    }
}
