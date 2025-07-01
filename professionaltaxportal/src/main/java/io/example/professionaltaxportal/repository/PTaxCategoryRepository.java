package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.PTaxCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PTaxCategoryRepository extends JpaRepository<PTaxCategory, Long> {
}
// The above code defines a repository interface for managing PTaxCategory entities.
// It extends JpaRepository to provide CRUD operations for PTaxCategory entities.