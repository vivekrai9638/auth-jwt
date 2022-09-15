package com.tweetapp.app.repositories;

import com.tweetapp.app.models.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends MongoRepository<Tag, String> {
    boolean existsByName(String name);

    Tag findByName(String name);
}
