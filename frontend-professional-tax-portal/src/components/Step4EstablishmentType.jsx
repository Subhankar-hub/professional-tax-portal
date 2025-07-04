import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const Step4EstablishmentType = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [establishmentType, setEstablishmentType] = useState(formData.establishmentType || '');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(formData.category || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(formData.subcategory || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await ApiService.getSubcategoriesByCategory(categoryId);
      if (response.success) {
        setSubcategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!establishmentType || !selectedCategory || !selectedSubcategory) {
      alert('Please select all required fields');
      return;
    }

    updateFormData({
      establishmentType,
      category: selectedCategory,
      subcategory: selectedSubcategory
    });
    
    nextStep();
  };

  const establishmentTypes = [
    { value: 'Profession', label: 'Profession', description: 'Professional services like doctors, lawyers, consultants, etc.' },
    { value: 'Trade', label: 'Trade', description: 'Trading activities, dealers, vendors, etc.' },
    { value: 'Calling', label: 'Calling', description: 'Specific vocational activities' },
    { value: 'Employment', label: 'Employment', description: 'Salary & wage earners, employees' }
  ];

  return (
    <div className="step-container">
      <div className="step-header">
        <h3>Step 4: Choose Establishment Type</h3>
        <p>Select the type of establishment/activity you are engaged in</p>
      </div>

      <form onSubmit={handleSubmit} className="step-form">
        <div className="form-section">
          <div className="form-group">
            <label className="form-label">Type of Establishment/Activity *</label>
            <div className="establishment-types">
              {establishmentTypes.map((type) => (
                <div key={type.value} className="establishment-type-card">
                  <label className="establishment-type-label">
                    <input
                      type="radio"
                      name="establishmentType"
                      value={type.value}
                      checked={establishmentType === type.value}
                      onChange={(e) => setEstablishmentType(e.target.value)}
                      required
                    />
                    <div className="establishment-type-content">
                      <h4>{type.label}</h4>
                      <p>{type.description}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory(''); // Reset subcategory when category changes
              }}
              className="form-control"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.catId} value={category.catId}>
                  {category.catDescription}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="form-group">
              <label htmlFor="subcategory">Sub Category *</label>
              <select
                id="subcategory"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select Sub Category</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.subcatCode} value={subcategory.subcatCode}>
                    {subcategory.subcatDescription}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={prevStep}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button 
            type="submit"
            className="btn btn-primary"
            disabled={!establishmentType || !selectedCategory || !selectedSubcategory}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4EstablishmentType;
