package com.taxprotal_backend.taxprotal_backend.controller;

import com.taxprotal_backend.taxprotal_backend.dto.EnrolmentRequest;
import com.taxprotal_backend.taxprotal_backend.dto.OTPVerifyRequest;
import com.taxprotal_backend.taxprotal_backend.service.EnrolmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrolment")
public class EnrolmentController {

    @Autowired
    private EnrolmentService enrolmentService;

    @PostMapping("/initiate")
    public ResponseEntity<?> initiateEnrolment(@RequestBody EnrolmentRequest request) {
        return enrolmentService.initiateEnrolment(request);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody OTPVerifyRequest request) {
        return enrolmentService.verifyOTP(request);
    }
}
