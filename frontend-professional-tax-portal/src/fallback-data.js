/**
 * Universal Fallback Data Layer
 * 
 * This module provides static JSON arrays that mirror the backend DTOs
 * and includes helper functions to merge API data with fallback data.
 * This keeps data structures uniform across all components.
 */

// Districts fallback data (mirrors backend District entity)
export const fallbackDistricts = [
  {
    id: 1,
    lgdCode: 269,
    districtCode: "DH",
    districtName: "Dhalai",
    name: "Dhalai", // Computed field for compatibility
    stateId: 1,
    status: true
  },
  {
    id: 2,
    lgdCode: 654,
    districtCode: "GM",
    districtName: "Gomati",
    name: "Gomati",
    stateId: 1,
    status: true
  },
  {
    id: 3,
    lgdCode: 652,
    districtCode: "KH",
    districtName: "Khowai",
    name: "Khowai",
    stateId: 1,
    status: true
  },
  {
    id: 4,
    lgdCode: 270,
    districtCode: "NT",
    districtName: "North Tripura",
    name: "North Tripura",
    stateId: 1,
    status: true
  },
  {
    id: 5,
    lgdCode: 653,
    districtCode: "SP",
    districtName: "Sepahijala",
    name: "Sepahijala",
    stateId: 1,
    status: true
  },
  {
    id: 6,
    lgdCode: 271,
    districtCode: "ST",
    districtName: "South Tripura",
    name: "South Tripura",
    stateId: 1,
    status: true
  },
  {
    id: 7,
    lgdCode: 655,
    districtCode: "UN",
    districtName: "Unakoti",
    name: "Unakoti",
    stateId: 1,
    status: true
  },
  {
    id: 8,
    lgdCode: 272,
    districtCode: "WT",
    districtName: "West Tripura",
    name: "West Tripura",
    stateId: 1,
    status: true
  }
];

// Areas fallback data (mirrors backend Area entity)
export const fallbackAreas = [
  {
    id: 1,
    areaCode: "AGT",
    areaName: "Agartala",
    name: "Agartala", // Computed field for compatibility
    districtId: 4, // West Tripura
    status: true
  },
  {
    id: 2,
    areaCode: "BSL",
    areaName: "Bishalgarh",
    name: "Bishalgarh",
    districtId: 5, // Sepahijala
    status: true
  },
  {
    id: 3,
    areaCode: "UDP",
    areaName: "Udaipur",
    name: "Udaipur",
    districtId: 6, // South Tripura
    status: true
  },
  {
    id: 4,
    areaCode: "BLN",
    areaName: "Belonia",
    name: "Belonia",
    districtId: 6, // South Tripura
    status: true
  },
  {
    id: 5,
    areaCode: "TLM",
    areaName: "Teliamura",
    name: "Teliamura",
    districtId: 3, // Khowai
    status: true
  },
  {
    id: 6,
    areaCode: "AMB",
    areaName: "Ambassa",
    name: "Ambassa",
    districtId: 1, // Dhalai
    status: true
  },
  {
    id: 7,
    areaCode: "KLS",
    areaName: "Kailasahar",
    name: "Kailasahar",
    districtId: 7, // Unakoti
    status: true
  },
  {
    id: 8,
    areaCode: "DMN",
    areaName: "Dharmanagar",
    name: "Dharmanagar",
    districtId: 4, // North Tripura
    status: true
  }
];

// Charges fallback data (mirrors backend Charge entity)
export const fallbackCharges = [
  {
    id: 1,
    chargeCode: "AMBA",
    chargeName: "Ambassa",
    name: "Ambassa", // Computed field for compatibility
    areaId: 6, // Ambassa
    status: true
  },
  {
    id: 2,
    chargeCode: "BELO",
    chargeName: "Belonia",
    name: "Belonia",
    areaId: 4, // Belonia
    status: true
  },
  {
    id: 3,
    chargeCode: "BISH",
    chargeName: "Bishalgarh",
    name: "Bishalgarh",
    areaId: 2, // Bishalgarh
    status: true
  },
  {
    id: 4,
    chargeCode: "CH01",
    chargeName: "Charge - I",
    name: "Charge - I (Agartala)",
    areaId: 1, // Agartala
    status: true
  },
  {
    id: 5,
    chargeCode: "CH02",
    chargeName: "Charge - II",
    name: "Charge - II (Agartala)",
    areaId: 1, // Agartala
    status: true
  },
  {
    id: 6,
    chargeCode: "CH03",
    chargeName: "Charge - III",
    name: "Charge - III (Agartala)",
    areaId: 1, // Agartala
    status: true
  },
  {
    id: 7,
    chargeCode: "CH04",
    chargeName: "Charge - IV",
    name: "Charge - IV (Agartala)",
    areaId: 1, // Agartala
    status: true
  },
  {
    id: 8,
    chargeCode: "CH05",
    chargeName: "Charge - V",
    name: "Charge - V (Agartala)",
    areaId: 1, // Agartala
    status: true
  },
  {
    id: 9,
    chargeCode: "CH06",
    chargeName: "Charge - VI",
    name: "Charge - VI (Agartala)",
    areaId: 1, // Agartala
    status: true
  },
  {
    id: 10,
    chargeCode: "CH07",
    chargeName: "Charge - VII",
    name: "Charge - VII (Agartala)",
    areaId: 1, // Agartala
    status: true
  },
  {
    id: 11,
    chargeCode: "CH08",
    chargeName: "Charge - VIII",
    name: "Charge - VIII (Agartala)",
    areaId: 1, // Agartala
    status: true
  },
  {
    id: 12,
    chargeCode: "DHAR",
    chargeName: "Dharmanagar",
    name: "Dharmanagar",
    areaId: 8, // Dharmanagar
    status: true
  },
  {
    id: 13,
    chargeCode: "KAIL",
    chargeName: "Kailasahar",
    name: "Kailasahar",
    areaId: 7, // Kailasahar
    status: true
  },
  {
    id: 14,
    chargeCode: "TELI",
    chargeName: "Teliamura",
    name: "Teliamura",
    areaId: 5, // Teliamura
    status: true
  },
  {
    id: 15,
    chargeCode: "UDAI",
    chargeName: "Udaipur",
    name: "Udaipur",
    areaId: 3, // Udaipur
    status: true
  }
];

// Categories fallback data (mirrors backend PTaxCategory entity)
export const fallbackCategories = [
  {
    id: 1,
    catId: 1,
    categoryName: "Legal Profession",
    name: "Legal Profession", // Computed field for compatibility
    categoryDescription: "Legal Profession",
    description: "Legal Profession", // Computed field for compatibility
    isActive: true
  },
  {
    id: 2,
    catId: 2,
    categoryName: "Medical Profession",
    name: "Medical Profession",
    categoryDescription: "Medical Profession",
    description: "Medical Profession",
    isActive: true
  },
  {
    id: 3,
    catId: 3,
    categoryName: "Consultants",
    name: "Consultants",
    categoryDescription: "Consultants",
    description: "Consultants",
    isActive: true
  },
  {
    id: 4,
    catId: 4,
    categoryName: "Engineering Profession",
    name: "Engineering Profession",
    categoryDescription: "Engineering Profession",
    description: "Engineering Profession",
    isActive: true
  },
  {
    id: 5,
    catId: 5,
    categoryName: "Technicians",
    name: "Technicians",
    categoryDescription: "Technicians",
    description: "Technicians",
    isActive: true
  },
  {
    id: 6,
    catId: 6,
    categoryName: "Agents",
    name: "Agents",
    categoryDescription: "Agents",
    description: "Agents",
    isActive: true
  },
  {
    id: 7,
    catId: 7,
    categoryName: "Service Providers",
    name: "Service Providers",
    categoryDescription: "Service Providers",
    description: "Service Providers",
    isActive: true
  },
  {
    id: 8,
    catId: 8,
    categoryName: "Contractors or Suppliers",
    name: "Contractors or Suppliers",
    categoryDescription: "Contractors or Suppliers (Annual Gross Turnover more than 5 Lakhs)",
    description: "Contractors or Suppliers (Annual Gross Turnover more than 5 Lakhs)",
    isActive: true
  },
  {
    id: 9,
    catId: 9,
    categoryName: "Directors",
    name: "Directors",
    categoryDescription: "Directors",
    description: "Directors",
    isActive: true
  },
  {
    id: 10,
    catId: 10,
    categoryName: "Employers or Establishment",
    name: "Employers or Establishment",
    categoryDescription: "Employers or Establishment",
    description: "Employers or Establishment",
    isActive: true
  },
  {
    id: 11,
    catId: 11,
    categoryName: "Dealer, Person, Tax Payer, Traders",
    name: "Trade",
    categoryDescription: "Dealer, Person, Tax Payer, Traders (Annual Gross Turnover more than 3 Lakhs)",
    description: "Dealer, Person, Tax Payer, Traders",
    isActive: true
  },
  {
    id: 12,
    catId: 12,
    categoryName: "Agents and Distributors",
    name: "Agents and Distributors",
    categoryDescription: "Agents and Distributors",
    description: "Agents and Distributors",
    isActive: true
  },
  {
    id: 13,
    catId: 13,
    categoryName: "Licenced Vendor",
    name: "Licenced Vendor",
    categoryDescription: "Licenced Vendor",
    description: "Licenced Vendor",
    isActive: true
  },
  {
    id: 14,
    catId: 14,
    categoryName: "Owners or Leasees or Licencees or Occupiers",
    name: "Owners or Leasees or Licencees or Occupiers",
    categoryDescription: "Owners or Leasees or Licencees or Occupiers",
    description: "Owners or Leasees or Licencees or Occupiers",
    isActive: true
  },
  {
    id: 15,
    catId: 15,
    categoryName: "Societies",
    name: "Societies",
    categoryDescription: "Societies",
    description: "Societies",
    isActive: true
  },
  {
    id: 16,
    catId: 16,
    categoryName: "Companies",
    name: "Companies",
    categoryDescription: "Companies",
    description: "Companies",
    isActive: true
  },
  {
    id: 17,
    catId: 17,
    categoryName: "Partnership Firms",
    name: "Partnership Firms",
    categoryDescription: "Partnership Firms",
    description: "Partnership Firms",
    isActive: true
  },
  {
    id: 18,
    catId: 18,
    categoryName: "Transport Vehicle Holders",
    name: "Transport Vehicle Holders",
    categoryDescription: "Holders of Permits of Transport Vehicle granted under MVI Act. 1939 or 1988",
    description: "Holders of Permits of Transport Vehicle granted under MVI Act. 1939 or 1988",
    isActive: true
  },
  {
    id: 19,
    catId: 19,
    categoryName: "Individuals or Institutions",
    name: "Individuals or Institutions",
    categoryDescription: "Individuals or Institutions",
    description: "Individuals or Institutions",
    isActive: true
  },
  {
    id: 20,
    catId: 20,
    categoryName: "Others",
    name: "Others",
    categoryDescription: "Persons other than those mentioned in any of the preceding entries.",
    description: "Persons other than those mentioned in any of the preceding entries.",
    isActive: true
  },
  {
    id: 21,
    catId: 21,
    categoryName: "Salary & Wage Earner",
    name: "Employment",
    categoryDescription: "Salary & Wage Earner",
    description: "Salary & Wage Earner",
    isActive: true
  }
];

// Subcategories fallback data (mirrors backend PTaxCategorySubcategory entity)
export const fallbackSubcategories = {
  1: [ // Legal Profession
    {
      id: 1,
      categoryId: 1,
      subcategoryName: "Practitioners",
      name: "Practitioners", // Computed field for compatibility
      subcategoryDescription: "Practitioners",
      description: "Practitioners", // Computed field for compatibility
      isActive: true
    },
    {
      id: 2,
      categoryId: 1,
      subcategoryName: "Solicitors",
      name: "Solicitors",
      subcategoryDescription: "Solicitors",
      description: "Solicitors",
      isActive: true
    },
    {
      id: 3,
      categoryId: 1,
      subcategoryName: "Notaries Public",
      name: "Notaries Public",
      subcategoryDescription: "Notaries Public",
      description: "Notaries Public",
      isActive: true
    },
    {
      id: 4,
      categoryId: 1,
      subcategoryName: "Others",
      name: "Others",
      subcategoryDescription: "Others",
      description: "Others",
      isActive: true
    }
  ],
  2: [ // Medical Profession
    {
      id: 5,
      categoryId: 2,
      subcategoryName: "Dentists",
      name: "Dentists",
      subcategoryDescription: "Dentists",
      description: "Dentists",
      isActive: true
    },
    {
      id: 6,
      categoryId: 2,
      subcategoryName: "Pathologists",
      name: "Pathologists",
      subcategoryDescription: "Pathologists",
      description: "Pathologists",
      isActive: true
    },
    {
      id: 7,
      categoryId: 2,
      subcategoryName: "Cardiologist",
      name: "Cardiologist",
      subcategoryDescription: "Cardiologist",
      description: "Cardiologist",
      isActive: true
    },
    {
      id: 8,
      categoryId: 2,
      subcategoryName: "Dermatologist",
      name: "Dermatologist",
      subcategoryDescription: "Dermatologist",
      description: "Dermatologist",
      isActive: true
    },
    {
      id: 9,
      categoryId: 2,
      subcategoryName: "ENT Specialist",
      name: "ENT Specialist",
      subcategoryDescription: "ENT Specialist",
      description: "ENT Specialist",
      isActive: true
    },
    {
      id: 10,
      categoryId: 2,
      subcategoryName: "Pediatrician",
      name: "Pediatrician",
      subcategoryDescription: "Pediatrician",
      description: "Pediatrician",
      isActive: true
    },
    {
      id: 11,
      categoryId: 2,
      subcategoryName: "Surgeon",
      name: "Surgeon",
      subcategoryDescription: "Surgeon",
      description: "Surgeon",
      isActive: true
    },
    {
      id: 12,
      categoryId: 2,
      subcategoryName: "Others",
      name: "Others",
      subcategoryDescription: "Others",
      description: "Others",
      isActive: true
    }
  ],
  3: [ // Consultants
    {
      id: 13,
      categoryId: 3,
      subcategoryName: "Medical Consultants",
      name: "Medical Consultants",
      subcategoryDescription: "Medical Consultants",
      description: "Medical Consultants",
      isActive: true
    },
    {
      id: 14,
      categoryId: 3,
      subcategoryName: "Management Consultants",
      name: "Management Consultants",
      subcategoryDescription: "Management Consultants",
      description: "Management Consultants",
      isActive: true
    },
    {
      id: 15,
      categoryId: 3,
      subcategoryName: "Software Consultant",
      name: "Software Consultant",
      subcategoryDescription: "Software Consultant",
      description: "Software Consultant",
      isActive: true
    },
    {
      id: 16,
      categoryId: 3,
      subcategoryName: "Chartered Accountant",
      name: "Chartered Accountant",
      subcategoryDescription: "Chartered Accountant",
      description: "Chartered Accountant",
      isActive: true
    },
    {
      id: 17,
      categoryId: 3,
      subcategoryName: "Other Consultants",
      name: "Other Consultants",
      subcategoryDescription: "Other Consultants",
      description: "Other Consultants",
      isActive: true
    }
  ],
  4: [ // Engineering Profession
    {
      id: 18,
      categoryId: 4,
      subcategoryName: "Mechanical Engineer",
      name: "Mechanical Engineer",
      subcategoryDescription: "Mechanical Engineer",
      description: "Mechanical Engineer",
      isActive: true
    },
    {
      id: 19,
      categoryId: 4,
      subcategoryName: "Civil Engineer",
      name: "Civil Engineer",
      subcategoryDescription: "Civil Engineer",
      description: "Civil Engineer",
      isActive: true
    },
    {
      id: 20,
      categoryId: 4,
      subcategoryName: "Software Engineer",
      name: "Software Engineer",
      subcategoryDescription: "Software Engineer",
      description: "Software Engineer",
      isActive: true
    },
    {
      id: 21,
      categoryId: 4,
      subcategoryName: "Electrical Engineer",
      name: "Electrical Engineer",
      subcategoryDescription: "Electrical Engineer",
      description: "Electrical Engineer",
      isActive: true
    },
    {
      id: 22,
      categoryId: 4,
      subcategoryName: "Other Engineers",
      name: "Other Engineers",
      subcategoryDescription: "Other Engineers",
      description: "Other Engineers",
      isActive: true
    }
  ]
};

// Period of Standing options (mirrors backend service response)
export const fallbackPeriodOfStanding = [
  {
    id: 1,
    value: "0 Year 0 Month 9 Days",
    label: "0 Year 0 Month 9 Days",
    name: "0 Year 0 Month 9 Days" // Computed field for compatibility
  },
  {
    id: 2,
    value: "0 Year 1 Month 0 Days",
    label: "0 Year 1 Month 0 Days",
    name: "0 Year 1 Month 0 Days"
  },
  {
    id: 3,
    value: "0 Year 6 Months 0 Days",
    label: "0 Year 6 Months 0 Days",
    name: "0 Year 6 Months 0 Days"
  },
  {
    id: 4,
    value: "1 Year 0 Month 0 Days",
    label: "1 Year 0 Month 0 Days",
    name: "1 Year 0 Month 0 Days"
  },
  {
    id: 5,
    value: "2 Years 0 Month 0 Days",
    label: "2 Years 0 Month 0 Days",
    name: "2 Years 0 Month 0 Days"
  },
  {
    id: 6,
    value: "3 Years 0 Month 0 Days",
    label: "3 Years 0 Month 0 Days",
    name: "3 Years 0 Month 0 Days"
  },
  {
    id: 7,
    value: "5 Years 0 Month 0 Days",
    label: "5 Years 0 Month 0 Days",
    name: "5 Years 0 Month 0 Days"
  },
  {
    id: 8,
    value: "More than 5 Years",
    label: "More than 5 Years",
    name: "More than 5 Years"
  }
];

/**
 * Helper function to merge API data with fallback data
 * 
 * @param {Promise} apiPromise - Promise that resolves to API response
 * @param {Array} fallbackData - Fallback data array to use if API fails
 * @param {Object} options - Configuration options
 * @param {Function} options.transform - Optional transform function for API data
 * @param {Function} options.filter - Optional filter function for fallback data
 * @param {boolean} options.preferFallback - If true, uses fallback even when API succeeds
 * @returns {Promise<Array>} - Promise that resolves to either API data or fallback data
 */
export const mergeWithFallback = async (apiPromise, fallbackData, options = {}) => {
  const {
    transform = (data) => data,
    filter = () => true,
    preferFallback = false
  } = options;

  // If preferFallback is true, return fallback data immediately
  if (preferFallback) {
    console.warn('Using fallback data (preferFallback=true)');
    return Array.isArray(fallbackData) ? fallbackData.filter(filter) : fallbackData;
  }

  try {
    const response = await apiPromise;
    
    // Handle different API response structures
    let apiData;
    if (response?.data) {
      // Standard API response with { success: true, data: [...] }
      apiData = response.data;
    } else if (Array.isArray(response)) {
      // Direct array response
      apiData = response;
    } else if (response?.success && response?.data) {
      // Alternative success response format
      apiData = response.data;
    } else {
      // Unexpected format, use fallback
      throw new Error('Unexpected API response format');
    }

    // Validate API data
    if (!Array.isArray(apiData) || apiData.length === 0) {
      throw new Error('API returned empty or invalid data');
    }

    // Transform and return API data
    const transformedData = transform(apiData);
    console.log('Using API data successfully');
    return transformedData;

  } catch (error) {
    console.warn('API call failed, using fallback data:', error.message);
    
    // Return filtered fallback data
    if (Array.isArray(fallbackData)) {
      return fallbackData.filter(filter);
    } else {
      return fallbackData;
    }
  }
};

/**
 * Helper function to get subcategories by category ID with fallback
 * 
 * @param {number|string} categoryId - Category ID to get subcategories for
 * @param {Promise} apiPromise - Optional API promise for subcategories
 * @returns {Promise<Array>} - Promise that resolves to subcategories array
 */
export const getSubcategoriesWithFallback = async (categoryId, apiPromise = null) => {
  const categoryIdNum = parseInt(categoryId, 10);
  const fallbackSubs = fallbackSubcategories[categoryIdNum] || [];

  if (!apiPromise) {
    return fallbackSubs;
  }

  return mergeWithFallback(apiPromise, fallbackSubs);
};

/**
 * Helper function to get areas by district ID with fallback
 * 
 * @param {number|string} districtId - District ID to get areas for
 * @param {Promise} apiPromise - Optional API promise for areas
 * @returns {Promise<Array>} - Promise that resolves to areas array
 */
export const getAreasByDistrictWithFallback = async (districtId, apiPromise = null) => {
  const districtIdNum = parseInt(districtId, 10);
  const filteredAreas = fallbackAreas.filter(area => area.districtId === districtIdNum);

  if (!apiPromise) {
    return filteredAreas;
  }

  return mergeWithFallback(apiPromise, filteredAreas);
};

/**
 * Helper function to get charges by area ID with fallback
 * 
 * @param {number|string} areaId - Area ID to get charges for
 * @param {Promise} apiPromise - Optional API promise for charges
 * @returns {Promise<Array>} - Promise that resolves to charges array
 */
export const getChargesByAreaWithFallback = async (areaId, apiPromise = null) => {
  const areaIdNum = parseInt(areaId, 10);
  const filteredCharges = fallbackCharges.filter(charge => charge.areaId === areaIdNum);

  if (!apiPromise) {
    return filteredCharges;
  }

  return mergeWithFallback(apiPromise, filteredCharges);
};

/**
 * Data processing utilities
 */
export const dataUtils = {
  /**
   * Normalize district data to ensure consistent field names
   */
  normalizeDistricts: (districts) => {
    return districts.map(district => ({
      ...district,
      name: district.name || district.districtName,
      districtName: district.districtName || district.name
    }));
  },

  /**
   * Normalize category data to ensure consistent field names
   */
  normalizeCategories: (categories) => {
    return categories.map(category => ({
      ...category,
      name: category.name || category.categoryName,
      categoryName: category.categoryName || category.name,
      description: category.description || category.categoryDescription,
      categoryDescription: category.categoryDescription || category.description
    }));
  },

  /**
   * Remove duplicate categories by catId
   */
  deduplicateCategories: (categories) => {
    const seen = new Set();
    return categories.filter(category => {
      const key = category.catId;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  },

  /**
   * Sort data by specified field
   */
  sortBy: (data, field, direction = 'asc') => {
    return [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (direction === 'desc') {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
  }
};

// Export all fallback data as a single object for convenience
export const fallbackData = {
  districts: fallbackDistricts,
  areas: fallbackAreas,
  charges: fallbackCharges,
  categories: fallbackCategories,
  subcategories: fallbackSubcategories,
  periodOfStanding: fallbackPeriodOfStanding
};

// Export default
export default {
  fallbackDistricts,
  fallbackAreas,
  fallbackCharges,
  fallbackCategories,
  fallbackSubcategories,
  fallbackPeriodOfStanding,
  mergeWithFallback,
  getSubcategoriesWithFallback,
  getAreasByDistrictWithFallback,
  getChargesByAreaWithFallback,
  dataUtils,
  fallbackData
};
