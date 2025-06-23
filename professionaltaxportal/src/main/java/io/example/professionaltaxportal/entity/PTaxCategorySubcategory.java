package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "mtbl_ptax_category_subcategory", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PTaxCategorySubcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_rsn")
    private Long recordRsn;

    @Column(name = "cat_code")
    private Integer catCode;

    @Column(name = "cat_description", length = 150)
    private String catDescription;

    @Column(name = "subcat_code")
    private Integer subcatCode;

    @Column(name = "subcat_description", length = 150)
    private String subcatDescription;

    @Column(name = "is_visible")
    private Integer isVisible;
}