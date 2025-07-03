package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantTradeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TempApplicantTradeDetailsRepository extends JpaRepository<TempApplicantTradeDetails, Long> {
    Optional<TempApplicantTradeDetails> findByApplicationId(String applicationId);
    void deleteByApplicationId(String applicationId);
}
