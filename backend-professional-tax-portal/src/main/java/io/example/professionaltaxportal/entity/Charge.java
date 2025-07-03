package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "charges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Charge {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "charge_name", nullable = false)
    private String chargeName;
    
    @Column(name = "charge_code")
    private String chargeCode;
    
    @Column(name = "area_id")
    private Long areaId;
    
    @Column(name = "status")
    private Boolean status = true;
}
