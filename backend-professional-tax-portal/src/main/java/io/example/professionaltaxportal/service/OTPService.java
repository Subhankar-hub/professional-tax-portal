package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class OTPService {
    
    private final Fast2SMSService fast2SMSService;
    
    @Value("${app.otp.development-mode:true}")
    private boolean developmentMode;
    
    // In-memory storage for demo purposes
    // In production, use Redis or database
    private final Map<String, OTPData> otpStorage = new ConcurrentHashMap<>();
    
    private static class OTPData {
        private final String otp;
        private final LocalDateTime expiryTime;
        private int attempts;
        
        public OTPData(String otp, LocalDateTime expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
            this.attempts = 0;
        }
        
        public boolean isExpired() {
            return LocalDateTime.now().isAfter(expiryTime);
        }
        
        public boolean isValid(String inputOtp) {
            return !isExpired() && attempts < 3 && otp.equals(inputOtp);
        }
        
        public void incrementAttempts() {
            attempts++;
        }
        
        public String getOtp() { return otp; }
        public int getAttempts() { return attempts; }
    }
    
    public ApiResponse<String> sendOTP(String mobile) {
        return sendOTP(mobile, "mobile");
    }
    
    public ApiResponse<String> sendOTP(String mobile, String type) {
        try {
            // Generate 6-digit OTP (for development mode, use fixed OTP for testing)
            String otp;
            if (developmentMode) {
                otp = "123456"; // Fixed OTP for development
            } else {
                otp = String.format("%06d", new Random().nextInt(999999));
            }
            
            // Set expiry time to 5 minutes from now
            LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5);
            
            // Create storage key with type to differentiate mobile and final OTPs
            String storageKey = mobile + "_" + (type != null ? type : "mobile");
            
            // Store OTP
            otpStorage.put(storageKey, new OTPData(otp, expiryTime));
            
            // Integrate with SMS service provider
            boolean smsSent = true;
            if (!developmentMode) {
                smsSent = fast2SMSService.sendOtp(mobile, otp);
                if (!smsSent) {
                    log.error("Failed to send OTP via SMS service provider");
                    return ApiResponse.error("Failed to send OTP. Please try again.");
                }
                log.info("OTP successfully sent to mobile {} for type {}", mobile, type);
            } else {
                log.info("Development mode: OTP {} generated for mobile {} (type: {}) (not sent via SMS)", otp, mobile, type);
            }
            
            return ApiResponse.success("OTP sent successfully", "OTP sent to " + maskMobile(mobile));
            
        } catch (Exception e) {
            log.error("Error sending OTP to {} (type {}): {}", mobile, type, e.getMessage());
            return ApiResponse.error("Failed to send OTP. Please try again.");
        }
    }
    
    public ApiResponse<String> verifyOTP(String mobile, String inputOtp) {
        return verifyOTP(mobile, inputOtp, "mobile");
    }
    
    public ApiResponse<String> verifyOTP(String mobile, String inputOtp, String type) {
        try {
            // Create storage key with type to match the key used during sendOTP
            String storageKey = mobile + "_" + (type != null ? type : "mobile");
            OTPData otpData = otpStorage.get(storageKey);
            
            if (otpData == null) {
                return ApiResponse.error("No OTP found for this mobile number. Please request a new OTP.");
            }
            
            if (otpData.isExpired()) {
                otpStorage.remove(storageKey);
                return ApiResponse.error("OTP has expired. Please request a new OTP.");
            }
            
            otpData.incrementAttempts();
            
            if (otpData.getAttempts() > 3) {
                otpStorage.remove(storageKey);
                return ApiResponse.error("Too many failed attempts. Please request a new OTP.");
            }
            
            if (otpData.isValid(inputOtp)) {
                otpStorage.remove(storageKey); // Remove OTP after successful verification
                log.info("OTP verification successful for mobile {} (type: {})", mobile, type);
                return ApiResponse.success("OTP verified successfully", mobile);
            } else {
                return ApiResponse.error("Invalid OTP. Please try again.");
            }
            
        } catch (Exception e) {
            log.error("Error verifying OTP for {} (type {}): {}", mobile, type, e.getMessage());
            return ApiResponse.error("Failed to verify OTP. Please try again.");
        }
    }
    
    private String maskMobile(String mobile) {
        if (mobile.length() >= 10) {
            return mobile.substring(0, 6) + "****";
        }
        return mobile;
    }
    
    // Method to check if mobile is verified (can be used in other services)
    public boolean isMobileVerified(String mobile) {
        // In production, maintain a separate verified mobiles store
        // For demo, we'll assume verified if OTP was recently successful
        return !otpStorage.containsKey(mobile);
    }
}
