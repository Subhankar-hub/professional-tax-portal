package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "mtbl_role", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    
    @Id
    @Column(name = "role_id")
    private Integer roleId;
    
    @Column(name = "designation_code", length = 10)
    private String designationCode;
    
    @Column(name = "role_name", length = 25)
    private String roleName;
    
    @Column(name = "role_name_ll", length = 50)
    private String roleNameLl;
    
    @Column(name = "outside_visibility")
    private Boolean outsideVisibility;
}
