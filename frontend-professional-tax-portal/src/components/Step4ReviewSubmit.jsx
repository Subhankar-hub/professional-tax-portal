
import React, { useState } from 'react';
import CaptchaComponent from './CaptchaComponent';
import ApiService from '../services/ApiService';

const Step4ReviewSubmit = ({ formData, updateFormData, prevStep, goToStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const handleCaptchaChange = (isValid) => {
    setCaptchaValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!declarationAccepted) {
      alert('Please accept the declaration before submitting.');
      return;
    }
    
    if (!captchaValid) {
      alert('Please solve the captcha.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await ApiService.submitEnrolment(formData);
      setSubmitResult({
        success: true,
        message: 'Application submitted successfully!',
        applicationId: result.applicationId
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Failed to submit application. Please try again.',
        error: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
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
              {formData.engagedWith?.map((engagement, index) => (
                <span key={index} className="engagement-tag">
                  {engagement}
                </span>
              ))}
            </div>
            
            {formData.engagedWith?.includes('Employment') && (
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
            onChange={(e) => setDeclarationAccepted(e.target.checked)}
          />
          I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.
        </label>
      </div>

      <div className="captcha-section">
        <CaptchaComponent onCaptchaChange={handleCaptchaChange} />
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

export default Step4ReviewSubmit;
