
import React from "react";
import "./Establishment.css";

export default function Step4OtherDetails({ data, onUpdate, onNext, onBack }) {
  const handleEngagementChange = (field) => {
    onUpdate({ [field]: !data[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEngagement = data.engagedWithProfession || 
                         data.engagedWithTrade || 
                         data.engagedWithCalling || 
                         data.engagedWithEmployment;
    
    if (!hasEngagement) {
      alert("Please select at least one type of engagement.");
      return;
    }
    onNext();
  };

  return (
    <div className="container">
      <h2 className="step-title">Fourth Step (Type of Establishment):</h2>
      
      <form onSubmit={handleSubmit} className="form-section">
        <p><strong>Engaged With:</strong></p>
        <div className="engagement-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={data.engagedWithProfession}
              onChange={() => handleEngagementChange('engagedWithProfession')}
            />
            <span>Profession</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={data.engagedWithTrade}
              onChange={() => handleEngagementChange('engagedWithTrade')}
            />
            <span>Trade</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={data.engagedWithCalling}
              onChange={() => handleEngagementChange('engagedWithCalling')}
            />
            <span>Calling</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={data.engagedWithEmployment}
              onChange={() => handleEngagementChange('engagedWithEmployment')}
            />
            <span>Employment</span>
          </label>
        </div>

        <div className="info-box">
          <h4>Selected Engagements:</h4>
          <ul>
            {data.engagedWithProfession && <li>✓ Professional Services</li>}
            {data.engagedWithTrade && <li>✓ Trading Activities</li>}
            {data.engagedWithCalling && <li>✓ Calling/Consultation</li>}
            {data.engagedWithEmployment && <li>✓ Employment Services</li>}
          </ul>
        </div>

        <div className="buttons">
          <button type="button" className="btn btn-back" onClick={onBack}>Back</button>
          <button type="submit" className="btn btn-next">Next</button>
        </div>
      </form>
    </div>
  );
}