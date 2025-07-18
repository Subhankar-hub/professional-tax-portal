package io.example.professionaltaxportal.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "mas_district", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class District {
    
    @Id
    @Column(name = "district_lgd_code")
    private Integer districtLgdCode;
    
    @Column(name = "district_name", nullable = false, length = 50)
    private String districtName;
    
    @Column(name = "local_code")
    private Integer localCode;
}
