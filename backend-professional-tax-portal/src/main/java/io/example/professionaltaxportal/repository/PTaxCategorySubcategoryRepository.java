// package io.example.professionaltaxportal.repository;

// import io.example.professionaltaxportal.entity.PTaxCategorySubcategory;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.List;

// @Repository
// public interface PTaxCategorySubcategoryRepository extends JpaRepository<PTaxCategorySubcategory, Long> {

//     List<PTaxCategorySubcategory> findByCatCodeAndIsVisible(Integer catCode, Integer isVisible);

//     List<PTaxCategorySubcategory> findByCatCodeOrderBySubcatCodeAsc(Integer catCode);
// }


package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.PTaxCategorySubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PTaxCategorySubcategoryRepository extends JpaRepository<PTaxCategorySubcategory, Long> {

    List<PTaxCategorySubcategory> findByCatCodeOrderBySubcatCodeAsc(Integer catCode);

    Optional<PTaxCategorySubcategory> findByCatCodeAndSubcatCode(Integer catCode, Integer subcatCode);

    List<PTaxCategorySubcategory> findByIsVisibleOrderByCatCodeAscSubcatCodeAsc(Integer isVisible);
}