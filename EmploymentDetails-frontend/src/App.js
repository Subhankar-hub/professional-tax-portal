
import React, { useState } from "react";
import Step1PersonalDetails from "./Step1PersonalDetails";
import Step2AddressDetails from "./Step2AddressDetails";
import Step3Establishment from "./Step3Establishment";
import Step4OtherDetails from "./Step4OtherDetails";
import Step5Review from "./Step5Review";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    name: "",
    gender: "M",
    fatherName: "",
    mobile: "",
    email: "",
    pan: "",
    
    // Address Details
    addressText: "",
    districtLgdCode: "",
    pincode: "",
    
    // Business Details
    businessName: "",
    jurisdictionCode: "",
    chargeCode: "",
    
    // Establishment Details
    establishments: [{ name: "", address: "" }],
    
    // Engagement Details
    engagedWithProfession: false,
    engagedWithTrade: false,
    engagedWithCalling: false,
    engagedWithEmployment: false,
    
    // Tax Category
    ptaxCategory: "",
    ptaxSubcategory: ""
  });

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const goNext = () => setStep(step + 1);
  const goBack = () => setStep(step - 1);
  const goToStep = (stepNumber) => setStep(stepNumber);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1PersonalDetails
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
          />
        );
      case 2:
        return (
          <Step2AddressDetails
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 3:
        return (
          <Step3Establishment
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 4:
        return (
          <Step4OtherDetails
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 5:
        return (
          <Step5Review
            data={formData}
            onBack={goBack}
            onEdit={goToStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="main-title">PTAX Enrolment Module for Tax Payer</h1>
        
        {/* Step Progress Indicator */}
        <div className="step-progress">
          {[1, 2, 3, 4, 5].map((stepNum) => (
            <div
              key={stepNum}
              className={`step-indicator ${step === stepNum ? 'active' : ''} ${step > stepNum ? 'completed' : ''}`}
            >
              <div className="step-number">{stepNum}</div>
              <div className="step-label">
                {stepNum === 1 && "Personal"}
                {stepNum === 2 && "Address"}
                {stepNum === 3 && "Establishment"}
                {stepNum === 4 && "Engagement"}
                {stepNum === 5 && "Review"}
              </div>
            </div>
          ))}
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
}

export default App;