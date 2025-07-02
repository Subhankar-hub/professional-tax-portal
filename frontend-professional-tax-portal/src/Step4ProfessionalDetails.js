
import React, { useState } from 'react';
import './Establishment.css';

const Step4ProfessionalDetails = ({ data, onUpdate, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    commencementDate: data.commencementDate || '',
    periodOfStanding: data.periodOfStanding || '',
    pan: data.pan || '',
    annualGrossBusiness: data.annualGrossBusiness || '',
    avgWorkersMonthly: data.avgWorkersMonthly || '',
    avgEmployeesMonthly: data.avgEmployeesMonthly || '',
    vatNumber: data.vatNumber || '',
    cstNumber: data.cstNumber || '',
    gstNumber: data.gstNumber || '',
    taxiCount: data.taxiCount || 0,
    threeWheelerCount: data.threeWheelerCount || 0,
    lmvCount: data.lmvCount || 0,
    goodVehicleCount: data.goodVehicleCount || 0,
    truckCount: data.truckCount || 0,
    busCount: data.busCount || 0,
    ...data
  });

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.commencementDate || !formData.pan) {
      alert("Please fill in all required fields (Commencement Date and PAN).");
      return;
    }
    
    if (formData.pan && formData.pan.length !== 10) {
      alert("PAN must be exactly 10 characters.");
      return;
    }
    
    if (formData.gstNumber && formData.gstNumber.length !== 15) {
      alert("GST Number must be exactly 15 characters.");
      return;
    }
    
    onNext();
  };

  return (
    <div className="container">
      <h2 className="step-title">Professional Details</h2>
      
      <form onSubmit={handleSubmit} className="form-section">
        
        {/* Basic Professional Information */}
        <div className="section-header">
          <h3>Basic Professional Information</h3>
        </div>
        
        <div className="row">
          <div className="col">
            <label>Commencement Date*:</label>
            <input
              type="date"
              value={formData.commencementDate}
              onChange={(e) => handleInputChange('commencementDate', e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label>Period of Standing:</label>
            <input
              type="text"
              value={formData.periodOfStanding}
              onChange={(e) => handleInputChange('periodOfStanding', e.target.value)}
              placeholder="e.g., 5 years"
              maxLength="50"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>PAN Number*:</label>
            <input
              type="text"
              value={formData.pan}
              onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              maxLength="10"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              required
            />
          </div>
          <div className="col">
            <label>Annual Gross Business (₹):</label>
            <input
              type="number"
              value={formData.annualGrossBusiness}
              onChange={(e) => handleInputChange('annualGrossBusiness', e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        {/* Employee Information */}
        <div className="section-header">
          <h3>Employee Information</h3>
        </div>
        
        <div className="row">
          <div className="col">
            <label>Average Workers (Monthly):</label>
            <input
              type="number"
              value={formData.avgWorkersMonthly}
              onChange={(e) => handleInputChange('avgWorkersMonthly', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="col">
            <label>Average Employees (Monthly):</label>
            <input
              type="number"
              value={formData.avgEmployeesMonthly}
              onChange={(e) => handleInputChange('avgEmployeesMonthly', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* Tax Registration Numbers */}
        <div className="section-header">
          <h3>Tax Registration Details</h3>
        </div>
        
        <div className="row">
          <div className="col">
            <label>GST Number:</label>
            <input
              type="text"
              value={formData.gstNumber}
              onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
              placeholder="15-digit GST Number"
              maxLength="15"
            />
          </div>
          <div className="col">
            <label>VAT Number:</label>
            <input
              type="text"
              value={formData.vatNumber}
              onChange={(e) => handleInputChange('vatNumber', e.target.value)}
              placeholder="VAT Registration Number"
              maxLength="11"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>CST Number:</label>
            <input
              type="text"
              value={formData.cstNumber}
              onChange={(e) => handleInputChange('cstNumber', e.target.value)}
              placeholder="CST Registration Number"
              maxLength="11"
            />
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="section-header">
          <h3>Vehicle Information (if applicable)</h3>
        </div>
        
        <div className="row">
          <div className="col">
            <label>Taxi Count:</label>
            <input
              type="number"
              value={formData.taxiCount}
              onChange={(e) => handleInputChange('taxiCount', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="col">
            <label>Three Wheeler Count:</label>
            <input
              type="number"
              value={formData.threeWheelerCount}
              onChange={(e) => handleInputChange('threeWheelerCount', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>LMV Count:</label>
            <input
              type="number"
              value={formData.lmvCount}
              onChange={(e) => handleInputChange('lmvCount', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="col">
            <label>Good Vehicle Count:</label>
            <input
              type="number"
              value={formData.goodVehicleCount}
              onChange={(e) => handleInputChange('goodVehicleCount', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Truck Count:</label>
            <input
              type="number"
              value={formData.truckCount}
              onChange={(e) => handleInputChange('truckCount', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="col">
            <label>Bus Count:</label>
            <input
              type="number"
              value={formData.busCount}
              onChange={(e) => handleInputChange('busCount', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="form-navigation">
          <button type="button" onClick={onPrev} className="btn-secondary">
            Previous
          </button>
          <button type="submit" className="btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4ProfessionalDetails;
