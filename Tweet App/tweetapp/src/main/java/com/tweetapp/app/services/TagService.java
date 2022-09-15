package com.tweetapp.app.services;

import com.tweetapp.app.dto.requests.TagRequest;
import com.tweetapp.app.models.Tag;
import com.tweetapp.app.repositories.TagRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    public Set<Tag> upsertTags(Set<TagRequest> tagRequests, Set<Tag> tags){
        for (var tagRequest : tagRequests) {
            if(tagRepository.existsByName(tagRequest.getName()))
            {
                Tag tag = tagRepository.findByName(tagRequest.getName());
                tags.add(tag);
            }else{
                Tag tag = modelMapper.map(tagRequest,Tag.class);
                tagRepository.save(tag);
                tags.add(tag);
            }
        }
        return tags;
    }

}
