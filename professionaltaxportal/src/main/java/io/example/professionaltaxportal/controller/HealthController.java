
package io.example.professionaltaxportal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "http://localhost:3000")
public class HealthController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Professional Tax Portal API is running");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
}
// This HealthController provides a simple health check endpoint that returns the status of the Professional Tax Portal API.`