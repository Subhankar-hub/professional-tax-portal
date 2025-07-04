
package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.dto.EnrolmentSubmissionDTO;
import io.example.professionaltaxportal.entity.*;
import io.example.professionaltaxportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrolmentService {
    
    private final TempApplicantEnrolmentDetailsRepository enrolmentDetailsRepository;
    private final TempApplicantProfessionalDetailsRepository professionalDetailsRepository;
    private final TempApplicantTradeDetailsRepository tradeDetailsRepository;
    private final TempApplicantCallingDetailsRepository callingDetailsRepository;
    private final TempApplicantEmploymentDetailsRepository employmentDetailsRepository;
    private final TempApplicantEmploymentEmployersRepository employmentEmployersRepository;
    
    @Transactional
    public ApiResponse<String> submitEnrolment(EnrolmentSubmissionDTO enrolmentData) {
        try {
            // Validate required fields
            validateEnrolmentData(enrolmentData);
            
            // Check if mobile number already exists
            if (enrolmentDetailsRepository.existsByMobile(enrolmentData.getMobile())) {
                return ApiResponse.error("Mobile number already registered");
            }
            
            // Generate application ID
            String applicationId = generateApplicationId();
            
            // Save main enrolment details
            TempApplicantEnrolmentDetails enrolment = createEnrolmentDetails(enrolmentData, applicationId);
            enrolmentDetailsRepository.save(enrolment);
            
            // Save specific engagement details
            if (enrolmentData.getEngagedWithProfession()) {
                saveProfessionDetails(enrolmentData, applicationId);
            }
            
            if (enrolmentData.getEngagedWithTrade()) {
                saveTradeDetails(enrolmentData, applicationId);
            }
            
            if (enrolmentData.getEngagedWithCalling()) {
                saveCallingDetails(enrolmentData, applicationId);
            }
            
            if (enrolmentData.getEngagedWithEmployment()) {
                saveEmploymentDetails(enrolmentData, applicationId);
            }
            
            return ApiResponse.success("Enrolment submitted successfully", applicationId);
            
        } catch (Exception e) {
            return ApiResponse.error("Failed to submit enrolment: " + e.getMessage());
        }
    }
    
    private void validateEnrolmentData(EnrolmentSubmissionDTO data) {
        if (data.getName() == null || data.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        
        if (data.getPan() == null || data.getPan().trim().isEmpty()) {
            throw new IllegalArgumentException("PAN is required");
        }
        
        if (data.getMobile() == null || data.getMobile().trim().isEmpty()) {
            throw new IllegalArgumentException("Mobile number is required");
        }
        
        if (data.getEmail() == null || data.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        
        // Validate at least one engagement is selected
        if (!data.getEngagedWithProfession() && !data.getEngagedWithTrade() 
            && !data.getEngagedWithCalling() && !data.getEngagedWithEmployment()) {
            throw new IllegalArgumentException("At least one engagement type must be selected");
        }
    }
    
    private String generateApplicationId() {
        return "PTAX" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
    }
    
    private TempApplicantEnrolmentDetails createEnrolmentDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantEnrolmentDetails enrolment = new TempApplicantEnrolmentDetails();
        enrolment.setApplicationId(applicationId);
        enrolment.setApplicantType(data.getApplicantType());
        enrolment.setName(data.getName());
        enrolment.setGender(data.getGender());
        enrolment.setFatherName(data.getFatherName());
        enrolment.setPan(data.getPan());
        enrolment.setMobile(data.getMobile());
        enrolment.setEmail(data.getEmail());
        enrolment.setEstablishmentName(data.getEstablishmentName());
        enrolment.setJurisdictionArea(data.getJurisdictionArea());
        enrolment.setCharge(data.getCharge());
        enrolment.setDistrict(data.getDistrict());
        enrolment.setPincode(data.getPincode());
        enrolment.setEstablishmentAddress(data.getEstablishmentAddress());
        enrolment.setCategory(data.getCategory());
        enrolment.setSubcategory(data.getSubcategory());
        enrolment.setEngagedWithProfession(data.getEngagedWithProfession());
        enrolment.setEngagedWithTrade(data.getEngagedWithTrade());
        enrolment.setEngagedWithCalling(data.getEngagedWithCalling());
        enrolment.setEngagedWithEmployment(data.getEngagedWithEmployment());
        enrolment.setCaptchaValue(data.getCaptchaValue());
        enrolment.setCaptchaValid(true);
        
        return enrolment;
    }
    
    private void saveProfessionDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantProfessionDetails profession = new TempApplicantProfessionDetails();
        profession.setApplicationId(applicationId);
        profession.setCommencementDate(data.getCommencementDate());
        profession.setPeriodOfStanding(data.getPeriodOfStanding());
        profession.setPanTan(data.getPanTan());
        profession.setAnnualGrossBusiness(data.getAnnualGrossBusiness());
        profession.setMonthlyAvgWorkers(data.getMonthlyAvgWorkers());
        profession.setMonthlyAvgEmployees(data.getMonthlyAvgEmployees());
        profession.setVatRegistered(data.getVatRegistered());
        profession.setVatNumber(data.getVatNumber());
        profession.setCstRegistered(data.getCstRegistered());
        profession.setCstNumber(data.getCstNumber());
        profession.setGstRegistered(data.getGstRegistered());
        profession.setGstNumber(data.getGstNumber());
        profession.setTaxis(data.getTaxis());
        profession.setThreeWheelers(data.getThreeWheelers());
        profession.setLightMotorVehicles(data.getLightMotorVehicles());
        profession.setGoodVehicles(data.getGoodVehicles());
        profession.setTrucks(data.getTrucks());
        profession.setBuses(data.getBuses());
        profession.setStateLevelSociety(data.getStateLevelSociety());
        profession.setDistrictLevelSociety(data.getDistrictLevelSociety());
        
        professionalDetailsRepository.save(profession);
    }
    
    private void saveTradeDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantTradeDetails trade = new TempApplicantTradeDetails();
        trade.setApplicationId(applicationId);
        trade.setCommencementDate(data.getCommencementDate());
        trade.setPeriodOfStanding(data.getPeriodOfStanding());
        trade.setPanTan(data.getPanTan());
        trade.setAnnualGrossBusiness(data.getAnnualGrossBusiness());
        trade.setAnnualTurnover(data.getAnnualTurnover());
        trade.setMonthlyAvgWorkers(data.getMonthlyAvgWorkers());
        trade.setMonthlyAvgEmployees(data.getMonthlyAvgEmployees());
        trade.setVatRegistered(data.getVatRegistered());
        trade.setVatNumber(data.getVatNumber());
        trade.setCstRegistered(data.getCstRegistered());
        trade.setCstNumber(data.getCstNumber());
        trade.setGstRegistered(data.getGstRegistered());
        trade.setGstNumber(data.getGstNumber());
        trade.setTaxis(data.getTaxis());
        trade.setThreeWheelers(data.getThreeWheelers());
        trade.setLightMotorVehicles(data.getLightMotorVehicles());
        trade.setGoodVehicles(data.getGoodVehicles());
        trade.setTrucks(data.getTrucks());
        trade.setBuses(data.getBuses());
        trade.setStateLevelSociety(data.getStateLevelSociety());
        trade.setDistrictLevelSociety(data.getDistrictLevelSociety());
        
        tradeDetailsRepository.save(trade);
    }
    
    private void saveCallingDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantCallingDetails calling = new TempApplicantCallingDetails();
        calling.setApplicationId(applicationId);
        calling.setCommencementDate(data.getCommencementDate());
        calling.setPeriodOfStanding(data.getPeriodOfStanding());
        calling.setPanTan(data.getPanTan());
        calling.setAnnualGrossBusiness(data.getAnnualGrossBusiness());
        calling.setMonthlyAvgWorkers(data.getMonthlyAvgWorkers());
        calling.setMonthlyAvgEmployees(data.getMonthlyAvgEmployees());
        calling.setVatRegistered(data.getVatRegistered());
        calling.setVatNumber(data.getVatNumber());
        calling.setCstRegistered(data.getCstRegistered());
        calling.setCstNumber(data.getCstNumber());
        calling.setGstRegistered(data.getGstRegistered());
        calling.setGstNumber(data.getGstNumber());
        calling.setStateLevelSociety(data.getStateLevelSociety());
        calling.setDistrictLevelSociety(data.getDistrictLevelSociety());
        
        callingDetailsRepository.save(calling);
    }
    
    private void saveEmploymentDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantEmploymentDetails employment = new TempApplicantEmploymentDetails();
        employment.setApplicationId(applicationId);
        employment.setCommencementDate(data.getCommencementDate());
        employment.setPeriodOfStanding(data.getPeriodOfStanding());
        employment.setPanTan(data.getPanTan());
        employment.setVatRegistered(data.getVatRegistered());
        employment.setVatNumber(data.getVatNumber());
        employment.setCstRegistered(data.getCstRegistered());
        employment.setCstNumber(data.getCstNumber());
        employment.setGstRegistered(data.getGstRegistered());
        employment.setGstNumber(data.getGstNumber());
        employment.setEmployerName(data.getEmployerName());
        employment.setEmployerAddress(data.getEmployerAddress());
        employment.setMonthlySalary(data.getMonthlySalary());
        employment.setMultipleEmployers(data.getMultipleEmployers());
        
        employmentDetailsRepository.save(employment);
        
        // Save additional employers if any
        if (data.getAdditionalEmployers() != null && !data.getAdditionalEmployers().isEmpty()) {
            data.getAdditionalEmployers().forEach(employer -> {
                TempApplicantEmploymentEmployers empEmployer = new TempApplicantEmploymentEmployers();
                empEmployer.setApplicationId(applicationId);
                empEmployer.setEmployerName(employer.getName());
                empEmployer.setEmployerAddress(employer.getAddress());
                empEmployer.setMonthlySalary(employer.getMonthlySalary());
                employmentEmployersRepository.save(empEmployer);
            });
        }
    }
    
    public ApiResponse<Object> getEnrolmentByApplicationId(String applicationId) {
        try {
            var enrolment = enrolmentDetailsRepository.findByApplicationId(applicationId);
            if (enrolment.isPresent()) {
                return ApiResponse.success("Enrolment found", enrolment.get());
            } else {
                return ApiResponse.error("Enrolment not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Error retrieving enrolment: " + e.getMessage());
        }
    }
    
    @Transactional
    public ApiResponse<String> saveTemporaryEnrolment(EnrolmentSubmissionDTO enrolmentData) {
        try {
            // Validate required fields for temporary save
            if (enrolmentData.getName() == null || enrolmentData.getName().trim().isEmpty()) {
                return ApiResponse.error("Name is required");
            }
            
            if (enrolmentData.getMobile() == null || enrolmentData.getMobile().trim().isEmpty()) {
                return ApiResponse.error("Mobile number is required");
            }
            
            // Generate temporary application ID
            String applicationId = "TEMP" + System.currentTimeMillis();
            
            // Create temporary enrolment record
            TempApplicantEnrolmentDetails tempEnrolment = new TempApplicantEnrolmentDetails();
            tempEnrolment.setApplicationId(applicationId);
            tempEnrolment.setApplicantType(enrolmentData.getApplicantType());
            tempEnrolment.setName(enrolmentData.getName());
            tempEnrolment.setGender(enrolmentData.getGender());
            tempEnrolment.setFatherName(enrolmentData.getFatherName());
            tempEnrolment.setPan(enrolmentData.getPan());
            tempEnrolment.setMobile(enrolmentData.getMobile());
            tempEnrolment.setEmail(enrolmentData.getEmail());
            tempEnrolment.setEstablishmentName(enrolmentData.getEstablishmentName());
            tempEnrolment.setJurisdictionArea(enrolmentData.getJurisdictionArea());
            tempEnrolment.setCharge(enrolmentData.getCharge());
            tempEnrolment.setDistrict(enrolmentData.getDistrict());
            tempEnrolment.setPincode(enrolmentData.getPincode());
            tempEnrolment.setEstablishmentAddress(enrolmentData.getEstablishmentAddress());
            tempEnrolment.setCategory(enrolmentData.getCategory());
            tempEnrolment.setSubcategory(enrolmentData.getSubcategory());
            tempEnrolment.setEngagedWithProfession(enrolmentData.getEngagedWithProfession());
            tempEnrolment.setEngagedWithTrade(enrolmentData.getEngagedWithTrade());
            tempEnrolment.setEngagedWithCalling(enrolmentData.getEngagedWithCalling());
            tempEnrolment.setEngagedWithEmployment(enrolmentData.getEngagedWithEmployment());
            tempEnrolment.setStatus(false); // Mark as temporary/incomplete
            
            enrolmentDetailsRepository.save(tempEnrolment);
            
            return ApiResponse.success("Application saved temporarily", applicationId);
            
        } catch (Exception e) {
            return ApiResponse.error("Failed to save temporary application: " + e.getMessage());
        }
    }
}
