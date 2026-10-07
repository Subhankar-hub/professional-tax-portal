package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantEnrolmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TempApplicantEnrolmentDetailsRepository extends JpaRepository<TempApplicantEnrolmentDetails, Long> {
    Optional<TempApplicantEnrolmentDetails> findByApplicationId(String applicationId);
    Optional<TempApplicantEnrolmentDetails> findByMobile(String mobile);
    boolean existsByApplicationId(String applicationId);
    boolean existsByMobile(String mobile);
}