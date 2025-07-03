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
        return districtRepository.findAllByOrderByDistrictNameAsc();
    }

    public List<Area> getAreasByDistrict(Long districtId) {
        return areaRepository.findByDistrictIdAndStatusTrueOrderByAreaNameAsc(districtId);
    }

    public List<io.example.professionaltaxportal.entity.Charge> getChargesByArea(Long areaId) {
        return chargeRepository.findByAreaIdAndStatusTrueOrderByChargeNameAsc(areaId);
    }

    public List<PTaxCategory> getCategories() {
        return pTaxCategoryRepository.findAllByOrderByCatIdAsc();
    }

    public List<PTaxCategorySubcategory> getSubcategoriesByCategory(Long categoryId) {
        return pTaxCategorySubcategoryRepository.findByCategoryIdOrderBySubcategoryNameAsc(categoryId);
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