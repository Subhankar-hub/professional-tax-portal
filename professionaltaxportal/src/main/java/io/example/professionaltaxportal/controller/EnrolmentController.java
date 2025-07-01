
package io.example.professionaltaxportal.controller;

import io.example.professionaltaxportal.dto.EnrolmentRequestDTO;
import io.example.professionaltaxportal.entity.TempApplicantEnrolmentDetails;
import io.example.professionaltaxportal.service.EnrolmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/enrolment")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrolmentController {
    
    @Autowired
    private EnrolmentService enrolmentService;
    
    @PostMapping("/apply")
    public ResponseEntity<Map<String, Object>> submitApplication(
            @Valid @RequestBody EnrolmentRequestDTO requestDTO,
            BindingResult bindingResult,
            HttpServletRequest request) {
        
        Map<String, Object> response = new HashMap<>();
        
        if (bindingResult.hasErrors()) {
            response.put("success", false);
            response.put("message", "Validation errors");
            response.put("errors", bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            TempApplicantEnrolmentDetails savedApplication = enrolmentService.saveEnrolment(requestDTO, request);
            
            response.put("success", true);
            response.put("message", "Application submitted successfully");
            response.put("applicationId", savedApplication.getApplicationId());
            response.put("data", savedApplication);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to submit application: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<Map<String, Object>> getApplicationByApplicationId(@PathVariable String applicationId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<TempApplicantEnrolmentDetails> application = enrolmentService.findByApplicationId(applicationId);
            
            if (application.isPresent()) {
                response.put("success", true);
                response.put("data", application.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Application not found");
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error retrieving application: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/search/mobile/{mobile}")
    public ResponseEntity<Map<String, Object>> getApplicationsByMobile(@PathVariable String mobile) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<TempApplicantEnrolmentDetails> applications = enrolmentService.findByMobile(mobile);
            
            response.put("success", true);
            response.put("count", applications.size());
            response.put("data", applications);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error retrieving applications: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/search/email/{email}")
    public ResponseEntity<Map<String, Object>> getApplicationsByEmail(@PathVariable String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<TempApplicantEnrolmentDetails> applications = enrolmentService.findByEmail(email);
            
            response.put("success", true);
            response.put("count", applications.size());
            response.put("data", applications);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error retrieving applications: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/search/pan/{pan}")
    public ResponseEntity<Map<String, Object>> getApplicationsByPan(@PathVariable String pan) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<TempApplicantEnrolmentDetails> applications = enrolmentService.findByPan(pan);
            
            response.put("success", true);
            response.put("count", applications.size());
            response.put("data", applications);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error retrieving applications: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PutMapping("/status/{applicationId}")
    public ResponseEntity<Map<String, Object>> updateApplicationStatus(
            @PathVariable String applicationId,
            @RequestParam Boolean status) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            TempApplicantEnrolmentDetails updatedApplication = enrolmentService.updateEnrolmentStatus(applicationId, status);
            
            response.put("success", true);
            response.put("message", "Application status updated successfully");
            response.put("data", updatedApplication);
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating application status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/active")
    public ResponseEntity<Map<String, Object>> getActiveApplications() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<TempApplicantEnrolmentDetails> activeApplications = enrolmentService.getAllActiveApplications();
            
            response.put("success", true);
            response.put("count", activeApplications.size());
            response.put("data", activeApplications);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error retrieving active applications: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getApplicationStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Long activeCount = enrolmentService.getActiveApplicationsCount();
            
            response.put("success", true);
            response.put("activeApplicationsCount", activeCount);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error retrieving application statistics: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
