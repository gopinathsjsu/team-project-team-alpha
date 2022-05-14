package com.booking.alpha.controller;

import com.booking.alpha.constant.HotelServiceType;
import com.booking.alpha.entry.*;
import com.booking.alpha.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/v1/hotel")
public class HotelController {

    private final HotelService hotelService;

    public HotelController( HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/all-cities")
    public ResponseEntity<List<String>> getAllCities() {
        return new ResponseEntity<>(hotelService.getAllCities(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelEntry> findOneById( @PathVariable("id") Long id) {
        HotelEntry hotelEntry = hotelService.findOneById(id);
        if(hotelEntry != null){
            return new ResponseEntity<>( hotelEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/register")
    public ResponseEntity<HotelEntry> create(@RequestBody HotelEntry hotelEntry) {
        HotelEntry newHotelEntry = hotelService.create(hotelEntry);
        if(newHotelEntry != null){
            return new ResponseEntity<>( newHotelEntry, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/{id}/upload-image")
    public ResponseEntity<HotelEntry> uploadImage(@PathVariable("id") Long id, @RequestBody MultipartFile file){
        HotelEntry hotelEntry = hotelService.uploadImage(file,id);
        if(hotelEntry != null){
            return new ResponseEntity<>( hotelEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        Boolean deleted = hotelService.deleteHotel(id);
        if(deleted){
            return new ResponseEntity<>( "Hotel with id: " + id + " deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping("/login")
    public ResponseEntity<HotelEntry> loginHotel(@RequestBody LoginEntry loginEntry){
        HotelEntry hotelEntry = hotelService.hotelLogin(loginEntry);
        if(hotelEntry != null){
            return new ResponseEntity<>( hotelEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


    @PutMapping("/{id}/update")
    public ResponseEntity<HotelEntry> updateHotel(@PathVariable("id") Long id, @RequestBody HotelEntry hotelEntry){
        HotelEntry updatedHotelEntry = hotelService.updateHotel(id, hotelEntry);
        if(updatedHotelEntry != null){
            return new ResponseEntity<>( updatedHotelEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PutMapping("/{id}/password")
    public ResponseEntity<HotelEntry> updateHotelPassword(@PathVariable("id") Long id, @RequestBody LoginEntry loginEntry){
        HotelEntry updatedHotelEntry = hotelService.updatePassword(id, loginEntry);
        if(updatedHotelEntry != null){
            return new ResponseEntity<>( updatedHotelEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/get-availability")
    public ResponseEntity<List<HotelAvailabilityEntry>> getAll(@RequestBody HotelSearchPagedRequest hotelSearchPagedRequest) throws ParseException {
        return new ResponseEntity<>( hotelService.find( hotelSearchPagedRequest), HttpStatus.OK);
    }

    @GetMapping("/service-types")
    public ResponseEntity<Set<HotelServiceType>> getHotelServiceTypes() {
        return new ResponseEntity<>(new HashSet<>(Arrays.asList(HotelServiceType.values())), HttpStatus.OK);
    }

    @PostMapping("/get-sql-query")
    public ResponseEntity<String> getSqlQuery(@RequestBody HotelSearchPagedRequest hotelSearchPagedRequest) throws ParseException {
        return new ResponseEntity<>( hotelService.getSqlQuery(hotelSearchPagedRequest), HttpStatus.OK);
    }
}
