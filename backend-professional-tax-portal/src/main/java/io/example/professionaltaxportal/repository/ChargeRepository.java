

package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.Charge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChargeRepository extends JpaRepository<Charge, String> {
    List<Charge> findByAreaCodeOrderByChargeSn(String areaCode);
    List<Charge> findAllByOrderByChargeSn();
}
