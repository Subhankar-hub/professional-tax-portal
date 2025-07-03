
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const Step2EstablishmentDetails = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadMasterData();
  }, []);

  useEffect(() => {
    if (formData.category) {
      loadSubcategories(formData.category);
    }
  }, [formData.category]);

  const loadMasterData = async () => {
    try {
      const [districtResponse, categoryResponse] = await Promise.all([
        ApiService.getDistricts(),
        ApiService.getPTaxCategories()
      ]);
      
      // Handle API response structure
      const districtData = districtResponse?.data || districtResponse || [];
      const categoryData = categoryResponse?.data || categoryResponse || [];
      
      setDistricts(districtData.length > 0 ? districtData : [
        { lgdCode: 234, name: "Dhalai" },
        { lgdCode: 235, name: "Gomati" },
        { lgdCode: 236, name: "Khowai" },
        { lgdCode: 237, name: "North Tripura" },
        { lgdCode: 238, name: "Sepahijala" },
        { lgdCode: 239, name: "South Tripura" },
        { lgdCode: 240, name: "Unakoti" },
        { lgdCode: 241, name: "West Tripura" }
      ]);
      
      setCategories(categoryData.length > 0 ? categoryData : [
        { id: 1, name: "Legal Profession" },
        { id: 2, name: "Medical Profession" },
        { id: 3, name: "Engineering" },
        { id: 4, name: "Trade" },
        { id: 5, name: "Employment" }
      ]);
    } catch (error) {
      console.error('Failed to load master data:', error);
      // Set fallback data on error
      setDistricts([
        { lgdCode: 234, name: "Dhalai" },
        { lgdCode: 235, name: "Gomati" },
        { lgdCode: 236, name: "Khowai" },
        { lgdCode: 237, name: "North Tripura" },
        { lgdCode: 238, name: "Sepahijala" },
        { lgdCode: 239, name: "South Tripura" },
        { lgdCode: 240, name: "Unakoti" },
        { lgdCode: 241, name: "West Tripura" }
      ]);
      
      setCategories([
        { id: 1, name: "Legal Profession" },
        { id: 2, name: "Medical Profession" },
        { id: 3, name: "Engineering" },
        { id: 4, name: "Trade" },
        { id: 5, name: "Employment" }
      ]);
    }
  };

  const loadSubcategories = async (categoryId) => {
    try {
      const data = await ApiService.getPTaxSubcategories(categoryId);
      setSubcategories(data || []);
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
    updateFormData({ [field]: value });
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
    const newErrors = {};
    
    if (!formData.establishmentName.trim()) {
      newErrors.establishmentName = 'Establishment name is required';
    }
    
    if (!formData.jurisdictionArea) {
      newErrors.jurisdictionArea = 'Area of jurisdiction is required';
    }
    
    if (!formData.charge) {
      newErrors.charge = 'Charge is required';
    }
    
    if (!formData.district) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid PIN code format';
    }
    
    if (!formData.establishmentAddress.trim()) {
      newErrors.establishmentAddress = 'Establishment address is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <form onSubmit={handleSubmit} className="step-form">
        <h3 className="section-title">Establishment Information</h3>
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
              onChange={(e) => handleInputChange('jurisdictionArea', e.target.value)}
              className={errors.jurisdictionArea ? 'error' : ''}
            >
              <option value="">Select Area</option>
              <option value="Agartala">Agartala</option>
              <option value="Dharmanagar">Dharmanagar</option>
              <option value="Kailashahar">Kailashahar</option>
              <option value="Udaipur">Udaipur</option>
              <option value="Belonia">Belonia</option>
            </select>
            {errors.jurisdictionArea && <span className="error-message">{errors.jurisdictionArea}</span>}
          </div>
          
          <div className="form-group">
            <label>Charge*</label>
            <select
              value={formData.charge}
              onChange={(e) => handleInputChange('charge', e.target.value)}
              className={errors.charge ? 'error' : ''}
            >
              <option value="">Select Charge</option>
              <option value="Charge - I">Charge - I</option>
              <option value="Charge - II">Charge - II</option>
              <option value="Charge - III">Charge - III</option>
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
              <option value="">Select District</option>
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
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
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
              <option value="">Select Sub-Category</option>
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
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2EstablishmentDetails;
