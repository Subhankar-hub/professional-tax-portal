package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDetailsDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @NotBlank(message = "Gender is required")
    @Pattern(regexp = "[MF]", message = "Gender must be M or F")
    private String gender;

    @Size(max = 100, message = "Father name cannot exceed 100 characters")
    private String fatherName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
    private String mobile;

    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    @Size(max = 200, message = "Business name cannot exceed 200 characters")
    private String businessName;

    @Size(max = 100, message = "Address cannot exceed 100 characters")
    private String addressText;

    private Integer districtLgdCode;

    @Size(max = 6, message = "Pincode must be 6 digits")
    @Pattern(regexp = "\\d{6}", message = "Pincode must be 6 digits")
    private String pincode;

    @Size(max = 10, message = "PAN must be 10 characters")
    @Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}", message = "Invalid PAN format")
    private String pan;

    private Boolean applyingAsIndividual;

    private String jurisdictionCode;
    private String chargeCode;
}