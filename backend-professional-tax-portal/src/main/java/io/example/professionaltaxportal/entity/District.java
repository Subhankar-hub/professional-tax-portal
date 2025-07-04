package io.example.professionaltaxportal.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "districts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class District {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "district_code", unique = true, nullable = false, length = 10)
    private String districtCode;
    
    @Column(name = "district_name", nullable = false, length = 100)
    private String districtName;
    
    @Column(name = "lgd_code")
    private Integer lgdCode;
    
    @Column(name = "state_id")
    private Integer stateId;
    
    @Column(name = "status")
    private Boolean status = true;
}
