package com.taxprotal_backend.taxprotal_backend.repository;

import com.taxprotal_backend.taxprotal_backend.entity.TtblTempApplicantEnrolmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TtblTempApplicantEnrolmentDetailsRepository extends JpaRepository<TtblTempApplicantEnrolmentDetails, Long> {
    boolean existsByMobile(String mobile);
}
