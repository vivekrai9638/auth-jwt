package com.tweetapp.app.dto.requests;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
public class TweetRequest {
    @NotBlank
    private String message;
    private Set<TagRequest> tags;
}
