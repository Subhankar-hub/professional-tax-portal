package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.TempApplicantEmploymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TempApplicantEmploymentDetailsRepository extends JpaRepository<TempApplicantEmploymentDetails, Long> {
    
    List<TempApplicantEmploymentDetails> findByApplicationId(String applicationId);
    
    List<TempApplicantEmploymentDetails> findByPtan(String ptan);
    
    List<TempApplicantEmploymentDetails> findByPan(String pan);
    
    List<TempApplicantEmploymentDetails> findByEmployerName(String employerName);
    
    List<TempApplicantEmploymentDetails> findByEngagedWithMultipleEmployer(Boolean engagedWithMultiple);
}
// The above code defines a repository interface for managing TempApplicantEmploymentDetails entities.
// It extends JpaRepository to provide CRUD operations and includes methods to find and delete records by applicationId.
// The repository is annotated with @Repository to indicate that it is a Spring Data repository.
// The methods allow for easy interaction with the database, enabling retrieval and deletion of employment details based on the application ID.
// This is useful for managing temporary employment details during the application process in a professional tax portal system.
// The use of Optional allows for safe handling of cases where an entity may not be found, preventing NullPointerExceptions.
// The deleteByApplicationId method allows for the removal of employment details associated with a specific application, which is useful for cleaning up temporary data after processing applications.  