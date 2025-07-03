// package io.example.professionaltaxportal.controller;

// import io.example.professionaltaxportal.dto.ApiResponse;
// import io.example.professionaltaxportal.dto.EnrolmentDetailsDTO;
// import io.example.professionaltaxportal.dto.EmploymentDetailsDTO;
// import io.example.professionaltaxportal.dto.EstablishmentTypeDTO;
// import io.example.professionaltaxportal.service.EnrolmentService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import jakarta.validation.Valid;

// @RestController
// @RequestMapping("/api/enrolment")
// @RequiredArgsConstructor
// @CrossOrigin(origins = "http://localhost:3000")
// public class EnrolmentController {

//     private final EnrolmentService enrolmentService;

//     @PostMapping("/personal-details")
//     public ResponseEntity<ApiResponse<String>> savePersonalDetails(@Valid @RequestBody EnrolmentDetailsDTO dto) {
//         ApiResponse<String> response = enrolmentService.saveEnrolmentDetails(dto);
//         return ResponseEntity.ok(response);
//     }

//     @PostMapping("/employment-details")
//     public ResponseEntity<ApiResponse<String>> saveEmploymentDetails(@Valid @RequestBody EmploymentDetailsDTO dto) {
//         ApiResponse<String> response = enrolmentService.saveEmploymentDetails(dto);
//         return ResponseEntity.ok(response);
//     }

//     @PostMapping("/establishment-type")
//     public ResponseEntity<ApiResponse<String>> saveEstablishmentType(@Valid @RequestBody EstablishmentTypeDTO dto) {
//         // This would need implementation in service layer
//         return ResponseEntity.ok(ApiResponse.success("Establishment type saved successfully", dto.getApplicationId()));
//     }

//     @GetMapping("/{applicationId}")
//     public ResponseEntity<ApiResponse<EnrolmentDetailsDTO>> getEnrolmentDetails(@PathVariable String applicationId) {
//         ApiResponse<EnrolmentDetailsDTO> response = enrolmentService.getEnrolmentDetails(applicationId);
//         return ResponseEntity.ok(response);
//     }

//     @PostMapping("/submit")
//     public ResponseEntity<ApiResponse<String>> submitEnrolment(@Valid @RequestBody EnrolmentDetailsDTO dto) {
//         ApiResponse<String> response = enrolmentService.saveEnrolmentDetails(dto);
//         return ResponseEntity.ok(response);
//     }

//     @PostMapping("/submit-application")
//     public ResponseEntity<ApiResponse<String>> submitApplication(@RequestParam String applicationId) {
//         // Implementation for final submission
//         return ResponseEntity.ok(ApiResponse.success("Application submitted successfully", "Application ID: " + applicationId));
//     }
// }


// package io.example.professionaltaxportal.controller;

// import io.example.professionaltaxportal.dto.ApiResponse;
// import io.example.professionaltaxportal.dto.EnrolmentRequestDTO;
// import io.example.professionaltaxportal.service.EnrolmentService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api")
// @RequiredArgsConstructor
// @CrossOrigin(origins = {"http://localhost:3000", "http://0.0.0.0:3000", "https://*.replit.dev"})
// public class EnrolmentController {

//     private final EnrolmentService enrolmentService;

//     @PostMapping("/enrolment")
//     public ResponseEntity<ApiResponse<String>> submitEnrolment(@RequestBody EnrolmentRequestDTO request) {
//         ApiResponse<String> response = enrolmentService.processEnrolment(request);
//         return ResponseEntity.ok(response);
//     }

//     @GetMapping("/enrolment/{applicationId}")
//     public ResponseEntity<ApiResponse<EnrolmentRequestDTO>> getEnrolment(@PathVariable String applicationId) {
//         ApiResponse<EnrolmentRequestDTO> response = enrolmentService.getEnrolmentDetails(applicationId);
//         return ResponseEntity.ok(response);
//     }
// }


package io.example.professionaltaxportal.controller;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.dto.EnrolmentDetailsDTO;
import io.example.professionaltaxportal.dto.EmploymentDetailsDTO;
import io.example.professionaltaxportal.service.EnrolmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/enrolment")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://0.0.0.0:3000", "https://*.replit.dev"})
public class EnrolmentController {

    private final EnrolmentService enrolmentService;

    @PostMapping("/save")
    public ResponseEntity<ApiResponse<String>> saveEnrolmentDetails(@Valid @RequestBody EnrolmentDetailsDTO dto) {
        ApiResponse<String> response = enrolmentService.saveEnrolmentDetails(dto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/employment/save")
    public ResponseEntity<ApiResponse<String>> saveEmploymentDetails(@Valid @RequestBody EmploymentDetailsDTO dto) {
        ApiResponse<String> response = enrolmentService.saveEmploymentDetails(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<ApiResponse<EnrolmentDetailsDTO>> getEnrolmentDetails(@PathVariable String applicationId) {
        ApiResponse<EnrolmentDetailsDTO> response = enrolmentService.getEnrolmentDetails(applicationId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<String>> validateApplication(@RequestBody String applicationId) {
        // Add validation logic here
        return ResponseEntity.ok(ApiResponse.success("Application validated successfully", applicationId));
    }
}
