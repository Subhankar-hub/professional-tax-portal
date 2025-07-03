
package io.example.professionaltaxportal.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class EnrolmentSubmissionDTO {
    
    // Personal Information
    @NotBlank(message = "Applicant type is required")
    private String applicantType; // Individual, Others
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @NotBlank(message = "Father's name is required")
    private String fatherName;
    
    @NotBlank(message = "PAN is required")
    @Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}", message = "Invalid PAN format")
    private String pan;
    
    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid mobile number")
    private String mobile;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    // Establishment Information
    @NotBlank(message = "Establishment name is required")
    private String establishmentName;
    
    @NotBlank(message = "Jurisdiction area is required")
    private String jurisdictionArea;
    
    @NotBlank(message = "Charge is required")
    private String charge;
    
    @NotBlank(message = "District is required")
    private String district;
    
    @NotBlank(message = "Pin code is required")
    @Pattern(regexp = "^[1-9][0-9]{5}$", message = "Invalid pin code")
    private String pincode;
    
    @NotBlank(message = "Establishment address is required")
    private String establishmentAddress;
    
    private List<AdditionalEstablishmentDTO> additionalEstablishments;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotBlank(message = "Sub-category is required")
    private String subcategory;
    
    // Engagement flags
    @NotNull(message = "Engagement selection is required")
    private Boolean engagedWithProfession;
    
    @NotNull(message = "Engagement selection is required")
    private Boolean engagedWithTrade;
    
    @NotNull(message = "Engagement selection is required")
    private Boolean engagedWithCalling;
    
    @NotNull(message = "Engagement selection is required")
    private Boolean engagedWithEmployment;
    
    // Professional Details (conditional)
    private LocalDate commencementDate;
    private String periodOfStanding;
    private String panTan;
    private Double annualGrossBusiness;
    private Double annualTurnover;
    private Integer monthlyAvgWorkers;
    private Integer monthlyAvgEmployees;
    
    // Tax registrations
    private Boolean vatRegistered;
    private String vatNumber;
    private Boolean cstRegistered;
    private String cstNumber;
    private Boolean gstRegistered;
    private String gstNumber;
    
    // Vehicle Details
    private Integer taxis;
    private Integer threeWheelers;
    private Integer lightMotorVehicles;
    private Integer goodVehicles;
    private Integer trucks;
    private Integer buses;
    
    // Employment Details
    private String employerName;
    private String employerAddress;
    private Double monthlySalary;
    private Boolean multipleEmployers;
    private List<EmployerDTO> additionalEmployers;
    
    // Co-operative Society
    private Boolean stateLevelSociety;
    private Boolean districtLevelSociety;
    
    // Captcha
    @NotBlank(message = "Captcha is required")
    private String captchaValue;
    
    @Data
    public static class AdditionalEstablishmentDTO {
        private String name;
        private String address;
    }
    
    @Data
    public static class EmployerDTO {
        private String name;
        private String address;
        private Double monthlySalary;
    }
}
