import React from "react";

export default function Step4OtherDetails({ data, onUpdate, onNext, onBack }) {
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    onUpdate({ 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const hasEngagement = data.engagedWithProfession || 
                       data.engagedWithTrade || 
                       data.engagedWithCalling || 
                       data.engagedWithEmployment;
  
  if (!hasEngagement) {
    alert("Please select at least one engagement type.");
    return;
  }
  try {
    await onNext();  // Make sure this function handles the API call
  } catch (error) {
    alert("An error occurred while submitting your data. Please try again.");
    console.error("API request failed:", error);
  }
};
  return (
    <div className="container">
      <h2 className="step-title">Fourth Step (Engagement Details):</h2>
      
      <form onSubmit={handleSubmit} className="form-section">
        <div className="engagement-section">
          <h4>Select your engagement types:</h4>
          
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="engagedWithProfession"
                name="engagedWithProfession"
                checked={data.engagedWithProfession}
                onChange={handleChange}
              />
              <label htmlFor="engagedWithProfession">
                Engaged with Profession
              </label>
            </div>

            <div className="checkbox-item">
              <input
                type="checkbox"
                id="engagedWithTrade"
                name="engagedWithTrade"
                checked={data.engagedWithTrade}
                onChange={handleChange}
              />
              <label htmlFor="engagedWithTrade">
                Engaged with Trade
              </label>
            </div>

            <div className="checkbox-item">
              <input
                type="checkbox"
                id="engagedWithCalling"
                name="engagedWithCalling"
                checked={data.engagedWithCalling}
                onChange={handleChange}
              />
              <label htmlFor="engagedWithCalling">
                Engaged with Calling
              </label>
            </div>

            <div className="checkbox-item">
              <input
                type="checkbox"
                id="engagedWithEmployment"
                name="engagedWithEmployment"
                checked={data.engagedWithEmployment}
                onChange={handleChange}
              />
              <label htmlFor="engagedWithEmployment">
                Engaged with Employment
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Charge Code:</label>
            <input
              type="text"
              name="chargeCode"
              value={data.chargeCode}
              onChange={handleChange}
              placeholder="Enter charge code (if applicable)"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Previous Step
          </button>
          <button type="submit" className="btn btn-primary">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}
