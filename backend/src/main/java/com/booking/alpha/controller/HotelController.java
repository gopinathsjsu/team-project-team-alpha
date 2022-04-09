package com.booking.alpha.controller;

import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;


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
        return new ResponseEntity<>( hotelService.findOneById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/upload-img")
    public ResponseEntity<Void> uploadImage(@RequestBody MultipartFile file) throws Exception {
        System.out.println(" ACCEPTED Request ");
        return new ResponseEntity<>( HttpStatus.ACCEPTED);
    }
}
