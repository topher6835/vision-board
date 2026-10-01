package app.visionboard;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class HealthControllerTest {
    @Test
    void healthRequiresLaunchToken() {
        var controller = new HealthController("launch-secret");
        assertThat(controller.health(null).getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(controller.health("launch-secret").getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
