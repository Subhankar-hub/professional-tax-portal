
const API_BASE_URL = 'http://0.0.0.0:5000/api';

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
    return this.get('/master-data/districts');
  }

  async getPTaxCategories() {
    return this.get('/master-data/ptax-categories');
  }

  async getPTaxSubcategories(categoryId) {
    return this.get(`/master-data/ptax-subcategories/${categoryId}`);
  }

  async submitEnrolment(formData) {
    // Transform frontend data to match backend DTO
    const backendData = {
      // Personal Details
      name: formData.name,
      gender: formData.gender,
      fatherName: formData.fatherName,
      mobile: formData.mobile,
      email: formData.email,
      pan: formData.pan,

      // Address Details
      addressText: formData.establishmentAddress,
      districtLgdCode: parseInt(formData.district),
      pincode: formData.pincode,

      // Business Details
      businessName: formData.establishmentName,
      jurisdictionCode: formData.jurisdictionArea,
      chargeCode: formData.charge,

      // Engagement Details
      engagedWithProfession: formData.engagedWith?.includes('Profession') || false,
      engagedWithTrade: formData.engagedWith?.includes('Trade') || false,
      engagedWithCalling: formData.engagedWith?.includes('Calling') || false,
      engagedWithEmployment: formData.engagedWith?.includes('Employment') || false,

      // Tax Category
      ptaxCategory: parseInt(formData.category),
      ptaxSubcategory: formData.subcategory ? parseInt(formData.subcategory) : null,

      // Establishments
      establishment1Name: formData.establishmentName,
      establishment1Address: formData.establishmentAddress,
      establishment2Name: formData.additionalEstablishments?.[0]?.name || null,
      establishment2Address: formData.additionalEstablishments?.[0]?.address || null,
      establishment3Name: formData.additionalEstablishments?.[1]?.name || null,
      establishment3Address: formData.additionalEstablishments?.[1]?.address || null,
      establishment4Name: formData.additionalEstablishments?.[2]?.name || null,
      establishment4Address: formData.additionalEstablishments?.[2]?.address || null,
      establishment5Name: formData.additionalEstablishments?.[3]?.name || null,
      establishment5Address: formData.additionalEstablishments?.[3]?.address || null,

      // Professional Details (if applicable)
      commencementDate: formData.commencementDate,
      periodOfStanding: formData.periodOfStanding,
      annualGrossBusiness: formData.annualGrossBusiness ? parseFloat(formData.annualGrossBusiness) : null,
      avgWorkersMonthly: formData.monthlyAvgWorkers ? parseInt(formData.monthlyAvgWorkers) : null,
      avgEmployeesMonthly: formData.monthlyAvgEmployees ? parseInt(formData.monthlyAvgEmployees) : null,
      vatNumber: formData.vatRegistered ? formData.vatNumber : null,
      cstNumber: formData.cstRegistered ? formData.cstNumber : null,
      gstNumber: formData.gstRegistered ? formData.gstNumber : null,
      
      // Vehicle counts
      taxiCount: formData.taxis ? parseInt(formData.taxis) : 0,
      threeWheelerCount: formData.threeWheelers ? parseInt(formData.threeWheelers) : 0,
      lmvCount: formData.lightMotorVehicles ? parseInt(formData.lightMotorVehicles) : 0,
      goodVehicleCount: formData.goodVehicles ? parseInt(formData.goodVehicles) : 0,
      truckCount: formData.trucks ? parseInt(formData.trucks) : 0,
      busCount: formData.buses ? parseInt(formData.buses) : 0,
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
}

export default new ApiService();
