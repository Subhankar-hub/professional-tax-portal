import React, { useState } from "react";
import ApiService from "./apiService";

export default function Step5Review({ data, onBack, onEdit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await ApiService.submitEnrollment(data);
      setSubmitResult({
        success: true,
        message: "Application submitted successfully!",
        applicationId: result.applicationId
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Failed to submit application. Please try again.",
        error: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult && submitResult.success) {
    return (
      <div className="container">
        <div className="success-message">
          <h2>Application Submitted Successfully!</h2>
          <p>Your application ID is: <strong>{submitResult.applicationId}</strong></p>
          <p>Please save this ID for future reference.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="step-title">Fifth Step (Review and Submit):</h2>
      
      <div className="review-section">
        <div className="review-group">
          <h4>Personal Details:</h4>
          <div className="review-item">
            <span className="label">Name:</span>
            <span className="value">{data.name}</span>
            <button type="button" className="btn-edit" onClick={() => onEdit(1)}>Edit</button>
          </div>
          <div className="review-item">
            <span className="label">Gender:</span>
            <span className="value">{data.gender === 'M' ? 'Male' : data.gender === 'F' ? 'Female' : 'Other'}</span>
          </div>
          <div className="review-item">
            <span className="label">Father's Name:</span>
            <span className="value">{data.fatherName}</span>
          </div>
          <div className="review-item">
            <span className="label">Mobile:</span>
            <span className="value">{data.mobile}</span>
          </div>
          <div className="review-item">
            <span className="label">Email:</span>
            <span className="value">{data.email}</span>
          </div>
          <div className="review-item">
            <span className="label">PAN:</span>
            <span className="value">{data.pan}</span>
          </div>
        </div>

        <div className="review-group">
          <h4>Address Details:</h4>
          <div className="review-item">
            <span className="label">Address:</span>
            <span className="value">{data.addressText}</span>
            <button type="button" className="btn-edit" onClick={() => onEdit(2)}>Edit</button>
          </div>
          <div className="review-item">
            <span className="label">District Code:</span>
            <span className="value">{data.districtLgdCode}</span>
          </div>
          <div className="review-item">
            <span className="label">Pincode:</span>
            <span className="value">{data.pincode}</span>
          </div>
          {data.businessName && (
            <div className="review-item">
              <span className="label">Business Name:</span>
              <span className="value">{data.businessName}</span>
            </div>
          )}
        </div>

        <div className="review-group">
          <h4>Establishment Details:</h4>
          <button type="button" className="btn-edit" onClick={() => onEdit(3)}>Edit</button>
          <div className="review-item">
            <span className="label">PTax Category:</span>
            <span className="value">{data.ptaxCategory}</span>
          </div>
          {data.ptaxSubcategory && (
            <div className="review-item">
              <span className="label">PTax Subcategory:</span>
              <span className="value">{data.ptaxSubcategory}</span>
            </div>
          )}
          {data.establishments.map((est, index) => (
            <div key={index} className="establishment-review">
              <h5>Establishment {index + 1}:</h5>
              <div className="review-item">
                <span className="label">Name:</span>
                <span className="value">{est.name}</span>
              </div>
              <div className="review-item">
                <span className="label">Address:</span>
                <span className="value">{est.address}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="review-group">
          <h4>Engagement Details:</h4>
          <button type="button" className="btn-edit" onClick={() => onEdit(4)}>Edit</button>
          <div className="engagement-review">
            {data.engagedWithProfession && <span className="engagement-tag">Profession</span>}
            {data.engagedWithTrade && <span className="engagement-tag">Trade</span>}
            {data.engagedWithCalling && <span className="engagement-tag">Calling</span>}
            {data.engagedWithEmployment && <span className="engagement-tag">Employment</span>}
          </div>
        </div>

        {submitResult && !submitResult.success && (
          <div className="error-message">
            <p>{submitResult.message}</p>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Previous Step
          </button>
          <button 
            type="button" 
            className="btn btn-primary btn-submit" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}