package com.taxprotal_backend.taxprotal_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "ttbl_temp_applicant_enrolment_details", schema = "ptax")
public class TtblTempApplicantEnrolmentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rsn;

    private String applicationId;
    private String ptan;
    private String name;
    private String gender;
    private String fatherName;
    private String mobile;
    private String email;
    private String businessName;
    private String jurisdictionCode;
    private String chargeCode;
    private String addressText;
    private Integer subdistrictLgdCode;
    private Integer districtLgdCode;
    private String pincode;
    private Integer ptaxCategory;
    private Integer ptaxSubcategory;
    private Boolean engagedWithProfession;
    private Boolean engagedWithTrade;
    private Boolean engagedWithCalling;
    private Boolean engagedWithEmployement;
    private String pan;
    private Timestamp insertedOn;
    private String insertedBy;
    private String insertedFromIpv4;
    private Integer welcomeSmsCount;
    private Integer welcomeEmailCount;
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
    private Boolean applyingAsIndividual;
    private Boolean status;

    @Lob
    private byte[] docContent;
    @Lob
    private byte[] docContentTrade;
    @Lob
    private byte[] docContentDeath;

    private String docType;
    private String cancellationExplanation;
}
