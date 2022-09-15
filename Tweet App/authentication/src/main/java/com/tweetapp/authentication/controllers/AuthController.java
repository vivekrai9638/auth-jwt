package com.tweetapp.authentication.controllers;

import com.tweetapp.authentication.dto.requests.RegisterRequest;
import com.tweetapp.authentication.dto.responses.JwtResponse;
import com.tweetapp.authentication.dto.responses.MessageResponse;
import com.tweetapp.authentication.models.User;
import com.tweetapp.authentication.security.jwt.JwtUtils;
import com.tweetapp.authentication.security.services.UserDetailsImpl;
import com.tweetapp.authentication.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1.0/tweets")
@Tag(name = "Authentication")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestParam String username, @RequestParam String password) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userService.existsByUserName(registerRequest)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User Name is already taken!"));
        }

        if (userService.existsByEmail(registerRequest)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = userService.registerUser(registerRequest);
        return ResponseEntity.ok(user);
    }


    @GetMapping("/{username}/forgot")
    public ResponseEntity<?> forgotUser(@Valid @PathVariable String username) {
        if (userService.existsByUserName(username)) {
//            User user = userService.registerUser(registerRequest);
            return ResponseEntity.ok(new MessageResponse("You will receive mail in short time"));
        }
        else{
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User Name does not exist!"));
        }
    }
}
