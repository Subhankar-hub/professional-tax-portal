package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {
    List<District> findAllByOrderByDistrictNameAsc();
    List<District> findByStatusTrue();
}