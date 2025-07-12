package io.example.professionaltaxportal.controller;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.service.DatabaseInitializationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://0.0.0.0:3000", "https://*.vercel.app"})
public class AdminController {

    private final DatabaseInitializationService databaseInitializationService;

    @PostMapping("/database/initialize")
    public ResponseEntity<ApiResponse<String>> initializeDatabase() {
        log.info("Manual database initialization requested");
        
        try {
            databaseInitializationService.initializeDatabase();
            return ResponseEntity.ok(ApiResponse.success("Database initialized successfully", null));
        } catch (Exception e) {
            log.error("Error during manual database initialization", e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to initialize database: " + e.getMessage()));
        }
    }

    @PostMapping("/database/reset")
    public ResponseEntity<ApiResponse<String>> resetDatabase() {
        log.info("Manual database reset requested");
        
        try {
            databaseInitializationService.resetDatabase();
            return ResponseEntity.ok(ApiResponse.success("Database reset successfully", null));
        } catch (Exception e) {
            log.error("Error during manual database reset", e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to reset database: " + e.getMessage()));
        }
    }

    @GetMapping("/database/verify")
    public ResponseEntity<ApiResponse<String>> verifyDatabase() {
        log.info("Manual database verification requested");
        
        try {
            databaseInitializationService.verifyDatabaseInitialization();
            return ResponseEntity.ok(ApiResponse.success("Database verification completed successfully", null));
        } catch (Exception e) {
            log.error("Error during database verification", e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to verify database: " + e.getMessage()));
        }
    }

    @GetMapping("/database/status")
    public ResponseEntity<ApiResponse<String>> getDatabaseStatus() {
        log.info("Database status requested");
        
        try {
            databaseInitializationService.verifyDatabaseInitialization();
            return ResponseEntity.ok(ApiResponse.success("Database is properly initialized", null));
        } catch (Exception e) {
            log.warn("Database status check failed", e);
            return ResponseEntity.ok(ApiResponse.error("Database is not properly initialized: " + e.getMessage()));
        }
    }
}
