import React, { useState } from 'react';
import Step1PersonalDetails from './Step1PersonalDetails';
import Step2OTPVerification from './Step2OTPVerification';
import Step3EstablishmentDetails from './Step3EstablishmentDetails';
import Step4EstablishmentType from './Step4EstablishmentType';
import Step5TypeSpecificDetails from './Step5TypeSpecificDetails';
import Step6ReviewSubmit from './Step6ReviewSubmit';
import Step7FinalOTPVerification from './Step7FinalOTPVerification';
import Step8Confirmation from './Step8Confirmation';
import './PTaxEnrollmentForm.css';

const PTaxEnrollmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    applicantType: 'Individual', // Individual or Others
    name: '',
    gender: 'Male',
    fatherName: '',
    pan: '',
    mobile: '',
    email: '',
    
    // Step 2: OTP Verification (Mobile)
    mobileOtp: '',
    mobileOtpVerified: false,
    
    // Step 3: Establishment Information
    establishmentName: '',
    jurisdictionArea: '',
    charge: '',
    district: '',
    pincode: '',
    establishmentAddress: '',
    additionalEstablishments: [],
    
    // Step 4: Choose Establishment Type
    establishmentType: '', // Profession, Trade, Calling, Employment
    category: '',
    subcategory: '',
    
    // Steps 5-6: Type-specific Details (Profession/Trade/Calling/Employment)
    // Professional Details
    commencementDate: '',
    periodOfStanding: '',
    annualGrossBusiness: '',
    annualTurnover: '', // For Trade only
    monthlyAvgWorkers: '',
    monthlyAvgEmployees: '',
    vatRegistered: false,
    vatNumber: '',
    cstRegistered: false,
    cstNumber: '',
    gstRegistered: false,
    gstNumber: '',
    
    // Vehicle Details (for transport-related categories)
    taxis: 0,
    threeWheelers: 0,
    lightMotorVehicles: 0,
    goodVehicles: 0,
    trucks: 0,
    buses: 0,
    
    // Employment Details
    employerName: '',
    employerAddress: '',
    monthlySalary: '',
    multipleEmployers: false,
    additionalEmployers: [],
    
    // Society engagement
    stateLevelSociety: false,
    districtLevelSociety: false,
    
    // Step 6: Review and Submit with Captcha
    captchaValue: '',
    captchaValid: false,
    declarationAccepted: false,
    
    // Step 7: OTP Verification (Final)
    finalOtp: '',
    finalOtpVerified: false,
    
    // Step 8: Confirmation
    applicationId: '',
    submitted: false
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    const newStep = Math.min(currentStep + 1, 8);
    setCurrentStep(newStep);
    setMaxStepReached(Math.max(maxStepReached, newStep));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    if (step <= maxStepReached) {
      setCurrentStep(step);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalDetails
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2OTPVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3EstablishmentDetails
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step4EstablishmentType
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <Step5TypeSpecificDetails
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return (
          <Step6ReviewSubmit
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            goToStep={goToStep}
          />
        );
      case 7:
        return (
          <Step7FinalOTPVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 8:
        return (
          <Step8Confirmation
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="ptax-enrollment-form">
      <div className="form-header">
        <div className="header-logos">
          <div className="government-logo">
            <img src="/api/placeholder/80/80" alt="Government of India" />
          </div>
          <div className="state-logo">
            <img src="/api/placeholder/80/80" alt="Government of Tripura" />
          </div>
        </div>
        <div className="header-text">
          <h1>Professional Tax</h1>
          <h2>Commissionerate of Taxes & Excise</h2>
          <h3>Government of Tripura</h3>
          <h4>New Enrolment Application</h4>
        </div>
      </div>
      
      <div className="step-indicator">
        <div className="step-header">
          <span className="step-number">Step: {currentStep} of 8</span>
        </div>
        <div className="step-progress">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <div 
              key={step} 
              className={`step-item ${
                currentStep === step ? 'active' : 
                step < currentStep ? 'completed' : 'pending'
              } ${
                step <= maxStepReached ? 'clickable' : ''
              }`}
              onClick={() => goToStep(step)}
            >
              <div className="step-circle">{step}</div>
              <div className="step-label">
                {step === 1 && 'Personal Details'}
                {step === 2 && 'OTP Verification'}
                {step === 3 && 'Establishment Info'}
                {step === 4 && 'Choose Type'}
                {step === 5 && 'Type Details'}
                {step === 6 && 'Review & Submit'}
                {step === 7 && 'Final OTP'}
                {step === 8 && 'Confirmation'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {renderStep()}
    </div>
  );
};

export default PTaxEnrollmentForm;