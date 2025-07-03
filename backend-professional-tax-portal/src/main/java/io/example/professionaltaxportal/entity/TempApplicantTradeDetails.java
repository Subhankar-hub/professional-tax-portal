
package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "temp_applicant_trade_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TempApplicantTradeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rsn;

    @Column(name = "application_id", length = 15)
    private String applicationId;

    @Column(name = "ptan", length = 10)
    private String ptan;

    @Column(name = "commencement_date")
    private LocalDate commencementDate;

    @Column(name = "period_of_standing", length = 50)
    private String periodOfStanding;

    @Column(name = "pan", length = 10)
    private String pan;

    @Column(name = "annual_gross_business", precision = 18, scale = 2)
    private BigDecimal annualGrossBusiness;

    @Column(name = "annual_turn_over", precision = 18, scale = 2)
    private BigDecimal annualTurnOver;

    @Column(name = "avg_workers_monthly")
    private Integer avgWorkersMonthly;

    @Column(name = "avg_employees_monthly")
    private Integer avgEmployeesMonthly;

    @Column(name = "vat_number", length = 11)
    private String vatNumber;

    @Column(name = "cst_number", length = 11)
    private String cstNumber;

    @Column(name = "gst_number", length = 15)
    private String gstNumber;

    @Column(name = "taxi_count")
    private Integer taxiCount;

    @Column(name = "three_wheeler_count")
    private Integer threeWheelerCount;

    @Column(name = "lmv_count")
    private Integer lmvCount;

    @Column(name = "good_vehicle_count")
    private Integer goodVehicleCount;

    @Column(name = "truck_count")
    private Integer truckCount;

    @Column(name = "bus_count")
    private Integer busCount;

    @Column(name = "engaged_with_state_society")
    private Boolean engagedWithStateSociety;

    @Column(name = "engaged_with_district_society")
    private Boolean engagedWithDistrictSociety;

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

    @PrePersist
    protected void onCreate() {
        insertedOn = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedOn = LocalDateTime.now();
    }
}
