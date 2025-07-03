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
public class ProfessionDetailsDTO {

    @NotBlank(message = "Application ID is required")
    private String applicationId;

    private String ptan;
    private LocalDate commencementDate;
    private String periodOfStanding;
    private String pan;
    private BigDecimal annualGrossBusiness;
    private BigDecimal annualTurnOver;
    private Integer avgWorkersMonthly;
    private Integer avgEmployeesMonthly;
    private String vatNumber;
    private String cstNumber;
    private String gstNumber;
    private Integer taxiCount;
    private Integer threeWheelerCount;
    private Integer lmvCount;
    private Integer goodVehicleCount;
    private Integer truckCount;
    private Integer busCount;
    private Boolean engagedWithStateSociety;
    private Boolean engagedWithDistrictSociety;

    // Audit fields
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean status;
}