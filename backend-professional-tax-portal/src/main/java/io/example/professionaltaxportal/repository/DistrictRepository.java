// // package io.example.professionaltaxportal.repository;

// // import io.example.professionaltaxportal.entity.District;
// // import org.springframework.data.jpa.repository.JpaRepository;
// // import org.springframework.stereotype.Repository;

// // import java.util.List;

// // @Repository
// // public interface DistrictRepository extends JpaRepository<District, Integer> {

// //     List<District> findByDistrictNameContainingIgnoreCase(String districtName);

// //     List<District> findAllByOrderByDistrictNameAsc();
// // }


// package io.example.professionaltaxportal.repository;

// import io.example.professionaltaxportal.entity.District;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.List;
// import java.util.Optional;

// @Repository
// public interface DistrictRepository extends JpaRepository<District, Long> {

//     Optional<District> findByDistrictCode(String districtCode);

//     List<District> findAllByOrderByDistrictNameAsc();

//     List<District> findByStateCodeOrderByDistrictNameAsc(String stateCode);

//     List<District> findByIsActiveOrderByDistrictNameAsc(Boolean isActive);
// }
package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {
    List<District> findByStatusTrue(); // Existing method
    List<District> findByIsActive(int isActive); // Add this line
}