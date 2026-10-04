package app.visionboard;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class ApiTokenFilterTest {
    @Test
    void blankConfiguredTokenFailsClosed() throws Exception {
        var mockMvc = MockMvcBuilders.standaloneSetup(new HealthController())
                .addFilters(new ApiTokenFilter(""))
                .build();

        mockMvc.perform(get("/api/health").header("X-App-Token", "any-token"))
                .andExpect(status().isUnauthorized());
    }
}
