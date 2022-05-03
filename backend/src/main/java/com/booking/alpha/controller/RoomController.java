package com.booking.alpha.controller;


import com.booking.alpha.constant.RoomType;
import com.booking.alpha.entity.RoomEntity;
import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.RoomEntry;
import com.booking.alpha.entry.RoomSearchPagedRequest;
import com.booking.alpha.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequestMapping("/v1/room")
@RestController
public class RoomController {


    @Autowired
    RoomService roomService;

    @GetMapping("/type")
    public ResponseEntity<List<RoomType>> getType() {
        return new ResponseEntity<>(Arrays.asList(RoomType.values()), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<RoomEntry> addRoom(@RequestBody RoomEntry roomEntry) {
        RoomEntry newRoomEntry = roomService.addRoom(roomEntry);
        return new ResponseEntity<>( newRoomEntry, HttpStatus.CREATED);
    }

    @GetMapping("/{hotel_id}")
    public  ResponseEntity<List<RoomEntity>> getAllRoomsOfAHotel(@PathVariable("hotel_id") Long hotel_id){
        List<RoomEntity> rooms = roomService.getAllRoomsOfAHotel(hotel_id);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping("/get-available-rooms")
    public ResponseEntity<List<RoomEntry>> getRoomsAvailable(@RequestBody RoomSearchPagedRequest roomSearchPagedRequest) throws ParseException {
        return new ResponseEntity<>( roomService.findAllAvailable(roomSearchPagedRequest), HttpStatus.OK);
    }
}
