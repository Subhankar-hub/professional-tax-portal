/**
 * Common validation utilities for the Professional Tax Portal
 */

// Regular expression patterns
export const REGEX_PATTERNS = {
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  MOBILE: /^[0-9]{10}$/,
  EMAIL: /\S+@\S+\.\S+/,
  PINCODE: /^[0-9]{6}$/,
  OTP: /^[0-9]{6}$/,
  GST: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  // Basic alphanumeric with spaces for names
  NAME: /^[a-zA-Z\s]{2,50}$/,
  // Numbers only for amounts
  AMOUNT: /^[0-9]+(\.[0-9]{1,2})?$/
};

// Validation error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_PAN: 'Invalid PAN format (e.g., AAAAA1111G)',
  INVALID_MOBILE: 'Invalid mobile number (10 digits required)',
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PINCODE: 'Invalid PIN code (6 digits required)',
  INVALID_OTP: 'Invalid OTP (6 digits required)',
  INVALID_GST: 'Invalid GST number format',
  INVALID_NAME: 'Name must contain only letters and spaces (2-50 characters)',
  INVALID_AMOUNT: 'Invalid amount format',
  CAPTCHA_REQUIRED: 'Please solve the captcha',
  DECLARATION_REQUIRED: 'Please accept the declaration',
  OTP_LENGTH: 'OTP must be 6 digits'
};

/**
 * Validates a single field based on its type and value
 * @param {string} fieldType - Type of field to validate
 * @param {any} value - Value to validate
 * @param {boolean} required - Whether the field is required
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (fieldType, value, required = false) => {
  // Check if required field is empty
  if (required && (!value || (typeof value === 'string' && !value.trim()))) {
    return ERROR_MESSAGES.REQUIRED;
  }

  // If not required and empty, it's valid
  if (!value || (typeof value === 'string' && !value.trim())) {
    return null;
  }

  const stringValue = String(value).trim();

  switch (fieldType) {
    case 'pan':
      return REGEX_PATTERNS.PAN.test(stringValue) ? null : ERROR_MESSAGES.INVALID_PAN;
    
    case 'mobile':
      return REGEX_PATTERNS.MOBILE.test(stringValue) ? null : ERROR_MESSAGES.INVALID_MOBILE;
    
    case 'email':
      return REGEX_PATTERNS.EMAIL.test(stringValue) ? null : ERROR_MESSAGES.INVALID_EMAIL;
    
    case 'pincode':
      return REGEX_PATTERNS.PINCODE.test(stringValue) ? null : ERROR_MESSAGES.INVALID_PINCODE;
    
    case 'otp':
      return REGEX_PATTERNS.OTP.test(stringValue) ? null : ERROR_MESSAGES.INVALID_OTP;
    
    case 'gst':
      return REGEX_PATTERNS.GST.test(stringValue) ? null : ERROR_MESSAGES.INVALID_GST;
    
    case 'name':
      return REGEX_PATTERNS.NAME.test(stringValue) ? null : ERROR_MESSAGES.INVALID_NAME;
    
    case 'amount':
      return REGEX_PATTERNS.AMOUNT.test(stringValue) ? null : ERROR_MESSAGES.INVALID_AMOUNT;
    
    default:
      return null;
  }
};

/**
 * Validates multiple fields at once
 * @param {Object} fieldDefinitions - Object with field names as keys and validation config as values
 * @param {Object} formData - Object with form data
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateFields = (fieldDefinitions, formData) => {
  const errors = {};

  Object.entries(fieldDefinitions).forEach(([fieldName, config]) => {
    const { type, required = false, customValidator } = config;
    const value = formData[fieldName];

    // Use custom validator if provided
    if (customValidator && typeof customValidator === 'function') {
      const customError = customValidator(value, formData);
      if (customError) {
        errors[fieldName] = customError;
        return;
      }
    }

    // Use standard field validation
    const error = validateField(type, value, required);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

/**
 * Checks if all required fields in a form are filled
 * @param {Object} fieldDefinitions - Object with field names as keys and validation config as values
 * @param {Object} formData - Object with form data
 * @returns {boolean} True if all required fields are filled
 */
export const areRequiredFieldsFilled = (fieldDefinitions, formData) => {
  return Object.entries(fieldDefinitions).every(([fieldName, config]) => {
    if (!config.required) return true;
    
    const value = formData[fieldName];
    
    // Handle different value types
    if (typeof value === 'boolean') return true; // Boolean fields are always considered filled
    if (typeof value === 'string') return value.trim() !== '';
    if (typeof value === 'number') return !isNaN(value);
    if (Array.isArray(value)) return value.length > 0;
    
    return value != null && value !== '';
  });
};

/**
 * Custom validators for specific business logic
 */
export const customValidators = {
  /**
   * Validates that captcha is solved
   */
  captcha: (isValid) => {
    return isValid ? null : ERROR_MESSAGES.CAPTCHA_REQUIRED;
  },

  /**
   * Validates that declaration is accepted
   */
  declaration: (isAccepted) => {
    return isAccepted ? null : ERROR_MESSAGES.DECLARATION_REQUIRED;
  },

  /**
   * Validates OTP length specifically
   */
  otpLength: (otp) => {
    if (!otp || otp.length !== 6) {
      return ERROR_MESSAGES.OTP_LENGTH;
    }
    return null;
  },

  /**
   * Validates that a select field has a valid selection
   */
  selectRequired: (value, fieldName = 'field') => {
    if (!value || value === '' || value === '0') {
      return `Please select a ${fieldName}`;
    }
    return null;
  }
};

/**
 * Utility function to format PAN input (uppercase)
 */
export const formatPAN = (value) => {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
};

/**
 * Utility function to format mobile input (numbers only)
 */
export const formatMobile = (value) => {
  return value.replace(/\D/g, '').slice(0, 10);
};

/**
 * Utility function to format OTP input (numbers only, 6 digits)
 */
export const formatOTP = (value) => {
  return value.replace(/\D/g, '').slice(0, 6);
};

/**
 * Utility function to format pincode input (numbers only, 6 digits)
 */
export const formatPincode = (value) => {
  return value.replace(/\D/g, '').slice(0, 6);
};

/**
 * Utility function to format amount input (numbers and decimal point only)
 */
export const formatAmount = (value) => {
  return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
};
