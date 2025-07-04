
import React, { useState, useEffect } from 'react';
import CaptchaComponent from './CaptchaComponent';
import { 
  validateFields, 
  areRequiredFieldsFilled, 
  formatPAN, 
  formatMobile, 
  customValidators 
} from '../utils/validation';

const Step1PersonalDetails = ({ formData, updateFormData, nextStep }) => {
  const [errors, setErrors] = useState({});
  
  // Field definitions for validation
  const fieldDefinitions = {
    name: { type: 'name', required: true },
    fatherName: { type: 'name', required: true },
    pan: { type: 'pan', required: true },
    mobile: { type: 'mobile', required: true },
    email: { type: 'email', required: true },
    captchaValid: { 
      type: 'custom', 
      required: true, 
      customValidator: (value) => customValidators.captcha(value)
    }
  };

  const handleInputChange = (field, value) => {
    // Format specific field types
    let formattedValue = value;
    if (field === 'pan') {
      formattedValue = formatPAN(value);
    } else if (field === 'mobile') {
      formattedValue = formatMobile(value);
    }
    
    updateFormData({ [field]: formattedValue });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = validateFields(fieldDefinitions, formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  const handleCaptchaChange = (isValid) => {
    updateFormData({ captchaValid: isValid });
    // Clear captcha error when captcha is solved
    if (isValid && errors.captchaValid) {
      setErrors(prev => ({ ...prev, captchaValid: '' }));
    }
  };
  
  // Check if all required fields are filled to enable/disable Next button
  const isFormValid = areRequiredFieldsFilled(fieldDefinitions, formData);

  return (
    <div className="step-container">
      <div className="applying-as-section">
        <label>Applying as:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="applicantType"
              value="Individual"
              checked={formData.applicantType === 'Individual'}
              onChange={(e) => handleInputChange('applicantType', e.target.value)}
            />
            Individual
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="applicantType"
              value="Others"
              checked={formData.applicantType === 'Others'}
              onChange={(e) => handleInputChange('applicantType', e.target.value)}
            />
            Others
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="step-form">
        <h3 className="section-title">Personal Information</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Name of the Applicant*</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Full Name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
            <small className="help-text">
              Name (Individual/Business Entity) must match with the name provided on your PAN/TAN card.
              If entering name of individual, it should not have any prefix like Sri/Smt/Mr/Miss/Dr/Er etc.
            </small>
          </div>
          
          <div className="form-group">
            <label>Gender*</label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            >
              <option value="">--Select Gender--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Father's Name of the Applicant*</label>
            <input
              type="text"
              value={formData.fatherName}
              onChange={(e) => handleInputChange('fatherName', e.target.value)}
              placeholder="Fathers Name"
              className={errors.fatherName ? 'error' : ''}
            />
            {errors.fatherName && <span className="error-message">{errors.fatherName}</span>}
            <small className="help-text">Please, Do not write Mr/Shri/Er/Doc etc.</small>
          </div>
          
          <div className="form-group">
            <label>PAN or TAN*</label>
            <input
              type="text"
              value={formData.pan}
              onChange={(e) => handleInputChange('pan', e.target.value)}
              placeholder="AAAAA1111G"
              maxLength="10"
              className={errors.pan ? 'error' : ''}
            />
            {errors.pan && <span className="error-message">{errors.pan}</span>}
            <small className="help-text">PAN/TAN issued to you</small>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mobile Number*</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="9999999999"
              maxLength="10"
              className={errors.mobile ? 'error' : ''}
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
            <small className="help-text">
              Please write Valid Mobile Number only without Country Code (+91).
            </small>
          </div>
          
          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="test@gmail.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            <small className="help-text">
              Please provide a valid email address otherwise you will not be able to complete the Enrolment.
            </small>
          </div>
        </div>

        <div className="captcha-section">
          <CaptchaComponent
            onCaptchaChange={handleCaptchaChange}
            error={errors.captchaValid}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1PersonalDetails;
