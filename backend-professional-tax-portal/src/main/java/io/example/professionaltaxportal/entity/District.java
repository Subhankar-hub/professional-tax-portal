package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "districts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "district_name", nullable = false)
    private String districtName;

    @Column(name = "district_code")
    private String districtCode;

    @Column(name = "state_id")
    private Long stateId;

    @Column(name = "lgd_code")
    private Integer lgdCode;

    @Column(name = "status")
    private Boolean status = true;
}