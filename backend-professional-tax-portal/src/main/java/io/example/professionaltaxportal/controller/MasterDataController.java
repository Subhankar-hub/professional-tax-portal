package io.example.professionaltaxportal.controller;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.entity.*;
import io.example.professionaltaxportal.service.MasterDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/master-data")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://0.0.0.0:3000", "https://*.replit.dev"})
public class MasterDataController {

    private final MasterDataService masterDataService;

    @GetMapping("/districts")
    public ResponseEntity<ApiResponse<List<District>>> getAllDistricts() {
        ApiResponse<List<District>> response = masterDataService.getAllDistricts();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/ptax-categories")
    public ResponseEntity<ApiResponse<List<PTaxCategory>>> getAllPTaxCategories() {
        ApiResponse<List<PTaxCategory>> response = masterDataService.getAllPTaxCategories();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/ptax-subcategories/{categoryCode}")
    public ResponseEntity<ApiResponse<List<PTaxCategorySubcategory>>> getPTaxSubcategories(@PathVariable Integer categoryCode) {
        ApiResponse<List<PTaxCategorySubcategory>> response = masterDataService.getPTaxSubcategories(categoryCode);
        return ResponseEntity.ok(response);
    }
}