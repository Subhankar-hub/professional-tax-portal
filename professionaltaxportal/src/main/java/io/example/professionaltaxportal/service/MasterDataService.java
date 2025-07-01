
package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.entity.*;
import io.example.professionaltaxportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MasterDataService {

    private final DistrictRepository districtRepository;
    private final PTaxCategoryRepository ptaxCategoryRepository;
    private final PTaxCategorySubcategoryRepository ptaxCategorySubcategoryRepository;

    public ApiResponse<List<District>> getAllDistricts() {
        try {
            List<District> districts = districtRepository.findAll();
            return ApiResponse.success("Districts retrieved successfully", districts);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve districts: " + e.getMessage());
        }
    }

    public ApiResponse<List<PTaxCategory>> getAllPTaxCategories() {
        try {
            List<PTaxCategory> categories = ptaxCategoryRepository.findAll();
            return ApiResponse.success("PTAX categories retrieved successfully", categories);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve PTAX categories: " + e.getMessage());
        }
    }

    public ApiResponse<List<PTaxCategorySubcategory>> getPTaxSubcategories(Integer categoryCode) {
        try {
            List<PTaxCategorySubcategory> subcategories = ptaxCategorySubcategoryRepository
                    .findByCatCodeAndIsVisible(categoryCode, 1);
            return ApiResponse.success("PTAX subcategories retrieved successfully", subcategories);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve PTAX subcategories: " + e.getMessage());
        }
    }
}
