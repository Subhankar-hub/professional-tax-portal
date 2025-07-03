package io.example.professionaltaxportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "ptax_category_subcategories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PTaxCategorySubcategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "category_id", nullable = false)
    private Long categoryId;
    
    @Column(name = "subcategory_name", nullable = false)
    private String subcategoryName;
    
    @Column(name = "subcategory_description")
    private String subcategoryDescription;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
}
