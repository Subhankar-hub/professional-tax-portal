// package io.example.professionaltaxportal.repository;

// import io.example.professionaltaxportal.entity.TempApplicantEmploymentDetails;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.List;
// import java.util.Optional;

// @Repository
// public interface TempApplicantEmploymentDetailsRepository extends JpaRepository<TempApplicantEmploymentDetails, Long> {

//     Optional<TempApplicantEmploymentDetails> findByApplicationId(String applicationId);

//     List<TempApplicantEmploymentDetails> findByStatus(Boolean status);

//     List<TempApplicantEmploymentDetails> findByPan(String pan);
// }


package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantEmploymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TempApplicantEmploymentDetailsRepository extends JpaRepository<TempApplicantEmploymentDetails, Long> {

    Optional<TempApplicantEmploymentDetails> findByApplicationId(String applicationId);

    List<TempApplicantEmploymentDetails> findByStatus(Boolean status);

    @Query("SELECT t FROM TempApplicantEmploymentDetails t WHERE t.pan = :pan")
    List<TempApplicantEmploymentDetails> findByPan(@Param("pan") String pan);

    void deleteByApplicationId(String applicationId);
}