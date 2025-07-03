package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrolmentSubmissionDTO {
    
    // Personal Details
    private String name;
    private String gender;
    private String fatherName;
    private String mobile;
    private String email;
    private String pan;

    // Address Details
    private String addressText;
    private Integer districtLgdCode;
    private String pincode;

    // Business Details
    private String businessName;
    private String jurisdictionCode;
    private String chargeCode;

    // Engagement Details
    private Boolean engagedWithProfession;
    private Boolean engagedWithTrade;
    private Boolean engagedWithCalling;
    private Boolean engagedWithEmployment;

    // Tax Category
    private Integer ptaxCategory;
    private Integer ptaxSubcategory;

    // Establishments
    private String establishment1Name;
    private String establishment1Address;
    private String establishment2Name;
    private String establishment2Address;
    private String establishment3Name;
    private String establishment3Address;
    private String establishment4Name;
    private String establishment4Address;
    private String establishment5Name;
    private String establishment5Address;

    // Professional Details
    private String commencementDate;
    private String periodOfStanding;
    private Double annualGrossBusiness;
    private Integer avgWorkersMonthly;
    private Integer avgEmployeesMonthly;
    private String vatNumber;
    private String cstNumber;
    private String gstNumber;
    
    // Vehicle counts
    private Integer taxiCount;
    private Integer threeWheelerCount;
    private Integer lmvCount;
    private Integer goodVehicleCount;
    private Integer truckCount;
    private Integer busCount;
}
