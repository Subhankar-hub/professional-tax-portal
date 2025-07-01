
import React, { useState, useEffect } from "react";
import "./Establishment.css";
import ApiService from "./apiService";

export default function Step3Establishment({ data, onUpdate, onNext, onBack }) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (data.ptaxCategory) {
      loadSubcategories(data.ptaxCategory);
    }
  }, [data.ptaxCategory]);

  const loadCategories = async () => {
    try {
      const response = await ApiService.getPTaxCategories();
      setCategories(response || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
      // Fallback categories
      setCategories([
        { id: 1, name: "Professional" },
        { id: 2, name: "Trade" },
        { id: 3, name: "Calling" },
        { id: 4, name: "Employment" }
      ]);
    }
  };

  const loadSubcategories = async (categoryId) => {
    try {
      const response = await ApiService.getPTaxSubcategories(categoryId);
      setSubcategories(response || []);
    } catch (error) {
      console.error("Failed to load subcategories:", error);
      setSubcategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    onUpdate({ 
      ptaxCategory: categoryId,
      ptaxSubcategory: "" // Reset subcategory when category changes
    });
  };

  const addEstablishment = () => {
    if (data.establishments.length < 5) {
      onUpdate({
        establishments: [...data.establishments, { name: "", address: "" }]
      });
    }
  };

  const updateEstablishment = (index, field, value) => {
    const updatedEstablishments = data.establishments.map((est, i) =>
      i === index ? { ...est, [field]: value } : est
    );
    onUpdate({ establishments: updatedEstablishments });
  };

  const removeEstablishment = (index) => {
    if (data.establishments.length > 1) {
      const updatedEstablishments = data.establishments.filter((_, i) => i !== index);
      onUpdate({ establishments: updatedEstablishments });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.establishments[0].name || !data.establishments[0].address) {
      alert("Please provide at least one establishment name and address.");
      return;
    }
    onNext();
  };

  return (
    <div className="container">
      <h2 className="step-title">Third Step (Establishment Information):</h2>
      
      <form onSubmit={handleSubmit} className="form-section">
        <div className="row">
          <div className="col">
            <label>Professional Tax Category*:</label>
            <select
              value={data.ptaxCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Subcategory:</label>
            <select
              name="ptaxSubcategory"
              value={data.ptaxSubcategory}
              onChange={handleChange}
              disabled={!data.ptaxCategory}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="establishments-section">
          <h4>Establishment Details:</h4>
          {data.establishments.map((establishment, index) => (
            <div key={index} className="establishment-item">
              <div className="establishment-header">
                <h5>Establishment {index + 1}</h5>
                {data.establishments.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-remove"
                    onClick={() => removeEstablishment(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <label>Name of Establishment (Profession/Trade/Calling/Employment)*:</label>
              <input
                type="text"
                value={establishment.name}
                onChange={(e) => updateEstablishment(index, 'name', e.target.value)}
                required={index === 0}
                placeholder="Enter establishment name"
              />

              <label>Establishment Address*:</label>
              <textarea
                value={establishment.address}
                onChange={(e) => updateEstablishment(index, 'address', e.target.value)}
                required={index === 0}
                placeholder="Enter establishment address"
                rows="2"
              />
            </div>
          ))}
          
          {data.establishments.length < 5 && (
            <button
              type="button"
              className="btn add-btn"
              onClick={addEstablishment}
            >
              Add More Establishment (Max 5)
            </button>
          )}
        </div>

        <div className="buttons">
          <button type="button" className="btn btn-back" onClick={onBack}>Back</button>
          <button type="submit" className="btn btn-next">Next</button>
        </div>
      </form>
    </div>
  );
}