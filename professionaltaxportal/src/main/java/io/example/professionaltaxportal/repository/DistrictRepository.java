package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {
}
// The above code defines a repository interface for managing District entities.
// It extends JpaRepository to provide CRUD operations for District entities.       