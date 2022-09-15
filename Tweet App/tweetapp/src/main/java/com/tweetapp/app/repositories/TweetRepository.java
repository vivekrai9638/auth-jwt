package com.tweetapp.app.repositories;

import com.tweetapp.app.models.Tweet;
import com.tweetapp.app.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetRepository extends MongoRepository<Tweet, String> {
    List<Tweet> findAllByUser(User user);
}
