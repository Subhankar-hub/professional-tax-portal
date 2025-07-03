// package io.example.professionaltaxportal.repository;

// import io.example.professionaltaxportal.entity.TempApplicantProfessionDetails;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.Optional;


// @Repository
// public interface TempApplicantProfessionalDetailsRepository extends 
// JpaRepository<TempApplicantProfessionDetails, Long> {
//     Optional<TempApplicantProfessionDetails> findByApplicationId(String applicationId);
//     void deleteByApplicationId(String applicationId);

// }

package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantProfessionDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TempApplicantProfessionDetailsRepository extends JpaRepository<TempApplicantProfessionDetails, Long> {

    Optional<TempApplicantProfessionDetails> findByApplicationId(String applicationId);

    List<TempApplicantProfessionDetails> findByStatus(Boolean status);

    @Query("SELECT t FROM TempApplicantProfessionDetails t WHERE t.pan = :pan")
    List<TempApplicantProfessionDetails> findByPan(@Param("pan") String pan);

    void deleteByApplicationId(String applicationId);
}