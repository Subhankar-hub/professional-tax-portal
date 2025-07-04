import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { 
  areRequiredFieldsFilled, 
  customValidators 
} from '../utils/validation';

const Step4EstablishmentType = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [establishmentType, setEstablishmentType] = useState(formData.establishmentType || '');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(formData.category || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(formData.subcategory || '');
  const [error, setError] = useState('');
  
  // Field definitions for validation
  const fieldDefinitions = {
    establishmentType: { required: true },
    category: { required: true },
    subcategory: { required: true }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        console.log('Step 4 - Loading categories...');
        const response = await ApiService.getCategories();
        console.log('Step 4 - Categories API response:', response);
        if (isMounted) {
          if (response && response.success && response.data) {
            // Remove duplicates by catId and sort
            const uniqueCategories = [];
            const seenCatIds = new Set();
            
            response.data.forEach(category => {
              if (!seenCatIds.has(category.catId)) {
                seenCatIds.add(category.catId);
                uniqueCategories.push({
                  catId: category.catId,
                  categoryName: category.catDescription || category.categoryName,
                  categoryDescription: category.catDescription || category.categoryDescription,
                  isActive: category.isActive || true
                });
              }
            });
            
            uniqueCategories.sort((a, b) => a.catId - b.catId);
            console.log('Step 4 - Setting categories:', uniqueCategories);
            setCategories(uniqueCategories);
          } else {
            // Fallback categories
            setCategories([
              { catId: 1, categoryName: "Legal Profession", categoryDescription: "Legal Profession" },
              { catId: 2, categoryName: "Medical Profession", categoryDescription: "Medical Profession" },
              { catId: 3, categoryName: "Consultants", categoryDescription: "Consultants" },
              { catId: 11, categoryName: "Dealer, Person, Tax Payer, Traders", categoryDescription: "Dealer, Person, Tax Payer, Traders" },
              { catId: 21, categoryName: "Salary & Wage Earner", categoryDescription: "Salary & Wage Earner" }
            ]);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (isMounted) {
          // Set fallback categories on error
          setCategories([
            { catId: 1, categoryName: "Legal Profession", categoryDescription: "Legal Profession" },
            { catId: 2, categoryName: "Medical Profession", categoryDescription: "Medical Profession" },
            { catId: 3, categoryName: "Consultants", categoryDescription: "Consultants" },
            { catId: 11, categoryName: "Dealer, Person, Tax Payer, Traders", categoryDescription: "Dealer, Person, Tax Payer, Traders" },
            { catId: 21, categoryName: "Salary & Wage Earner", categoryDescription: "Salary & Wage Earner" }
          ]);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSubcategories = async () => {
      if (selectedCategory) {
        try {
          const categoryId = parseInt(selectedCategory, 10);
          console.log('Step 4 - Loading subcategories for category:', categoryId);
          const response = await ApiService.getSubcategoriesByCategory(categoryId);
          console.log('Step 4 - Subcategories API response:', response);
          
          if (isMounted) {
            if (response && response.success && response.data) {
              const processedSubcategories = response.data.map(sub => ({
                id: sub.recordRsn || sub.id,
                categoryId: sub.catCode || sub.categoryId,
                subcategoryName: sub.subcatDescription || sub.subcategoryName,
                subcategoryDescription: sub.subcatDescription || sub.subcategoryDescription,
                isActive: sub.isVisible || sub.isActive || true
              }));
              console.log('Step 4 - Setting subcategories:', processedSubcategories);
              setSubcategories(processedSubcategories);
            } else {
              setSubcategories([]);
            }
          }
        } catch (error) {
          console.error('Error fetching subcategories:', error);
          if (isMounted) {
            setSubcategories([]);
          }
        }
      } else {
        if (isMounted) {
          setSubcategories([]);
        }
      }
    };

    loadSubcategories();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const formDataForValidation = {
      establishmentType,
      category: selectedCategory,
      subcategory: selectedSubcategory
    };
    
    if (!areRequiredFieldsFilled(fieldDefinitions, formDataForValidation)) {
      setError('All fields are required');
      return;
    }

    // Clear any previous error
    setError('');

    // Convert category and subcategory to numbers to ensure they're not empty strings
    const categoryId = parseInt(selectedCategory, 10);
    const subcategoryId = parseInt(selectedSubcategory, 10);
    
    // Debug logging to verify state object contains category/subcategory IDs as numbers
    console.log('Step 4 - Form submission data:', {
      establishmentType,
      category: categoryId,
      subcategory: subcategoryId,
      categoryType: typeof categoryId,
      subcategoryType: typeof subcategoryId,
      categoryIsNumber: !isNaN(categoryId),
      subcategoryIsNumber: !isNaN(subcategoryId)
    });

    // Validate that the parsed values are valid numbers
    if (isNaN(categoryId) || isNaN(subcategoryId)) {
      setError('Invalid category or subcategory selection');
      return;
    }

    const updatedData = {
      establishmentType,
      category: categoryId,
      subcategory: subcategoryId
    };

    console.log('Step 4 - Updating form data with:', updatedData);
    updateFormData(updatedData);
    
    // Add a small delay to ensure state updates before navigation
    setTimeout(() => {
      console.log('Step 4 - Calling nextStep()');
      nextStep();
    }, 100);
  };
  
  // Check if all required fields are filled to enable/disable Next button
  const formDataForValidation = {
    establishmentType,
    category: selectedCategory,
    subcategory: selectedSubcategory
  };
  const isFormValid = areRequiredFieldsFilled(fieldDefinitions, formDataForValidation);

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

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

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
              <option value="">--Select Category--</option>
              {categories.map((category) => (
                <option key={category.catId} value={category.catId}>
                  {category.categoryName}
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
                <option value="">--Select Sub Category--</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.subcategoryName}
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
            disabled={!isFormValid}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4EstablishmentType;
