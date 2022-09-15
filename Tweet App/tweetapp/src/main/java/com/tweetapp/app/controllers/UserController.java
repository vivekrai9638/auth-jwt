package com.tweetapp.app.controllers;

import com.tweetapp.app.services.TweetService;
import com.tweetapp.app.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1.0/tweets")
@Tag(name = "User")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/users/search/{username}")
    public ResponseEntity<?> searchUserByUserName(@PathVariable String username) {
        return ResponseEntity.ok(userService.findAllByUserName(username));
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<?> getUserByUserName(@PathVariable String username) {
        return ResponseEntity.ok(userService.findByUserName(username));
    }
}
