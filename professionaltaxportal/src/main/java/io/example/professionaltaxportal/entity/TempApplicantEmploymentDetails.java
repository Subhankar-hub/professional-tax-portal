
package io.example.professionaltaxportal.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "ttbl_temp_applicant_employment_details", schema = "ptax")
public class TempApplicantEmploymentDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rsn;
    
    @Column(name = "application_id", length = 15)
    private String applicationId;
    
    @Column(name = "ptan", length = 10)
    private String ptan;
    
    @Column(name = "commencement_date")
    private LocalDate commencementDate;
    
    @Size(max = 50)
    @Column(name = "period_of_standing", length = 50)
    private String periodOfStanding;
    
    @Pattern(regexp = "[A-Z]{5}\\d{4}[A-Z]", message = "Invalid PAN format")
    @Column(name = "pan", length = 10)
    private String pan;
    
    @Size(max = 11)
    @Column(name = "vat_number", length = 11)
    private String vatNumber;
    
    @Size(max = 11)
    @Column(name = "cst_number", length = 11)
    private String cstNumber;
    
    @Size(max = 15)
    @Column(name = "gst_number", length = 15)
    private String gstNumber;
    
    @Size(max = 150)
    @Column(name = "employer_name", length = 150)
    private String employerName;
    
    @Size(max = 150)
    @Column(name = "employer_address", length = 150)
    private String employerAddress;
    
    @Column(name = "monthly_salary", precision = 18, scale = 2)
    private BigDecimal monthlySalary;
    
    @Column(name = "engaged_with_multiple_employer")
    private Boolean engagedWithMultipleEmployer;
    
    // Default constructor
    public TempApplicantEmploymentDetails() {}
    
    // Getters and Setters
    public Long getRsn() { return rsn; }
    public void setRsn(Long rsn) { this.rsn = rsn; }
    
    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }
    
    public String getPtan() { return ptan; }
    public void setPtan(String ptan) { this.ptan = ptan; }
    
    public LocalDate getCommencementDate() { return commencementDate; }
    public void setCommencementDate(LocalDate commencementDate) { this.commencementDate = commencementDate; }
    
    public String getPeriodOfStanding() { return periodOfStanding; }
    public void setPeriodOfStanding(String periodOfStanding) { this.periodOfStanding = periodOfStanding; }
    
    public String getPan() { return pan; }
    public void setPan(String pan) { this.pan = pan; }
    
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
