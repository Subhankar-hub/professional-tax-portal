package io.example.professionaltaxportal.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ttbl_temp_applicant_enrolment_details", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TempApplicantEnrolmentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rsn;

    @Column(name = "application_id", length = 15)
    private String applicationId;

    @Column(name = "ptan", length = 10)
    private String ptan;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "father_name", length = 100)
    private String fatherName;

    @Column(name = "mobile", length = 10)
    private String mobile;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "business_name", length = 200)
    private String businessName;

    @Column(name = "jurisdiction_code", length = 3)
    private String jurisdictionCode;

    @Column(name = "charge_code", length = 4)
    private String chargeCode;

    @Column(name = "address_text", length = 100)
    private String addressText;

    @Column(name = "subdisctrict_lgd_code")
    private Integer subdistrictLgdCode;

    @Column(name = "district_lgd_code")
    private Integer districtLgdCode;

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

    @Column(name = "establishment1_name", length = 100)
    private String establishment1Name;

    @Column(name = "establishment1_address", length = 100)
    private String establishment1Address;

    @Column(name = "establishment2_name", length = 100)
    private String establishment2Name;

    @Column(name = "establishment2_address", length = 100)
    private String establishment2Address;

    @Column(name = "establishment3_name", length = 100)
    private String establishment3Name;

    @Column(name = "establishment3_address", length = 100)
    private String establishment3Address;

    @Column(name = "establishment4_name", length = 100)
    private String establishment4Name;

    @Column(name = "establishment4_address", length = 100)
    private String establishment4Address;

    @Column(name = "establishment5_name", length = 100)
    private String establishment5Name;

    @Column(name = "establishment5_address", length = 100)
    private String establishment5Address;

    @Column(name = "applying_as_individual")
    private Boolean applyingAsIndividual;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "doc_content")
    private byte[] docContent;

    @Column(name = "doc_content_trade")
    private byte[] docContentTrade;

    @Column(name = "doc_content_death")
    private byte[] docContentDeath;

    @Column(name = "doc_type", length = 1)
    private String docType;

    @Column(name = "cancellation_explanation", length = 500)
    private String cancellationExplanation;
}