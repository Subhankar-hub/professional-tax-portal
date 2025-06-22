package com.taxprotal_backend.taxprotal_backend.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class Fast2SMSService {

    @Value("${fast2sms.api.key}")
    private String apiKey;

    public void sendOtp(String mobile, String otp) {
        String url = "https://www.fast2sms.com/dev/bulkV2";

        HttpHeaders headers = new HttpHeaders();
        headers.set("authorization", apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("route", "q");
        body.put("message", "Your OTP is: " + otp);
        body.put("language", "english");
        body.put("flash", "0");
        body.put("numbers", mobile);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForEntity(url, request, String.class);
    }
}
