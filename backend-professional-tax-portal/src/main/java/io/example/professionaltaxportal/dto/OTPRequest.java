package io.example.professionaltaxportal.dto;

public class OTPRequest {
    private String mobile;
    private String email;
    private String method; // "mobile" or "email"

    // Constructors
    public OTPRequest() {}

    public OTPRequest(String mobile, String email, String method) {
        this.mobile = mobile;
        this.email = email;
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

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}