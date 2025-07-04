/**
 * Example Usage of Fallback Data Layer
 * 
 * This file demonstrates how to use the fallback data layer in components
 * to ensure consistent data structures across the application.
 */

import ApiService from './services/ApiService';
import {
  mergeWithFallback,
  fallbackDistricts,
  fallbackCategories,
  fallbackPeriodOfStanding,
  getSubcategoriesWithFallback,
  getAreasByDistrictWithFallback,
  getChargesByAreaWithFallback,
  dataUtils
} from './fallback-data';

/**
 * Example 1: Basic usage with districts
 */
export const loadDistrictsExample = async () => {
  try {
    // Use mergeWithFallback to get districts from API with fallback
    const districts = await mergeWithFallback(
      ApiService.getDistricts(),
      fallbackDistricts,
      {
        // Transform API data to ensure consistent field names
        transform: (apiData) => dataUtils.normalizeDistricts(apiData),
        // Sort by district name
        filter: (district) => district.status === true
      }
    );

    console.log('Districts loaded:', districts);
    return districts;
  } catch (error) {
    console.error('Error loading districts:', error);
    return fallbackDistricts; // Final fallback
  }
};

/**
 * Example 2: Categories with deduplication and processing
 */
export const loadCategoriesExample = async () => {
  try {
    const categories = await mergeWithFallback(
      ApiService.getCategories(),
      fallbackCategories,
      {
        transform: (apiData) => {
          // Normalize field names
          const normalized = dataUtils.normalizeCategories(apiData);
          // Remove duplicates by catId
          const deduplicated = dataUtils.deduplicateCategories(normalized);
          // Sort by catId
          return dataUtils.sortBy(deduplicated, 'catId');
        }
      }
    );

    console.log('Categories loaded:', categories);
    return categories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return fallbackCategories;
  }
};

/**
 * Example 3: Subcategories by category ID
 */
export const loadSubcategoriesExample = async (categoryId) => {
  try {
    const apiPromise = categoryId ? ApiService.getSubcategoriesByCategory(categoryId) : null;
    const subcategories = await getSubcategoriesWithFallback(categoryId, apiPromise);

    console.log(`Subcategories for category ${categoryId}:`, subcategories);
    return subcategories;
  } catch (error) {
    console.error('Error loading subcategories:', error);
    return [];
  }
};

/**
 * Example 4: Areas by district with cascade loading
 */
export const loadAreasByDistrictExample = async (districtId) => {
  try {
    const apiPromise = districtId ? ApiService.getAreasByDistrict(districtId) : null;
    const areas = await getAreasByDistrictWithFallback(districtId, apiPromise);

    console.log(`Areas for district ${districtId}:`, areas);
    return areas;
  } catch (error) {
    console.error('Error loading areas:', error);
    return [];
  }
};

/**
 * Example 5: Charges by area with cascade loading
 */
export const loadChargesByAreaExample = async (areaId) => {
  try {
    const apiPromise = areaId ? ApiService.getChargesByArea(areaId) : null;
    const charges = await getChargesByAreaWithFallback(areaId, apiPromise);

    console.log(`Charges for area ${areaId}:`, charges);
    return charges;
  } catch (error) {
    console.error('Error loading charges:', error);
    return [];
  }
};

/**
 * Example 6: Period of Standing options
 */
export const loadPeriodOfStandingExample = async () => {
  try {
    const periodOptions = await mergeWithFallback(
      ApiService.getPeriodOfStandingOptions(),
      fallbackPeriodOfStanding
    );

    console.log('Period of standing options:', periodOptions);
    return periodOptions;
  } catch (error) {
    console.error('Error loading period of standing options:', error);
    return fallbackPeriodOfStanding;
  }
};

/**
 * Example 7: Complete form data loading with cascading dependencies
 */
export const loadCompleteFormDataExample = async () => {
  try {
    // Load all master data in parallel where possible
    const [districts, categories, periodOfStanding] = await Promise.all([
      loadDistrictsExample(),
      loadCategoriesExample(),
      loadPeriodOfStandingExample()
    ]);

    return {
      districts,
      categories,
      periodOfStanding,
      // Areas and charges will be loaded based on user selection
      areas: [],
      charges: [],
      subcategories: []
    };
  } catch (error) {
    console.error('Error loading complete form data:', error);
    // Return complete fallback data
    return {
      districts: fallbackDistricts,
      categories: fallbackCategories,
      periodOfStanding: fallbackPeriodOfStanding,
      areas: [],
      charges: [],
      subcategories: []
    };
  }
};

/**
 * Example 8: Using with React hooks (demonstration)
 */
export const useFormDataExample = () => {
  // This would be used in a React component like this:
  /*
  const [formData, setFormData] = useState({
    districts: [],
    areas: [],
    charges: [],
    categories: [],
    subcategories: [],
    periodOfStanding: []
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await loadCompleteFormDataExample();
      setFormData(data);
    };
    loadData();
  }, []);

  const handleDistrictChange = async (districtId) => {
    const areas = await loadAreasByDistrictExample(districtId);
    setFormData(prev => ({
      ...prev,
      areas,
      charges: [], // Reset dependent data
    }));
  };

  const handleAreaChange = async (areaId) => {
    const charges = await loadChargesByAreaExample(areaId);
    setFormData(prev => ({
      ...prev,
      charges
    }));
  };

  const handleCategoryChange = async (categoryId) => {
    const subcategories = await loadSubcategoriesExample(categoryId);
    setFormData(prev => ({
      ...prev,
      subcategories
    }));
  };
  */
};

/**
 * Example 9: Error handling and retry logic
 */
export const loadDataWithRetryExample = async (apiCall, fallbackData, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}`);
      
      const data = await mergeWithFallback(
        apiCall(),
        fallbackData,
        {
          // On final attempt, prefer fallback to avoid infinite loops
          preferFallback: attempt === maxRetries
        }
      );
      
      return data;
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        // Wait before retry (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error('All attempts failed, using fallback data:', lastError?.message);
  return fallbackData;
};

/**
 * Example 10: Updating existing component to use fallback data
 */
export const upgradeExistingComponentExample = () => {
  // Before (from Step3EstablishmentDetails.jsx):
  /*
  const loadMasterData = async () => {
    try {
      const [districtResponse, categoryResponse] = await Promise.all([
        ApiService.getDistricts(),
        ApiService.getCategories()
      ]);
      
      const districtData = districtResponse?.data || [];
      const categoryData = categoryResponse?.data || [];
      
      if (districtData.length > 0) {
        setDistricts(processedDistricts);
      } else {
        // Hardcoded fallback data
        setDistricts([
          { id: 1, lgdCode: 269, districtCode: "DH", name: "Dhalai" },
          // ... more hardcoded data
        ]);
      }
    } catch (error) {
      // More hardcoded fallback data
    }
  };
  */

  // After (using fallback data layer):
  /*
  const loadMasterData = async () => {
    try {
      const [districts, categories] = await Promise.all([
        mergeWithFallback(
          ApiService.getDistricts(),
          fallbackDistricts,
          { transform: dataUtils.normalizeDistricts }
        ),
        mergeWithFallback(
          ApiService.getCategories(),
          fallbackCategories,
          { 
            transform: (data) => {
              const normalized = dataUtils.normalizeCategories(data);
              return dataUtils.deduplicateCategories(normalized);
            }
          }
        )
      ]);

      setDistricts(districts);
      setCategories(categories);
    } catch (error) {
      console.error('Error loading master data:', error);
      // Fallback is already handled by mergeWithFallback
    }
  };
  */
};
