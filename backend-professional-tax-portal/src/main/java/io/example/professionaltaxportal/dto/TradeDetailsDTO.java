package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TradeDetailsDTO {

    private String applicationId;
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
}