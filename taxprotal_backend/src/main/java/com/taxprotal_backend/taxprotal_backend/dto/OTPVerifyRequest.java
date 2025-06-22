package com.taxprotal_backend.taxprotal_backend.dto;

import lombok.Data;

@Data
public class OTPVerifyRequest {
    private String mobile;
    private String otp;
}
