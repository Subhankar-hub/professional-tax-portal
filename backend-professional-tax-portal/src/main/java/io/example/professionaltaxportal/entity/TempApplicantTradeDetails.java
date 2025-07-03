package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
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
    private Long id;
    
    @Column(name = "application_id", nullable = false)
    private String applicationId;
    
    @Column(name = "commencement_date")
    private LocalDate commencementDate;
    
    @Column(name = "period_of_standing")
    private String periodOfStanding;
    
    @Column(name = "pan_tan")
    private String panTan;
    
    @Column(name = "annual_gross_business")
    private Double annualGrossBusiness;
    
    @Column(name = "annual_turnover")
    private Double annualTurnover;
    
    @Column(name = "monthly_avg_workers")
    private Integer monthlyAvgWorkers;
    
    @Column(name = "monthly_avg_employees")
    private Integer monthlyAvgEmployees;
    
    // Tax registrations
    @Column(name = "vat_registered")
    private Boolean vatRegistered = false;
    
    @Column(name = "vat_number")
    private String vatNumber;
    
    @Column(name = "cst_registered")
    private Boolean cstRegistered = false;
    
    @Column(name = "cst_number")
    private String cstNumber;
    
    @Column(name = "gst_registered")
    private Boolean gstRegistered = false;
    
    @Column(name = "gst_number")
    private String gstNumber;
    
    // Vehicle counts
    @Column(name = "taxis")
    private Integer taxis = 0;
    
    @Column(name = "three_wheelers")
    private Integer threeWheelers = 0;
    
    @Column(name = "light_motor_vehicles")
    private Integer lightMotorVehicles = 0;
    
    @Column(name = "good_vehicles")
    private Integer goodVehicles = 0;
    
    @Column(name = "trucks")
    private Integer trucks = 0;
    
    @Column(name = "buses")
    private Integer buses = 0;
    
    // Co-operative Society
    @Column(name = "state_level_society")
    private Boolean stateLevelSociety = false;
    
    @Column(name = "district_level_society")
    private Boolean districtLevelSociety = false;
    
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