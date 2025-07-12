import { EnrollmentState } from "@/types/enrollment";

/**
 * Transforms frontend EnrollmentState to backend EnrolmentSubmissionDTO
 */
export function transformEnrollmentData(state: EnrollmentState): any {
  const {
    personalInfo,
    establishmentInfo,
    engagementFlags,
    professionalDetails,
    taxRegistrations,
    vehicleDetails,
    employmentDetails,
    societyDetails,
  } = state;

  return {
    // Personal Information
    applicantType: personalInfo.applicantType,
    name: personalInfo.name,
    gender: personalInfo.gender,
    fatherName: personalInfo.fatherName,
    pan: personalInfo.pan,
    mobile: personalInfo.mobile,
    email: personalInfo.email,
    
    // Establishment Information
    establishmentName: establishmentInfo.establishmentName,
    jurisdictionArea: establishmentInfo.jurisdictionArea,
    charge: establishmentInfo.charge,
    district: establishmentInfo.district,
    pincode: establishmentInfo.pincode,
    establishmentAddress: establishmentInfo.establishmentAddress,
    additionalEstablishments: establishmentInfo.additionalEstablishments,
    category: establishmentInfo.category,
    subcategory: establishmentInfo.subcategory,
    
    // Engagement flags
    engagedWithProfession: engagementFlags.engagedWithProfession,
    engagedWithTrade: engagementFlags.engagedWithTrade,
    engagedWithCalling: engagementFlags.engagedWithCalling,
    engagedWithEmployment: engagementFlags.engagedWithEmployment,
    
    // Professional Details (conditional)
    commencementDate: professionalDetails?.commencementDate,
    periodOfStanding: professionalDetails?.periodOfStanding,
    panTan: professionalDetails?.panTan,
    annualGrossBusiness: professionalDetails?.annualGrossBusiness,
    annualTurnover: professionalDetails?.annualTurnover,
    monthlyAvgWorkers: professionalDetails?.monthlyAvgWorkers,
    monthlyAvgEmployees: professionalDetails?.monthlyAvgEmployees,
    
    // Tax registrations
    vatRegistered: taxRegistrations?.vatRegistered,
    vatNumber: taxRegistrations?.vatNumber,
    cstRegistered: taxRegistrations?.cstRegistered,
    cstNumber: taxRegistrations?.cstNumber,
    gstRegistered: taxRegistrations?.gstRegistered,
    gstNumber: taxRegistrations?.gstNumber,
    
    // Vehicle Details
    taxis: vehicleDetails?.taxis,
    threeWheelers: vehicleDetails?.threeWheelers,
    lightMotorVehicles: vehicleDetails?.lightMotorVehicles,
    goodVehicles: vehicleDetails?.goodVehicles,
    trucks: vehicleDetails?.trucks,
    buses: vehicleDetails?.buses,
    
    // Employment Details
    employerName: employmentDetails?.employerName,
    employerAddress: employmentDetails?.employerAddress,
    monthlySalary: employmentDetails?.monthlySalary,
    multipleEmployers: employmentDetails?.multipleEmployers,
    additionalEmployers: employmentDetails?.additionalEmployers,
    
    // Co-operative Society
    stateLevelSociety: societyDetails?.stateLevelSociety,
    districtLevelSociety: societyDetails?.districtLevelSociety,
    
    // Captcha
    captchaValue: personalInfo.captchaValue,
  };
}

/**
 * Transforms backend response to frontend EnrollmentState
 */
export function transformBackendData(backendData: any): Partial<EnrollmentState> {
  return {
    personalInfo: {
      applicantType: backendData.applicantType,
      name: backendData.name,
      gender: backendData.gender,
      fatherName: backendData.fatherName,
      pan: backendData.pan,
      mobile: backendData.mobile,
      email: backendData.email,
      captchaValue: backendData.captchaValue,
    },
    establishmentInfo: {
      establishmentName: backendData.establishmentName,
      jurisdictionArea: backendData.jurisdictionArea,
      charge: backendData.charge,
      district: backendData.district,
      pincode: backendData.pincode,
      establishmentAddress: backendData.establishmentAddress,
      additionalEstablishments: backendData.additionalEstablishments || [],
      category: backendData.category,
      subcategory: backendData.subcategory,
    },
    engagementFlags: {
      engagedWithProfession: backendData.engagedWithProfession,
      engagedWithTrade: backendData.engagedWithTrade,
      engagedWithCalling: backendData.engagedWithCalling,
      engagedWithEmployment: backendData.engagedWithEmployment,
    },
    professionalDetails: {
      commencementDate: backendData.commencementDate,
      periodOfStanding: backendData.periodOfStanding,
      panTan: backendData.panTan,
      annualGrossBusiness: backendData.annualGrossBusiness,
      annualTurnover: backendData.annualTurnover,
      monthlyAvgWorkers: backendData.monthlyAvgWorkers,
      monthlyAvgEmployees: backendData.monthlyAvgEmployees,
    },
    taxRegistrations: {
      vatRegistered: backendData.vatRegistered,
      vatNumber: backendData.vatNumber,
      cstRegistered: backendData.cstRegistered,
      cstNumber: backendData.cstNumber,
      gstRegistered: backendData.gstRegistered,
      gstNumber: backendData.gstNumber,
    },
    vehicleDetails: {
      taxis: backendData.taxis,
      threeWheelers: backendData.threeWheelers,
      lightMotorVehicles: backendData.lightMotorVehicles,
      goodVehicles: backendData.goodVehicles,
      trucks: backendData.trucks,
      buses: backendData.buses,
    },
    employmentDetails: {
      employerName: backendData.employerName,
      employerAddress: backendData.employerAddress,
      monthlySalary: backendData.monthlySalary,
      multipleEmployers: backendData.multipleEmployers,
      additionalEmployers: backendData.additionalEmployers || [],
    },
    societyDetails: {
      stateLevelSociety: backendData.stateLevelSociety,
      districtLevelSociety: backendData.districtLevelSociety,
    },
    applicationId: backendData.applicationId,
  };
}
