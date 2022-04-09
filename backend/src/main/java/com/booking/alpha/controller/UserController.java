package com.booking.alpha.controller;

import com.booking.alpha.entry.UserEntry;
import com.booking.alpha.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<UserEntry> create(@RequestBody UserEntry userEntry) {
        return new ResponseEntity<>( userService.create(userEntry), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntry> findOneById(@PathVariable("id") Long id) {
        return new ResponseEntity<>( userService.findOneById(id), HttpStatus.OK);
    }
}
