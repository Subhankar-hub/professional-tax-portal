package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name="mas_district", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class District {
    
    @Id
    @Column(name = "district_lgd_code")
    private Integer districtLgdCode;

    @Column(name = "district_name", length = 50, nullable = false)
    private String districtName;

    @Column(name = "local_code")
    private Integer localCode;
}
