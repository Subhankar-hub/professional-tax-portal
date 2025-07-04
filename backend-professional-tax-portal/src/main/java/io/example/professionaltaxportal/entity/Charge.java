package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "mtbl_charge", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Charge {
    
    @Id
    @Column(name = "code", length = 4)
    private String code;
    
    @Column(name = "charge", length = 255)
    private String charge;
    
    @Column(name = "area_code", length = 3)
    private String areaCode;
    
    @Column(name = "charge_sn")
    private Integer chargeSn;
}
