package io.example.professionaltaxportal.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class TempEnrolmentSubmissionDTO {
    
    // Personal Information - minimal validation for temp save
    private String applicantType;
    private String name;
    private String gender;
    private String fatherName;
    private String pan;
    private String mobile;
    private String email;
    
    // Establishment Information
    private String establishmentName;
    private String jurisdictionArea;
    private String charge;
    private String district;
    private String pincode;
    private String establishmentAddress;
    private List<AdditionalEstablishmentDTO> additionalEstablishments;
    private String category;
    private String subcategory;
    
    // Engagement flags
    private Boolean engagedWithProfession;
    private Boolean engagedWithTrade;
    private Boolean engagedWithCalling;
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
