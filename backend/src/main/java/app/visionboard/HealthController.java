package app.visionboard;

import java.util.Map;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    private final String appToken;

    public HealthController(@Value("${vision-board.api-token:}") String appToken) {
        this.appToken = appToken;
    }

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, String>> health(@RequestHeader(value = "X-App-Token", required = false) String suppliedToken) {
        if (appToken.isBlank() || !Objects.equals(appToken, suppliedToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status", "unauthorized"));
        }
        return ResponseEntity.ok(Map.of("status", "ok"));
    }
}
