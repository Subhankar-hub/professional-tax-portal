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

    void deleteByApplicationId(String applicationId);

    boolean existsByApplicationId(String applicationId);

    @Query("SELECT t FROM TempApplicantEmploymentDetails t WHERE t.applicationId = :applicationId")
    Optional<TempApplicantEmploymentDetails> findEmploymentByApplicationId(@Param("applicationId") String applicationId);
}