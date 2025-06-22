package com.taxprotal_backend.taxprotal_backend.dto;

import lombok.Data;

@Data
public class EnrolmentRequest {
    private boolean applyingAsIndividual;
    private String name;
    private String pan;
    private String mobile;
    private String email;
}
