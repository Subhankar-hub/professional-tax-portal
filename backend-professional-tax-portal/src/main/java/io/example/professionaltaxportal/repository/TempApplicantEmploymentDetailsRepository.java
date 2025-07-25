package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantEmploymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TempApplicantEmploymentDetailsRepository extends JpaRepository<TempApplicantEmploymentDetails, Long> {
    Optional<TempApplicantEmploymentDetails> findByApplicationId(String applicationId);
    void deleteByApplicationId(String applicationId);
}
