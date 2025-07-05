
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { 
  validateFields, 
  areRequiredFieldsFilled, 
  formatPincode, 
  customValidators 
} from '../utils/validation';

const Step3EstablishmentDetails = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  
  // Field definitions for validation
  const fieldDefinitions = {
    establishmentName: { type: 'text', required: true },
    jurisdictionArea: { 
      type: 'custom', 
      required: true, 
      customValidator: (value) => customValidators.selectRequired(value, 'jurisdiction area')
    },
    charge: { 
      type: 'custom', 
      required: true, 
      customValidator: (value) => customValidators.selectRequired(value, 'charge')
    },
    district: { 
      type: 'custom', 
      required: true, 
      customValidator: (value) => customValidators.selectRequired(value, 'district')
    },
    pincode: { type: 'pincode', required: true },
    establishmentAddress: { type: 'text', required: true },
    category: { 
      type: 'custom', 
      required: true, 
      customValidator: (value) => customValidators.selectRequired(value, 'category')
    }
  };
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [charges, setCharges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadMasterData();
  }, []);

  useEffect(() => {
if (formData.category) {
      loadSubcategories(formData.category);
    } else {
      // Load default category subcategories to populate the dropdown
      loadSubcategories(1); // Default category id
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.district) {
      loadAreasByDistrict(formData.district);
    }
  }, [formData.district]);

  useEffect(() => {
    if (formData.jurisdictionArea) {
      loadChargesByArea(formData.jurisdictionArea);
    }
  }, [formData.jurisdictionArea]);

const loadMasterData = async () => {
    try {
      const [districtResponse, categoryResponse, chargeResponse, areaResponse, subcategoryResponse] = await Promise.all([
        ApiService.getDistricts(),
        ApiService.getCategories(),
        ApiService.getCharges(),
        ApiService.getAreas(),
        ApiService.getSubcategoriesByCategory(formData.category || 1) // Default to category 1 if not set
      ]);
      
      console.log('District response:', districtResponse);
      console.log('Category response:', categoryResponse);
      console.log('Area response:', areaResponse);
      console.log('Charge response:', chargeResponse);
      console.log('Subcategory response:', subcategoryResponse);
      
      // Handle districts with fallback
      if (districtResponse?.data && districtResponse.data.length > 0) {
        const processedDistricts = districtResponse.data.map(district => ({
          id: district.districtLgdCode || district.id,
          lgdCode: district.districtLgdCode || district.lgdCode,
          districtCode: district.districtCode,
          name: district.districtName,
          status: district.status || true,
          localCode: district.localCode
        }));
        setDistricts(processedDistricts);
      } else {
        // Use fallback data from ApiService
        const fallbackDistricts = ApiService.getFallbackData('districts').map((district, index) => ({
          id: index + 1,
          lgdCode: district.lgdCode,
          districtCode: district.districtCode,
          name: district.districtName,
          status: true
        }));
        setDistricts(fallbackDistricts);
      }
      
      // Handle categories with fallback
      if (categoryResponse?.data && categoryResponse.data.length > 0) {
        const uniqueCategories = [];
        const seenCatIds = new Set();
        
        categoryResponse.data.forEach(category => {
          if (!seenCatIds.has(category.catId)) {
            seenCatIds.add(category.catId);
            uniqueCategories.push({
              id: category.catRsn || category.id,
              catId: category.catId,
              name: category.catDescription || category.categoryName,
              description: category.catDescription || category.categoryDescription,
              isActive: true
            });
          }
        });
        
        uniqueCategories.sort((a, b) => a.catId - b.catId);
        setCategories(uniqueCategories);
      } else {
        // Use fallback data from ApiService
        const fallbackCategories = ApiService.getFallbackData('categories').map((category, index) => ({
          id: index + 1,
          catId: category.catId,
          name: category.categoryName,
          description: category.categoryDescription,
          isActive: true
        }));
        setCategories(fallbackCategories);
      }

      // Handle areas with fallback
      if (areaResponse?.data && areaResponse.data.length > 0) {
        const processedAreas = areaResponse.data.map(area => ({
          code: area.code,
          name: area.nameEn || area.name,
          nameBn: area.nameBn
        }));
        setAreas(processedAreas);
      } else {
        // Use fallback data from ApiService
        setAreas(ApiService.getFallbackData('areas'));
      }

      // Handle charges with fallback
      if (chargeResponse?.data && chargeResponse.data.length > 0) {
        const processedCharges = chargeResponse.data.map(charge => ({
          code: charge.code,
          charge: charge.charge,
          areaCode: charge.areaCode,
          chargeSn: charge.chargeSn
        }));
        setCharges(processedCharges);
      } else {
        // Use fallback data from ApiService
        setCharges(ApiService.getFallbackData('charges'));
      }

      // Handle subcategories with fallback
      if (subcategoryResponse?.data && subcategoryResponse.data.length > 0) {
        const processedSubcategories = subcategoryResponse.data.map(subcategory => ({
          id: subcategory.recordRsn || subcategory.id,
          subcatCode: subcategory.subcatCode,
          name: subcategory.subcatDescription || subcategory.name,
          description: subcategory.subcatDescription || subcategory.description,
          isVisible: subcategory.isVisible
        }));
        setSubcategories(processedSubcategories);
      } else {
        // Use fallback data from ApiService
        setSubcategories(ApiService.getFallbackData('subcategories'));
      }
      
    } catch (error) {
      console.error('Failed to load master data:', error);
      // Set all fallback data on error
      const fallbackDistricts = ApiService.getFallbackData('districts').map((district, index) => ({
        id: index + 1,
        lgdCode: district.lgdCode,
        districtCode: district.districtCode,
        name: district.districtName,
        status: true
      }));
      setDistricts(fallbackDistricts);
      
      const fallbackCategories = ApiService.getFallbackData('categories').map((category, index) => ({
        id: index + 1,
        catId: category.catId,
        name: category.categoryName,
        description: category.categoryDescription,
        isActive: true
      }));
      setCategories(fallbackCategories);
      
      // Set fallback areas
      setAreas(ApiService.getFallbackData('areas'));
      
      // Set fallback charges
      setCharges(ApiService.getFallbackData('charges'));
      
      // Set fallback subcategories
      setSubcategories(ApiService.getFallbackData('subcategories'));
    }
  };

  const loadAreasByDistrict = async (districtId) => {
    try {
      const response = await ApiService.getAreasByDistrict(districtId);
      if (response?.data && response.data.length > 0) {
        // Map areas to expected format
        const mappedAreas = response.data.map(area => ({
          code: area.code,
          name: area.nameEn || area.name,
          nameBn: area.nameBn
        }));
        setAreas(mappedAreas);
      } else {
        // Use fallback data from ApiService
        setAreas(ApiService.getFallbackData('areas'));
      }
    } catch (error) {
      console.error('Failed to load areas:', error);
      setAreas(ApiService.getFallbackData('areas'));
    }
  };

  const loadChargesByArea = async (areaCode) => {
    try {
      const response = await ApiService.getChargesByArea(areaCode);
      if (response?.data && response.data.length > 0) {
        // Map charges to expected format
        const mappedCharges = response.data.map(charge => ({
          code: charge.code,
          charge: charge.charge,
          areaCode: charge.areaCode,
          chargeSn: charge.chargeSn
        }));
        setCharges(mappedCharges);
      } else {
        // Use fallback data from ApiService, filtered by area
        const allCharges = ApiService.getFallbackData('charges');
        const filteredCharges = allCharges.filter(charge => charge.areaCode === areaCode);
        setCharges(filteredCharges);
      }
    } catch (error) {
      console.error('Failed to load charges:', error);
      // Use fallback data from ApiService, filtered by area
      const allCharges = ApiService.getFallbackData('charges');
      const filteredCharges = allCharges.filter(charge => charge.areaCode === areaCode);
      setCharges(filteredCharges);
    }
  };

  const loadSubcategories = async (categoryId) => {
    try {
      const response = await ApiService.getSubcategoriesByCategory(categoryId);
      const data = response?.data || response || [];
      
      // Map subcategories to expected format
      const mappedSubcategories = data.map(subcategory => ({
        id: subcategory.recordRsn || subcategory.id,
        subcatCode: subcategory.subcatCode,
        name: subcategory.subcatDescription || subcategory.name,
        description: subcategory.subcatDescription || subcategory.description,
        isVisible: subcategory.isVisible
      }));
      
      setSubcategories(mappedSubcategories);
    } catch (error) {
      console.error('Failed to load subcategories:', error);
      // Fallback subcategories based on category
      if (categoryId === "1") {
        setSubcategories([
          { id: 1, name: "Practitioners" },
          { id: 2, name: "Advocates" },
          { id: 3, name: "Consultants" }
        ]);
      } else {
        setSubcategories([]);
      }
    }
  };

  const handleInputChange = (field, value) => {
    // Format specific field types
    let formattedValue = value;
    if (field === 'pincode') {
      formattedValue = formatPincode(value);
    }
    
    updateFormData({ [field]: formattedValue });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addEstablishment = () => {
    const newEstablishment = {
      name: '',
      address: ''
    };
    updateFormData({
      additionalEstablishments: [...formData.additionalEstablishments, newEstablishment]
    });
  };

  const updateAdditionalEstablishment = (index, field, value) => {
    const updated = [...formData.additionalEstablishments];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData({ additionalEstablishments: updated });
  };

  const validateForm = () => {
    const newErrors = validateFields(fieldDefinitions, formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Check if all required fields are filled to enable/disable Next button
  const isFormValid = areRequiredFieldsFilled(fieldDefinitions, formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <form onSubmit={handleSubmit} className="step-form">
        <h3 className="section-title">Step 3: Establishment Information</h3>
        <p className="section-note">
          (Note: You may be engaged with any one or multiple among Profession/Trade/Calling/Employment, 
          but here you need to furnish the details of only one among Profession/Trade/Calling/Employment 
          from which you have the maximum earning.)
        </p>
        
        <div className="form-group">
          <label>Name of Establishment (Profession/Trade/Calling/Employment)*</label>
          <input
            type="text"
            value={formData.establishmentName}
            onChange={(e) => handleInputChange('establishmentName', e.target.value)}
            placeholder="Establishment Name"
            className={errors.establishmentName ? 'error' : ''}
          />
          {errors.establishmentName && <span className="error-message">{errors.establishmentName}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Area of Jurisdiction*</label>
            <select
              value={formData.jurisdictionArea}
              onChange={(e) => {
                handleInputChange('jurisdictionArea', e.target.value);
                // Reset charge when area changes
                handleInputChange('charge', '');
              }}
              className={errors.jurisdictionArea ? 'error' : ''}
            >
              <option value="">--Select Area--</option>
              {areas.map(area => (
                <option key={area.code} value={area.code}>
                  {area.name}
                </option>
              ))}
            </select>
            {errors.jurisdictionArea && <span className="error-message">{errors.jurisdictionArea}</span>}
          </div>
          
          <div className="form-group">
            <label>Charge*</label>
            <select
              value={formData.charge}
              onChange={(e) => handleInputChange('charge', e.target.value)}
              className={errors.charge ? 'error' : ''}
              disabled={!formData.jurisdictionArea}
            >
              <option value="">--Select Charge--</option>
              {charges.map(charge => (
                <option key={charge.code} value={charge.code}>
                  {charge.charge}
                </option>
              ))}
            </select>
            {errors.charge && <span className="error-message">{errors.charge}</span>}
          </div>
        </div>

        <div className="jurisdiction-info">
          <span className="info-link">Know your Jurisdiction.</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>District*</label>
            <select
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              className={errors.district ? 'error' : ''}
            >
              <option value="">--Select District--</option>
              {districts.map(district => (
                <option key={district.lgdCode} value={district.lgdCode}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district && <span className="error-message">{errors.district}</span>}
          </div>
          
          <div className="form-group">
            <label>PIN Code*</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              placeholder="799001"
              maxLength="6"
              className={errors.pincode ? 'error' : ''}
            />
            {errors.pincode && <span className="error-message">{errors.pincode}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Establishment Address*</label>
          <textarea
            value={formData.establishmentAddress}
            onChange={(e) => handleInputChange('establishmentAddress', e.target.value)}
            placeholder="Establishment Address"
            rows="3"
            className={errors.establishmentAddress ? 'error' : ''}
          />
          {errors.establishmentAddress && <span className="error-message">{errors.establishmentAddress}</span>}
          <small className="help-text">Shop Number / Building Number / Street Name / Road Name etc.</small>
        </div>

        <div className="additional-establishments">
          <h4>If you are having Additional Place of work, please specify Name and Address</h4>
          
          {formData.additionalEstablishments.map((establishment, index) => (
            <div key={index} className="form-row">
              <div className="form-group">
                <label>Name of Establishment (Profession/Trade/Calling/Employment)</label>
                <input
                  type="text"
                  value={establishment.name}
                  onChange={(e) => updateAdditionalEstablishment(index, 'name', e.target.value)}
                  placeholder="Establishment Type"
                />
              </div>
              <div className="form-group">
                <label>Establishment Address (Full Address)</label>
                <input
                  type="text"
                  value={establishment.address}
                  onChange={(e) => updateAdditionalEstablishment(index, 'address', e.target.value)}
                  placeholder="Establishment Address"
                />
              </div>
            </div>
          ))}
          
          {formData.additionalEstablishments.length < 5 && (
            <button type="button" onClick={addEstablishment} className="btn btn-secondary">
              + Add More (Max 5)
            </button>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category of Profession/Trade/Calling/Employment*</label>
            <select
              value={formData.category}
              onChange={(e) => {
                handleInputChange('category', e.target.value);
                // Reset subcategory when category changes
                handleInputChange('subcategory', '');
              }}
              className={errors.category ? 'error' : ''}
            >
              <option value="">--Select Category--</option>
              {categories.map(category => (
                <option key={category.catId} value={category.catId}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>
          
          <div className="form-group">
            <label>Sub-Category of Profession/Trade/Calling/Employment*</label>
            <select
              value={formData.subcategory}
              onChange={(e) => handleInputChange('subcategory', e.target.value)}
              disabled={!formData.category}
            >
              <option value="">--Select Sub-Category--</option>
              {subcategories.map(subcategory => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={prevStep} className="btn btn-secondary">
            Back
          </button>
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

export default Step3EstablishmentDetails;
