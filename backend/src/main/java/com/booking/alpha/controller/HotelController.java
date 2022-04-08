package com.booking.alpha.controller;

import com.booking.alpha.utils.S3Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;

@RestController
@RequestMapping("/v1/hotel")
public class HotelController {

    @Autowired
    S3Utils s3Utils;

    @GetMapping("/ok")
    public ResponseEntity<String> get() throws Exception{
        File file = new File("/Users/mayankverma/Semester-2/CMPE-202/photos/hotel-3.jpeg");
        s3Utils.uploadFile("alpha-hotel-images","hotel-1", new FileInputStream(file));
        return new ResponseEntity<>("HelloWorld", HttpStatus.OK);
    }

    @PostMapping(value = "/upload-img")
    public ResponseEntity<Void> uploadImage(@RequestBody MultipartFile file) throws Exception {
        System.out.println(" ACCEPTED Request ");
        return new ResponseEntity<>( HttpStatus.ACCEPTED);
    }
}
