package io.example.professionaltaxportal.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entity representing temporary applicant employment details.
 */
@Entity
@Table(name = "ttbl_temp_applicant_employment_details", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TempApplicantEmploymentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rsn;

    @Column(name = "application_id", length = 15, nullable = false)
    private String applicationId;

    @Column(name = "ptan", length = 10)
    private String ptan;

    @Column(name = "commencement_date")
    private LocalDate commencementDate;

    @Column(name = "period_of_standing", length = 50)
    private String periodOfStanding;

    @Column(name = "pan", length = 10)
    private String pan;

    @Column(name = "vat_number", length = 11)
    private String vatNumber;

    @Column(name = "cst_number", length = 11)
    private String cstNumber;

    @Column(name = "gst_number", length = 15)
    private String gstNumber;

    @Column(name = "employer_name", length = 150)
    private String employerName;

    @Column(name = "employer_address", length = 150)
    private String employerAddress;

    @Column(name = "monthly_salary", precision = 18, scale = 2)
    private BigDecimal monthlySalary;

    @Column(name = "engaged_with_multiple_employer")
    private Boolean engagedWithMultipleEmployer;

    // Additional employers when engaged with multiple
    @Column(name = "employer_name1", length = 150)
    private String employerName1;

    @Column(name = "employer_address1", length = 150)
    private String employerAddress1;

    @Column(name = "monthly_salary1", precision = 18, scale = 2)
    private BigDecimal monthlySalary1;

    @Column(name = "employer_name2", length = 150)
    private String employerName2;

    @Column(name = "employer_address2", length = 150)
    private String employerAddress2;

    @Column(name = "monthly_salary2", precision = 18, scale = 2)
    private BigDecimal monthlySalary2;

    @Column(name = "employer_name3", length = 150)
    private String employerName3;

    @Column(name = "employer_address3", length = 150)
    private String employerAddress3;

    @Column(name = "monthly_salary3", precision = 18, scale = 2)
    private BigDecimal monthlySalary3;

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

    @Column(name = "status")
    private Boolean status;
}
