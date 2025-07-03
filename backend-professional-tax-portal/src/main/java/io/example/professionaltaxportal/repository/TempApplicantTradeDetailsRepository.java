package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantTradeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TempApplicantTradeDetailsRepository extends JpaRepository<TempApplicantTradeDetails, Long> {

    Optional<TempApplicantTradeDetails> findByApplicationId(String applicationId);

    List<TempApplicantTradeDetails> findByStatus(Boolean status);

    void deleteByApplicationId(String applicationId);

    boolean existsByApplicationId(String applicationId);

    @Query("SELECT t FROM TempApplicantTradeDetails t WHERE t.applicationId = :applicationId")
    Optional<TempApplicantTradeDetails> findTradeByApplicationId(@Param("applicationId") String applicationId);
}