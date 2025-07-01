
package io.example.professionaltaxportal.entity;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "ttbl_temp_applicant_enrolment_details", schema = "ptax")
public class TempApplicantEnrolmentDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rsn;
    
    @Column(name = "application_id", length = 15)
    private String applicationId;
    
    @Column(name = "ptan", length = 10)
    private String ptan;
    
    @NotBlank(message = "Name is required")
    @Size(max = 100)
    @Column(name = "name", length = 100)
    private String name;
    
    @Pattern(regexp = "[MF]", message = "Gender must be M or F")
    @Column(name = "gender", length = 1)
    private String gender;
    
    @Size(max = 100)
    @Column(name = "father_name", length = 100)
    private String fatherName;
    
    @Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
    @Column(name = "mobile", length = 10)
    private String mobile;
    
    @Email(message = "Invalid email format")
    @Size(max = 100)
    @Column(name = "email", length = 100)
    private String email;
    
    @Size(max = 200)
    @Column(name = "business_name", length = 200)
    private String businessName;
    
    @Size(max = 3)
    @Column(name = "jurisdiction_code", length = 3)
    private String jurisdictionCode;
    
    @Size(max = 4)
    @Column(name = "charge_code", length = 4)
    private String chargeCode;
    
    @Size(max = 100)
    @Column(name = "address_text", length = 100)
    private String addressText;
    
    @Column(name = "subdisctrict_lgd_code")
    private Integer subdistrictLgdCode;
    
    @Column(name = "district_lgd_code")
    private Integer districtLgdCode;
    
    @Pattern(regexp = "\\d{6}", message = "Pincode must be 6 digits")
    @Column(name = "pincode", length = 6)
    private String pincode;
    
    @Column(name = "ptax_category")
    private Integer ptaxCategory;
    
    @Column(name = "ptax_subcategory")
    private Integer ptaxSubcategory;
    
    @Column(name = "engaged_with_profession")
    private Boolean engagedWithProfession;
    
    @Column(name = "engaged_with_trade")
    private Boolean engagedWithTrade;
    
    @Column(name = "engaged_with_calling")
    private Boolean engagedWithCalling;
    
    @Column(name = "engaged_with_employement")
    private Boolean engagedWithEmployment;
    
    @Pattern(regexp = "[A-Z]{5}\\d{4}[A-Z]", message = "Invalid PAN format")
    @Column(name = "pan", length = 10)
    private String pan;
    
    @Column(name = "inserted_on")
    private LocalDateTime insertedOn;
    
    @Column(name = "inserted_by", length = 15)
    private String insertedBy;
    
    @Column(name = "inserted_from_ipv4", length = 15)
    private String insertedFromIpv4;
    
    @Column(name = "welcome_sms_count")
    private Integer welcomeSmsCount;
    
    @Column(name = "welcome_email_count")
    private Integer welcomeEmailCount;
    
    @Size(max = 100)
    @Column(name = "establishment1_name", length = 100)
    private String establishment1Name;
    
    @Size(max = 100)
    @Column(name = "establishment1_address", length = 100)
    private String establishment1Address;
    
    @Size(max = 100)
    @Column(name = "establishment2_name", length = 100)
    private String establishment2Name;
    
    @Size(max = 100)
    @Column(name = "establishment2_address", length = 100)
    private String establishment2Address;
    
    @Size(max = 100)
    @Column(name = "establishment3_name", length = 100)
    private String establishment3Name;
    
    @Size(max = 100)
    @Column(name = "establishment3_address", length = 100)
    private String establishment3Address;
    
    @Size(max = 100)
    @Column(name = "establishment4_name", length = 100)
    private String establishment4Name;
    
    @Size(max = 100)
    @Column(name = "establishment4_address", length = 100)
    private String establishment4Address;
    
    @Size(max = 100)
    @Column(name = "establishment5_name", length = 100)
    private String establishment5Name;
    
    @Size(max = 100)
    @Column(name = "establishment5_address", length = 100)
    private String establishment5Address;
    
    @Column(name = "applying_as_individual")
    private Boolean applyingAsIndividual;
    
    @Column(name = "status")
    private Boolean status;
    
    @Lob
    @Column(name = "doc_content")
    private byte[] docContent;
    
    @Lob
    @Column(name = "doc_content_trade")
    private byte[] docContentTrade;
    
    @Lob
    @Column(name = "doc_content_death")
    private byte[] docContentDeath;
    
    @Column(name = "doc_type", length = 1)
    private String docType;
    
    @Size(max = 500)
    @Column(name = "cancellation_explanation", length = 500)
    private String cancellationExplanation;
    
    // Default constructor
    public TempApplicantEnrolmentDetails() {}
    
    // Getters and Setters
    public Long getRsn() { return rsn; }
    public void setRsn(Long rsn) { this.rsn = rsn; }
    
    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }
    
    public String getPtan() { return ptan; }
    public void setPtan(String ptan) { this.ptan = ptan; }
    
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
    
    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }
    
    public String getJurisdictionCode() { return jurisdictionCode; }
    public void setJurisdictionCode(String jurisdictionCode) { this.jurisdictionCode = jurisdictionCode; }
    
    public String getChargeCode() { return chargeCode; }
    public void setChargeCode(String chargeCode) { this.chargeCode = chargeCode; }
    
    public String getAddressText() { return addressText; }
    public void setAddressText(String addressText) { this.addressText = addressText; }
    
    public Integer getSubdistrictLgdCode() { return subdistrictLgdCode; }
    public void setSubdistrictLgdCode(Integer subdistrictLgdCode) { this.subdistrictLgdCode = subdistrictLgdCode; }
    
    public Integer getDistrictLgdCode() { return districtLgdCode; }
    public void setDistrictLgdCode(Integer districtLgdCode) { this.districtLgdCode = districtLgdCode; }
    
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    
    public Integer getPtaxCategory() { return ptaxCategory; }
    public void setPtaxCategory(Integer ptaxCategory) { this.ptaxCategory = ptaxCategory; }
    
    public Integer getPtaxSubcategory() { return ptaxSubcategory; }
    public void setPtaxSubcategory(Integer ptaxSubcategory) { this.ptaxSubcategory = ptaxSubcategory; }
    
    public Boolean getEngagedWithProfession() { return engagedWithProfession; }
    public void setEngagedWithProfession(Boolean engagedWithProfession) { this.engagedWithProfession = engagedWithProfession; }
    
    public Boolean getEngagedWithTrade() { return engagedWithTrade; }
    public void setEngagedWithTrade(Boolean engagedWithTrade) { this.engagedWithTrade = engagedWithTrade; }
    
    public Boolean getEngagedWithCalling() { return engagedWithCalling; }
    public void setEngagedWithCalling(Boolean engagedWithCalling) { this.engagedWithCalling = engagedWithCalling; }
    
    public Boolean getEngagedWithEmployment() { return engagedWithEmployment; }
    public void setEngagedWithEmployment(Boolean engagedWithEmployment) { this.engagedWithEmployment = engagedWithEmployment; }
    
    public String getPan() { return pan; }
    public void setPan(String pan) { this.pan = pan; }
    
    public LocalDateTime getInsertedOn() { return insertedOn; }
    public void setInsertedOn(LocalDateTime insertedOn) { this.insertedOn = insertedOn; }
    
    public String getInsertedBy() { return insertedBy; }
    public void setInsertedBy(String insertedBy) { this.insertedBy = insertedBy; }
    
    public String getInsertedFromIpv4() { return insertedFromIpv4; }
    public void setInsertedFromIpv4(String insertedFromIpv4) { this.insertedFromIpv4 = insertedFromIpv4; }
    
    public Integer getWelcomeSmsCount() { return welcomeSmsCount; }
    public void setWelcomeSmsCount(Integer welcomeSmsCount) { this.welcomeSmsCount = welcomeSmsCount; }
    
    public Integer getWelcomeEmailCount() { return welcomeEmailCount; }
    public void setWelcomeEmailCount(Integer welcomeEmailCount) { this.welcomeEmailCount = welcomeEmailCount; }
    
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
    
    public Boolean getStatus() { return status; }
    public void setStatus(Boolean status) { this.status = status; }
    
    public byte[] getDocContent() { return docContent; }
    public void setDocContent(byte[] docContent) { this.docContent = docContent; }
    
    public byte[] getDocContentTrade() { return docContentTrade; }
    public void setDocContentTrade(byte[] docContentTrade) { this.docContentTrade = docContentTrade; }
    
    public byte[] getDocContentDeath() { return docContentDeath; }
    public void setDocContentDeath(byte[] docContentDeath) { this.docContentDeath = docContentDeath; }
    
    public String getDocType() { return docType; }
    public void setDocType(String docType) { this.docType = docType; }
    
    public String getCancellationExplanation() { return cancellationExplanation; }
    public void setCancellationExplanation(String cancellationExplanation) { this.cancellationExplanation = cancellationExplanation; }
}
