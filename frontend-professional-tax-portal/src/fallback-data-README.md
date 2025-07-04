# Universal Fallback Data Layer

This module provides a centralized fallback data layer for the Professional Tax Portal application, ensuring consistent data structures across all components and graceful degradation when APIs are unavailable.

## Features

- **Static JSON Arrays**: Mirror backend DTOs for districts, areas, charges, categories, subcategories, and period of standing
- **Seamless API/Fallback Merging**: Automatically uses API data when available, falls back to static data when not
- **Uniform Data Structures**: Consistent field names and data formats across components
- **Hierarchical Data Support**: Built-in support for cascading dropdowns (district → area → charge)
- **Data Processing Utilities**: Normalization, deduplication, and sorting helpers
- **Error Handling**: Robust error handling with configurable retry logic

## Quick Start

```javascript
import {
  mergeWithFallback,
  fallbackDistricts,
  fallbackCategories,
  getSubcategoriesWithFallback
} from './fallback-data';
import ApiService from './services/ApiService';

// Basic usage - automatically handles API failure
const districts = await mergeWithFallback(
  ApiService.getDistricts(),
  fallbackDistricts
);

// With data transformation
const categories = await mergeWithFallback(
  ApiService.getCategories(),
  fallbackCategories,
  {
    transform: (data) => dataUtils.normalizeCategories(data),
    filter: (item) => item.isActive === true
  }
);
```

## Data Structure

All fallback data follows consistent patterns with both backend field names and computed compatibility fields:

### Districts
```javascript
{
  id: 1,
  lgdCode: 269,
  districtCode: "DH",
  districtName: "Dhalai",
  name: "Dhalai", // Computed field for compatibility
  stateId: 1,
  status: true
}
```

### Categories
```javascript
{
  id: 1,
  catId: 1,
  categoryName: "Legal Profession",
  name: "Legal Profession", // Computed field
  categoryDescription: "Legal Profession",
  description: "Legal Profession", // Computed field
  isActive: true
}
```

### Areas
```javascript
{
  id: 1,
  areaCode: "AGT",
  areaName: "Agartala",
  name: "Agartala", // Computed field
  districtId: 4, // Foreign key to district
  status: true
}
```

## Core Functions

### `mergeWithFallback(apiPromise, fallbackData, options)`

Main function that handles API/fallback merging.

**Parameters:**
- `apiPromise`: Promise that resolves to API response
- `fallbackData`: Static fallback data array
- `options`: Configuration object
  - `transform`: Function to transform API data
  - `filter`: Function to filter fallback data
  - `preferFallback`: Force use of fallback data

**Returns:** Promise that resolves to merged data

### Specialized Helper Functions

- `getSubcategoriesWithFallback(categoryId, apiPromise)`: Get subcategories for a category
- `getAreasByDistrictWithFallback(districtId, apiPromise)`: Get areas for a district
- `getChargesByAreaWithFallback(areaId, apiPromise)`: Get charges for an area

## Data Processing Utilities

### `dataUtils.normalizeDistricts(districts)`
Ensures consistent field names for district data.

### `dataUtils.normalizeCategories(categories)`
Ensures consistent field names for category data.

### `dataUtils.deduplicateCategories(categories)`
Removes duplicate categories by `catId`.

### `dataUtils.sortBy(data, field, direction)`
Sorts data by specified field.

## Usage Patterns

### 1. Basic Component Data Loading

```javascript
const loadMasterData = async () => {
  try {
    const [districts, categories] = await Promise.all([
      mergeWithFallback(ApiService.getDistricts(), fallbackDistricts),
      mergeWithFallback(ApiService.getCategories(), fallbackCategories)
    ]);

    setDistricts(districts);
    setCategories(categories);
  } catch (error) {
    console.error('Error loading master data:', error);
    // Fallback is already handled
  }
};
```

### 2. Cascading Dropdowns

```javascript
const handleDistrictChange = async (districtId) => {
  const areas = await getAreasByDistrictWithFallback(
    districtId,
    ApiService.getAreasByDistrict(districtId)
  );
  setAreas(areas);
  setCharges([]); // Reset dependent data
};

const handleAreaChange = async (areaId) => {
  const charges = await getChargesByAreaWithFallback(
    areaId,
    ApiService.getChargesByArea(areaId)
  );
  setCharges(charges);
};
```

### 3. With Data Processing

```javascript
const loadCategories = async () => {
  const categories = await mergeWithFallback(
    ApiService.getCategories(),
    fallbackCategories,
    {
      transform: (apiData) => {
        const normalized = dataUtils.normalizeCategories(apiData);
        const deduplicated = dataUtils.deduplicateCategories(normalized);
        return dataUtils.sortBy(deduplicated, 'catId');
      }
    }
  );
  setCategories(categories);
};
```

### 4. React Hook Integration

```javascript
const useFormData = () => {
  const [formData, setFormData] = useState({
    districts: [],
    areas: [],
    charges: [],
    categories: [],
    subcategories: []
  });

  useEffect(() => {
    const loadData = async () => {
      const districts = await mergeWithFallback(
        ApiService.getDistricts(),
        fallbackDistricts
      );
      setFormData(prev => ({ ...prev, districts }));
    };
    loadData();
  }, []);

  return { formData, setFormData };
};
```

## Migration from Existing Components

### Before (Hardcoded Fallbacks)
```javascript
const loadMasterData = async () => {
  try {
    const response = await ApiService.getDistricts();
    const data = response?.data || [];
    
    if (data.length > 0) {
      setDistricts(data);
    } else {
      // Hardcoded fallback
      setDistricts([
        { id: 1, name: "Dhalai" },
        { id: 2, name: "Gomati" }
      ]);
    }
  } catch (error) {
    // More hardcoded fallback
    setDistricts([
      { id: 1, name: "Dhalai" },
      { id: 2, name: "Gomati" }
    ]);
  }
};
```

### After (Using Fallback Data Layer)
```javascript
const loadMasterData = async () => {
  const districts = await mergeWithFallback(
    ApiService.getDistricts(),
    fallbackDistricts,
    { transform: dataUtils.normalizeDistricts }
  );
  setDistricts(districts);
};
```

## Error Handling

The fallback data layer includes robust error handling:

1. **Network Failures**: Automatically falls back to static data
2. **Invalid API Responses**: Validates response structure
3. **Empty Data**: Handles empty API responses
4. **Retry Logic**: Optional retry with exponential backoff

```javascript
// With retry logic
const loadDataWithRetry = async (apiCall, fallbackData, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await mergeWithFallback(apiCall(), fallbackData);
    } catch (error) {
      if (attempt === maxRetries) {
        return fallbackData;
      }
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt - 1) * 1000)
      );
    }
  }
};
```

## Best Practices

1. **Always Use Fallback Data**: Never leave dropdowns empty when API fails
2. **Consistent Field Names**: Use data utilities to normalize field names
3. **Handle Dependencies**: Reset dependent dropdowns when parent changes
4. **Transform API Data**: Process API data to match expected format
5. **Log Appropriately**: Use console.warn for fallback usage, console.error for actual errors
6. **Test Offline**: Ensure components work without API connectivity

## Data Hierarchy

```
Districts (8 items)
├── Areas (8 items, mapped by districtId)
    ├── Charges (15 items, mapped by areaId)

Categories (21 items)
├── Subcategories (mapped by categoryId)
    ├── Legal Profession (4 items)
    ├── Medical Profession (8 items)
    ├── Consultants (5 items)
    └── Engineering Profession (5 items)

Period of Standing (8 options)
```

## Available Data

### Districts (8)
- Dhalai, Gomati, Khowai, North Tripura, Sepahijala, South Tripura, Unakoti, West Tripura

### Areas (8)
- Agartala, Bishalgarh, Udaipur, Belonia, Teliamura, Ambassa, Kailasahar, Dharmanagar

### Charges (15)
- Various charges including Agartala (8 charges), individual charges for other areas

### Categories (21)
- Legal Profession, Medical Profession, Consultants, Engineering, Technicians, Agents, Service Providers, Contractors, Directors, Employers, Dealers/Traders, Distributors, Vendors, Owners/Lessees, Societies, Companies, Partnership Firms, Transport Vehicle Holders, Individuals/Institutions, Others, Salary & Wage Earners

### Subcategories
- Detailed subcategories for Legal (4), Medical (8), Consultants (5), and Engineering (5) professions

### Period of Standing (8)
- Ranges from "0 Year 0 Month 9 Days" to "More than 5 Years"

## Files

- `fallback-data.js`: Main fallback data module
- `fallback-data-usage-example.js`: Comprehensive usage examples
- `fallback-data-README.md`: This documentation

## Testing

Test your components with the fallback data by:

1. Temporarily disabling API calls
2. Using `preferFallback: true` option
3. Testing with invalid API responses
4. Verifying cascade behavior with fallback data
