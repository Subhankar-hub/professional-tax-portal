// package io.example.professionaltaxportal.service;

// import io.example.professionaltaxportal.dto.ApiResponse;
// import io.example.professionaltaxportal.dto.EnrolmentDetailsDTO;
// import io.example.professionaltaxportal.dto.EmploymentDetailsDTO;
// import io.example.professionaltaxportal.entity.TempApplicantEnrolmentDetails;
// import io.example.professionaltaxportal.entity.TempApplicantEmploymentDetails;
// import io.example.professionaltaxportal.repository.TempApplicantEnrolmentDetailsRepository;
// import io.example.professionaltaxportal.repository.TempApplicantEmploymentDetailsRepository;
// import lombok.RequiredArgsConstructor;
// import org.modelmapper.ModelMapper;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.time.LocalDateTime;
// import java.util.UUID;

// @Service
// @RequiredArgsConstructor
// public class EnrolmentService {

//     private final TempApplicantEnrolmentDetailsRepository enrolmentRepository;
//     private final TempApplicantEmploymentDetailsRepository employmentRepository;
//     private final ModelMapper modelMapper;

//     @Transactional
//     public ApiResponse<String> saveEnrolmentDetails(EnrolmentDetailsDTO dto) {
//         try {
//             // Check if email or mobile already exists
//             if (enrolmentRepository.findByEmail(dto.getEmail()).isPresent()) {
//                 return ApiResponse.error("Email already exists");
//             }
            
//             if (enrolmentRepository.findByMobile(dto.getMobile()).isPresent()) {
//                 return ApiResponse.error("Mobile number already exists");
//             }

//             TempApplicantEnrolmentDetails entity = modelMapper.map(dto, TempApplicantEnrolmentDetails.class);
            
//             // Generate application ID
//             String applicationId = generateApplicationId();
//             entity.setApplicationId(applicationId);
//             entity.setInsertedOn(LocalDateTime.now());
//             entity.setStatus(true);

//             enrolmentRepository.save(entity);
            
//             return ApiResponse.success("Enrolment details saved successfully", applicationId);
//         } catch (Exception e) {
//             return ApiResponse.error("Failed to save enrolment details: " + e.getMessage());
//         }
//     }

//     @Transactional
//     public ApiResponse<String> saveEmploymentDetails(EmploymentDetailsDTO dto) {
//         try {
//             // Verify application exists
//             if (!enrolmentRepository.findByApplicationId(dto.getApplicationId()).isPresent()) {
//                 return ApiResponse.error("Invalid application ID");
//             }

//             TempApplicantEmploymentDetails entity = modelMapper.map(dto, TempApplicantEmploymentDetails.class);
//             entity.setInsertedOn(LocalDateTime.now());
//             entity.setStatus(true);

//             employmentRepository.save(entity);
            
//             return ApiResponse.success("Employment details saved successfully", dto.getApplicationId());
//         } catch (Exception e) {
//             return ApiResponse.error("Failed to save employment details: " + e.getMessage());
//         }
//     }

//     public ApiResponse<EnrolmentDetailsDTO> getEnrolmentDetails(String applicationId) {
//         try {
//             TempApplicantEnrolmentDetails entity = enrolmentRepository.findByApplicationId(applicationId)
//                 .orElseThrow(() -> new RuntimeException("Application not found"));
            
//             EnrolmentDetailsDTO dto = modelMapper.map(entity, EnrolmentDetailsDTO.class);
//             return ApiResponse.success("Enrolment details retrieved successfully", dto);
//         } catch (Exception e) {
//             return ApiResponse.error("Failed to retrieve enrolment details: " + e.getMessage());
//         }
//     }

//     private String generateApplicationId() {
//         return "APP" + System.currentTimeMillis();
//     }
// }


// package io.example.professionaltaxportal.service;

// import io.example.professionaltaxportal.dto.ApiResponse;
// import io.example.professionaltaxportal.dto.EnrolmentRequestDTO;
// import io.example.professionaltaxportal.entity.TempApplicantEnrolmentDetails;
// import io.example.professionaltaxportal.repository.TempApplicantEnrolmentDetailsRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.time.LocalDateTime;
// import java.util.UUID;

// @Service
// @RequiredArgsConstructor
// public class EnrolmentService {

//     private final TempApplicantEnrolmentDetailsRepository enrolmentRepository;

//     @Transactional
//     public ApiResponse<String> processEnrolment(EnrolmentRequestDTO request) {
//         try {
//             // Generate application ID
//             String applicationId = "PTAX" + System.currentTimeMillis();
            
//             // Create and save enrolment details
//             TempApplicantEnrolmentDetails enrolment = new TempApplicantEnrolmentDetails();
//             enrolment.setApplicationId(applicationId);
//             enrolment.setApplicantName(request.getApplicationType().equals("Individual") ? 
//                 request.getName() : request.getEstablishmentName());
//             enrolment.setFatherName(request.getFatherName());
//             enrolment.setGender(request.getGender());
//             enrolment.setPanNumber(request.getApplicationType().equals("Individual") ? 
//                 request.getPanTan() : request.getBusinessPan());
//             enrolment.setMobileNumber(request.getApplicationType().equals("Individual") ? 
//                 request.getMobile() : request.getBusinessMobile());
//             enrolment.setEmailId(request.getApplicationType().equals("Individual") ? 
//                 request.getEmail() : request.getBusinessEmail());
//             enrolment.setEstablishmentName(request.getBusinessName());
//             enrolment.setEstablishmentAddress(request.getEstablishmentAddress());
//             enrolment.setPinCode(request.getPinCode());
//             enrolment.setApplicationType(request.getApplicationType());
//             enrolment.setCreatedDate(LocalDateTime.now());
//             enrolment.setStatus("SUBMITTED");
            
//             enrolmentRepository.save(enrolment);
            
//             return ApiResponse.<String>builder()
//                 .success(true)
//                 .message("Application submitted successfully")
//                 .data(applicationId)
//                 .applicationId(applicationId)
//                 .build();
                
//         } catch (Exception e) {
//             return ApiResponse.<String>builder()
//                 .success(false)
//                 .message("Error processing application: " + e.getMessage())
//                 .build();
//         }
//     }

//     public ApiResponse<EnrolmentRequestDTO> getEnrolmentDetails(String applicationId) {
//         try {
//             // Implementation for retrieving enrolment details
//             // This would typically fetch from database and convert to DTO
//             return ApiResponse.<EnrolmentRequestDTO>builder()
//                 .success(true)
//                 .message("Enrolment details retrieved successfully")
//                 .build();
//         } catch (Exception e) {
//             return ApiResponse.<EnrolmentRequestDTO>builder()
//                 .success(false)
//                 .message("Error retrieving enrolment details: " + e.getMessage())
//                 .build();
//         }
//     }
// }


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
            String contactToCheck = dto.getApplicationType().equals("Individual") ? dto.getEmail() : dto.getBusinessEmail();
            String mobileToCheck = dto.getApplicationType().equals("Individual") ? dto.getMobile() : dto.getBusinessMobile();
            
            if (enrolmentRepository.findByEmailId(contactToCheck).isPresent()) {
                return ApiResponse.error("Email already registered");
            }
            
            if (enrolmentRepository.findByMobileNumber(mobileToCheck).isPresent()) {
                return ApiResponse.error("Mobile number already registered");
            }

            // Generate application ID
            String applicationId = generateApplicationId();
            dto.setApplicationId(applicationId);

            // Map DTO to Entity
            TempApplicantEnrolmentDetails entity = modelMapper.map(dto, TempApplicantEnrolmentDetails.class);
            
            // Set additional fields based on application type
            entity.setMobileNumber(dto.getApplicationType().equals("Individual") ? dto.getMobile() : dto.getBusinessMobile());
            entity.setEmailId(dto.getApplicationType().equals("Individual") ? dto.getEmail() : dto.getBusinessEmail());
            entity.setEstablishmentName(dto.getBusinessName());
            entity.setApplyingAsIndividual("Individual".equals(dto.getApplicationType()));
            entity.setStatus(true);
            entity.setCreatedAt(LocalDateTime.now());
            entity.setUpdatedAt(LocalDateTime.now());

            // Save entity
            enrolmentRepository.save(entity);

            return ApiResponse.success("Enrolment details saved successfully", applicationId);
        } catch (Exception e) {
            return ApiResponse.error("Failed to save enrolment details: " + e.getMessage());
        }
    }

    @Transactional
    public ApiResponse<String> saveEmploymentDetails(EmploymentDetailsDTO dto) {
        try {
            // Check if application exists
            if (!enrolmentRepository.existsByApplicationId(dto.getApplicationId())) {
                return ApiResponse.error("Application not found");
            }

            // Map DTO to Entity
            TempApplicantEmploymentDetails entity = modelMapper.map(dto, TempApplicantEmploymentDetails.class);
            entity.setCreatedAt(LocalDateTime.now());
            entity.setUpdatedAt(LocalDateTime.now());

            // Save entity
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
        return "PTAX" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
    }
}