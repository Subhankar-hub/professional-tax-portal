import React, { useState } from 'react';
import Step1PersonalDetails from './Step1PersonalDetails';
import Step2EstablishmentDetails from './Step2EstablishmentDetails';
import Step3OtherDetails from './Step3OtherDetails';
import Step4ReviewSubmit from './Step4ReviewSubmit';
import './PTaxEnrollmentForm.css';

const PTaxEnrollmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    applicantType: 'Individual',
    name: '',
    gender: 'Male',
    fatherName: '',
    pan: '',
    mobile: '',
    email: '',
    
    // Establishment Information
    establishmentName: '',
    jurisdictionArea: '',
    charge: '',
    district: '',
    pincode: '',
    establishmentAddress: '',
    additionalEstablishments: [],
    category: '',
    subcategory: '',
    
    // Other Details
    engagedWith: [],
    
    // Professional Details (conditional based on engagement)
    commencementDate: '',
    periodOfStanding: '',
    annualGrossBusiness: '',
    monthlyAvgWorkers: '',
    monthlyAvgEmployees: '',
    vatRegistered: false,
    vatNumber: '',
    cstRegistered: false,
    cstNumber: '',
    gstRegistered: false,
    gstNumber: '',
    
    // Vehicle Details
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
    
    // Captcha
    captchaValue: '',
    captchaValid: false
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
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
          <Step2EstablishmentDetails
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3OtherDetails
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step4ReviewSubmit
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            goToStep={goToStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="ptax-enrollment-form">
      <div className="form-header">
        <div className="government-logo">
          <img src="/api/placeholder/60/60" alt="Government of India" />
        </div>
        <div className="header-text">
          <h1>Professional Tax</h1>
          <h2>Commissionerate of Taxes & Excise</h2>
          <h3>Government of Tripura</h3>
        </div>
      </div>
      
      <div className="step-indicator">
        <div className="step-header">
          <span className="step-number">Step: {currentStep} of 4</span>
        </div>
      </div>
      
      {renderStep()}
    </div>
  );
};

export default PTaxEnrollmentForm;