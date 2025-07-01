
import React, { useState, useEffect } from "react";
import ApiService from "./apiService";
import "./Establishment.css";

export default function Step2AddressDetails({ data, onUpdate, onNext, onBack }) {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    loadDistricts();
  }, []);

  const loadDistricts = async () => {
    try {
      const response = await ApiService.getDistricts();
      setDistricts(response || []);
    } catch (error) {
      console.error("Failed to load districts:", error);
      // Fallback districts for Tripura
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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.addressText || !data.districtLgdCode || !data.pincode) {
      alert("Please fill in all required fields.");
      return;
    }
    onNext();
  };

  return (
    <div className="container">
      <h2 className="step-title">Second Step (Address Details):</h2>
      
      <form onSubmit={handleSubmit} className="form-section">
        <label>Address*:</label>
        <textarea
          name="addressText"
          value={data.addressText}
          onChange={handleChange}
          required
          placeholder="Enter your complete address"
          rows="3"
        />

        <div className="row">
          <div className="col">
            <label>District*:</label>
            <select
              name="districtLgdCode"
              value={data.districtLgdCode}
              onChange={handleChange}
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.lgdCode} value={district.lgdCode}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>PIN Code*:</label>
            <input
              type="text"
              name="pincode"
              value={data.pincode}
              onChange={handleChange}
              required
              placeholder="799001"
              pattern="[0-9]{6}"
              title="Please enter a valid 6-digit PIN code"
            />
          </div>
        </div>

        <label>Business Name (if applicable):</label>
        <input
          type="text"
          name="businessName"
          value={data.businessName}
          onChange={handleChange}
          placeholder="Enter business name"
        />

        <div className="buttons">
          <button type="button" className="btn btn-back" onClick={onBack}>Back</button>
          <button type="submit" className="btn btn-next">Next</button>
        </div>
      </form>
    </div>
  );
}
