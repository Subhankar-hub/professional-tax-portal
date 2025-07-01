
package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.dto.EnrolmentRequestDTO;
import io.example.professionaltaxportal.entity.TempApplicantEnrolmentDetails;
import io.example.professionaltaxportal.entity.TempApplicantEmploymentDetails;
import io.example.professionaltaxportal.repository.TempApplicantEnrolmentDetailsRepository;
import io.example.professionaltaxportal.repository.TempApplicantEmploymentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class EnrolmentService {
    
    @Autowired
    private TempApplicantEnrolmentDetailsRepository enrolmentRepository;
    
    @Autowired
    private TempApplicantEmploymentDetailsRepository employmentRepository;
    
    public TempApplicantEnrolmentDetails saveEnrolment(EnrolmentRequestDTO requestDTO, HttpServletRequest request) {
        // Generate application ID
        String applicationId = generateApplicationId();
        
        // Create enrollment entity
        TempApplicantEnrolmentDetails enrollment = mapToEnrollmentEntity(requestDTO, applicationId, request);
        
        // Save enrollment
        TempApplicantEnrolmentDetails savedEnrollment = enrolmentRepository.save(enrollment);
        
        // Save employment details if engaged with employment
        if (Boolean.TRUE.equals(requestDTO.getEngagedWithEmployment())) {
            TempApplicantEmploymentDetails employment = mapToEmploymentEntity(requestDTO, applicationId);
            employmentRepository.save(employment);
        }
        
        return savedEnrollment;
    }
    
    public Optional<TempApplicantEnrolmentDetails> findByApplicationId(String applicationId) {
        return enrolmentRepository.findByApplicationId(applicationId);
    }
    
    public List<TempApplicantEnrolmentDetails> findByMobile(String mobile) {
        return enrolmentRepository.findByMobile(mobile);
    }
    
    public List<TempApplicantEnrolmentDetails> findByEmail(String email) {
        return enrolmentRepository.findByEmail(email);
    }
    
    public List<TempApplicantEnrolmentDetails> findByPan(String pan) {
        return enrolmentRepository.findByPan(pan);
    }
    
    public TempApplicantEnrolmentDetails updateEnrolmentStatus(String applicationId, Boolean status) {
        Optional<TempApplicantEnrolmentDetails> optionalEnrollment = enrolmentRepository.findByApplicationId(applicationId);
        if (optionalEnrollment.isPresent()) {
            TempApplicantEnrolmentDetails enrollment = optionalEnrollment.get();
            enrollment.setStatus(status);
            return enrolmentRepository.save(enrollment);
        }
        throw new RuntimeException("Application not found with ID: " + applicationId);
    }
    
    public List<TempApplicantEnrolmentDetails> getAllActiveApplications() {
        return enrolmentRepository.findByStatus(true);
    }
    
    public Long getActiveApplicationsCount() {
        return enrolmentRepository.countActiveApplications();
    }
    
    private String generateApplicationId() {
        return "PTAX" + System.currentTimeMillis();
    }
    
    private TempApplicantEnrolmentDetails mapToEnrollmentEntity(EnrolmentRequestDTO dto, String applicationId, HttpServletRequest request) {
        TempApplicantEnrolmentDetails entity = new TempApplicantEnrolmentDetails();
        
        entity.setApplicationId(applicationId);
        entity.setName(dto.getName());
        entity.setGender(dto.getGender());
        entity.setFatherName(dto.getFatherName());
        entity.setMobile(dto.getMobile());
        entity.setEmail(dto.getEmail());
        entity.setPan(dto.getPan());
        entity.setBusinessName(dto.getBusinessName());
        entity.setJurisdictionCode(dto.getJurisdictionCode());
        entity.setChargeCode(dto.getChargeCode());
        entity.setAddressText(dto.getAddressText());
        entity.setSubdistrictLgdCode(dto.getSubdistrictLgdCode());
        entity.setDistrictLgdCode(dto.getDistrictLgdCode());
        entity.setPincode(dto.getPincode());
        entity.setPtaxCategory(dto.getPtaxCategory());
        entity.setPtaxSubcategory(dto.getPtaxSubcategory());
        entity.setEngagedWithProfession(dto.getEngagedWithProfession());
        entity.setEngagedWithTrade(dto.getEngagedWithTrade());
        entity.setEngagedWithCalling(dto.getEngagedWithCalling());
        entity.setEngagedWithEmployment(dto.getEngagedWithEmployment());
        entity.setEstablishment1Name(dto.getEstablishment1Name());
        entity.setEstablishment1Address(dto.getEstablishment1Address());
        entity.setEstablishment2Name(dto.getEstablishment2Name());
        entity.setEstablishment2Address(dto.getEstablishment2Address());
        entity.setEstablishment3Name(dto.getEstablishment3Name());
        entity.setEstablishment3Address(dto.getEstablishment3Address());
        entity.setEstablishment4Name(dto.getEstablishment4Name());
        entity.setEstablishment4Address(dto.getEstablishment4Address());
        entity.setEstablishment5Name(dto.getEstablishment5Name());
        entity.setEstablishment5Address(dto.getEstablishment5Address());
        entity.setApplyingAsIndividual(dto.getApplyingAsIndividual());
        entity.setInsertedOn(LocalDateTime.now());
        entity.setInsertedBy(applicationId);
        entity.setInsertedFromIpv4(getClientIpAddress(request));
        entity.setStatus(false); // Initially false, will be updated after verification
        entity.setWelcomeSmsCount(0);
        entity.setWelcomeEmailCount(0);
        
        return entity;
    }
    
    private TempApplicantEmploymentDetails mapToEmploymentEntity(EnrolmentRequestDTO dto, String applicationId) {
        TempApplicantEmploymentDetails entity = new TempApplicantEmploymentDetails();
        
        entity.setApplicationId(applicationId);
        entity.setPan(dto.getPan());
        entity.setCommencementDate(dto.getCommencementDate());
        entity.setPeriodOfStanding(dto.getPeriodOfStanding());
        entity.setVatNumber(dto.getVatNumber());
        entity.setCstNumber(dto.getCstNumber());
        entity.setGstNumber(dto.getGstNumber());
        entity.setEmployerName(dto.getEmployerName());
        entity.setEmployerAddress(dto.getEmployerAddress());
        entity.setMonthlySalary(dto.getMonthlySalary());
        entity.setEngagedWithMultipleEmployer(dto.getEngagedWithMultipleEmployer());
        
        return entity;
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            return xForwardedForHeader.split(",")[0];
        }
    }
}
