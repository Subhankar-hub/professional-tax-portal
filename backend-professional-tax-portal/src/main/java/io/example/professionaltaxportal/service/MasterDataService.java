// // package io.example.professionaltaxportal.service;

// // import io.example.professionaltaxportal.dto.ApiResponse;
// // import io.example.professionaltaxportal.entity.*;
// // import io.example.professionaltaxportal.repository.*;
// // import lombok.RequiredArgsConstructor;
// // import org.springframework.stereotype.Service;

// // import java.util.List;

// // @Service
// // @RequiredArgsConstructor
// // public class MasterDataService {

// //     private final DistrictRepository districtRepository;
// //     private final PTaxCategoryRepository pTaxCategoryRepository;
// //     private final PTaxCategorySubcategoryRepository pTaxCategorySubcategoryRepository;

// //     public ApiResponse<List<District>> getAllDistricts() {
// //         try {
// //             List<District> districts = districtRepository.findAllByOrderByDistrictNameAsc();
// //             return ApiResponse.success("Districts retrieved successfully", districts);
// //         } catch (Exception e) {
// //             return ApiResponse.error("Failed to retrieve districts: " + e.getMessage());
// //         }
// //     }

// //     public ApiResponse<List<PTaxCategory>> getAllPTaxCategories() {
// //         try {
// //             List<PTaxCategory> categories = pTaxCategoryRepository.findAllByOrderByCatIdAsc();
// //             return ApiResponse.success("Categories retrieved successfully", categories);
// //         } catch (Exception e) {
// //             return ApiResponse.error("Failed to retrieve categories: " + e.getMessage());
// //         }
// //     }

// //     public ApiResponse<List<PTaxCategorySubcategory>> getPTaxSubcategories(Integer categoryCode) {
// //         try {
// //             List<PTaxCategorySubcategory> subcategories = 
// //                 pTaxCategorySubcategoryRepository.findByCatCodeAndIsVisible(categoryCode, 1);
// //             return ApiResponse.success("Subcategories retrieved successfully", subcategories);
// //         } catch (Exception e) {
// //             return ApiResponse.error("Failed to retrieve subcategories: " + e.getMessage());
// //         }
// //     }
// // }
// package io.example.professionaltaxportal.service;

// import io.example.professionaltaxportal.dto.ApiResponse;
// import io.example.professionaltaxportal.entity.District;
// import io.example.professionaltaxportal.entity.PTaxCategory;
// import io.example.professionaltaxportal.entity.PTaxCategorySubcategory;
// import io.example.professionaltaxportal.repository.DistrictRepository;
// import io.example.professionaltaxportal.repository.PTaxCategoryRepository;
// import io.example.professionaltaxportal.repository.PTaxCategorySubcategoryRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// @RequiredArgsConstructor
// public class MasterDataService {

//     private final DistrictRepository districtRepository;
//     private final PTaxCategoryRepository ptaxCategoryRepository;
//     private final PTaxCategorySubcategoryRepository ptaxCategorySubcategoryRepository;

//     public ApiResponse<List<District>> getAllDistricts() {
//         try {
//             List<District> districts = districtRepository.findByStatusTrue();
//             return ApiResponse.success("Districts retrieved successfully", districts);
//         } catch (Exception e) {
//             return ApiResponse.error("Failed to retrieve districts: " + e.getMessage());
//         }
//     }

//     public ApiResponse<List<PTaxCategory>> getAllPTaxCategories() {
//         try {
//             List<PTaxCategory> categories = ptaxCategoryRepository.findByStatusTrue();
//             return ApiResponse.success("PTax categories retrieved successfully", categories);
//         } catch (Exception e) {
//             return ApiResponse.error("Failed to retrieve PTax categories: " + e.getMessage());
//         }
//     }

//     public ApiResponse<List<PTaxCategorySubcategory>> getPTaxSubcategories(Integer categoryCode) {
//         try {
//             List<PTaxCategorySubcategory> subcategories = ptaxCategorySubcategoryRepository.findByCategoryCodeAndStatusTrue(categoryCode);
//             return ApiResponse.success("PTax subcategories retrieved successfully", subcategories);
//         } catch (Exception e) {
//             return ApiResponse.error("Failed to retrieve PTax subcategories: " + e.getMessage());
//         }
//     }
// }


package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.entity.District;
import io.example.professionaltaxportal.entity.PTaxCategory;
import io.example.professionaltaxportal.entity.PTaxCategorySubcategory;
import io.example.professionaltaxportal.repository.DistrictRepository;
import io.example.professionaltaxportal.repository.PTaxCategoryRepository;
import io.example.professionaltaxportal.repository.PTaxCategorySubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MasterDataService {

    private final DistrictRepository districtRepository;
    private final PTaxCategoryRepository pTaxCategoryRepository;
    private final PTaxCategorySubcategoryRepository pTaxCategorySubcategoryRepository;

    public ApiResponse<List<District>> getAllDistricts() {
        try {
            List<District> districts = districtRepository.findAllByOrderByDistrictNameAsc();
            return ApiResponse.success("Districts retrieved successfully", districts);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve districts: " + e.getMessage());
        }
    }

    public ApiResponse<List<PTaxCategory>> getAllPTaxCategories() {
        try {
            List<PTaxCategory> categories = pTaxCategoryRepository.findAllByOrderByCatIdAsc();
            return ApiResponse.success("PTax categories retrieved successfully", categories);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve PTax categories: " + e.getMessage());
        }
    }

    public ApiResponse<List<PTaxCategorySubcategory>> getPTaxSubcategories(Integer categoryCode) {
        try {
            List<PTaxCategorySubcategory> subcategories = 
                pTaxCategorySubcategoryRepository.findByCatCodeAndIsVisible(categoryCode, 1);
            return ApiResponse.success("PTax subcategories retrieved successfully", subcategories);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve PTax subcategories: " + e.getMessage());
        }
    }
}