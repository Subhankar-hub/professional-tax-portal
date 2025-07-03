package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantEmploymentEmployers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TempApplicantEmploymentEmployersRepository extends JpaRepository<TempApplicantEmploymentEmployers, Long> {
    List<TempApplicantEmploymentEmployers> findByApplicationId(String applicationId);
    void deleteByApplicationId(String applicationId);
}
