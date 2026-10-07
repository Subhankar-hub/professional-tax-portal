
// package io.example.professionaltaxportal.dto;

// import lombok.Data;
// import lombok.NoArgsConstructor;
// import lombok.AllArgsConstructor;
// import jakarta.validation.constraints.*;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class EnrolmentDetailsDTO {

//     private String applicationId;

//     @NotBlank(message = "Name is required")
//     @Size(max = 100, message = "Name must not exceed 100 characters")
//     private String name;

//     @NotBlank(message = "Gender is required")
//     @Pattern(regexp = "[MF]", message = "Gender must be M or F")
//     private String gender;

//     @Size(max = 100, message = "Father name must not exceed 100 characters")
//     private String fatherName;

//     @NotBlank(message = "Mobile number is required")
//     @Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
//     private String mobile;

//     @NotBlank(message = "Email is required")
//     @Email(message = "Invalid email format")
//     @Size(max = 100, message = "Email must not exceed 100 characters")
//     private String email;

//     @Size(max = 200, message = "Business name must not exceed 200 characters")
//     private String businessName;

//     @Size(max = 100, message = "Address must not exceed 100 characters")
//     private String addressText;

//     private Integer districtLgdCode;

//     @Pattern(regexp = "\\d{6}", message = "Pincode must be 6 digits")
//     private String pincode;

//     private Integer ptaxCategory;
//     private Integer ptaxSubcategory;

//     private Boolean engagedWithProfession;
//     private Boolean engagedWithTrade;
//     private Boolean engagedWithCalling;
//     private Boolean engagedWithEmployment;

//     @Pattern(regexp = "[A-Z]{5}\\d{4}[A-Z]", message = "Invalid PAN format")
//     private String pan;

//     private Boolean applyingAsIndividual;

//     // Establishment details
//     private String establishment1Name;
//     private String establishment1Address;
//     private String establishment2Name;
//     private String establishment2Address;
//     private String establishment3Name;
//     private String establishment3Address;
//     private String establishment4Name;
//     private String establishment4Address;
//     private String establishment5Name;
//     private String establishment5Address;
// }


package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrolmentDetailsDTO {

    private String applicationId;

    @NotBlank(message = "Application type is required")
    private String applicationType;

    // Individual fields
    private String firstName;
    private String middleName;
    private String lastName;
    private String fatherName;
    private LocalDate dateOfBirth;
    private String gender;
    private String mobile;
    private String email;

    // Business fields
    private String businessName;
    private String businessType;
    private String businessMobile;
    private String businessEmail;
    private String contactPersonName;

    // Address fields
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String district;
    private String state;
    private String pincode;

    // Professional Tax Details
    private Integer ptaxCategory;
    private Integer ptaxSubcategory;
    private Boolean engagedWithProfession;
    private Boolean engagedWithTrade;
    private Boolean engagedWithCalling;
    private Boolean engagedWithEmployment;

    // Other fields
    private String panNumber;
    private String aadharNumber;
    private String gstNumber;
    private Boolean applyingAsIndividual;
    private Boolean status;
    private String docType;
    private String cancellationExplanation;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}