
package io.example.professionaltaxportal.service;

import io.example.professionaltaxportal.dto.ApiResponse;
import io.example.professionaltaxportal.dto.EnrolmentSubmissionDTO;
import io.example.professionaltaxportal.entity.*;
import io.example.professionaltaxportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
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
        // Generate a 15-character application ID: PTAX + 11 characters
        long timestamp = System.currentTimeMillis();
        String shortTimestamp = String.valueOf(timestamp).substring(6); // Last 7 digits
        String randomPart = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        return "PTAX" + shortTimestamp + randomPart; // 4 + 7 + 4 = 15 characters
    }
    
    private TempApplicantEnrolmentDetails createEnrolmentDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantEnrolmentDetails enrolment = new TempApplicantEnrolmentDetails();
        enrolment.setApplicationId(applicationId);
        enrolment.setApplyingAsIndividual("Individual".equals(data.getApplicantType()));
        enrolment.setName(data.getName());
        enrolment.setGender(data.getGender());
        enrolment.setFatherName(data.getFatherName());
        enrolment.setPan(data.getPan());
        enrolment.setMobile(data.getMobile());
        enrolment.setEmail(data.getEmail());
        enrolment.setBusinessName(data.getEstablishmentName());
        enrolment.setJurisdictionCode(data.getJurisdictionArea());
        enrolment.setChargeCode(data.getCharge());
        enrolment.setDistrictLgdCode(parseInteger(data.getDistrict()));
        enrolment.setPincode(data.getPincode());
        enrolment.setAddressText(data.getEstablishmentAddress());
        enrolment.setPtaxCategory(parseInteger(data.getCategory()));
        enrolment.setPtaxSubcategory(parseInteger(data.getSubcategory()));
        enrolment.setEngagedWithProfession(data.getEngagedWithProfession());
        enrolment.setEngagedWithTrade(data.getEngagedWithTrade());
        enrolment.setEngagedWithCalling(data.getEngagedWithCalling());
        enrolment.setEngagedWithEmployement(data.getEngagedWithEmployment());
        
        return enrolment;
    }
    
    private Integer parseInteger(String value) {
        try {
            return value != null ? Integer.parseInt(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    private void saveProfessionDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantProfessionDetails profession = new TempApplicantProfessionDetails();
        profession.setApplicationId(applicationId);
        profession.setCommencementDate(data.getCommencementDate());
        profession.setPeriodOfStanding(data.getPeriodOfStanding());
        profession.setPan(data.getPanTan());
        profession.setAnnualGrossBusiness(convertToBigDecimal(data.getAnnualGrossBusiness()));
        profession.setAvgWorkersMonthly(data.getMonthlyAvgWorkers());
        profession.setAvgEmployeesMonthly(data.getMonthlyAvgEmployees());
        profession.setVatNumber(data.getVatNumber());
        profession.setCstNumber(data.getCstNumber());
        profession.setGstNumber(data.getGstNumber());
        profession.setTaxiCount(data.getTaxis());
        profession.setThreeWheelerCount(data.getThreeWheelers());
        profession.setLmvCount(data.getLightMotorVehicles());
        profession.setGoodVehicleCount(data.getGoodVehicles());
        profession.setTruckCount(data.getTrucks());
        profession.setBusCount(data.getBuses());
        profession.setEngagedWithStateSociety(data.getStateLevelSociety());
        profession.setEngagedWithDistrictSociety(data.getDistrictLevelSociety());
        
        professionalDetailsRepository.save(profession);
    }
    
    private BigDecimal convertToBigDecimal(Double value) {
        return value != null ? BigDecimal.valueOf(value) : null;
    }
    
    private void saveTradeDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantTradeDetails trade = new TempApplicantTradeDetails();
        trade.setApplicationId(applicationId);
        trade.setCommencementDate(data.getCommencementDate());
        trade.setPeriodOfStanding(data.getPeriodOfStanding());
        trade.setPan(data.getPanTan());
        trade.setAnnualGrossBusiness(convertToBigDecimal(data.getAnnualGrossBusiness()));
        trade.setAnnualTurnOver(convertToBigDecimal(data.getAnnualTurnover()));
        trade.setAvgWorkersMonthly(data.getMonthlyAvgWorkers());
        trade.setAvgEmployeesMonthly(data.getMonthlyAvgEmployees());
        trade.setVatNumber(data.getVatNumber());
        trade.setCstNumber(data.getCstNumber());
        trade.setGstNumber(data.getGstNumber());
        trade.setTaxiCount(data.getTaxis());
        trade.setThreeWheelerCount(data.getThreeWheelers());
        trade.setLmvCount(data.getLightMotorVehicles());
        trade.setGoodVehicleCount(data.getGoodVehicles());
        trade.setTruckCount(data.getTrucks());
        trade.setBusCount(data.getBuses());
        trade.setEngagedWithStateSociety(data.getStateLevelSociety());
        trade.setEngagedWithDistrictSociety(data.getDistrictLevelSociety());
        
        tradeDetailsRepository.save(trade);
    }
    
    private void saveCallingDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantCallingDetails calling = new TempApplicantCallingDetails();
        calling.setApplicationId(applicationId);
        calling.setCommencementDate(data.getCommencementDate());
        calling.setPeriodOfStanding(data.getPeriodOfStanding());
        calling.setPan(data.getPanTan());
        calling.setAnnualGrossBusiness(convertToBigDecimal(data.getAnnualGrossBusiness()));
        calling.setAvgWorkersMonthly(data.getMonthlyAvgWorkers());
        calling.setAvgEmployeesMonthly(data.getMonthlyAvgEmployees());
        calling.setVatNumber(data.getVatNumber());
        calling.setCstNumber(data.getCstNumber());
        calling.setGstNumber(data.getGstNumber());
        calling.setEngagedWithStateSociety(data.getStateLevelSociety());
        calling.setEngagedWithDistrictSociety(data.getDistrictLevelSociety());
        
        callingDetailsRepository.save(calling);
    }
    
    private void saveEmploymentDetails(EnrolmentSubmissionDTO data, String applicationId) {
        TempApplicantEmploymentDetails employment = new TempApplicantEmploymentDetails();
        employment.setApplicationId(applicationId);
        employment.setCommencementDate(data.getCommencementDate());
        employment.setPeriodOfStanding(data.getPeriodOfStanding());
        employment.setPan(data.getPanTan());
        employment.setVatNumber(data.getVatNumber());
        employment.setCstNumber(data.getCstNumber());
        employment.setGstNumber(data.getGstNumber());
        employment.setEmployerName(data.getEmployerName());
        employment.setEmployerAddress(data.getEmployerAddress());
        employment.setMonthlySalary(convertToBigDecimal(data.getMonthlySalary()));
        employment.setEngagedWithMultipleEmployer(data.getMultipleEmployers());
        
        employmentDetailsRepository.save(employment);
        
        // Save additional employers if any
        if (data.getAdditionalEmployers() != null && !data.getAdditionalEmployers().isEmpty()) {
            data.getAdditionalEmployers().forEach(employer -> {
                TempApplicantEmploymentEmployers empEmployer = new TempApplicantEmploymentEmployers();
                empEmployer.setApplicationId(applicationId);
                empEmployer.setEmployerName(employer.getName());
                empEmployer.setEmployerAddress(employer.getAddress());
                empEmployer.setMonthlySalary(employer.getMonthlySalary() != null ? employer.getMonthlySalary().doubleValue() : null);
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
            
            // Generate temporary application ID (15 characters max)
            long timestamp = System.currentTimeMillis();
            String shortTimestamp = String.valueOf(timestamp).substring(6); // Last 7 digits
            String applicationId = "TEMP" + shortTimestamp; // 4 + 7 = 11 characters
            
            // Create temporary enrolment record
            TempApplicantEnrolmentDetails tempEnrolment = new TempApplicantEnrolmentDetails();
            tempEnrolment.setApplicationId(applicationId);
            tempEnrolment.setApplyingAsIndividual("Individual".equals(enrolmentData.getApplicantType()));
            tempEnrolment.setName(enrolmentData.getName());
            tempEnrolment.setGender(enrolmentData.getGender());
            tempEnrolment.setFatherName(enrolmentData.getFatherName());
            tempEnrolment.setPan(enrolmentData.getPan());
            tempEnrolment.setMobile(enrolmentData.getMobile());
            tempEnrolment.setEmail(enrolmentData.getEmail());
            tempEnrolment.setBusinessName(enrolmentData.getEstablishmentName());
            tempEnrolment.setJurisdictionCode(enrolmentData.getJurisdictionArea());
            tempEnrolment.setChargeCode(enrolmentData.getCharge());
            tempEnrolment.setDistrictLgdCode(parseInteger(enrolmentData.getDistrict()));
            tempEnrolment.setPincode(enrolmentData.getPincode());
            tempEnrolment.setAddressText(enrolmentData.getEstablishmentAddress());
            tempEnrolment.setPtaxCategory(parseInteger(enrolmentData.getCategory()));
            tempEnrolment.setPtaxSubcategory(parseInteger(enrolmentData.getSubcategory()));
            tempEnrolment.setEngagedWithProfession(enrolmentData.getEngagedWithProfession());
            tempEnrolment.setEngagedWithTrade(enrolmentData.getEngagedWithTrade());
            tempEnrolment.setEngagedWithCalling(enrolmentData.getEngagedWithCalling());
            tempEnrolment.setEngagedWithEmployement(enrolmentData.getEngagedWithEmployment());
            tempEnrolment.setStatus(false); // Mark as temporary/incomplete
            
            enrolmentDetailsRepository.save(tempEnrolment);
            
            return ApiResponse.success("Application saved temporarily", applicationId);
            
        } catch (Exception e) {
            return ApiResponse.error("Failed to save temporary application: " + e.getMessage());
        }
    }
}
