
package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmploymentDetailsDTO {

    private String applicationId;

    @NotNull(message = "Commencement date is required")
    private LocalDate commencementDate;

    @Size(max = 50, message = "Period of standing must not exceed 50 characters")
    private String periodOfStanding;

    @Pattern(regexp = "[A-Z]{5}\\d{4}[A-Z]", message = "Invalid PAN format")
    private String pan;

    @Size(max = 11, message = "VAT number must not exceed 11 characters")
    private String vatNumber;

    @Size(max = 11, message = "CST number must not exceed 11 characters")
    private String cstNumber;

    @Size(max = 15, message = "GST number must not exceed 15 characters")
    private String gstNumber;

    @NotBlank(message = "Employer name is required")
    @Size(max = 150, message = "Employer name must not exceed 150 characters")
    private String employerName;

    @Size(max = 150, message = "Employer address must not exceed 150 characters")
    private String employerAddress;

    @NotNull(message = "Monthly salary is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Monthly salary must be greater than 0")
    private BigDecimal monthlySalary;

    private Boolean engagedWithMultipleEmployer;

    // Additional employers
    private String employerName1;
    private String employerAddress1;
    private BigDecimal monthlySalary1;

    private String employerName2;
    private String employerAddress2;
    private BigDecimal monthlySalary2;

    private String employerName3;
    private String employerAddress3;
    private BigDecimal monthlySalary3;
}
