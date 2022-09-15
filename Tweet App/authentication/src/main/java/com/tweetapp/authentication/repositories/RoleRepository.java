package com.tweetapp.authentication.repositories;

import com.tweetapp.authentication.models.ERole;
import com.tweetapp.authentication.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

    Optional<Role> findByName(ERole name);
}
