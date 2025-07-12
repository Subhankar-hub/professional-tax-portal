
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
        
        // Save additional establishments (up to 5)
        if (data.getAdditionalEstablishments() != null && !data.getAdditionalEstablishments().isEmpty()) {
            var establishments = data.getAdditionalEstablishments();
            for (int i = 0; i < Math.min(establishments.size(), 5); i++) {
                var establishment = establishments.get(i);
                switch (i) {
                    case 0:
                        enrolment.setEstablishment1Name(establishment.getName());
                        enrolment.setEstablishment1Address(establishment.getAddress());
                        break;
                    case 1:
                        enrolment.setEstablishment2Name(establishment.getName());
                        enrolment.setEstablishment2Address(establishment.getAddress());
                        break;
                    case 2:
                        enrolment.setEstablishment3Name(establishment.getName());
                        enrolment.setEstablishment3Address(establishment.getAddress());
                        break;
                    case 3:
                        enrolment.setEstablishment4Name(establishment.getName());
                        enrolment.setEstablishment4Address(establishment.getAddress());
                        break;
                    case 4:
                        enrolment.setEstablishment5Name(establishment.getName());
                        enrolment.setEstablishment5Address(establishment.getAddress());
                        break;
                }
            }
        }
        
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
            
            // Check if enrolment already exists for this mobile
            var existingEnrolment = enrolmentDetailsRepository.findByMobile(enrolmentData.getMobile());
            String applicationId;
            TempApplicantEnrolmentDetails tempEnrolment;
            
            if (existingEnrolment.isPresent() && existingEnrolment.get().getApplicationId().startsWith("TEMP")) {
                // Update existing temporary record
                tempEnrolment = existingEnrolment.get();
                applicationId = tempEnrolment.getApplicationId();
            } else {
                // Generate temporary application ID (15 characters max)
                long timestamp = System.currentTimeMillis();
                String shortTimestamp = String.valueOf(timestamp).substring(6); // Last 7 digits
                applicationId = "TEMP" + shortTimestamp; // 4 + 7 = 11 characters
                
                tempEnrolment = new TempApplicantEnrolmentDetails();
                tempEnrolment.setApplicationId(applicationId);
            }
            
            // Update enrolment record with latest data
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
            
            // Save additional establishments (up to 5) for temporary save as well
            if (enrolmentData.getAdditionalEstablishments() != null && !enrolmentData.getAdditionalEstablishments().isEmpty()) {
                var establishments = enrolmentData.getAdditionalEstablishments();
                for (int i = 0; i < Math.min(establishments.size(), 5); i++) {
                    var establishment = establishments.get(i);
                    switch (i) {
                        case 0:
                            tempEnrolment.setEstablishment1Name(establishment.getName());
                            tempEnrolment.setEstablishment1Address(establishment.getAddress());
                            break;
                        case 1:
                            tempEnrolment.setEstablishment2Name(establishment.getName());
                            tempEnrolment.setEstablishment2Address(establishment.getAddress());
                            break;
                        case 2:
                            tempEnrolment.setEstablishment3Name(establishment.getName());
                            tempEnrolment.setEstablishment3Address(establishment.getAddress());
                            break;
                        case 3:
                            tempEnrolment.setEstablishment4Name(establishment.getName());
                            tempEnrolment.setEstablishment4Address(establishment.getAddress());
                            break;
                        case 4:
                            tempEnrolment.setEstablishment5Name(establishment.getName());
                            tempEnrolment.setEstablishment5Address(establishment.getAddress());
                            break;
                    }
                }
            }
            
            tempEnrolment.setStatus(false); // Mark as temporary/incomplete
            
            enrolmentDetailsRepository.save(tempEnrolment);
            
            // Save specific engagement details if provided
            if (Boolean.TRUE.equals(enrolmentData.getEngagedWithProfession()) && hasValidProfessionData(enrolmentData)) {
                saveProfessionDetails(enrolmentData, applicationId);
            }
            
            if (Boolean.TRUE.equals(enrolmentData.getEngagedWithTrade()) && hasValidTradeData(enrolmentData)) {
                saveTradeDetails(enrolmentData, applicationId);
            }
            
            if (Boolean.TRUE.equals(enrolmentData.getEngagedWithCalling()) && hasValidCallingData(enrolmentData)) {
                saveCallingDetails(enrolmentData, applicationId);
            }
            
            if (Boolean.TRUE.equals(enrolmentData.getEngagedWithEmployment()) && hasValidEmploymentData(enrolmentData)) {
                saveEmploymentDetails(enrolmentData, applicationId);
            }
            
            return ApiResponse.success("Application saved temporarily", applicationId);
            
        } catch (Exception e) {
            return ApiResponse.error("Failed to save temporary application: " + e.getMessage());
        }
    }
    
    private boolean hasValidProfessionData(EnrolmentSubmissionDTO data) {
        return data.getCommencementDate() != null || data.getPeriodOfStanding() != null || data.getAnnualGrossBusiness() != null;
    }
    
    private boolean hasValidTradeData(EnrolmentSubmissionDTO data) {
        return data.getCommencementDate() != null || data.getPeriodOfStanding() != null || data.getAnnualGrossBusiness() != null || data.getAnnualTurnover() != null;
    }
    
    private boolean hasValidCallingData(EnrolmentSubmissionDTO data) {
        return data.getCommencementDate() != null || data.getPeriodOfStanding() != null || data.getAnnualGrossBusiness() != null;
    }
    
    private boolean hasValidEmploymentData(EnrolmentSubmissionDTO data) {
        return data.getCommencementDate() != null || data.getPeriodOfStanding() != null || data.getEmployerName() != null || data.getEmployerAddress() != null || data.getMonthlySalary() != null;
    }
}
