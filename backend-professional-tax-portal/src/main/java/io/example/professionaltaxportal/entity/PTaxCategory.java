// package io.example.professionaltaxportal.entity;

// import lombok.Data;
// import lombok.NoArgsConstructor;
// import lombok.AllArgsConstructor;
// import jakarta.persistence.*;

// @Entity
// @Table(name = "mtbl_ptax_category", schema = "ptax")
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class PTaxCategory {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "cat_rsn")
//     private Long catRsn;

//     @Column(name = "cat_id")
//     private Integer catId;

//     @Column(name = "cat_description", length = 150)
//     private String catDescription;
// }
package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "mtbl_ptax_category", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PTaxCategory {

    @Id
    @Column(name = "category_code")
    private Integer categoryCode;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "status")
    private Boolean status;
}
