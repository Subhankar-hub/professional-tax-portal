package io.example.professionaltaxportal.controller;

import io.example.professionaltaxportal.dto.OTPRequest;
import io.example.professionaltaxportal.dto.OTPVerifyRequest;
import io.example.professionaltaxportal.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/otp")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class OTPController {

    @Autowired
    private OTPService otpService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendOTP(@RequestBody OTPRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean sent = otpService.sendOTP(request.getMobile(), request.getEmail(), request.getMethod());
            if (sent) {
                response.put("success", true);
                response.put("message", "OTP sent successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Failed to send OTP");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error sending OTP: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyOTP(@RequestBody OTPVerifyRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean verified = otpService.verifyOTP(request.getMobile(), request.getEmail(), 
                                                   request.getOtp(), request.getMethod());
            response.put("verified", verified);
            response.put("message", verified ? "OTP verified successfully" : "Invalid OTP");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("verified", false);
            response.put("message", "Error verifying OTP: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
