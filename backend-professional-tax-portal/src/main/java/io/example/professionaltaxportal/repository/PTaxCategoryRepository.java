package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.PTaxCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PTaxCategoryRepository extends JpaRepository<PTaxCategory, Long> {

    Optional<PTaxCategory> findByCatId(Integer catId);

    List<PTaxCategory> findAllByOrderByCatIdAsc();
}