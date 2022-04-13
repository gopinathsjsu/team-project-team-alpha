package com.booking.alpha.controller;

import com.booking.alpha.entry.HotelEntry;
import com.booking.alpha.entry.LoginEntry;
import com.booking.alpha.entry.UserEntry;
import com.booking.alpha.service.UserService;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserEntry> create(@RequestBody UserEntry userEntry) {
        UserEntry newUserEntry = userService.create(userEntry);
        if(newUserEntry != null){
            return new ResponseEntity<>( newUserEntry, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntry> findOneById(@PathVariable("id") Long id) {
        UserEntry userEntry = userService.findOneById(id);
        if(userEntry != null){
            return new ResponseEntity<>( userEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<UserEntry> uploadImage(@PathVariable("id") Long id, @RequestBody MultipartFile file){
        UserEntry userEntry = userService.uploadImage(file,id);
        if(userEntry != null){
            return new ResponseEntity<>( userEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<UserEntry> loginUser(@RequestBody LoginEntry loginEntry){
        UserEntry userEntry = userService.userLogin(loginEntry);
        if(userEntry != null){
            return new ResponseEntity<>( userEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntry> updateRewards(@PathVariable("id") Long id, @RequestParam("rewards") Long reward){
        UserEntry userEntry = userService.updateRewards(reward, id);
        if(userEntry != null){
            return new ResponseEntity<>( userEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        Boolean deleted = userService.deleteUser(id);
        if(deleted){
            return new ResponseEntity<>( "User with id: " + id + " deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PutMapping("/{id}/update")
    public ResponseEntity<UserEntry> updateUser(@PathVariable("id") Long id, @RequestBody UserEntry userEntry){
        UserEntry updatedUserEntry = userService.updateUser(id, userEntry);
        if(updatedUserEntry != null){
            return new ResponseEntity<>( updatedUserEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<UserEntry> updateUserPassword(@PathVariable("id") Long id, @RequestBody LoginEntry loginEntry){
        UserEntry updatedUserEntry = userService.updatePassword(id, loginEntry);
        if(updatedUserEntry != null){
            return new ResponseEntity<>( updatedUserEntry, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
