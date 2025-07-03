package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "areas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Area {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "area_name", nullable = false)
    private String areaName;
    
    @Column(name = "area_code")
    private String areaCode;
    
    @Column(name = "district_id")
    private Long districtId;
    
    @Column(name = "status")
    private Boolean status = true;
}
