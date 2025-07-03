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
//             if (dto.getEmail() != null && enrolmentRepository.findByEmailId(dto.getEmail()).isPresent()) {
//                 return ApiResponse.error("Email already exists");
//             }
            
//             if (dto.getMobile() != null && enrolmentRepository.findByMobileNumber(dto.getMobile()).isPresent()) {
//                 return ApiResponse.error("Mobile number already exists");
//             }

//             // Generate application ID if not provided
//             String applicationId = dto.getApplicationId();
//             if (applicationId == null || applicationId.isEmpty()) {
//                 applicationId = "APP" + System.currentTimeMillis();
//             }

//             // Create enrolment entity
//             TempApplicantEnrolmentDetails enrolment = new TempApplicantEnrolmentDetails();
//             enrolment.setApplicationId(applicationId);
//             enrolment.setApplicationType(dto.getApplicationType());
//             enrolment.setFirstName(dto.getFirstName());
//             enrolment.setMiddleName(dto.getMiddleName());
//             enrolment.setLastName(dto.getLastName());
//             enrolment.setFatherName(dto.getFatherName());
//             enrolment.setDateOfBirth(dto.getDateOfBirth());
//             enrolment.setGender(dto.getGender());
            
//             // Set mobile and email based on application type
//             if ("Individual".equals(dto.getApplicationType())) {
//                 enrolment.setMobileNumber(dto.getMobile());
//                 enrolment.setEmailId(dto.getEmail());
//             } else {
//                 enrolment.setMobileNumber(dto.getBusinessMobile());
//                 enrolment.setEmailId(dto.getBusinessEmail());
//                 enrolment.setBusinessName(dto.getBusinessName());
//                 enrolment.setBusinessType(dto.getBusinessType());
//                 enrolment.setContactPersonName(dto.getContactPersonName());
//             }

//             enrolment.setAddressLine1(dto.getAddressLine1());
//             enrolment.setAddressLine2(dto.getAddressLine2());
//             enrolment.setCity(dto.getCity());
//             enrolment.setDistrict(dto.getDistrict());
//             enrolment.setState(dto.getState());
//             enrolment.setPincode(dto.getPincode());
//             enrolment.setPtaxCategory(dto.getPtaxCategory());
//             enrolment.setPtaxSubcategory(dto.getPtaxSubcategory());
//             enrolment.setEngagedWithProfession(dto.getEngagedWithProfession());
//             enrolment.setEngagedWithTrade(dto.getEngagedWithTrade());
//             enrolment.setEngagedWithCalling(dto.getEngagedWithCalling());
//             enrolment.setEngagedWithEmployment(dto.getEngagedWithEmployment());
//             enrolment.setPanNumber(dto.getPanNumber());
//             enrolment.setAadharNumber(dto.getAadharNumber());
//             enrolment.setGstNumber(dto.getGstNumber());
//             enrolment.setApplyingAsIndividual(dto.getApplyingAsIndividual());
//             enrolment.setStatus(true);
//             enrolment.setCreatedAt(LocalDateTime.now());

//             enrolmentRepository.save(enrolment);

//             return ApiResponse.success("Enrolment details saved successfully", applicationId, applicationId);

//         } catch (Exception e) {
//             return ApiResponse.error("Failed to save enrolment details: " + e.getMessage());
//         }
//     }

//     @Transactional
//     public ApiResponse<String> saveEmploymentDetails(EmploymentDetailsDTO dto) {
//         try {
//             // Check if application exists
//             if (!enrolmentRepository.existsByApplicationId(dto.getApplicationId())) {
//                 return ApiResponse.error("Application not found");
//             }

//             TempApplicantEmploymentDetails employment = modelMapper.map(dto, TempApplicantEmploymentDetails.class);
//             employment.setStatus(true);
//             employment.setInsertedOn(LocalDateTime.now());

//             employmentRepository.save(employment);

//             return ApiResponse.success("Employment details saved successfully", dto.getApplicationId());

//         } catch (Exception e) {
//             return ApiResponse.error("Failed to save employment details: " + e.getMessage());
//         }
//     }

//     public ApiResponse<EnrolmentDetailsDTO> getEnrolmentDetails(String applicationId) {
//         try {
//             TempApplicantEnrolmentDetails enrolment = enrolmentRepository.findByApplicationId(applicationId)
//                     .orElse(null);

//             if (enrolment == null) {
//                 return ApiResponse.error("Application not found");
//             }

//             EnrolmentDetailsDTO dto = modelMapper.map(enrolment, EnrolmentDetailsDTO.class);
//             return ApiResponse.success("Enrolment details retrieved successfully", dto);

//         } catch (Exception e) {
//             return ApiResponse.error("Failed to retrieve enrolment details: " + e.getMessage());
//         }
//     }
// }




package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.dto.EnrolmentSubmissionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnrolmentService {

    public String submitEnrolment(EnrolmentSubmissionDTO enrolmentData) {
        // TODO: Implement actual enrolment submission logic
        // For now, just return a success message with basic validation
        
        if (enrolmentData.getName() == null || enrolmentData.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        
        if (enrolmentData.getPan() == null || enrolmentData.getPan().trim().isEmpty()) {
            throw new IllegalArgumentException("PAN is required");
        }
        
        if (enrolmentData.getMobile() == null || enrolmentData.getMobile().trim().isEmpty()) {
            throw new IllegalArgumentException("Mobile number is required");
        }
        
        // Generate a dummy application ID
        String applicationId = "PTAX" + System.currentTimeMillis();
        
        return applicationId;
    }

    public Object getEnrolmentById(Long id) {
        // TODO: Implement actual retrieval logic
        throw new UnsupportedOperationException("Not implemented yet");
    }

    public Object getEnrolmentByApplicationId(String applicationId) {
        // TODO: Implement actual retrieval logic
        throw new UnsupportedOperationException("Not implemented yet");
    }

    public Object searchEnrolmentByPan(String pan) {
        // TODO: Implement actual search logic
        throw new UnsupportedOperationException("Not implemented yet");
    }
}