
import React, { useState } from 'react';

const Step3OtherDetails = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  // Initialize engagement fields if not set
  React.useEffect(() => {
    if (!formData.engagedWith || formData.engagedWith.length === 0) {
      updateFormData('engagedWith', []);
    }
  }, [formData, updateFormData]);

  const handleEngagementChange = (engagement) => {
    const currentEngagements = formData.engagedWith || [];
    const isCurrentlySelected = currentEngagements.includes(engagement);
    
    let newEngagements;
    if (isCurrentlySelected) {
      newEngagements = currentEngagements.filter(e => e !== engagement);
    } else {
      newEngagements = [...currentEngagements, engagement];
    }
    
    updateFormData({ engagedWith: newEngagements });
  };

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addEmployer = () => {
    const newEmployer = {
      name: '',
      address: '',
      salary: ''
    };
    updateFormData({
      additionalEmployers: [...(formData.additionalEmployers || []), newEmployer]
    });
  };

  const updateAdditionalEmployer = (index, field, value) => {
    const updated = [...(formData.additionalEmployers || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData({ additionalEmployers: updated });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.engagedWith || formData.engagedWith.length === 0) {
      newErrors.engagedWith = 'Please select at least one engagement type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  const renderProfessionDetails = () => {
    if (!formData.engagedWith?.includes('Profession')) return null;
    
    return (
      <div className="profession-details">
        <h4 className="details-title">Furnish the Details of Profession:</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Date of Commencement*</label>
            <input
              type="date"
              value={formData.commencementDate}
              onChange={(e) => handleInputChange('commencementDate', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Period of Standing*</label>
            <input
              type="text"
              value={formData.periodOfStanding}
              onChange={(e) => handleInputChange('periodOfStanding', e.target.value)}
              placeholder="0 Year 0 Month 9 Days"
            />
          </div>
          <div className="form-group">
            <label>PAN/TAN*</label>
            <input
              type="text"
              value={formData.pan}
              onChange={(e) => handleInputChange('pan', e.target.value)}
              placeholder="AAAAA1111G"
              readOnly
            />
            <small className="help-text">Permanent Income Tax Account Number</small>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Annual Gross Business*</label>
            <div className="input-with-currency">
              <span className="currency">₹</span>
              <input
                type="number"
                value={formData.annualGrossBusiness}
                onChange={(e) => handleInputChange('annualGrossBusiness', e.target.value)}
                placeholder="10,000"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Monthly Average Number of Workers</label>
            <div className="input-with-icon">
              <input
                type="number"
                value={formData.monthlyAvgWorkers}
                onChange={(e) => handleInputChange('monthlyAvgWorkers', e.target.value)}
                placeholder="10000"
              />
            </div>
            <small className="help-text">during the last preceding year in the establishment</small>
          </div>
          <div className="form-group">
            <label>Monthly Average Number of Employees</label>
            <div className="input-with-icon">
              <input
                type="number"
                value={formData.monthlyAvgEmployees}
                onChange={(e) => handleInputChange('monthlyAvgEmployees', e.target.value)}
                placeholder="100"
              />
            </div>
            <small className="help-text">during the last preceding year in the establishment</small>
          </div>
        </div>

        <div className="tax-registration-section">
          <h5>If registered taxpayer under one or more from the list below, Please select:</h5>
          
          <div className="form-row">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.vatRegistered}
                  onChange={(e) => handleInputChange('vatRegistered', e.target.checked)}
                />
                Registered Under VAT
              </label>
              {formData.vatRegistered && (
                <input
                  type="text"
                  value={formData.vatNumber}
                  onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                  placeholder="11111"
                />
              )}
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.cstRegistered}
                  onChange={(e) => handleInputChange('cstRegistered', e.target.checked)}
                />
                Registered Under CST
              </label>
              {formData.cstRegistered && (
                <input
                  type="text"
                  value={formData.cstNumber}
                  onChange={(e) => handleInputChange('cstNumber', e.target.value)}
                  placeholder="11111"
                />
              )}
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.gstRegistered}
                  onChange={(e) => handleInputChange('gstRegistered', e.target.checked)}
                />
                Registered Under GST
              </label>
              {formData.gstRegistered && (
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  placeholder="11111"
                />
              )}
            </div>
          </div>
        </div>

        <div className="vehicle-section">
          <h5>If held Vehicles under the Motor Vehicles Act-1939, Please select:</h5>
          
          <div className="vehicle-grid">
            <div className="vehicle-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                Taxis
              </label>
              <input
                type="number"
                value={formData.taxis}
                onChange={(e) => handleInputChange('taxis', e.target.value)}
                placeholder="1"
                min="0"
              />
            </div>
            <div className="vehicle-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                Three Wheelers
              </label>
              <input
                type="number"
                value={formData.threeWheelers}
                onChange={(e) => handleInputChange('threeWheelers', e.target.value)}
                placeholder="1"
                min="0"
              />
            </div>
            <div className="vehicle-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                Light Motor Vehicles
              </label>
              <input
                type="number"
                value={formData.lightMotorVehicles}
                onChange={(e) => handleInputChange('lightMotorVehicles', e.target.value)}
                placeholder="1"
                min="0"
              />
            </div>
            <div className="vehicle-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                Good Vehicles
              </label>
              <input
                type="number"
                value={formData.goodVehicles}
                onChange={(e) => handleInputChange('goodVehicles', e.target.value)}
                placeholder="1"
                min="0"
              />
            </div>
            <div className="vehicle-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                Trucks
              </label>
              <input
                type="number"
                value={formData.trucks}
                onChange={(e) => handleInputChange('trucks', e.target.value)}
                placeholder="1"
                min="0"
              />
            </div>
            <div className="vehicle-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                Buses
              </label>
              <input
                type="number"
                value={formData.buses}
                onChange={(e) => handleInputChange('buses', e.target.value)}
                placeholder="1"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEmploymentDetails = () => {
    if (!formData.engagedWith?.includes('Employment')) return null;
    
    return (
      <div className="employment-details">
        <h4 className="details-title">Furnish the Details of Employment:</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Date of Commencement*</label>
            <input
              type="date"
              value={formData.commencementDate}
              onChange={(e) => handleInputChange('commencementDate', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Period of Standing*</label>
            <input
              type="text"
              value={formData.periodOfStanding}
              onChange={(e) => handleInputChange('periodOfStanding', e.target.value)}
              placeholder="0 Year 0 Month 9 Days"
            />
          </div>
          <div className="form-group">
            <label>PAN/TAN</label>
            <input
              type="text"
              value={formData.pan}
              onChange={(e) => handleInputChange('pan', e.target.value)}
              placeholder="AAAAA1111G"
              readOnly
            />
            <small className="help-text">Permanent Income Tax Account Number</small>
          </div>
        </div>

        <div className="tax-registration-section">
          <h5>If registered taxpayer under one or more from the list below, please select:</h5>
          
          <div className="form-row">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.vatRegistered}
                  onChange={(e) => handleInputChange('vatRegistered', e.target.checked)}
                />
                Registered Under VAT
              </label>
              {formData.vatRegistered && (
                <input
                  type="text"
                  value={formData.vatNumber}
                  onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                  placeholder="11111111111"
                />
              )}
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.cstRegistered}
                  onChange={(e) => handleInputChange('cstRegistered', e.target.checked)}
                />
                Registered Under CST
              </label>
              {formData.cstRegistered && (
                <input
                  type="text"
                  value={formData.cstNumber}
                  onChange={(e) => handleInputChange('cstNumber', e.target.value)}
                  placeholder="11111111111"
                />
              )}
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.gstRegistered}
                  onChange={(e) => handleInputChange('gstRegistered', e.target.checked)}
                />
                Registered Under GST
              </label>
              {formData.gstRegistered && (
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  placeholder="11111111111111"
                />
              )}
            </div>
          </div>
        </div>

        <div className="employer-section">
          <h5>If an Employee of any Diplomatic or Consular Office or Trade Commissioner or any Foreign Country, provide following details:</h5>
          
          <div className="form-row">
            <div className="form-group">
              <label>Name of the Employer</label>
              <input
                type="text"
                value={formData.employerName}
                onChange={(e) => handleInputChange('employerName', e.target.value)}
                placeholder="Name of the Employer"
              />
            </div>
            <div className="form-group">
              <label>Address of the Employer</label>
              <input
                type="text"
                value={formData.employerAddress}
                onChange={(e) => handleInputChange('employerAddress', e.target.value)}
                placeholder="Address of the Employer"
              />
            </div>
            <div className="form-group">
              <label>Monthly Salary/Wages of the Applicant</label>
              <div className="input-with-currency">
                <span className="currency">₹</span>
                <input
                  type="number"
                  value={formData.monthlySalary}
                  onChange={(e) => handleInputChange('monthlySalary', e.target.value)}
                  placeholder="Monthly Salary/Wages"
                />
              </div>
            </div>
          </div>

          <div className="multiple-employers-section">
            <div className="form-group">
              <label>Are you simultaneously engaged in employment of more than one employer?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="multipleEmployers"
                    value="No"
                    checked={formData.multipleEmployers === false}
                    onChange={(e) => handleInputChange('multipleEmployers', false)}
                  />
                  No
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="multipleEmployers"
                    value="Yes"
                    checked={formData.multipleEmployers === true}
                    onChange={(e) => handleInputChange('multipleEmployers', true)}
                  />
                  Yes
                </label>
              </div>
            </div>

            {formData.multipleEmployers && (
              <div className="additional-employers">
                <h6>Details of Employer - 1</h6>
                {formData.additionalEmployers?.map((employer, index) => (
                  <div key={index} className="form-row">
                    <div className="form-group">
                      <label>Name of the Employer</label>
                      <input
                        type="text"
                        value={employer.name}
                        onChange={(e) => updateAdditionalEmployer(index, 'name', e.target.value)}
                        placeholder="Name of the Employer"
                      />
                    </div>
                    <div className="form-group">
                      <label>Address of the Employer</label>
                      <input
                        type="text"
                        value={employer.address}
                        onChange={(e) => updateAdditionalEmployer(index, 'address', e.target.value)}
                        placeholder="Address of the Employer"
                      />
                    </div>
                    <div className="form-group">
                      <label>Monthly Salary/Wages of the Applicant</label>
                      <div className="input-with-currency">
                        <span className="currency">₹</span>
                        <input
                          type="number"
                          value={employer.salary}
                          onChange={(e) => updateAdditionalEmployer(index, 'salary', e.target.value)}
                          placeholder="Monthly Salary/Wages"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addEmployer} className="btn btn-secondary">
                  + Add Employer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="step-container">
      <form onSubmit={handleSubmit} className="step-form">
        <h3 className="section-title">Other Details</h3>
        
        <div className="engagement-section">
          <label>Engaged With*</label>
          {errors.engagedWith && <span className="error-message">{errors.engagedWith}</span>}
          <div className="engagement-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.engagedWith?.includes('Profession')}
                onChange={() => handleEngagementChange('Profession')}
              />
              Profession
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.engagedWith?.includes('Trade')}
                onChange={() => handleEngagementChange('Trade')}
              />
              Trade
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.engagedWith?.includes('Calling')}
                onChange={() => handleEngagementChange('Calling')}
              />
              Calling
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.engagedWith?.includes('Employment')}
                onChange={() => handleEngagementChange('Employment')}
              />
              Employment
            </label>
          </div>
        </div>

        {renderProfessionDetails()}
        {renderEmploymentDetails()}

        <div className="form-actions">
          <button type="button" onClick={prevStep} className="btn btn-secondary">
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3OtherDetails;
