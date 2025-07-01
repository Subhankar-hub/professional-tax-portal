package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.PTaxCategorySubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PTaxCategorySubcategoryRepository extends JpaRepository<PTaxCategorySubcategory, Long> {
    
    List<PTaxCategorySubcategory> findByCatCodeAndIsVisible(Integer catCode, Integer isVisible);
}
// The above code defines a repository interface for managing PTaxCategorySubcategory entities.
// It extends JpaRepository to provide CRUD operations for PTaxCategorySubcategory entities.
// The method findByCatCodeAndIsVisible allows for querying subcategories based on category code and visibility status.
// This is useful for retrieving specific subcategories that are active and associated with a given category code.
// The repository is annotated with @Repository to indicate that it is a Spring Data repository,
// enabling Spring to detect and manage it as a bean in the application context.
// The use of List<PTaxCategorySubcategory> as the return type allows for multiple results to be returned,
// accommodating scenarios where multiple subcategories match the specified criteria.
// This repository can be used in service classes to interact with the database and perform operations related to
// PTaxCategorySubcategory entities, such as retrieving active subcategories for a specific professional tax category.
// It simplifies data access and manipulation, adhering to the principles of Spring Data JPA for efficient database interactions.
// The repository can be injected into service classes, allowing for easy access to the methods defined in this interface.
// This promotes a clean separation of concerns, where the repository handles data access logic while
// service classes focus on business logic.