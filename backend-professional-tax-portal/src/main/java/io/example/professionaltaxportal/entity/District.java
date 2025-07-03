
// // package io.example.professionaltaxportal.entity;

// // import lombok.Data;
// // import lombok.NoArgsConstructor;
// // import lombok.AllArgsConstructor;
// // import jakarta.persistence.*;

// // @Entity
// // @Table(name = "mas_district", schema = "ptax")
// // @Data
// // @NoArgsConstructor
// // @AllArgsConstructor
// // public class District {

// //     @Id
// //     @Column(name = "district_lgd_code")
// //     private Integer districtLgdCode;

// //     @Column(name = "district_name", length = 50, nullable = false)
// //     private String districtName;

// //     @Column(name = "local_code")
// //     private Integer localCode;
// // }

// package io.example.professionaltaxportal.entity;

// import lombok.Data;
// import lombok.NoArgsConstructor;
// import lombok.AllArgsConstructor;
// import jakarta.persistence.*;

// @Entity
// @Table(name = "mtbl_district", schema = "ptax")
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class District {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "district_rsn")
//     private Long districtRsn;

//     @Column(name = "district_code")
//     private String districtCode;

//     @Column(name = "district_name", length = 100)
//     private String districtName;

//     @Column(name = "state_code")
//     private String stateCode;

//     @Column(name = "is_active")
//     private Boolean isActive;
// }
package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "mtbl_district", schema = "ptax")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class District {

    @Id
    @Column(name = "lgd_code")
    private Integer lgdCode;

    @Column(name = "district_name", length = 100)
    private String districtName;

    @Column(name = "state_code", length = 2)
    private String stateCode;

    @Column(name = "status")
    private Boolean status;
}