import { apiRequest } from "./queryClient";
import type { 
  ApiResponse, 
  MasterDataItem, 
  OtpRequest, 
  OtpVerification,
  EnrollmentState
} from "@/types/enrollment";

export const api = {
  // OTP APIs
  sendOtp: async (data: OtpRequest): Promise<ApiResponse<string>> => {
    const response = await apiRequest('POST', '/api/otp/send', data);
    return response.json();
  },

  verifyOtp: async (data: OtpVerification): Promise<ApiResponse<string>> => {
    const response = await apiRequest('POST', '/api/otp/verify', data);
    return response.json();
  },

  // Master Data APIs - Updated to match your Spring Boot backend
  getAllMasterData: async (): Promise<ApiResponse<any>> => {
    const response = await apiRequest('GET', '/api/master-data/all');
    return response.json();
  },

  getDistricts: async (): Promise<ApiResponse<any>> => {
    const response = await apiRequest('GET', '/api/master-data/districts');
    return response.json();
  },

  getAreasByDistrict: async (districtCode: string): Promise<ApiResponse<any>> => {
    const response = await apiRequest('GET', `/api/master-data/areas/${districtCode}`);
    return response.json();
  },

  getChargesByArea: async (areaCode: string): Promise<ApiResponse<any>> => {
    const response = await apiRequest('GET', `/api/master-data/charges/${areaCode}`);
    return response.json();
  },

  getCategories: async (): Promise<ApiResponse<any>> => {
    const response = await apiRequest('GET', '/api/master-data/categories');
    return response.json();
  },

  getSubcategoriesByCategory: async (categoryId: number): Promise<ApiResponse<any>> => {
    const response = await apiRequest('GET', `/api/master-data/subcategories/${categoryId}`);
    return response.json();
  },

  getPeriodOfStandingOptions: async (): Promise<ApiResponse<any>> => {
    const response = await apiRequest('GET', '/api/master-data/period-of-standing');
    return response.json();
  },

  // Enrollment APIs
  saveTemporaryEnrollment: async (data: any): Promise<ApiResponse<string>> => {
    const response = await apiRequest('POST', '/api/enrolment/temp-save', data);
    return response.json();
  },

  submitEnrollment: async (data: any): Promise<ApiResponse<string>> => {
    const response = await apiRequest('POST', '/api/enrolment', data);
    return response.json();
  },

  getEnrollment: async (applicationId: string): Promise<ApiResponse<any>> => {
    const response = await apiRequest('GET', `/api/enrolment/${applicationId}`);
    return response.json();
  },
};
