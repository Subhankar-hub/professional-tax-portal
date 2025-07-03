package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "temp_applicant_enrolment_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TempApplicantEnrolmentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rsn;

    @Column(name = "application_id", length = 15, unique = true)
    private String applicationId;

    @Column(name = "ptan", length = 10)
    private String ptan;

    @Column(name = "application_type", length = 20)
    private String applicationType;

    // Individual fields
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Column(name = "middle_name", length = 50)
    private String middleName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "father_name", length = 100)
    private String fatherName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;

    @Column(name = "email_id", length = 100)
    private String emailId;

    // Business fields
    @Column(name = "business_name", length = 200)
    private String businessName;

    @Column(name = "business_type", length = 50)
    private String businessType;

    @Column(name = "business_mobile", length = 15)
    private String businessMobile;

    @Column(name = "business_email", length = 100)
    private String businessEmail;

    @Column(name = "contact_person_name", length = 100)
    private String contactPersonName;

    // Address fields
    @Column(name = "address_line1", length = 200)
    private String addressLine1;

    @Column(name = "address_line2", length = 200)
    private String addressLine2;

    @Column(name = "city", length = 50)
    private String city;

    @Column(name = "district", length = 50)
    private String district;

    @Column(name = "state", length = 50)
    private String state;

    @Column(name = "pincode", length = 10)
    private String pincode;

    @Column(name = "district_lgd_code")
    private Integer districtLgdCode;

    // Professional Tax Details
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

    @Column(name = "engaged_with_employment")
    private Boolean engagedWithEmployment;

    // Other fields
    @Column(name = "pan_number", length = 10)
    private String panNumber;

    @Column(name = "pan", length = 10)
    private String pan;

    @Column(name = "aadhar_number", length = 12)
    private String aadharNumber;

    @Column(name = "gst_number", length = 15)
    private String gstNumber;

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

    @Column(name = "establishment_name", length = 200)
    private String establishmentName;

    // Audit fields
    @Column(name = "inserted_on")
    private LocalDateTime insertedOn;

    @Column(name = "inserted_by", length = 50)
    private String insertedBy;

    @Column(name = "inserted_from_ipv4", length = 15)
    private String insertedFromIpv4;

    @Column(name = "updated_on")
    private LocalDateTime updatedOn;

    @Column(name = "updated_by", length = 50)
    private String updatedBy;

    @Column(name = "updated_from_ipv4", length = 15)
    private String updatedFromIpv4;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        insertedOn = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        updatedOn = LocalDateTime.now();
    }
}