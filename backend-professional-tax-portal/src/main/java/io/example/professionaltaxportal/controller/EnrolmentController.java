package io.example.professionaltaxportal.controller;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.dto.EnrolmentSubmissionDTO;
import io.example.professionaltaxportal.service.EnrolmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://0.0.0.0:3000", "https://*.replit.dev"})
public class EnrolmentController {

    private final EnrolmentService enrolmentService;

    @PostMapping("/enrolment")
    public ResponseEntity<ApiResponse<String>> submitEnrolment(@Valid @RequestBody EnrolmentSubmissionDTO request) {
        ApiResponse<String> response = enrolmentService.submitEnrolment(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/enrolment/{applicationId}")
    public ResponseEntity<ApiResponse<Object>> getEnrolment(@PathVariable String applicationId) {
        ApiResponse<Object> response = enrolmentService.getEnrolmentByApplicationId(applicationId);
        return ResponseEntity.ok(response);
    }
}