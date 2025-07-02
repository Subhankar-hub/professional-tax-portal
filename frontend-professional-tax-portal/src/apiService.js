const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiService {
  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Professional Tax specific endpoints
  async getDistricts() {
    return this.get('/master/districts');
  }

  async getPTaxCategories() {
    return this.get('/master/ptax-categories');
  }

  async getPTaxSubcategories(categoryId) {
    return this.get(`/master/ptax-subcategories/${categoryId}`);
  }

  async submitEnrolment(enrolmentData) {
    // Transform frontend data to match backend DTO
    const backendData = {
      // Personal Details
      name: enrolmentData.name,
      gender: enrolmentData.gender,
      fatherName: enrolmentData.fatherName,
      mobile: enrolmentData.mobile,
      email: enrolmentData.email,
      pan: enrolmentData.pan,

      // Address Details
      addressText: enrolmentData.addressText,
      districtLgdCode: parseInt(enrolmentData.districtLgdCode),
      pincode: enrolmentData.pincode,

      // Business Details
      businessName: enrolmentData.businessName,
      jurisdictionCode: enrolmentData.jurisdictionCode,
      chargeCode: enrolmentData.chargeCode,

      // Engagement Details
      engagedWithProfession: enrolmentData.engagedWithProfession,
      engagedWithTrade: enrolmentData.engagedWithTrade,
      engagedWithCalling: enrolmentData.engagedWithCalling,
      engagedWithEmployment: enrolmentData.engagedWithEmployment,

      // Tax Category
      ptaxCategory: parseInt(enrolmentData.ptaxCategory),
      ptaxSubcategory: enrolmentData.ptaxSubcategory ? parseInt(enrolmentData.ptaxSubcategory) : null,

      // Establishments
      establishment1Name: enrolmentData.establishments[0]?.name,
      establishment1Address: enrolmentData.establishments[0]?.address,
      establishment2Name: enrolmentData.establishments[1]?.name,
      establishment2Address: enrolmentData.establishments[1]?.address,
      establishment3Name: enrolmentData.establishments[2]?.name,
      establishment3Address: enrolmentData.establishments[2]?.address,
      establishment4Name: enrolmentData.establishments[3]?.name,
      establishment4Address: enrolmentData.establishments[3]?.address,
      establishment5Name: enrolmentData.establishments[4]?.name,
      establishment5Address: enrolmentData.establishments[4]?.address,
    };

    return this.post('/enrolment/submit', backendData);
  }

  async getEnrolmentById(id) {
    return this.get(`/enrolment/${id}`);
  }

  async getEnrolmentByApplicationId(applicationId) {
    return this.get(`/enrolment/application/${applicationId}`);
  }

  async searchEnrolmentByPan(pan) {
    return this.get(`/enrolment/search/pan/${pan}`);
  }

  async submitProfessionalDetails(data) {
    return this.post('/professional-details', data);
  }
}

export default new ApiService();