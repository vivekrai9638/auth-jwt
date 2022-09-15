package com.tweetapp.app;

import com.tweetapp.app.models.Role;
import com.tweetapp.app.models.Tweet;
import com.tweetapp.app.models.User;
import com.tweetapp.app.repositories.TweetRepository;
import com.tweetapp.app.repositories.UserRepository;
import com.tweetapp.app.services.TweetService;
import com.tweetapp.app.services.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class TweetServiceTest {
    @Autowired
    private TweetRepository tweetRepository;

    @AfterEach
    void tearDown() {
        tweetRepository.deleteAll();
    }

    @Test
    void getAllTweets() {
        Tweet tweet = new Tweet();
        tweetRepository.save(tweet);
        TweetService tweetService = new TweetService(tweetRepository);

        List<Tweet> tweetList = tweetService.getAll();
        Tweet lastTweet = tweetList.get(tweetList.size() - 1);

        assertEquals(tweet.getIsThreadInitiator(), lastTweet.getIsThreadInitiator());
        assertEquals(tweet.getUser(), lastTweet.getUser());
        assertEquals(tweet.getId(), lastTweet.getId());
    }

    @Test
    void saveATweet() {
        TweetService tweetService = new TweetService(tweetRepository);
        Tweet tweet = new Tweet();
        tweetRepository.save(tweet);
        assertEquals(1.0, tweetRepository.count());
    }
}
