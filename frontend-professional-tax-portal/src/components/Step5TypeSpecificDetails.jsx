import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { 
  validateFields, 
  areRequiredFieldsFilled, 
  formatAmount 
} from '../utils/validation';

const Step5TypeSpecificDetails = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [periodOptions, setPeriodOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Field definitions for validation based on establishment type
  const getFieldDefinitions = () => {
    const baseFields = {
      commencementDate: { type: 'text', required: true },
      periodOfStanding: { type: 'text', required: true }
    };
    
    if (formData.establishmentType === 'Employment') {
      return {
        ...baseFields,
        employerName: { type: 'text', required: true },
        employerAddress: { type: 'text', required: true },
        monthlySalary: { type: 'amount', required: true }
      };
    }
    
    if (formData.establishmentType === 'Trade') {
      return {
        ...baseFields,
        annualGrossBusiness: { type: 'amount', required: true },
        annualTurnover: { type: 'amount', required: true }
      };
    }
    
    if (['Profession', 'Calling'].includes(formData.establishmentType)) {
      return {
        ...baseFields,
        annualGrossBusiness: { type: 'amount', required: true }
      };
    }
    
    return baseFields;
  };
  
  // Debug logging to verify form data received from Step 4
  useEffect(() => {
    console.log('Step 5 - Component mounted/updated with formData:', {
      establishmentType: formData.establishmentType,
      category: formData.category,
      subcategory: formData.subcategory,
      categoryType: typeof formData.category,
      subcategoryType: typeof formData.subcategory,
      categoryIsNumber: typeof formData.category === 'number',
      subcategoryIsNumber: typeof formData.subcategory === 'number'
    });
  }, [formData.establishmentType, formData.category, formData.subcategory]);

  useEffect(() => {
    fetchPeriodOptions();
  }, []);

  const fetchPeriodOptions = async () => {
    try {
      const response = await ApiService.getPeriodOfStandingOptions();
      if (response?.data && response.data.length > 0) {
        setPeriodOptions(response.data);
      } else {
        // Use fallback data from ApiService
        setPeriodOptions(ApiService.getFallbackData('period-of-standing'));
      }
    } catch (error) {
      console.error('Error fetching period options:', error);
      // Use fallback data from ApiService
      setPeriodOptions(ApiService.getFallbackData('period-of-standing'));
    }
  };

  const validateForm = () => {
    const fieldDefinitions = getFieldDefinitions();
    const newErrors = validateFields(fieldDefinitions, formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Check if all required fields are filled to enable/disable Next button
  const isFormValid = areRequiredFieldsFilled(getFieldDefinitions(), formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Set engagement flags based on establishment type
      const engagementFlags = {
        engagedWithProfession: formData.establishmentType === 'Profession',
        engagedWithTrade: formData.establishmentType === 'Trade',
        engagedWithCalling: formData.establishmentType === 'Calling',
        engagedWithEmployment: formData.establishmentType === 'Employment'
      };
      
      // Combine all current form data with engagement flags
      const dataToSave = {
        ...formData,
        ...engagementFlags
      };
      
      try {
        // Save temporary data to database
        await ApiService.saveTemporaryEnrolment(dataToSave);
        updateFormData(engagementFlags);
        nextStep();
      } catch (error) {
        console.error('Failed to save temporary data:', error);
        // Still proceed to next step even if save fails
        updateFormData(engagementFlags);
        nextStep();
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    // Format specific field types
    let formattedValue = value;
    if (['annualGrossBusiness', 'annualTurnover', 'monthlySalary'].includes(field)) {
      formattedValue = formatAmount(value);
    }
    
    updateFormData({ [field]: formattedValue });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderCommonFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="commencementDate">Date of Commencement *</label>
        <input
          type="date"
          id="commencementDate"
          value={formData.commencementDate}
          onChange={(e) => handleInputChange('commencementDate', e.target.value)}
          className={`form-control ${errors.commencementDate ? 'error' : ''}`}
          required
        />
        {errors.commencementDate && <span className="error-text">{errors.commencementDate}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="periodOfStanding">Period of Standing *</label>
        <select
          id="periodOfStanding"
          value={formData.periodOfStanding}
          onChange={(e) => handleInputChange('periodOfStanding', e.target.value)}
          className={`form-control ${errors.periodOfStanding ? 'error' : ''}`}
          required
        >
          <option value="">--Select Period--</option>
          {periodOptions.map((period, index) => (
            <option key={index} value={period}>
              {period}
            </option>
          ))}
        </select>
        {errors.periodOfStanding && <span className="error-text">{errors.periodOfStanding}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="pan">PAN/TAN</label>
        <input
          type="text"
          id="pan"
          value={formData.pan}
          onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
          className="form-control"
          placeholder="Enter PAN/TAN"
          maxLength={10}
        />
      </div>
    </>
  );

  const renderTaxRegistrations = () => (
    <div className="tax-registrations">
      <h4>Tax Registrations</h4>
      
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.vatRegistered}
            onChange={(e) => handleInputChange('vatRegistered', e.target.checked)}
          />
          Registered under VAT Act
        </label>
        {formData.vatRegistered && (
          <input
            type="text"
            value={formData.vatNumber}
            onChange={(e) => handleInputChange('vatNumber', e.target.value)}
            className="form-control"
            placeholder="VAT Number"
          />
        )}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.cstRegistered}
            onChange={(e) => handleInputChange('cstRegistered', e.target.checked)}
          />
          Registered under CST Act
        </label>
        {formData.cstRegistered && (
          <input
            type="text"
            value={formData.cstNumber}
            onChange={(e) => handleInputChange('cstNumber', e.target.value)}
            className="form-control"
            placeholder="CST Number"
          />
        )}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.gstRegistered}
            onChange={(e) => handleInputChange('gstRegistered', e.target.checked)}
          />
          Registered under GST Act
        </label>
        {formData.gstRegistered && (
          <input
            type="text"
            value={formData.gstNumber}
            onChange={(e) => handleInputChange('gstNumber', e.target.value)}
            className="form-control"
            placeholder="GST Number"
          />
        )}
      </div>
    </div>
  );

  const renderBusinessFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="annualGrossBusiness">Annual Gross Business (in Rs.) *</label>
        <input
          type="number"
          id="annualGrossBusiness"
          value={formData.annualGrossBusiness}
          onChange={(e) => handleInputChange('annualGrossBusiness', e.target.value)}
          className={`form-control ${errors.annualGrossBusiness ? 'error' : ''}`}
          placeholder="Enter amount"
          required
        />
        {errors.annualGrossBusiness && <span className="error-text">{errors.annualGrossBusiness}</span>}
      </div>

      {formData.establishmentType === 'Trade' && (
        <div className="form-group">
          <label htmlFor="annualTurnover">Annual Turnover (in Rs.) *</label>
          <input
            type="number"
            id="annualTurnover"
            value={formData.annualTurnover}
            onChange={(e) => handleInputChange('annualTurnover', e.target.value)}
            className={`form-control ${errors.annualTurnover ? 'error' : ''}`}
            placeholder="Enter amount"
            required
          />
          {errors.annualTurnover && <span className="error-text">{errors.annualTurnover}</span>}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="monthlyAvgWorkers">Monthly Average Workers</label>
          <input
            type="number"
            id="monthlyAvgWorkers"
            value={formData.monthlyAvgWorkers}
            onChange={(e) => handleInputChange('monthlyAvgWorkers', e.target.value)}
            className="form-control"
            placeholder="Number of workers"
          />
        </div>
        <div className="form-group">
          <label htmlFor="monthlyAvgEmployees">Monthly Average Employees</label>
          <input
            type="number"
            id="monthlyAvgEmployees"
            value={formData.monthlyAvgEmployees}
            onChange={(e) => handleInputChange('monthlyAvgEmployees', e.target.value)}
            className="form-control"
            placeholder="Number of employees"
          />
        </div>
      </div>
    </>
  );

  const renderEmploymentFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="employerName">Employer Name *</label>
        <input
          type="text"
          id="employerName"
          value={formData.employerName}
          onChange={(e) => handleInputChange('employerName', e.target.value)}
          className={`form-control ${errors.employerName ? 'error' : ''}`}
          placeholder="Enter employer name"
          required
        />
        {errors.employerName && <span className="error-text">{errors.employerName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="employerAddress">Employer Address *</label>
        <textarea
          id="employerAddress"
          value={formData.employerAddress}
          onChange={(e) => handleInputChange('employerAddress', e.target.value)}
          className={`form-control ${errors.employerAddress ? 'error' : ''}`}
          placeholder="Enter employer address"
          rows={3}
          required
        />
        {errors.employerAddress && <span className="error-text">{errors.employerAddress}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="monthlySalary">Monthly Salary (in Rs.) *</label>
        <input
          type="number"
          id="monthlySalary"
          value={formData.monthlySalary}
          onChange={(e) => handleInputChange('monthlySalary', e.target.value)}
          className={`form-control ${errors.monthlySalary ? 'error' : ''}`}
          placeholder="Enter monthly salary"
          required
        />
        {errors.monthlySalary && <span className="error-text">{errors.monthlySalary}</span>}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.multipleEmployers}
            onChange={(e) => handleInputChange('multipleEmployers', e.target.checked)}
          />
          Simultaneously engaged in employment of more than one employer
        </label>
      </div>
    </>
  );

  const renderSocietyFields = () => (
    <div className="society-engagement">
      <h4>Co-operative Society Engagement</h4>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.stateLevelSociety}
            onChange={(e) => handleInputChange('stateLevelSociety', e.target.checked)}
          />
          Engaged with State Level Society
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.districtLevelSociety}
            onChange={(e) => handleInputChange('districtLevelSociety', e.target.checked)}
          />
          Engaged with District Level Society
        </label>
      </div>
    </div>
  );

  return (
    <div className="step-container">
      <div className="step-header">
        <h3>Step 5: {formData.establishmentType} Details</h3>
        <p>Provide details specific to your {formData.establishmentType?.toLowerCase()} activity</p>
      </div>

      <form onSubmit={handleSubmit} className="step-form">
        <div className="form-section">
          {renderCommonFields()}
          
          {formData.establishmentType === 'Employment' 
            ? renderEmploymentFields() 
            : renderBusinessFields()
          }
          
          {renderTaxRegistrations()}
          
          {['Profession', 'Trade', 'Calling'].includes(formData.establishmentType) && 
            renderSocietyFields()
          }
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={prevStep}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button 
            type="submit"
            className="btn btn-primary"
            disabled={loading || !isFormValid}
          >
            {loading ? 'Processing...' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step5TypeSpecificDetails;
