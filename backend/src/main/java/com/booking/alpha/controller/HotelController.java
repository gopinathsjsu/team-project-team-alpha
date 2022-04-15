package com.booking.alpha.controller;

import com.booking.alpha.entry.*;
import com.booking.alpha.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.List;


@RestController
@RequestMapping("/v1/hotel")
public class HotelController {

    private final HotelService hotelService;

    public HotelController( HotelService hotelService) {
        this.hotelService = hotelService;
    }

//    @Autowired
//    S3Utils s3Utils;

//    @GetMapping("/ok")
//    public ResponseEntity<String> get() throws Exception{
//        File file = new File("/Users/mayankverma/Semester-2/CMPE-202/photos/hotel-3.jpeg");
//        s3Utils.uploadFile("alpha-hotel-images","hotel-1", new FileInputStream(file));
//        return new ResponseEntity<>("HelloWorld", HttpStatus.OK);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelEntry> findOneById( @PathVariable("id") Long id) {
        HotelEntry hotelEntry = hotelService.findOneById(id);
        if(hotelEntry != null){
            return new ResponseEntity<>( hotelEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        //return new ResponseEntity<>( hotelService.findOneById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/upload-img")
    public ResponseEntity<Void> uploadImage(@RequestBody MultipartFile file) throws Exception {
        System.out.println(" ACCEPTED Request ");
        return new ResponseEntity<>( HttpStatus.ACCEPTED);
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
}
