package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "temp_applicant_enrolment_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TempApplicantEnrolmentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "application_id", unique = true, nullable = false)
    private String applicationId;

    @Column(name = "applicant_type")
    private String applicantType; // Individual, Others

    // Personal Information
    @Column(name = "name")
    private String name;

    @Column(name = "gender")
    private String gender;

    @Column(name = "father_name")
    private String fatherName;

    @Column(name = "pan")
    private String pan;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "email")
    private String email;

    // Establishment Information
    @Column(name = "establishment_name")
    private String establishmentName;

    @Column(name = "jurisdiction_area")
    private String jurisdictionArea;

    @Column(name = "charge")
    private String charge;

    @Column(name = "district")
    private String district;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "establishment_address", columnDefinition = "TEXT")
    private String establishmentAddress;

    @Column(name = "category")
    private String category;

    @Column(name = "subcategory")
    private String subcategory;

    // Engagement flags
    @Column(name = "engaged_with_profession")
    private Boolean engagedWithProfession = false;

    @Column(name = "engaged_with_trade")
    private Boolean engagedWithTrade = false;

    @Column(name = "engaged_with_calling")
    private Boolean engagedWithCalling = false;

    @Column(name = "engaged_with_employment")
    private Boolean engagedWithEmployment = false;

    // Captcha
    @Column(name = "captcha_value")
    private String captchaValue;

    @Column(name = "captcha_valid")
    private Boolean captchaValid = false;

    // Status and timestamps
    @Column(name = "status")
    private Boolean status = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}