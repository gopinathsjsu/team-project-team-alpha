package com.booking.alpha.controller;


import com.booking.alpha.constant.RoomType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequestMapping("/v1/room")
@RestController
public class RoomController {

    @GetMapping("/type")
    public ResponseEntity<List<RoomType>> getType() {
        return new ResponseEntity<>(Arrays.asList(RoomType.values()), HttpStatus.OK);
    }
}
