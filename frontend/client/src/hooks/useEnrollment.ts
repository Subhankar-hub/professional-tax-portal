import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { transformEnrollmentData } from '@/lib/dataTransform';
import type { EnrollmentState, MasterDataItem } from '@/types/enrollment';

const initialState: EnrollmentState = {
  currentStep: 1,
  totalSteps: 8,
  personalInfo: {
    applicantType: 'Individual',
    name: '',
    gender: 'male',
    fatherName: '',
    pan: '',
    mobile: '',
    email: '',
    captchaValue: '',
  },
  establishmentInfo: {
    establishmentName: '',
    jurisdictionArea: '',
    charge: '',
    district: '',
    pincode: '',
    establishmentAddress: '',
    additionalEstablishments: [],
    category: '',
    subcategory: '',
  },
  engagementFlags: {
    engagedWithProfession: false,
    engagedWithTrade: false,
    engagedWithCalling: false,
    engagedWithEmployment: false,
  },
  establishmentType: {
    engagementTypes: [],
  },
  detailedInfo: {
    dateOfCommencement: '',
    periodOfStanding: '',
    registeredUnderVAT: '',
    registeredUnderCST: '',
    registeredUnderGST: '',
    employerName: '',
    employerAddress: '',
    applicantSalary: '',
    simultaneousEmployment: false,
  },
  professionalDetails: {
    commencementDate: '',
    periodOfStanding: '',
    panTan: '',
    annualGrossBusiness: 0,
    annualTurnover: 0,
    monthlyAvgWorkers: 0,
    monthlyAvgEmployees: 0,
  },
  taxRegistrations: {
    vatRegistered: false,
    vatNumber: '',
    cstRegistered: false,
    cstNumber: '',
    gstRegistered: false,
    gstNumber: '',
  },
  vehicleDetails: {
    taxis: 0,
    threeWheelers: 0,
    lightMotorVehicles: 0,
    goodVehicles: 0,
    trucks: 0,
    buses: 0,
  },
  employmentDetails: {
    employerName: '',
    employerAddress: '',
    monthlySalary: 0,
    multipleEmployers: false,
    additionalEmployers: [],
  },
  societyDetails: {
    stateLevelSociety: false,
    districtLevelSociety: false,
  },
  mobileOtpVerified: false,
  finalOtpVerified: false,
};

export function useEnrollment() {
  const [enrollmentState, setEnrollmentState] = useState<EnrollmentState>(initialState);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Master data queries
  const { data: masterData } = useQuery({
    queryKey: ['/api/master-data/all'],
    queryFn: api.getAllMasterData,
    select: (response) => {
      const { data } = response;
      if (response.data) {
        data.districts = data.districts?.map(d => ({
          district_lgd_code: d.districtLgdCode,
          district_name: d.districtName,
          local_code: d.localCode
        }));
        data.categories = data.categories?.map(c => ({
          cat_id: c.catId,
          cat_description: c.catDescription
        }));
      }
      return data;
    },
  });

  const { data: districts, isLoading: isLoadingDistricts, error: districtError } = useQuery({
    queryKey: ['/api/master-data/districts'],
    queryFn: api.getDistricts,
    select: (response) => {
      console.log('Districts API response:', response);
      return response.data?.map(d => ({
        district_lgd_code: d.districtLgdCode,
        district_name: d.districtName,
        local_code: d.localCode
      })) || [];
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { data: areas } = useQuery({
    queryKey: ['/api/master-data/areas', enrollmentState.establishmentInfo.district],
    queryFn: () => api.getAreasByDistrict(enrollmentState.establishmentInfo.district),
    enabled: !!enrollmentState.establishmentInfo.district,
    select: (response) => {
      return response.data?.map(a => ({
        code: a.code,
        name_en: a.nameEn,
        name_bn: a.nameBn
      })) || [];
    },
  });

  const { data: charges } = useQuery({
    queryKey: ['/api/master-data/charges', enrollmentState.establishmentInfo.jurisdictionArea],
    queryFn: () => api.getChargesByArea(enrollmentState.establishmentInfo.jurisdictionArea),
    enabled: !!enrollmentState.establishmentInfo.jurisdictionArea,
    select: (response) => {
      return response.data?.map(c => ({
        code: c.code,
        charge: c.charge,
        area_code: c.areaCode,
        charge_sn: c.chargeSn
      })) || [];
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['/api/master-data/categories'],
    queryFn: api.getCategories,
    select: (response) => {
      return response.data?.map(c => ({
        cat_id: c.catId,
        cat_description: c.catDescription
      })) || [];
    },
  });

  const { data: subcategories } = useQuery({
    queryKey: ['/api/master-data/subcategories', enrollmentState.establishmentInfo.category],
    queryFn: () => api.getSubcategoriesByCategory(parseInt(enrollmentState.establishmentInfo.category)),
    enabled: !!enrollmentState.establishmentInfo.category,
    select: (response) => {
      return response.data?.map(s => ({
        subcat_code: s.subcatCode,
        subcat_description: s.subcatDescription,
        cat_code: s.catCode,
        is_visible: s.isVisible
      })) || [];
    },
  });

  const { data: periodOptions } = useQuery({
    queryKey: ['/api/master-data/period-of-standing'],
    queryFn: api.getPeriodOfStandingOptions,
    select: (response) => {
      console.log('Period options API response:', response);
      return response.data?.map((option: string, index: number) => ({
        id: index + 1,
        code: option,
        name: option
      })) || [];
    },
  });

  // OTP mutations
  const sendOtpMutation = useMutation({
    mutationFn: api.sendOtp,
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: api.verifyOtp,
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return false;
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Enrollment mutations
  const saveTemporaryMutation = useMutation({
    mutationFn: api.saveTemporaryEnrollment,
    onSuccess: (response) => {
      if (response.success) {
        setEnrollmentState(prev => ({ ...prev, applicationId: response.data }));
        toast({
          title: "Success",
          description: "Progress saved successfully",
        });
      }
    },
  });

  const submitEnrollmentMutation = useMutation({
    mutationFn: api.submitEnrollment,
    onSuccess: (response) => {
      if (response.success) {
        setEnrollmentState(prev => ({ ...prev, applicationId: response.data }));
        toast({
          title: "Success",
          description: "Enrollment submitted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    },
  });

  // State management functions
  const updatePersonalInfo = useCallback((data: Partial<EnrollmentState['personalInfo']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));
  }, []);

  const updateEstablishmentInfo = useCallback((data: Partial<EnrollmentState['establishmentInfo']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      establishmentInfo: { ...prev.establishmentInfo, ...data }
    }));
  }, []);

  const updateEngagementFlags = useCallback((data: Partial<EnrollmentState['engagementFlags']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      engagementFlags: { ...prev.engagementFlags, ...data }
    }));
  }, []);

  const updateEstablishmentType = useCallback((data: Partial<EnrollmentState['establishmentType']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      establishmentType: { ...prev.establishmentType, ...data }
    }));
  }, []);

  const updateDetailedInfo = useCallback((data: Partial<EnrollmentState['detailedInfo']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      detailedInfo: { ...prev.detailedInfo, ...data }
    }));
  }, []);

  const updateProfessionalDetails = useCallback((data: Partial<EnrollmentState['professionalDetails']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      professionalDetails: { ...prev.professionalDetails, ...data }
    }));
  }, []);

  const updateTaxRegistrations = useCallback((data: Partial<EnrollmentState['taxRegistrations']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      taxRegistrations: { ...prev.taxRegistrations, ...data }
    }));
  }, []);

  const updateVehicleDetails = useCallback((data: Partial<EnrollmentState['vehicleDetails']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      vehicleDetails: { ...prev.vehicleDetails, ...data }
    }));
  }, []);

  const updateEmploymentDetails = useCallback((data: Partial<EnrollmentState['employmentDetails']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      employmentDetails: { ...prev.employmentDetails, ...data }
    }));
  }, []);

  const updateSocietyDetails = useCallback((data: Partial<EnrollmentState['societyDetails']>) => {
    setEnrollmentState(prev => ({
      ...prev,
      societyDetails: { ...prev.societyDetails, ...data }
    }));
  }, []);

  const nextStep = useCallback(() => {
    setEnrollmentState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps)
    }));
  }, []);

  const prevStep = useCallback(() => {
    setEnrollmentState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  }, []);

  const setMobileOtpVerified = useCallback((verified: boolean) => {
    setEnrollmentState(prev => ({ ...prev, mobileOtpVerified: verified }));
  }, []);

  const setFinalOtpVerified = useCallback((verified: boolean) => {
    setEnrollmentState(prev => ({ ...prev, finalOtpVerified: verified }));
  }, []);

  // Auto-save functionality
  const autoSave = useCallback(() => {
    if (enrollmentState.currentStep > 1 && enrollmentState.personalInfo.mobile && enrollmentState.personalInfo.name) {
      // Only auto-save if we have basic required data
      const transformedData = transformEnrollmentData(enrollmentState);
      saveTemporaryMutation.mutate(transformedData);
    }
  }, [enrollmentState, saveTemporaryMutation]);

  return {
    enrollmentState,
    masterData: {
      districts,
      areas,
      charges,
      categories,
      subcategories,
      periodOptions,
    },
    mutations: {
      sendOtp: sendOtpMutation,
      verifyOtp: verifyOtpMutation,
      saveTemporary: saveTemporaryMutation,
      submitEnrollment: submitEnrollmentMutation,
    },
    actions: {
      updatePersonalInfo,
      updateEstablishmentInfo,
      updateEngagementFlags,
      updateEstablishmentType,
      updateDetailedInfo,
      updateProfessionalDetails,
      updateTaxRegistrations,
      updateVehicleDetails,
      updateEmploymentDetails,
      updateSocietyDetails,
      nextStep,
      prevStep,
      setMobileOtpVerified,
      setFinalOtpVerified,
      autoSave,
    },
  };
}
