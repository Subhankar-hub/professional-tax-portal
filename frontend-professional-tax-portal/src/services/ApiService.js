const API_BASE_URL = 'http://0.0.0.0:8080/api';

class ApiService {
  constructor() {
    // In-memory cache for master data
    this.masterDataCache = new Map();
  }

  // Fallback data helper
  getFallbackData(type) {
    const fallbackData = {
      districts: [
        { districtCode: 'DH', districtName: 'Dhalai', lgdCode: 269, stateId: 1, status: true },
        { districtCode: 'GM', districtName: 'Gomati', lgdCode: 654, stateId: 1, status: true },
        { districtCode: 'KH', districtName: 'Khowai', lgdCode: 652, stateId: 1, status: true },
        { districtCode: 'NT', districtName: 'North Tripura', lgdCode: 270, stateId: 1, status: true },
        { districtCode: 'SP', districtName: 'Sepahijala', lgdCode: 653, stateId: 1, status: true },
        { districtCode: 'ST', districtName: 'South Tripura', lgdCode: 271, stateId: 1, status: true },
        { districtCode: 'UN', districtName: 'Unakoti', lgdCode: 655, stateId: 1, status: true },
        { districtCode: 'WT', districtName: 'West Tripura', lgdCode: 272, stateId: 1, status: true }
      ],
      categories: [
        { catId: 1, categoryName: 'Legal Profession', categoryDescription: 'Legal Profession', isActive: true },
        { catId: 2, categoryName: 'Medical Profession', categoryDescription: 'Medical Profession', isActive: true },
        { catId: 3, categoryName: 'Consultants', categoryDescription: 'Consultants', isActive: true },
        { catId: 4, categoryName: 'Engineering Profession', categoryDescription: 'Engineering Profession', isActive: true },
        { catId: 5, categoryName: 'Technicians', categoryDescription: 'Technicians', isActive: true },
        { catId: 6, categoryName: 'Agents', categoryDescription: 'Agents', isActive: true },
        { catId: 7, categoryName: 'Service Providers', categoryDescription: 'Service Providers', isActive: true },
        { catId: 8, categoryName: 'Contractors or Suppliers', categoryDescription: 'Contractors or Suppliers (Annual Gross Turnover more than 5 Lakhs)', isActive: true },
        { catId: 11, categoryName: 'Dealer, Person, Tax Payer, Traders', categoryDescription: 'Dealer, Person, Tax Payer, Traders (Annual Gross Turnover more than 3 Lakhs)', isActive: true },
        { catId: 21, categoryName: 'Salary & Wage Earner', categoryDescription: 'Salary & Wage Earner', isActive: true }
      ],
      'period-of-standing': [
        '0 Year 0 Month 9 Days',
        '0 Year 1 Month 0 Days',
        '0 Year 6 Months 0 Days',
        '1 Year 0 Month 0 Days',
        '2 Years 0 Month 0 Days',
        '3 Years 0 Month 0 Days',
        '5 Years 0 Month 0 Days',
        'More than 5 Years'
      ],
      areas: [
        { code: 'AGT', name: 'Agartala' },
        { code: 'BSL', name: 'Bishalgarh' },
        { code: 'UDP', name: 'Udaipur' },
        { code: 'BLN', name: 'Belonia' },
        { code: 'TLM', name: 'Teliamura' },
        { code: 'AMB', name: 'Ambassa' },
        { code: 'KLS', name: 'Kailasahar' },
        { code: 'DMN', name: 'Dharmanagar' }
      ],
      charges: [
        { code: 'AMBA', charge: 'Ambassa', areaCode: 'AMB', chargeSn: 1 },
        { code: 'BELO', charge: 'Belonia', areaCode: 'BLN', chargeSn: 2 },
        { code: 'BISH', charge: 'Bishalgarh', areaCode: 'BSL', chargeSn: 3 },
        { code: 'CH01', charge: 'Charge - I', areaCode: 'AGT', chargeSn: 4 },
        { code: 'CH02', charge: 'Charge - II', areaCode: 'AGT', chargeSn: 5 },
        { code: 'CH03', charge: 'Charge - III', areaCode: 'AGT', chargeSn: 6 },
        { code: 'CH04', charge: 'Charge - IV', areaCode: 'AGT', chargeSn: 7 },
        { code: 'CH05', charge: 'Charge - V', areaCode: 'AGT', chargeSn: 8 },
        { code: 'CH06', charge: 'Charge - VI', areaCode: 'AGT', chargeSn: 9 },
        { code: 'CH07', charge: 'Charge - VII', areaCode: 'AGT', chargeSn: 10 },
        { code: 'CH08', charge: 'Charge - VIII', areaCode: 'AGT', chargeSn: 11 },
        { code: 'DHAR', charge: 'Dharmanagar', areaCode: 'DMN', chargeSn: 12 },
        { code: 'KAIL', charge: 'Kailashahar', areaCode: 'KLS', chargeSn: 13 },
        { code: 'TELI', charge: 'Teliamura', areaCode: 'TLM', chargeSn: 14 },
        { code: 'UDAI', charge: 'Udaipur', areaCode: 'UDP', chargeSn: 15 }
      ],
      subcategories: [],
      all: {
        districts: [],
        categories: [],
        genders: ['Male', 'Female', 'Other'],
        applicantTypes: ['Individual', 'Others']
      }
    };
    return fallbackData[type] || [];
  }

  // Enhanced error handling with fallback and optional toast notification
  handleApiError(error, fallbackType, context) {
    const errorMsg = `API Error - ${context}: ${error.message}`;
    console.warn(errorMsg);

    // Optional toast notification (if toast library is available)
    if (typeof window !== 'undefined' && window.toast) {
      window.toast.warning(`Failed to load ${context}. Using fallback data.`);
    }

    return {
      success: true,
      data: this.getFallbackData(fallbackType),
      message: 'Fallback data provided due to API error',
      isFromFallback: true
    };
  }

  // Centralized master data function with caching
  async getMasterData(type) {
    // Check cache first
    if (this.masterDataCache.has(type)) {
      return this.masterDataCache.get(type);
    }

    const endpoints = {
      'districts': '/master-data/districts',
      'categories': '/master-data/categories',
      'period-of-standing': '/master-data/period-of-standing',
      'all': '/master-data/all'
    };

    const endpoint = endpoints[type];
    if (!endpoint) {
      throw new Error(`Invalid master data type: ${type}`);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const result = await this.handleResponse(response);

      // Check if data is empty
      if (!result.data || (Array.isArray(result.data) && result.data.length === 0)) {
        const fallbackResult = this.handleApiError(new Error('Empty data received'), type, `${type} data`);
        this.masterDataCache.set(type, fallbackResult);
        return fallbackResult;
      }

      // Cache the successful result
      this.masterDataCache.set(type, result);
      return result;
    } catch (error) {
      const fallbackResult = this.handleApiError(error, type, `${type} data`);
      this.masterDataCache.set(type, fallbackResult);
      return fallbackResult;
    }
  }

  // Clear cache method for testing or manual refresh
  clearMasterDataCache(type = null) {
    if (type) {
      this.masterDataCache.delete(type);
    } else {
      this.masterDataCache.clear();
    }
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    
    // If the response has a success field, check it
    if (result.hasOwnProperty('success')) {
      if (!result.success) {
        throw new Error(result.message || 'API request failed');
      }
      // Return the data part of successful responses
      return {
        success: result.success,
        data: result.data,
        message: result.message
      };
    }
    
    // For responses without success field, return as-is
    return result;
  }

  // Master data API calls with enhanced error handling and fallback
  async getAllMasterData() {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/all`);
      const result = await this.handleResponse(response);
      
      // Check if data is empty
      if (!result.data || (typeof result.data === 'object' && Object.keys(result.data).length === 0)) {
        return this.handleApiError(new Error('Empty data received'), 'all', 'master data');
      }
      
      return result;
    } catch (error) {
      return this.handleApiError(error, 'all', 'master data');
    }
  }

  async getDistricts() {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/districts`);
      const result = await this.handleResponse(response);
      
      // Check if data is empty
      if (!result.data || (Array.isArray(result.data) && result.data.length === 0)) {
        return this.handleApiError(new Error('Empty data received'), 'districts', 'districts');
      }
      
      return result;
    } catch (error) {
      return this.handleApiError(error, 'districts', 'districts');
    }
  }

  async getAreasByDistrict(districtId) {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/areas/${districtId}`);
      const result = await this.handleResponse(response);
      
      // Check if data is empty
      if (!result.data || (Array.isArray(result.data) && result.data.length === 0)) {
        return this.handleApiError(new Error('Empty data received'), 'areas', 'areas');
      }
      
      return result;
    } catch (error) {
      return this.handleApiError(error, 'areas', 'areas');
    }
  }

  async getChargesByArea(areaId) {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/charges/${areaId}`);
      const result = await this.handleResponse(response);
      
      // Check if data is empty
      if (!result.data || (Array.isArray(result.data) && result.data.length === 0)) {
        return this.handleApiError(new Error('Empty data received'), 'charges', 'charges');
      }
      
      return result;
    } catch (error) {
      return this.handleApiError(error, 'charges', 'charges');
    }
  }

  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/categories`);
      const result = await this.handleResponse(response);
      
      // Check if data is empty
      if (!result.data || (Array.isArray(result.data) && result.data.length === 0)) {
        return this.handleApiError(new Error('Empty data received'), 'categories', 'categories');
      }
      
      return result;
    } catch (error) {
      return this.handleApiError(error, 'categories', 'categories');
    }
  }

  async getSubcategoriesByCategory(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/subcategories/${categoryId}`);
      const result = await this.handleResponse(response);
      
      // Check if data is empty
      if (!result.data || (Array.isArray(result.data) && result.data.length === 0)) {
        return this.handleApiError(new Error('Empty data received'), 'subcategories', 'subcategories');
      }
      
      return result;
    } catch (error) {
      return this.handleApiError(error, 'subcategories', 'subcategories');
    }
  }

  async getPeriodOfStandingOptions() {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/period-of-standing`);
      const result = await this.handleResponse(response);
      
      // Check if data is empty
      if (!result.data || (Array.isArray(result.data) && result.data.length === 0)) {
        return this.handleApiError(new Error('Empty data received'), 'period-of-standing', 'period of standing options');
      }
      
      return result;
    } catch (error) {
      return this.handleApiError(error, 'period-of-standing', 'period of standing options');
    }
  }

  // Enrolment API calls
  async submitEnrolment(formData) {
    try {
      // Transform the data to match backend expectations
      const transformedData = {
        ...formData,
        // Map engagement array to individual boolean fields
        engagedWithProfession: formData.engagedWith ? formData.engagedWith.includes('Profession') : false,
        engagedWithTrade: formData.engagedWith ? formData.engagedWith.includes('Trade') : false,
        engagedWithCalling: formData.engagedWith ? formData.engagedWith.includes('Calling') : false,
        engagedWithEmployment: formData.engagedWith ? formData.engagedWith.includes('Employment') : false,
        // Remove the original engagedWith array
        engagedWith: undefined,
        // Ensure captcha is properly set
        captchaValue: formData.captchaValue || 'test123',
        // Map field names to match backend DTO
        establishmentName: formData.establishmentName || formData.name,
        jurisdictionArea: formData.jurisdictionArea,
        charge: formData.charge,
        district: formData.district,
        pincode: formData.pincode,
        establishmentAddress: formData.establishmentAddress,
        category: parseInt(formData.category),
        subcategory: parseInt(formData.subcategory)
      };

      console.log('Transformed data being sent:', transformedData);

      const response = await fetch(`${API_BASE_URL}/enrolment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.warn('API Error - enrolment submission:', error.message);
      
      // Optional toast notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error(`Failed to submit enrolment: ${error.message}`);
      }
      
      throw error;
    }
  }

  async getEnrolmentByApplicationId(applicationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/enrolment/${applicationId}`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.warn('API Error - enrolment fetch:', error.message);
      
      // Optional toast notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error(`Failed to fetch enrolment: ${error.message}`);
      }
      
      throw error;
    }
  }

  // OTP API calls
  async sendOTP(mobile, type = 'mobile') {
    try {
      const response = await fetch(`${API_BASE_URL}/otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, type }),
      });
      
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.warn('API Error - OTP sending:', error.message);
      
      // Optional toast notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error(`Failed to send OTP: ${error.message}`);
      }
      
      throw error;
    }
  }

  async verifyOTP(mobile, otp, type = 'mobile') {
    try {
      const response = await fetch(`${API_BASE_URL}/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, otp, type }),
      });
      
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.warn('API Error - OTP verification:', error.message);
      
      // Optional toast notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error(`Failed to verify OTP: ${error.message}`);
      }
      
      throw error;
    }
  }

  // Temporary save for step-by-step form
  async saveTemporaryEnrolment(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/enrolment/temp-save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.warn('API Error - temporary enrolment save:', error.message);
      
      // Optional toast notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error(`Failed to save temporary enrolment: ${error.message}`);
      }
      
      throw error;
    }
  }

  // Captcha generation (mock implementation)
  generateCaptcha() {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      default:
        result = num1 + num2;
    }

    return {
      question: `${num1}${operator}${num2}=`,
      answer: result
    };
  }

  // Validation helpers
  validatePAN(pan) {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  }

  validateMobile(mobile) {
    const mobilePattern = /^[6-9]\d{9}$/;
    return mobilePattern.test(mobile);
  }

  validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePincode(pincode) {
    const pincodePattern = /^[1-9][0-9]{5}$/;
    return pincodePattern.test(pincode);
  }
}

// Export the singleton instance
export default new ApiService();

/* 
 * ENHANCED API SERVICE WITH FALLBACK & ERROR MESSAGING
 * 
 * Key Features:
 * 1. All get* methods now have try/catch error handling
 * 2. Automatic fallback data when API fails or returns empty data
 * 3. Consistent error logging with console.warn
 * 4. Optional toast notifications (if window.toast is available)
 * 5. Centralized getMasterData(type) function with caching
 * 6. In-memory caching for master data to reduce API calls
 * 
 * Usage Examples:
 * 
 * // Using individual methods (with fallback)
 * const districts = await apiService.getDistricts();
 * 
 * // Using centralized master data function (with caching)
 * const districts = await apiService.getMasterData('districts');
 * const categories = await apiService.getMasterData('categories');
 * 
 * // Clear cache when needed
 * apiService.clearMasterDataCache(); // Clear all
 * apiService.clearMasterDataCache('districts'); // Clear specific type
 * 
 * // Check if data is from fallback
 * if (result.isFromFallback) {
 *   console.log('Using fallback data due to API issues');
 * }
 */
