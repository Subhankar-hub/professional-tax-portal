package io.example.professionaltaxportal.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OTPService {

    private final Map<String, OTPData> otpStore = new ConcurrentHashMap<>();
    private final Random random = new Random();
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${otp.sms.api.url:}")
    private String smsApiUrl;

    @Value("${otp.sms.api.key:}")
    private String smsApiKey;

    @Value("${otp.email.api.url:}")
    private String emailApiUrl;

    @Value("${otp.email.api.key:}")
    private String emailApiKey;

    private static class OTPData {
        String otp;
        LocalDateTime timestamp;

        OTPData(String otp, LocalDateTime timestamp) {
            this.otp = otp;
            this.timestamp = timestamp;
        }

        boolean isExpired() {
            return ChronoUnit.MINUTES.between(timestamp, LocalDateTime.now()) > 5;
        }
    }

    public boolean sendOTP(String mobile, String email, String method) {
        try {
            String otp = generateOTP();
            String key = "mobile".equals(method) ? mobile : email;

            // Store OTP with timestamp
            otpStore.put(key, new OTPData(otp, LocalDateTime.now()));

            // Simulate sending OTP (in real implementation, integrate with SMS/Email service)
            if ("mobile".equals(method)) {
                System.out.println("Sending OTP " + otp + " to mobile: " + mobile);
                sendSMS(mobile, otp);
                // Integrate with SMS service like Twilio, AWS SNS, etc.
            } else {
                System.out.println("Sending OTP " + otp + " to email: " + email);
                sendEmail(email, otp);
                // Integrate with email service like SendGrid, AWS SES, etc.
            }

            return true;
        } catch (Exception e) {
            System.err.println("Error sending OTP: " + e.getMessage());
            return false;
        }
    }

    public boolean verifyOTP(String mobile, String email, String inputOtp, String method) {
        try {
            String key = "mobile".equals(method) ? mobile : email;
            OTPData otpData = otpStore.get(key);

            if (otpData == null) {
                return false; // No OTP found
            }

            if (otpData.isExpired()) {
                otpStore.remove(key); // Remove expired OTP
                return false;
            }

            boolean isValid = otpData.otp.equals(inputOtp);
            if (isValid) {
                otpStore.remove(key); // Remove OTP after successful verification
            }

            return isValid;
        } catch (Exception e) {
            System.err.println("Error verifying OTP: " + e.getMessage());
            return false;
        }
    }

    private String generateOTP() {
        return String.format("%06d", random.nextInt(1000000));
    }


    private void sendSMS(String mobile, String otp) {
        if (smsApiUrl == null || smsApiUrl.isEmpty()) {
            System.out.println("SMS API URL is not configured. OTP: " + otp + " not sent to mobile: " + mobile);
            return;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("apiKey", smsApiKey);
            requestBody.put("mobile", mobile);
            requestBody.put("otp", otp);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

            String response = restTemplate.postForObject(smsApiUrl, entity, String.class);
            System.out.println("SMS API Response: " + response);

        } catch (Exception e) {
            System.err.println("Error sending SMS: " + e.getMessage());
        }
    }

    private void sendEmail(String email, String otp) {
        if (emailApiUrl == null || emailApiUrl.isEmpty()) {
            System.out.println("Email API URL is not configured. OTP: " + otp + " not sent to email: " + email);
            return;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("apiKey", emailApiKey);
            requestBody.put("email", email);
            requestBody.put("otp", otp);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

            String response = restTemplate.postForObject(emailApiUrl, entity, String.class);
            System.out.println("Email API Response: " + response);

        } catch (Exception e) {
            System.err.println("Error sending Email: " + e.getMessage());
        }
    }
}