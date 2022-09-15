package com.tweetapp.app;

import com.tweetapp.app.models.Role;
import com.tweetapp.app.models.User;
import com.tweetapp.app.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import static org.mockito.Mockito.when;

@AutoConfigureMockMvc
@SpringBootTest
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    @WithMockUser(username="spring")
    public void shouldReturnAllUsersForUnauthenticatedUsers() throws Exception {
        Set<Role> roles = new HashSet<>();
        when(userService.getAll())
                .thenReturn(List.of(new User("", "", "", "duke@spring.io", "", "duke", "", "", roles)));

        this.mockMvc
                .perform(MockMvcRequestBuilders.get("/api/v1.0/tweets/users/all"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].userName").value("duke"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].email").value("duke@spring.io"));
    }
}
