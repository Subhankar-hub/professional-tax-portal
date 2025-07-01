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

    List<TempApplicantEnrolmentDetails> findByStatus(Boolean status);

    List<TempApplicantEnrolmentDetails> findByDistrictLgdCode(Integer districtLgdCode);

    @Query("SELECT t FROM TempApplicantEnrolmentDetails t WHERE t.email = :email")
    Optional<TempApplicantEnrolmentDetails> findByEmail(@Param("email") String email);

    @Query("SELECT t FROM TempApplicantEnrolmentDetails t WHERE t.mobile = :mobile")
    Optional<TempApplicantEnrolmentDetails> findByMobile(@Param("mobile") String mobile);

    @Query("SELECT t FROM TempApplicantEnrolmentDetails t WHERE t.pan = :pan")
    List<TempApplicantEnrolmentDetails> findByPan(@Param("pan") String pan);
}
