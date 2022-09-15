package com.tweetapp.app.controllers;


import com.tweetapp.app.dto.requests.TweetRequest;
import com.tweetapp.app.models.Tweet;
import com.tweetapp.app.services.TweetService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1.0/tweets")
@Tag(name = "Tweet")
public class TweetController {

    @Autowired
    TweetService tweetService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllTweets() {
            return ResponseEntity.ok(tweetService.getAll());
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getAllTweetsOfUser(@PathVariable String username) {
        return ResponseEntity.ok(tweetService.getAllByUserName(username));
    }

    @PostMapping("/{username}/add")
    public ResponseEntity<?> postTweet(@PathVariable String username, @Valid @RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetService.addTweet(username, tweetRequest));
    }

    @PutMapping("/{username}/update/{id}")
    public void updateTweet(@PathVariable String username, @PathVariable String id, @Valid @RequestBody TweetRequest tweetRequest) {
        tweetService.updateTweet(id, username, tweetRequest);
    }

    @DeleteMapping("/{username}/delete/{id}")
    public void deleteTweet(@PathVariable String username, @PathVariable String id) {
        tweetService.deleteTweet(id);
    }

    @PostMapping("/{username}/like/{id}")
    public Tweet likeTweet(@PathVariable String username, @PathVariable String id) {
        return tweetService.likeTweet(id, username);
    }

    @PostMapping("/{username}/reply/{id}")
    public Tweet replyTweet(@PathVariable String username, @PathVariable String id, @Valid @RequestBody TweetRequest tweetRequest) {
        return tweetService.replyTweet(id, username, tweetRequest);
    }

}
