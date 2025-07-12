
package io.example.professionaltaxportal.controller;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.service.MasterDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/master-data")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000", "http://0.0.0.0:3000", "https://*.replit.dev"})
public class MasterDataController {

    private final MasterDataService masterDataService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllMasterData() {
        try {
            Map<String, Object> masterData = masterDataService.getAllMasterData();
            return ResponseEntity.ok(ApiResponse.success("Master data retrieved successfully", masterData));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Error retrieving master data: " + e.getMessage()));
        }
    }

    @GetMapping("/districts")
    public ResponseEntity<ApiResponse<Object>> getDistricts() {
        try {
            var districts = masterDataService.getDistricts();
            return ResponseEntity.ok(ApiResponse.success("Districts retrieved successfully", districts));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Error retrieving districts: " + e.getMessage()));
        }
    }

    @GetMapping("/areas/{districtCode}")
    public ResponseEntity<ApiResponse<Object>> getAreasByDistrict(@PathVariable String districtCode) {
        try {
            var areas = masterDataService.getAreasByDistrict(districtCode);
            return ResponseEntity.ok(ApiResponse.success("Areas retrieved successfully", areas));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Error retrieving areas: " + e.getMessage()));
        }
    }

    @GetMapping("/charges/{areaCode}")
    public ResponseEntity<ApiResponse<Object>> getChargesByArea(@PathVariable String areaCode) {
        try {
            var charges = masterDataService.getChargesByArea(areaCode);
            return ResponseEntity.ok(ApiResponse.success("Charges retrieved successfully", charges));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Error retrieving charges: " + e.getMessage()));
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<Object>> getCategories() {
        try {
            var categories = masterDataService.getCategories();
            return ResponseEntity.ok(ApiResponse.success("Categories retrieved successfully", categories));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Error retrieving categories: " + e.getMessage()));
        }
    }

    @GetMapping("/subcategories/{categoryId}")
    public ResponseEntity<ApiResponse<Object>> getSubcategoriesByCategory(@PathVariable Long categoryId) {
        try {
            var subcategories = masterDataService.getSubcategoriesByCategory(categoryId);
            return ResponseEntity.ok(ApiResponse.success("Subcategories retrieved successfully", subcategories));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Error retrieving subcategories: " + e.getMessage()));
        }
    }

    @GetMapping("/period-of-standing")
    public ResponseEntity<ApiResponse<Object>> getPeriodOfStandingOptions() {
        try {
            var options = masterDataService.getPeriodOfStandingOptions();
            return ResponseEntity.ok(ApiResponse.success("Period of standing options retrieved successfully", options));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Error retrieving period of standing options: " + e.getMessage()));
        }
    }
}
