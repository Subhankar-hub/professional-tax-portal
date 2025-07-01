package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantCallingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TempApplicantCallingDetailsRepository extends 
JpaRepository<TempApplicantCallingDetails, Long> {
    Optional<TempApplicantCallingDetails> findByApplicationId(String applicationId);
    void deleteByApplicationId(String applicationId);
}