const API_BASE_URL = 'http://0.0.0.0:8080/api';

class ApiService {
  
  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Master data API calls
  async getAllMasterData() {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/all`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error fetching master data:', error);
      throw error;
    }
  }

  async getDistricts() {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/districts`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error fetching districts:', error);
      throw error;
    }
  }

  async getAreasByDistrict(districtId) {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/areas/${districtId}`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw error;
    }
  }

  async getChargesByArea(areaId) {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/charges/${areaId}`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error fetching charges:', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/categories`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getSubcategoriesByCategory(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/subcategories/${categoryId}`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  }

  async getPeriodOfStandingOptions() {
    try {
      const response = await fetch(`${API_BASE_URL}/master-data/period-of-standing`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error fetching period of standing options:', error);
      throw error;
    }
  }

  // Enrolment API calls
  async submitEnrolment(enrolmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/enrolment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrolmentData)
      });
      
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error submitting enrolment:', error);
      throw error;
    }
  }

  async getEnrolmentByApplicationId(applicationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/enrolment/${applicationId}`);
      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error fetching enrolment:', error);
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

export default new ApiService();