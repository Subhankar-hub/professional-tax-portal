package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {
    List<Area> findByDistrictIdAndStatusTrueOrderByAreaNameAsc(Long districtId);
    List<Area> findByStatusTrueOrderByAreaNameAsc();
}
