import React, { useState } from "react";
import ApiService from "./apiService";
import "./Establishment.css";

export default function Step5Review({ data, onBack, onEdit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await ApiService.submitEnrolment(data);
      if (response && response.applicationId) {
        setApplicationId(response.applicationId);
        alert(`Application submitted successfully! Your Application ID is: ${response.applicationId}`);
      } else {
        alert("Application submitted successfully!");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (applicationId) {
    return (
      <div className="container">
        <div className="success-message">
          <h2>✅ Application Submitted Successfully!</h2>
          <div className="application-details">
            <p><strong>Application ID:</strong> {applicationId}</p>
            <p>Please save this Application ID for future reference.</p>
            <p>You will receive further updates on your registered email address.</p>
          </div>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Submit New Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="step-title">Fifth Step (Review & Submit):</h2>
      
      <div className="review-section">
        <div className="review-card">
          <h3>Personal Details <button className="btn-edit" onClick={() => onEdit(1)}>Edit</button></h3>
          <div className="review-content">
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Gender:</strong> {data.gender === 'M' ? 'Male' : 'Female'}</p>
            <p><strong>Father's Name:</strong> {data.fatherName || 'Not provided'}</p>
            <p><strong>PAN:</strong> {data.pan}</p>
            <p><strong>Mobile:</strong> {data.mobile}</p>
            <p><strong>Email:</strong> {data.email}</p>
          </div>
        </div>

        <div className="review-card">
          <h3>Address Details <button className="btn-edit" onClick={() => onEdit(2)}>Edit</button></h3>
          <div className="review-content">
            <p><strong>Address:</strong> {data.addressText}</p>
            <p><strong>District Code:</strong> {data.districtLgdCode}</p>
            <p><strong>PIN Code:</strong> {data.pincode}</p>
            {data.businessName && <p><strong>Business Name:</strong> {data.businessName}</p>}
          </div>
        </div>

        <div className="review-card">
          <h3>Establishment Details <button className="btn-edit" onClick={() => onEdit(3)}>Edit</button></h3>
          <div className="review-content">
            <p><strong>Tax Category:</strong> {data.ptaxCategory}</p>
            {data.ptaxSubcategory && <p><strong>Subcategory:</strong> {data.ptaxSubcategory}</p>}
            <div className="establishments-review">
              <h4>Establishments:</h4>
              {data.establishments.map((est, index) => (
                <div key={index} className="establishment-review">
                  <p><strong>{index + 1}. {est.name}</strong></p>
                  <p>{est.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="review-card">
          <h3>Engagement Type <button className="btn-edit" onClick={() => onEdit(4)}>Edit</button></h3>
          <div className="review-content">
            <div className="engagement-review">
              {data.engagedWithProfession && <span className="engagement-tag">Profession</span>}
              {data.engagedWithTrade && <span className="engagement-tag">Trade</span>}
              {data.engagedWithCalling && <span className="engagement-tag">Calling</span>}
              {data.engagedWithEmployment && <span className="engagement-tag">Employment</span>}
            </div>
          </div>
        </div>

        <div className="declaration">
          <h4>Declaration:</h4>
          <p>I hereby declare that the information provided above is true and correct to the best of my knowledge.</p>
        </div>

        <div className="buttons">
          <button type="button" className="btn btn-back" onClick={onBack}>Back</button>
          <button 
            type="button" 
            className="btn btn-submit" 
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
