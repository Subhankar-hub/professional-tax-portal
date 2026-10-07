package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "mtbl_area", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Area {
    
    @Id
    @Column(name = "code", length = 3)
    private String code;
    
    @Column(name = "name_en", length = 50)
    private String nameEn;
    
    @Column(name = "name_bn", length = 100)
    private String nameBn;
}
