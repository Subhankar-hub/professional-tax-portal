
package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "temp_applicant_employment_employers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TempApplicantEmploymentEmployers {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "application_id", nullable = false)
    private String applicationId;
    
    @Column(name = "employer_name")
    private String employerName;
    
    @Column(name = "employer_address", columnDefinition = "TEXT")
    private String employerAddress;
    
    @Column(name = "monthly_salary")
    private Double monthlySalary;
    
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
