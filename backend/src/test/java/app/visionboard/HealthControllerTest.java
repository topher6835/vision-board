package app.visionboard;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(properties = "vision-board.api-token=test-launch-token")
@AutoConfigureMockMvc
class HealthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void applicationRegistersApiAuthenticationFilter() throws Exception {
        mockMvc.perform(get("/api/health")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/health").header("X-App-Token", "incorrect"))
                .andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/health").header("X-App-Token", "test-launch-token"))
                .andExpect(status().isOk());
    }
}
