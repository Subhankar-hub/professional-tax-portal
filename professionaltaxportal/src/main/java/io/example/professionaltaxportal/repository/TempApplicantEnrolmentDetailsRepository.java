
package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantEnrolmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TempApplicantEnrolmentDetailsRepository extends JpaRepository<TempApplicantEnrolmentDetails, Long> {
    
    Optional<TempApplicantEnrolmentDetails> findByApplicationId(String applicationId);
    
    Optional<TempApplicantEnrolmentDetails> findByPtan(String ptan);
    
    List<TempApplicantEnrolmentDetails> findByMobile(String mobile);
    
    List<TempApplicantEnrolmentDetails> findByEmail(String email);
    
    List<TempApplicantEnrolmentDetails> findByPan(String pan);
    
    List<TempApplicantEnrolmentDetails> findByStatus(Boolean status);
    
    @Query("SELECT t FROM TempApplicantEnrolmentDetails t WHERE t.jurisdictionCode = :jurisdictionCode")
    List<TempApplicantEnrolmentDetails> findByJurisdictionCode(@Param("jurisdictionCode") String jurisdictionCode);
    
    @Query("SELECT t FROM TempApplicantEnrolmentDetails t WHERE t.districtLgdCode = :districtCode")
    List<TempApplicantEnrolmentDetails> findByDistrictLgdCode(@Param("districtCode") Integer districtCode);
    
    @Query("SELECT COUNT(t) FROM TempApplicantEnrolmentDetails t WHERE t.status = true")
    Long countActiveApplications();
}