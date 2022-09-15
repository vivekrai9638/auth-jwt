package com.tweetapp.app.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("tweets")
public class Tweet {
    @Id
    private String id;
    private String message;

    @CreatedDate
    private LocalDateTime timestamp;

    @DBRef
    private User user;

    @DBRef
    private Set<Tag> tags = new HashSet<>();

    @DBRef
    private List<Tweet> replies;

    @DBRef
    private Set<User> likes;

    private Boolean isThreadInitiator;
}
