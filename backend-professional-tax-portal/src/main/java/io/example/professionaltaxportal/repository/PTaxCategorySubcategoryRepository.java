package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.PTaxCategorySubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PTaxCategorySubcategoryRepository extends JpaRepository<PTaxCategorySubcategory, Long> {
    List<PTaxCategorySubcategory> findByCatCodeOrderBySubcatDescriptionAsc(Integer catCode);
    List<PTaxCategorySubcategory> findByIsVisible(Integer isVisible);
}
