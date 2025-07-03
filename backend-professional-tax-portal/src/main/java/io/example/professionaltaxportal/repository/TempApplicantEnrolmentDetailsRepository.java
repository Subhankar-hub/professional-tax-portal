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

    Optional<TempApplicantEnrolmentDetails> findByMobileNumber(String mobileNumber);

    Optional<TempApplicantEnrolmentDetails> findByEmailId(String emailId);

    @Query("SELECT t FROM TempApplicantEnrolmentDetails t WHERE t.applicationId = :applicationId")
    Optional<TempApplicantEnrolmentDetails> findEnrolmentByApplicationId(@Param("applicationId") String applicationId);

    @Query("SELECT t FROM TempApplicantEnrolmentDetails t WHERE t.mobileNumber = :mobile OR t.emailId = :email")
    Optional<TempApplicantEnrolmentDetails> findByMobileOrEmail(@Param("mobile") String mobile, @Param("email") String email);

    List<TempApplicantEnrolmentDetails> findByStatus(Boolean status);

    boolean existsByApplicationId(String applicationId);

    boolean existsByMobileNumber(String mobileNumber);

    boolean existsByEmailId(String emailId);

    @Query("DELETE FROM TempApplicantEnrolmentDetails t WHERE t.applicationId = :applicationId")
    void deleteByApplicationId(@Param("applicationId") String applicationId);
}