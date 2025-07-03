// package io.example.professionaltaxportal.repository;

// import io.example.professionaltaxportal.entity.TempApplicantCallingDetails;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.Optional;

// @Repository
// public interface TempApplicantCallingDetailsRepository extends 
// JpaRepository<TempApplicantCallingDetails, Long> {
//     Optional<TempApplicantCallingDetails> findByApplicationId(String applicationId);
//     void deleteByApplicationId(String applicationId);
// }


package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantCallingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TempApplicantCallingDetailsRepository extends JpaRepository<TempApplicantCallingDetails, Long> {

    Optional<TempApplicantCallingDetails> findByApplicationId(String applicationId);

    List<TempApplicantCallingDetails> findByStatus(Boolean status);

    @Query("SELECT t FROM TempApplicantCallingDetails t WHERE t.pan = :pan")
    List<TempApplicantCallingDetails> findByPan(@Param("pan") String pan);

    void deleteByApplicationId(String applicationId);
}