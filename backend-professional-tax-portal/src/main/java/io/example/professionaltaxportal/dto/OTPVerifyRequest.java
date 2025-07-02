package io.example.professionaltaxportal.dto;

public class OTPVerifyRequest {
    private String mobile;
    private String email;
    private String otp;
    private String method; // "mobile" or "email"

    // Constructors
    public OTPVerifyRequest() {}

    public OTPVerifyRequest(String mobile, String email, String otp, String method) {
        this.mobile = mobile;
        this.email = email;
        this.otp = otp;
        this.method = method;
    }

    // Getters and Setters
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}