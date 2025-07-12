export interface EnrollmentState {
  currentStep: number;
  totalSteps: number;
  personalInfo: {
    applicantType: 'Individual' | 'Others';
    name: string;
    gender: 'male' | 'female' | 'other';
    fatherName: string;
    pan: string;
    mobile: string;
    email: string;
    captchaValue: string;
  };
  establishmentInfo: {
    establishmentName: string;
    jurisdictionArea: string;
    charge: string;
    district: string;
    pincode: string;
    establishmentAddress: string;
    additionalEstablishments: Array<{
      name: string;
      address: string;
    }>;
    category: string;
    subcategory: string;
  };
  engagementFlags: {
    engagedWithProfession: boolean;
    engagedWithTrade: boolean;
    engagedWithCalling: boolean;
    engagedWithEmployment: boolean;
  };
  professionalDetails?: {
    commencementDate?: string;
    periodOfStanding?: string;
    panTan?: string;
    annualGrossBusiness?: number;
    annualTurnover?: number;
    monthlyAvgWorkers?: number;
    monthlyAvgEmployees?: number;
  };
  taxRegistrations?: {
    vatRegistered?: boolean;
    vatNumber?: string;
    cstRegistered?: boolean;
    cstNumber?: string;
    gstRegistered?: boolean;
    gstNumber?: string;
  };
  vehicleDetails?: {
    taxis?: number;
    threeWheelers?: number;
    lightMotorVehicles?: number;
    goodVehicles?: number;
    trucks?: number;
    buses?: number;
  };
  employmentDetails?: {
    employerName?: string;
    employerAddress?: string;
    monthlySalary?: number;
    multipleEmployers?: boolean;
    additionalEmployers?: Array<{
      name: string;
      address: string;
      monthlySalary: number;
    }>;
  };
  societyDetails?: {
    stateLevelSociety?: boolean;
    districtLevelSociety?: boolean;
  };
  mobileOtpVerified: boolean;
  finalOtpVerified: boolean;
  applicationId?: string;
}

// Updated to match your PostgreSQL schema structure
export interface MasterDataItem {
  id: number;
  code: string;
  name: string;
  parentCode?: string;
  isActive?: boolean;
}

export interface DistrictItem {
  district_lgd_code: number;
  district_name: string;
  local_code: number;
}

export interface AreaItem {
  code: string;
  name_en: string;
  name_bn?: string;
}

export interface ChargeItem {
  code: string;
  charge: string;
  area_code: string;
  charge_sn: number;
}

export interface CategoryItem {
  cat_id: number;
  cat_description: string;
}

export interface SubcategoryItem {
  cat_code: number;
  cat_description: string;
  subcat_code: number;
  subcat_description: string;
  is_visible: number;
}

export interface BackendCategoryItem {
  cat_id: number;
  cat_description: string;
}

export interface BackendSubcategoryItem {
  cat_code: number;
  cat_description: string;
  subcat_code: number;
  subcat_description: string;
  is_visible: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface OtpRequest {
  mobile: string;
  type: 'mobile' | 'final';
}

export interface OtpVerification {
  mobile: string;
  otp: string;
  type: 'mobile' | 'final';
}
