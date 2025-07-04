package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.entity.*;
import io.example.professionaltaxportal.repository.DistrictRepository;
import io.example.professionaltaxportal.repository.PTaxCategoryRepository;
import io.example.professionaltaxportal.repository.PTaxCategorySubcategoryRepository;
import io.example.professionaltaxportal.repository.AreaRepository;
import io.example.professionaltaxportal.repository.ChargeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MasterDataService {

    private final DistrictRepository districtRepository;
    private final AreaRepository areaRepository;
    private final ChargeRepository chargeRepository;
    private final PTaxCategoryRepository pTaxCategoryRepository;
    private final PTaxCategorySubcategoryRepository pTaxCategorySubcategoryRepository;

    public Map<String, Object> getAllMasterData() {
        Map<String, Object> masterData = new HashMap<>();

        masterData.put("districts", getDistricts());
        masterData.put("categories", getCategories());
        masterData.put("genders", getGenders());
        masterData.put("applicantTypes", getApplicantTypes());

        return masterData;
    }

    public List<District> getDistricts() {
        List<District> districts = districtRepository.findAllByOrderByDistrictNameAsc();
        
        // If database is empty, provide fallback data
        if (districts.isEmpty()) {
            districts = getFallbackDistricts();
        }
        
        return districts;
    }
    
    private List<District> getFallbackDistricts() {
        return List.of(
            createDistrict("DH", "Dhalai", 269),
            createDistrict("GM", "Gomati", 654),
            createDistrict("KH", "Khowai", 652),
            createDistrict("NT", "North Tripura", 270),
            createDistrict("SP", "Sepahijala", 653),
            createDistrict("ST", "South Tripura", 271),
            createDistrict("UN", "Unakoti", 655),
            createDistrict("WT", "West Tripura", 272)
        );
    }
    
    private District createDistrict(String code, String name, int lgdCode) {
        District district = new District();
        district.setDistrictCode(code);
        district.setDistrictName(name);
        district.setLgdCode(lgdCode);
        district.setStateId(1);
        district.setStatus(true);
        return district;
    }

    public List<Area> getAreasByDistrict(Long districtId) {
        return areaRepository.findByDistrictIdAndStatusTrueOrderByAreaNameAsc(districtId);
    }

    public List<io.example.professionaltaxportal.entity.Charge> getChargesByArea(Long areaId) {
        return chargeRepository.findByAreaIdAndStatusTrueOrderByChargeNameAsc(areaId);
    }

    public List<PTaxCategory> getCategories() {
        List<PTaxCategory> categories = pTaxCategoryRepository.findAllByOrderByCatIdAsc();
        
        // If database is empty, provide fallback data
        if (categories.isEmpty()) {
            categories = getFallbackCategories();
        } else {
            // Remove duplicates by catId and keep the first occurrence
            categories = categories.stream()
                .collect(Collectors.toMap(
                    PTaxCategory::getCatId,
                    category -> category,
                    (existing, replacement) -> existing,
                    LinkedHashMap::new))
                .values()
                .stream()
                .sorted(Comparator.comparing(PTaxCategory::getCatId))
                .collect(Collectors.toList());
        }
        
        return categories;
    }
    
    private List<PTaxCategory> getFallbackCategories() {
        return List.of(
            createCategory(1, "Legal Profession", "Legal Profession"),
            createCategory(2, "Medical Profession", "Medical Profession"),
            createCategory(3, "Consultants", "Consultants"),
            createCategory(4, "Engineering Profession", "Engineering Profession"),
            createCategory(5, "Technicians", "Technicians"),
            createCategory(6, "Agents", "Agents"),
            createCategory(7, "Service Providers", "Service Providers"),
            createCategory(8, "Contractors or Suppliers", "Contractors or Suppliers (Annual Gross Turnover more than 5 Lakhs)"),
            createCategory(11, "Dealer, Person, Tax Payer, Traders", "Dealer, Person, Tax Payer, Traders (Annual Gross Turnover more than 3 Lakhs)"),
            createCategory(21, "Salary & Wage Earner", "Salary & Wage Earner")
        );
    }
    
    private PTaxCategory createCategory(int catId, String name, String description) {
        PTaxCategory category = new PTaxCategory();
        category.setCatId(catId);
        category.setCategoryName(name);
        category.setCategoryDescription(description);
        category.setIsActive(true);
        return category;
    }

    public List<PTaxCategorySubcategory> getSubcategoriesByCategory(Long categoryId) {
        List<PTaxCategorySubcategory> subcategories = pTaxCategorySubcategoryRepository.findByCategoryIdOrderBySubcategoryNameAsc(categoryId);
        
        // If database is empty, provide fallback data
        if (subcategories.isEmpty()) {
            subcategories = getFallbackSubcategories(categoryId);
        } else {
            // Remove duplicates by subcategoryName for the same categoryId
            subcategories = subcategories.stream()
                .collect(Collectors.toMap(
                    PTaxCategorySubcategory::getSubcategoryName,
                    subcategory -> subcategory,
                    (existing, replacement) -> existing,
                    LinkedHashMap::new))
                .values()
                .stream()
                .sorted(Comparator.comparing(PTaxCategorySubcategory::getSubcategoryName))
                .collect(Collectors.toList());
        }
        
        return subcategories;
    }
    
    private List<PTaxCategorySubcategory> getFallbackSubcategories(Long categoryId) {
        switch (categoryId.intValue()) {
            case 1: // Legal Profession
                return List.of(
                    createSubcategory(categoryId, "Practitioners", "Practitioners"),
                    createSubcategory(categoryId, "Solicitors", "Solicitors"),
                    createSubcategory(categoryId, "Notaries Public", "Notaries Public"),
                    createSubcategory(categoryId, "Others", "Others")
                );
            case 2: // Medical Profession
                return List.of(
                    createSubcategory(categoryId, "Dentists", "Dentists"),
                    createSubcategory(categoryId, "Pathologists", "Pathologists"),
                    createSubcategory(categoryId, "Cardiologist", "Cardiologist"),
                    createSubcategory(categoryId, "Dermatologist", "Dermatologist"),
                    createSubcategory(categoryId, "ENT Specialist", "ENT Specialist"),
                    createSubcategory(categoryId, "Pediatrician", "Pediatrician"),
                    createSubcategory(categoryId, "Surgeon", "Surgeon"),
                    createSubcategory(categoryId, "Others", "Others")
                );
            case 3: // Consultants
                return List.of(
                    createSubcategory(categoryId, "Medical Consultants", "Medical Consultants"),
                    createSubcategory(categoryId, "Management Consultants", "Management Consultants"),
                    createSubcategory(categoryId, "Software Consultant", "Software Consultant"),
                    createSubcategory(categoryId, "Chartered Accountant", "Chartered Accountant"),
                    createSubcategory(categoryId, "Other Consultants", "Other Consultants")
                );
            case 4: // Engineering Profession
                return List.of(
                    createSubcategory(categoryId, "Mechanical Engineer", "Mechanical Engineer"),
                    createSubcategory(categoryId, "Civil Engineer", "Civil Engineer"),
                    createSubcategory(categoryId, "Software Engineer", "Software Engineer"),
                    createSubcategory(categoryId, "Electrical Engineer", "Electrical Engineer"),
                    createSubcategory(categoryId, "Other Engineers", "Other Engineers")
                );
            default:
                return List.of(
                    createSubcategory(categoryId, "General", "General")
                );
        }
    }
    
    private PTaxCategorySubcategory createSubcategory(Long categoryId, String name, String description) {
        PTaxCategorySubcategory subcategory = new PTaxCategorySubcategory();
        subcategory.setCategoryId(categoryId);
        subcategory.setSubcategoryName(name);
        subcategory.setSubcategoryDescription(description);
        subcategory.setIsActive(true);
        return subcategory;
    }

    public List<String> getGenders() {
        return List.of("Male", "Female", "Other");
    }

    public List<String> getApplicantTypes() {
        return List.of("Individual", "Others");
    }

    public List<String> getPeriodOfStandingOptions() {
        return List.of(
            "0 Year 0 Month 9 Days",
            "0 Year 1 Month 0 Days",
            "0 Year 6 Months 0 Days",
            "1 Year 0 Month 0 Days",
            "2 Years 0 Month 0 Days",
            "3 Years 0 Month 0 Days",
            "5 Years 0 Month 0 Days",
            "More than 5 Years"
        );
    }
}