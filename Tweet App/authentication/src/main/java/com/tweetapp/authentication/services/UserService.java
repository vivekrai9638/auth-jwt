package com.tweetapp.authentication.services;

import com.tweetapp.authentication.dto.requests.RegisterRequest;
import com.tweetapp.authentication.models.ERole;
import com.tweetapp.authentication.models.Role;
import com.tweetapp.authentication.models.User;
import com.tweetapp.authentication.repositories.RoleRepository;
import com.tweetapp.authentication.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ModelMapper modelMapper;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(RegisterRequest registerRequest) {
        // Create new user's account
        User user = modelMapper.map(registerRequest, User.class);
        user.setPassword(encoder.encode(registerRequest.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        user.setRoles(roles);

        userRepository.save(user);
        return user;
    }


    public boolean existsByUserName(RegisterRequest registerRequest) {
        return userRepository.existsByUserName(registerRequest.getUserName());
    }

    public boolean existsByEmail(RegisterRequest registerRequest) {
        return userRepository.existsByEmail(registerRequest.getEmail());
    }

    public boolean existsByUserName(String username) {
        return userRepository.existsByUserName(username);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public List<User> findByUserName(String username) {
        return userRepository.findAllByUserName(username);
    }

    public void save(User user) {
        userRepository.save(user);
    }
}
