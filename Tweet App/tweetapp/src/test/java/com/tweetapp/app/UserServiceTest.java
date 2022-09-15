package com.tweetapp.app;

import com.tweetapp.app.models.Role;
import com.tweetapp.app.models.User;
import com.tweetapp.app.repositories.UserRepository;
import com.tweetapp.app.services.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@DataMongoTest(excludeAutoConfiguration= {EmbeddedMongoAutoConfiguration.class})
public class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void getAllUsers() {
        Set<Role> roles = new HashSet<>();
        User userSample = new User("", "", "", "", "", "", "", "", roles);
        userRepository.save(userSample);
        UserService toDoService = new UserService(userRepository);

        List<User> userList = toDoService.getAll();
        User lastUser = userList.get(userList.size() - 1);

        assertEquals(userSample.getUserName(), lastUser.getUserName());
        assertEquals(userSample.getEmail(), lastUser.getEmail());
        assertEquals(userSample.getId(), lastUser.getId());
    }

    @Test
    void saveAToDo() {
        UserService userService = new UserService(userRepository);
        Set<Role> roles = new HashSet<>();
        User userSample = new User("", "", "", "", "", "", "", "", roles);
        userService.save(userSample);
        assertEquals(1.0, userRepository.count());
    }
}
