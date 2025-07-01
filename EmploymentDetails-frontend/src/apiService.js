const API_BASE_URL = 'http://localhost:5000/api';

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
    return this.get('/districts');
  }

  async getPTaxCategories() {
    return this.get('/ptax-categories');
  }

  async getPTaxSubcategories(categoryId) {
    return this.get(`/ptax-subcategories/${categoryId}`);
  }

  async submitEnrolment(enrolmentData) {
    return this.post('/enrolment', enrolmentData);
  }

  async submitEmploymentDetails(employmentData) {
    return this.post('/employment-details', employmentData);
  }

  async getEnrolmentById(id) {
    return this.get(`/enrolment/${id}`);
  }
}

export default new ApiService();