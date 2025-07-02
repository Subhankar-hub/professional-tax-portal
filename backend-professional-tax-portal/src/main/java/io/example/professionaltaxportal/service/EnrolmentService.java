package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.dto.EnrolmentDetailsDTO;
import io.example.professionaltaxportal.dto.EmploymentDetailsDTO;
import io.example.professionaltaxportal.entity.TempApplicantEnrolmentDetails;
import io.example.professionaltaxportal.entity.TempApplicantEmploymentDetails;
import io.example.professionaltaxportal.repository.TempApplicantEnrolmentDetailsRepository;
import io.example.professionaltaxportal.repository.TempApplicantEmploymentDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrolmentService {

    private final TempApplicantEnrolmentDetailsRepository enrolmentRepository;
    private final TempApplicantEmploymentDetailsRepository employmentRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public ApiResponse<String> saveEnrolmentDetails(EnrolmentDetailsDTO dto) {
        try {
            // Check if email or mobile already exists
            if (enrolmentRepository.findByEmail(dto.getEmail()).isPresent()) {
                return ApiResponse.error("Email already exists");
            }
            
            if (enrolmentRepository.findByMobile(dto.getMobile()).isPresent()) {
                return ApiResponse.error("Mobile number already exists");
            }

            TempApplicantEnrolmentDetails entity = modelMapper.map(dto, TempApplicantEnrolmentDetails.class);
            
            // Generate application ID
            String applicationId = generateApplicationId();
            entity.setApplicationId(applicationId);
            entity.setInsertedOn(LocalDateTime.now());
            entity.setStatus(true);

            enrolmentRepository.save(entity);
            
            return ApiResponse.success("Enrolment details saved successfully", applicationId);
        } catch (Exception e) {
            return ApiResponse.error("Failed to save enrolment details: " + e.getMessage());
        }
    }

    @Transactional
    public ApiResponse<String> saveEmploymentDetails(EmploymentDetailsDTO dto) {
        try {
            // Verify application exists
            if (!enrolmentRepository.findByApplicationId(dto.getApplicationId()).isPresent()) {
                return ApiResponse.error("Invalid application ID");
            }

            TempApplicantEmploymentDetails entity = modelMapper.map(dto, TempApplicantEmploymentDetails.class);
            entity.setInsertedOn(LocalDateTime.now());
            entity.setStatus(true);

            employmentRepository.save(entity);
            
            return ApiResponse.success("Employment details saved successfully", dto.getApplicationId());
        } catch (Exception e) {
            return ApiResponse.error("Failed to save employment details: " + e.getMessage());
        }
    }

    public ApiResponse<EnrolmentDetailsDTO> getEnrolmentDetails(String applicationId) {
        try {
            TempApplicantEnrolmentDetails entity = enrolmentRepository.findByApplicationId(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
            
            EnrolmentDetailsDTO dto = modelMapper.map(entity, EnrolmentDetailsDTO.class);
            return ApiResponse.success("Enrolment details retrieved successfully", dto);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve enrolment details: " + e.getMessage());
        }
    }

    private String generateApplicationId() {
        return "APP" + System.currentTimeMillis();
    }
}