
package io.example.professionaltaxportal.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

public class EnrolmentRequestDTO {
    
    // Personal Details
    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;
    
    @Pattern(regexp = "[MF]", message = "Gender must be M or F")
    private String gender;
    
    @Size(max = 100)
    private String fatherName;
    
    @Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
    private String mobile;
    
    @Email(message = "Invalid email format")
    @Size(max = 100)
    private String email;
    
    @Pattern(regexp = "[A-Z]{5}\\d{4}[A-Z]", message = "Invalid PAN format")
    private String pan;
    
    // Address Details
    @Size(max = 100)
    private String addressText;
    
    private Integer subdistrictLgdCode;
    private Integer districtLgdCode;
    
    @Pattern(regexp = "\\d{6}", message = "Pincode must be 6 digits")
    private String pincode;
    
    // Business Details
    @Size(max = 200)
    private String businessName;
    
    @Size(max = 3)
    private String jurisdictionCode;
    
    @Size(max = 4)
    private String chargeCode;
    
    // Engagement Details
    private Boolean engagedWithProfession = false;
    private Boolean engagedWithTrade = false;
    private Boolean engagedWithCalling = false;
    private Boolean engagedWithEmployment = false;
    
    // Tax Category
    private Integer ptaxCategory;
    private Integer ptaxSubcategory;
    
    // Establishment Details
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
    
    // Application Type
    private Boolean applyingAsIndividual = true;
    
    // Employment Details (if applicable)
    private LocalDate commencementDate;
    private String periodOfStanding;
    private String vatNumber;
    private String cstNumber;
    private String gstNumber;
    private String employerName;
    private String employerAddress;
    private BigDecimal monthlySalary;
    private Boolean engagedWithMultipleEmployer = false;
    
    // Default constructor
    public EnrolmentRequestDTO() {}
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }
    
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPan() { return pan; }
    public void setPan(String pan) { this.pan = pan; }
    
    public String getAddressText() { return addressText; }
    public void setAddressText(String addressText) { this.addressText = addressText; }
    
    public Integer getSubdistrictLgdCode() { return subdistrictLgdCode; }
    public void setSubdistrictLgdCode(Integer subdistrictLgdCode) { this.subdistrictLgdCode = subdistrictLgdCode; }
    
    public Integer getDistrictLgdCode() { return districtLgdCode; }
    public void setDistrictLgdCode(Integer districtLgdCode) { this.districtLgdCode = districtLgdCode; }
    
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    
    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }
    
    public String getJurisdictionCode() { return jurisdictionCode; }
    public void setJurisdictionCode(String jurisdictionCode) { this.jurisdictionCode = jurisdictionCode; }
    
    public String getChargeCode() { return chargeCode; }
    public void setChargeCode(String chargeCode) { this.chargeCode = chargeCode; }
    
    public Boolean getEngagedWithProfession() { return engagedWithProfession; }
    public void setEngagedWithProfession(Boolean engagedWithProfession) { this.engagedWithProfession = engagedWithProfession; }
    
    public Boolean getEngagedWithTrade() { return engagedWithTrade; }
    public void setEngagedWithTrade(Boolean engagedWithTrade) { this.engagedWithTrade = engagedWithTrade; }
    
    public Boolean getEngagedWithCalling() { return engagedWithCalling; }
    public void setEngagedWithCalling(Boolean engagedWithCalling) { this.engagedWithCalling = engagedWithCalling; }
    
    public Boolean getEngagedWithEmployment() { return engagedWithEmployment; }
    public void setEngagedWithEmployment(Boolean engagedWithEmployment) { this.engagedWithEmployment = engagedWithEmployment; }
    
    public Integer getPtaxCategory() { return ptaxCategory; }
    public void setPtaxCategory(Integer ptaxCategory) { this.ptaxCategory = ptaxCategory; }
    
    public Integer getPtaxSubcategory() { return ptaxSubcategory; }
    public void setPtaxSubcategory(Integer ptaxSubcategory) { this.ptaxSubcategory = ptaxSubcategory; }
    
    public String getEstablishment1Name() { return establishment1Name; }
    public void setEstablishment1Name(String establishment1Name) { this.establishment1Name = establishment1Name; }
    
    public String getEstablishment1Address() { return establishment1Address; }
    public void setEstablishment1Address(String establishment1Address) { this.establishment1Address = establishment1Address; }
    
    public String getEstablishment2Name() { return establishment2Name; }
    public void setEstablishment2Name(String establishment2Name) { this.establishment2Name = establishment2Name; }
    
    public String getEstablishment2Address() { return establishment2Address; }
    public void setEstablishment2Address(String establishment2Address) { this.establishment2Address = establishment2Address; }
    
    public String getEstablishment3Name() { return establishment3Name; }
    public void setEstablishment3Name(String establishment3Name) { this.establishment3Name = establishment3Name; }
    
    public String getEstablishment3Address() { return establishment3Address; }
    public void setEstablishment3Address(String establishment3Address) { this.establishment3Address = establishment3Address; }
    
    public String getEstablishment4Name() { return establishment4Name; }
    public void setEstablishment4Name(String establishment4Name) { this.establishment4Name = establishment4Name; }
    
    public String getEstablishment4Address() { return establishment4Address; }
    public void setEstablishment4Address(String establishment4Address) { this.establishment4Address = establishment4Address; }
    
    public String getEstablishment5Name() { return establishment5Name; }
    public void setEstablishment5Name(String establishment5Name) { this.establishment5Name = establishment5Name; }
    
    public String getEstablishment5Address() { return establishment5Address; }
    public void setEstablishment5Address(String establishment5Address) { this.establishment5Address = establishment5Address; }
    
    public Boolean getApplyingAsIndividual() { return applyingAsIndividual; }
    public void setApplyingAsIndividual(Boolean applyingAsIndividual) { this.applyingAsIndividual = applyingAsIndividual; }
    
    public LocalDate getCommencementDate() { return commencementDate; }
    public void setCommencementDate(LocalDate commencementDate) { this.commencementDate = commencementDate; }
    
    public String getPeriodOfStanding() { return periodOfStanding; }
    public void setPeriodOfStanding(String periodOfStanding) { this.periodOfStanding = periodOfStanding; }
    
    public String getVatNumber() { return vatNumber; }
    public void setVatNumber(String vatNumber) { this.vatNumber = vatNumber; }
    
    public String getCstNumber() { return cstNumber; }
    public void setCstNumber(String cstNumber) { this.cstNumber = cstNumber; }
    
    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }
    
    public String getEmployerName() { return employerName; }
    public void setEmployerName(String employerName) { this.employerName = employerName; }
    
    public String getEmployerAddress() { return employerAddress; }
    public void setEmployerAddress(String employerAddress) { this.employerAddress = employerAddress; }
    
    public BigDecimal getMonthlySalary() { return monthlySalary; }
    public void setMonthlySalary(BigDecimal monthlySalary) { this.monthlySalary = monthlySalary; }
    
    public Boolean getEngagedWithMultipleEmployer() { return engagedWithMultipleEmployer; }
    public void setEngagedWithMultipleEmployer(Boolean engagedWithMultipleEmployer) { this.engagedWithMultipleEmployer = engagedWithMultipleEmployer; }
}
