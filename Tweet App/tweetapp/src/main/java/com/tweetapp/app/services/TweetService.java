package com.tweetapp.app.services;

import com.tweetapp.app.dto.requests.TweetRequest;
import com.tweetapp.app.models.Tag;
import com.tweetapp.app.models.Tweet;
import com.tweetapp.app.models.User;
import com.tweetapp.app.repositories.TweetRepository;
import com.tweetapp.app.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TweetService {

    @Autowired
    TweetRepository tweetRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagService tagService;

    @Autowired
    ModelMapper modelMapper;

    public TweetService(TweetRepository tweetRepository) {
        this.tweetRepository = tweetRepository;
    }

    public List<Tweet> getAll() {
        return tweetRepository.findAll();
    }

    public List<Tweet> getAllByUserName(String userName) {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userName));
        return tweetRepository.findAllByUser(user);
    }

    public Tweet addTweet(String userName, TweetRequest tweetRequest) {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userName));
        Tweet tweet = new Tweet();
        tweet.setUser(user);
        tweet.setTimestamp(LocalDateTime.now());
        tweet.setMessage(tweetRequest.getMessage());
        tweet.setIsThreadInitiator(true);
        Set<Tag> tags = tagService.upsertTags(tweetRequest.getTags(), tweet.getTags());
        tweet.setTags(tags);

        return tweetRepository.save(tweet);
    }

    public void updateTweet(String tweetId, String userName, TweetRequest tweetRequest) {
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new UsernameNotFoundException("Tweet Not Found with id: " + tweetId));
        tweet.setMessage(tweetRequest.getMessage());

        Set<Tag> tags = tagService.upsertTags(tweetRequest.getTags(), tweet.getTags());
        tweet.setTags(tags);

        tweetRepository.save(tweet);
    }

    public void deleteTweet(String tweetId) {
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new UsernameNotFoundException("Tweet Not Found with id: " + tweetId));
        tweetRepository.delete(tweet);
    }

    public Tweet likeTweet(String tweetId, String userName) {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userName));
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new UsernameNotFoundException("Tweet Not Found with id: " + tweetId));
        Set<User> likes = tweet.getLikes();

        if(likes == null){
            likes = new HashSet<>();
        }

        if(likes.contains(user)){
            likes.remove(user);
        }else{
            likes.add(user);
        }
        tweet.setLikes(likes);
        return tweetRepository.save(tweet);
    }

    public Tweet replyTweet(String tweetId, String userName, TweetRequest tweetRequest) {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userName));
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new UsernameNotFoundException("Tweet Not Found with id: " + tweetId));
        List<Tweet> replies = tweet.getReplies();

        if(replies == null){
            replies = new ArrayList<>();
        }

        Tweet replyTweet = new Tweet();
        replyTweet.setUser(user);
        replyTweet.setTimestamp(LocalDateTime.now());
        replyTweet.setMessage(tweetRequest.getMessage());
        replyTweet.setIsThreadInitiator(false);

        Set<Tag> tags = tagService.upsertTags(tweetRequest.getTags(), replyTweet.getTags());
        replyTweet.setTags(tags);

        tweetRepository.save(replyTweet);

        replies.add(replyTweet);
        tweet.setReplies(replies);

        return tweetRepository.save(tweet);
    }
}
