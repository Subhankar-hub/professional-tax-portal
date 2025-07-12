import { useEffect, useCallback } from "react";
import { useEnrollment } from "@/hooks/useEnrollment";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StepIndicator from "@/components/enrollment/StepIndicator";
import PersonalInfoStep from "@/components/enrollment/PersonalInfoStep";
import OTPVerificationStep from "@/components/enrollment/OTPVerificationStep";
import EstablishmentInfoStep from "@/components/enrollment/EstablishmentInfoStep";
import EstablishmentTypeStep from "@/components/enrollment/EstablishmentTypeStep";
import DetailedInfoStep from "@/components/enrollment/DetailedInfoStep";
import ReviewStep from "@/components/enrollment/ReviewStep";
import FinalOTPStep from "@/components/enrollment/FinalOTPStep";
import ConfirmationStep from "@/components/enrollment/ConfirmationStep";
import { useToast } from "@/hooks/use-toast";
import type { PersonalInfo, EstablishmentInfo, EstablishmentType, DetailedInfo } from "@shared/schema";

export default function EnrollmentPage() {
  const { enrollmentState, masterData, mutations, actions } = useEnrollment();
  const { toast } = useToast();

  // Auto-save every 30 seconds (temporarily disabled)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (enrollmentState.currentStep > 1 && enrollmentState.currentStep < 8) {
  //       actions.autoSave();
  //     }
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, [enrollmentState.currentStep, actions]);

  // Handle page unload warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (enrollmentState.currentStep > 1 && enrollmentState.currentStep < 8) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [enrollmentState.currentStep]);

  // Step 1: Personal Information
  const handlePersonalInfoNext = (data: PersonalInfo) => {
    actions.updatePersonalInfo(data);
    actions.nextStep();
  };

  // Step 2: OTP Verification
  const handleOTPNext = () => {
    actions.setMobileOtpVerified(true);
    actions.nextStep();
  };

  const handleSendOtp = useCallback(async (data: { mobile: string; type: 'mobile' | 'final' }) => {
    await mutations.sendOtp.mutateAsync(data);
  }, [mutations.sendOtp]);

  const handleVerifyOtp = useCallback(async (data: { mobile: string; otp: string; type: 'mobile' | 'final' }) => {
    try {
      const response = await mutations.verifyOtp.mutateAsync(data);
      return response?.success || false;
    } catch (error) {
      return false;
    }
  }, [mutations.verifyOtp]);

  // Step 3: Establishment Information
  const handleEstablishmentInfoNext = (data: EstablishmentInfo) => {
    actions.updateEstablishmentInfo(data);
    actions.nextStep();
  };

  const handleDistrictChange = (districtCode: string) => {
    actions.updateEstablishmentInfo({ 
      district: districtCode,
      jurisdictionArea: '',
      charge: ''
    });
  };

  const handleAreaChange = (areaCode: string) => {
    actions.updateEstablishmentInfo({ 
      jurisdictionArea: areaCode,
      charge: ''
    });
  };

  const handleCategoryChange = (categoryId: number) => {
    actions.updateEstablishmentInfo({ 
      category: categoryId.toString(),
      subcategory: ''
    });
  };

  // Step 4: Establishment Type
  const handleEstablishmentTypeNext = (data: EstablishmentType) => {
    actions.updateEstablishmentType(data);
    actions.nextStep();
  };

  // Step 5: Detailed Information
  const handleDetailedInfoNext = (data: DetailedInfo) => {
    actions.updateDetailedInfo(data);
    actions.nextStep();
  };

  // Step 6: Review
  const handleReviewNext = () => {
    actions.nextStep();
  };

  const handleEdit = () => {
    // Go back to step 1 for editing
    actions.updatePersonalInfo({ ...enrollmentState.personalInfo });
    // Reset to step 1
    while (enrollmentState.currentStep > 1) {
      actions.prevStep();
    }
  };

  // Step 7: Final OTP
  const handleFinalOTPNext = async () => {
    actions.setFinalOtpVerified(true);
    
    try {
      // Transform and submit the enrollment
      const { transformEnrollmentData } = await import('@/lib/dataTransform');
      const transformedData = transformEnrollmentData(enrollmentState);
      await mutations.submitEnrollment.mutateAsync(transformedData);
      actions.nextStep();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit enrollment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderCurrentStep = () => {
    switch (enrollmentState.currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={enrollmentState.personalInfo}
            onNext={handlePersonalInfoNext}
          />
        );
      
      case 2:
        return (
          <OTPVerificationStep
            mobile={enrollmentState.personalInfo.mobile}
            userName={enrollmentState.personalInfo.name}
            onNext={handleOTPNext}
            onPrev={actions.prevStep}
            onSendOtp={handleSendOtp}
            onVerifyOtp={handleVerifyOtp}
            isVerifying={mutations.verifyOtp.isPending}
            isSending={mutations.sendOtp.isPending}
          />
        );
      
      case 3:
        return (
          <EstablishmentInfoStep
            data={enrollmentState.establishmentInfo}
            masterData={masterData}
            onNext={handleEstablishmentInfoNext}
            onPrev={actions.prevStep}
            onDistrictChange={handleDistrictChange}
            onAreaChange={handleAreaChange}
            onCategoryChange={handleCategoryChange}
          />
        );
      
      case 4:
        return (
          <EstablishmentTypeStep
            data={enrollmentState.establishmentType}
            onNext={handleEstablishmentTypeNext}
            onPrev={actions.prevStep}
          />
        );
      
      case 5:
        return (
          <DetailedInfoStep
            data={enrollmentState.detailedInfo}
            periodOptions={masterData.periodOptions}
            onNext={handleDetailedInfoNext}
            onPrev={actions.prevStep}
          />
        );
      
      case 6:
        return (
          <ReviewStep
            data={enrollmentState}
            onNext={handleReviewNext}
            onPrev={actions.prevStep}
            onEdit={handleEdit}
          />
        );
      
      case 7:
        return (
          <FinalOTPStep
            mobileNumber={enrollmentState.personalInfo.mobile}
            onNext={handleFinalOTPNext}
            onSendOtp={handleSendOtp}
            onVerifyOtp={handleVerifyOtp}
            isVerifying={mutations.verifyOtp.isPending}
            isSending={mutations.sendOtp.isPending}
          />
        );
      
      case 8:
        return (
          <ConfirmationStep
            data={enrollmentState}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <StepIndicator 
        currentStep={enrollmentState.currentStep} 
        totalSteps={enrollmentState.totalSteps} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {renderCurrentStep()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
