// package io.example.professionaltaxportal.repository;

// import io.example.professionaltaxportal.entity.TempApplicantTradeDetails;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.Optional;

// @Repository
// public interface TempApplicantTradeDetailsRepository extends JpaRepository<TempApplicantTradeDetails, Long> {
//     Optional<TempApplicantTradeDetails> findByApplicationId(String applicationId);
//     void deleteByApplicationId(String applicationId);
// }

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

    List<TempApplicantTradeDetails> findByApplicationId(String applicationId);

    Optional<TempApplicantTradeDetails> findByApplicationIdAndId(String applicationId, Long id);

    @Query("SELECT t FROM TempApplicantTradeDetails t WHERE t.applicationId = :applicationId")
    List<TempApplicantTradeDetails> findTradeDetailsByApplicationId(@Param("applicationId") String applicationId);

    @Query("DELETE FROM TempApplicantTradeDetails t WHERE t.applicationId = :applicationId")
    void deleteByApplicationId(@Param("applicationId") String applicationId);

    boolean existsByApplicationId(String applicationId);
}
