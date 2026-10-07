package io.example.professionaltaxportal.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class Fast2SMSService {

    @Value("${fast2sms.api.key}")
    private String apiKey;

    @Value("${fast2sms.api.url:https://www.fast2sms.com/dev/bulkV2}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public Fast2SMSService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Send OTP using Fast2SMS API - Deployment mode
     * Uses POST request with JSON body as required for deployment
     */
    public boolean sendOtp(String mobile, String otp) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("authorization", apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("route", "otp");
            requestBody.put("variables_values", otp);
            requestBody.put("numbers", mobile);
            requestBody.put("flash", "0");

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            log.info("Sending OTP to mobile: {} using deployment mode", mobile);

            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);
            
            log.info("Fast2SMS response status: {}, body: {}", response.getStatusCode(), response.getBody());
            
            // Check if response indicates success
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                return Boolean.TRUE.equals(responseBody.get("return"));
            }
            
            return false;
            
        } catch (Exception e) {
            log.error("Error sending OTP via Fast2SMS to mobile {}: {}", mobile, e.getMessage());
            return false;
        }
    }

    /**
     * Send custom message using Fast2SMS API - Deployment mode
     */
    public boolean sendCustomMessage(String mobile, String message) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("authorization", apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("route", "q");
            requestBody.put("message", message);
            requestBody.put("language", "english");
            requestBody.put("numbers", mobile);
            requestBody.put("flash", "0");

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            log.info("Sending custom message to mobile: {} using deployment mode", mobile);

            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);
            
            log.info("Fast2SMS response status: {}, body: {}", response.getStatusCode(), response.getBody());
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                return Boolean.TRUE.equals(responseBody.get("return"));
            }
            
            return false;
            
        } catch (Exception e) {
            log.error("Error sending custom message via Fast2SMS to mobile {}: {}", mobile, e.getMessage());
            return false;
        }
    }
}
