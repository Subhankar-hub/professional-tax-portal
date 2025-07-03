package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmploymentDetailsDTO {

    @NotBlank(message = "Application ID is required")
    private String applicationId;

    private String ptan;
    private String employerName;
    private String employerAddress;
    private String designation;
    private LocalDate dateOfJoining;
    private BigDecimal monthlySalary;
    private BigDecimal annualSalary;
    private String employerPan;
    private String employerGstNumber;
    private String employmentType;
    private Boolean isGovernmentEmployee;
    private String departmentName;
    private String officeAddress;
    private String employeeId;
    private String payScale;
    private LocalDate retirementDate;

    // Audit fields
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean status;
}