
import React, { useState } from 'react';
import CaptchaComponent from './CaptchaComponent';
import ApiService from '../services/ApiService';
import { customValidators } from '../utils/validation';

const Step6ReviewSubmit = ({ formData, updateFormData, nextStep, prevStep, goToStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCaptchaChange = (isValid) => {
    setCaptchaValid(isValid);
    // Clear captcha error when captcha is solved
    if (isValid && errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: '' }));
    }
  };
  
  const handleDeclarationChange = (isAccepted) => {
    setDeclarationAccepted(isAccepted);
    // Clear declaration error when declaration is accepted
    if (isAccepted && errors.declaration) {
      setErrors(prev => ({ ...prev, declaration: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Validate declaration and captcha
    const declarationError = customValidators.declaration(declarationAccepted);
    if (declarationError) {
      newErrors.declaration = declarationError;
    }
    
    const captchaError = customValidators.captcha(captchaValid);
    if (captchaError) {
      newErrors.captcha = captchaError;
    }
    
    setErrors(newErrors);
    
    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    // Update form data with declaration and captcha status
    updateFormData({
      declarationAccepted: declarationAccepted,
      captchaValid: captchaValid
    });
    
    // Proceed to final OTP verification
    nextStep();
  };

  if (submitResult && submitResult.success) {
    return (
      <div className="step-container">
        <div className="success-message">
          <h2>Application Submitted Successfully!</h2>
          <p>Your application ID is: <strong>{submitResult.applicationId}</strong></p>
          <p>Please save this ID for future reference.</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Submit New Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      <div className="review-header">
        <h3>Review Information</h3>
        <p>Applying as {formData.applicantType}</p>
      </div>

      <div className="review-sections">
        <div className="review-section">
          <div className="section-header">
            <h4>Personal/ Business Information</h4>
          </div>
          <div className="review-content">
            <div className="review-row">
              <div className="review-item">
                <strong>Name:</strong> {formData.name}
              </div>
              <div className="review-item">
                <strong>Gender:</strong> {formData.gender}
              </div>
              <div className="review-item">
                <strong>Father's Name:</strong> {formData.fatherName}
              </div>
            </div>
            <div className="review-row">
              <div className="review-item">
                <strong>PAN/TAN:</strong> {formData.pan}
              </div>
              <div className="review-item">
                <strong>Mobile:</strong> {formData.mobile}
              </div>
              <div className="review-item">
                <strong>Email:</strong> {formData.email}
              </div>
            </div>
          </div>
        </div>

        <div className="review-section">
          <div className="section-header">
            <h4>Establishment Information</h4>
          </div>
          <div className="review-content">
            <div className="review-row">
              <div className="review-item">
                <strong>Business Name:</strong> {formData.establishmentName}
              </div>
              <div className="review-item">
                <strong>Area of Jurisdiction:</strong> {formData.jurisdictionArea}
              </div>
              <div className="review-item">
                <strong>Charge:</strong> {formData.charge}
              </div>
            </div>
            <div className="review-row">
              <div className="review-item">
                <strong>Address:</strong> {formData.establishmentAddress}
              </div>
              <div className="review-item">
                <strong>Category:</strong> {formData.category}
              </div>
              <div className="review-item">
                <strong>Sub Category:</strong> {formData.subcategory}
              </div>
            </div>
            
            {formData.additionalEstablishments?.length > 0 && (
              <div className="other-establishments">
                <h5>Other Establishment Details</h5>
                {formData.additionalEstablishments.map((est, index) => (
                  <div key={index} className="review-row">
                    <div className="review-item">
                      <strong>Name:</strong> {est.name}
                    </div>
                    <div className="review-item">
                      <strong>Address:</strong> {est.address}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="review-section">
          <div className="section-header">
            <h4>Other Details</h4>
          </div>
          <div className="review-content">
            <div className="engagement-tags">
              <strong>Engaged With:</strong>
              {formData.engagedWithProfession && <span className="engagement-tag">Profession</span>}
              {formData.engagedWithTrade && <span className="engagement-tag">Trade</span>}
              {formData.engagedWithCalling && <span className="engagement-tag">Calling</span>}
              {formData.engagedWithEmployment && <span className="engagement-tag">Employment</span>}
            </div>
            
            {formData.engagedWithEmployment && (
              <div className="employment-details">
                <h5>Employment Details</h5>
                <div className="review-row">
                  <div className="review-item">
                    <strong>Date of Commencement:</strong> {formData.commencementDate}
                  </div>
                  <div className="review-item">
                    <strong>Period of Standing:</strong> {formData.periodOfStanding}
                  </div>
                  <div className="review-item">
                    <strong>PAN:</strong> {formData.pan}
                  </div>
                </div>
                <div className="review-row">
                  <div className="review-item">
                    <strong>Registered Under VAT:</strong> {formData.vatRegistered ? `Yes (${formData.vatNumber})` : 'No'}
                  </div>
                  <div className="review-item">
                    <strong>Registered Under CST:</strong> {formData.cstRegistered ? `Yes (${formData.cstNumber})` : 'No'}
                  </div>
                  <div className="review-item">
                    <strong>Registered Under GST:</strong> {formData.gstRegistered ? `Yes (${formData.gstNumber})` : 'No'}
                  </div>
                </div>
                <div className="review-row">
                  <div className="review-item">
                    <strong>Employer Name:</strong> {formData.employerName}
                  </div>
                  <div className="review-item">
                    <strong>Employer Address:</strong> {formData.employerAddress}
                  </div>
                  <div className="review-item">
                    <strong>Applicant Salary:</strong> {formData.monthlySalary}
                  </div>
                </div>
                <div className="review-row">
                  <div className="review-item">
                    <strong>Simultaneously engaged in Employment of more than one Employer:</strong> {formData.multipleEmployers ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="declaration-section">
        <label className="declaration-label">
          <input
            type="checkbox"
            checked={declarationAccepted}
            onChange={(e) => handleDeclarationChange(e.target.checked)}
          />
          I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.
        </label>
        {errors.declaration && <span className="error-message">{errors.declaration}</span>}
      </div>

      <div className="captcha-section">
        <CaptchaComponent onCaptchaChange={handleCaptchaChange} />
        {errors.captcha && <span className="error-message">{errors.captcha}</span>}
      </div>

      {submitResult && !submitResult.success && (
        <div className="error-message">
          <p>{submitResult.message}</p>
          {submitResult.error && <p>Error: {submitResult.error}</p>}
        </div>
      )}

      <div className="form-actions">
        <button 
          type="button" 
          onClick={prevStep}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button 
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
          disabled={isSubmitting || !declarationAccepted || !captchaValid}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Step6ReviewSubmit;
