package com.taxprotal_backend.taxprotal_backend.service;

import com.taxprotal_backend.taxprotal_backend.dto.EnrolmentRequest;
import com.taxprotal_backend.taxprotal_backend.dto.OTPVerifyRequest;
import com.taxprotal_backend.taxprotal_backend.entity.TtblTempApplicantEnrolmentDetails;
import com.taxprotal_backend.taxprotal_backend.repository.TtblTempApplicantEnrolmentDetailsRepository;
import com.taxprotal_backend.taxprotal_backend.util.Fast2SMSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EnrolmentService {
    private final ConcurrentHashMap<String, String> otpStore = new ConcurrentHashMap<>();
    @Autowired
    private Fast2SMSService fast2SMSService;
    @Autowired
    private TtblTempApplicantEnrolmentDetailsRepository repository;

    public ResponseEntity<?> initiateEnrolment(EnrolmentRequest request) {
        if (repository.existsByMobile(request.getMobile())) {
            return ResponseEntity.badRequest().body("Mobile number already registered.");
        }

        TtblTempApplicantEnrolmentDetails applicant = new TtblTempApplicantEnrolmentDetails();
        applicant.setApplicationId(UUID.randomUUID().toString().substring(0, 15));
        applicant.setName(request.getName());
        applicant.setPan(request.getPan());
        applicant.setMobile(request.getMobile());
        applicant.setEmail(request.getEmail());
        applicant.setApplyingAsIndividual(request.isApplyingAsIndividual());
        applicant.setInsertedOn(new Timestamp(System.currentTimeMillis()));
        applicant.setStatus(false);
        repository.save(applicant);

        // Generate OTP and store it
        String otp = String.valueOf((int)(Math.random() * 900000 + 100000)); // 6-digit
        otpStore.put(request.getMobile(), otp);

            // use this after subscritption to send sms
//        fast2SMSService.sendOtp(request.getMobile(), otp);
        // mock sending
        System.out.println("OTP for " + request.getMobile() + " is: " + otp);

        return ResponseEntity.ok("OTP sent to " + request.getMobile());
    }



    public ResponseEntity<?> verifyOTP(OTPVerifyRequest request) {
        String storedOtp = otpStore.get(request.getMobile());
        if (storedOtp == null || !storedOtp.equals(request.getOtp())) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP.");
        }

        TtblTempApplicantEnrolmentDetails applicant = repository
                .findAll()
                .stream()
                .filter(a -> request.getMobile().equals(a.getMobile()))
                .findFirst()
                .orElse(null);

        if (applicant == null) {
            return ResponseEntity.badRequest().body("Mobile number not found.");
        }

        applicant.setStatus(true);
        repository.save(applicant);

        // Invalidate OTP
        otpStore.remove(request.getMobile());

        return ResponseEntity.ok("OTP verified and status updated.");
    }

}
