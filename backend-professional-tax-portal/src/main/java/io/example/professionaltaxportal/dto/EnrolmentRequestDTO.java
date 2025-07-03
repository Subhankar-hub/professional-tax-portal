
package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrolmentRequestDTO {
    
    // Application Type
    private String applicationType; // "Individual" or "Others"
    
    // Personal Information (for Individual)
    private String name;
    private String fatherName;
    private String gender;
    private String panTan;
    private String mobile;
    private String email;
    
    // Business Information (for Others)
    private String establishmentName;
    private String businessPan;
    private String businessMobile;
    private String businessEmail;
    
    // Establishment Information
    private String businessName;
    private String areaOfJurisdiction;
    private String charge;
    private String district;
    private String pinCode;
    private String establishmentAddress;
    
    // Additional establishments
    private List<EstablishmentDTO> additionalEstablishments;
    
    // Category information
    private Integer category;
    private Integer subcategory;
    
    // Engaged With
    private EngagedWithDTO engagedWith;
    
    // Details based on engagement type
    private ProfessionDetailsDTO professionDetails;
    private TradeDetailsDTO tradeDetails;
    private CallingDetailsDTO callingDetails;
    private EmploymentDetailsDTO employmentDetails;
    
    // Vehicle Details
    private Map<String, VehicleDTO> vehicles;
    
    // Cooperative Society
    private CooperativeSocietyDTO cooperativeSociety;
    
    // Declaration
    private Boolean declaration;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EstablishmentDTO {
        private String name;
        private String address;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EngagedWithDTO {
        private Boolean profession;
        private Boolean trade;
        private Boolean calling;
        private Boolean employment;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProfessionDetailsDTO {
        private LocalDate dateOfCommencement;
        private String periodOfStanding;
        private String panTan;
        private BigDecimal annualGrossBusiness;
        private Integer monthlyAvgWorkers;
        private Integer monthlyAvgEmployees;
        private Boolean registeredUnderVAT;
        private String vatNumber;
        private Boolean registeredUnderCST;
        private String cstNumber;
        private Boolean registeredUnderGST;
        private String gstNumber;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TradeDetailsDTO {
        private LocalDate dateOfCommencement;
        private String periodOfStanding;
        private String panTan;
        private BigDecimal annualGrossBusiness;
        private BigDecimal annualTurnover;
        private Integer monthlyAvgWorkers;
        private Integer monthlyAvgEmployees;
        private Boolean registeredUnderVAT;
        private String vatNumber;
        private Boolean registeredUnderCST;
        private String cstNumber;
        private Boolean registeredUnderGST;
        private String gstNumber;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CallingDetailsDTO {
        private LocalDate dateOfCommencement;
        private String periodOfStanding;
        private String panTan;
        private BigDecimal annualGrossBusiness;
        private Integer monthlyAvgWorkers;
        private Integer monthlyAvgEmployees;
        private Boolean registeredUnderVAT;
        private String vatNumber;
        private Boolean registeredUnderCST;
        private String cstNumber;
        private Boolean registeredUnderGST;
        private String gstNumber;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmploymentDetailsDTO {
        private LocalDate dateOfCommencement;
        private String periodOfStanding;
        private String panTan;
        private Boolean registeredUnderVAT;
        private String vatNumber;
        private Boolean registeredUnderCST;
        private String cstNumber;
        private Boolean registeredUnderGST;
        private String gstNumber;
        private String employerName;
        private String employerAddress;
        private BigDecimal monthlySalary;
        private Boolean simultaneousEmployment;
        private List<EmployerDTO> additionalEmployers;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmployerDTO {
        private String name;
        private String address;
        private BigDecimal salary;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VehicleDTO {
        private Boolean selected;
        private Integer count;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CooperativeSocietyDTO {
        private Boolean stateLevelSociety;
        private Boolean districtLevelSociety;
    }
}
