package io.example.professionaltaxportal.repository;

import io.example.professionaltaxportal.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    // Additional custom queries can be added here if needed
}
