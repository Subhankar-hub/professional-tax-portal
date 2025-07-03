package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantProfessionDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TempApplicantProfessionalDetailsRepository extends JpaRepository<TempApplicantProfessionDetails, Long> {
    Optional<TempApplicantProfessionDetails> findByApplicationId(String applicationId);
    void deleteByApplicationId(String applicationId);
}
