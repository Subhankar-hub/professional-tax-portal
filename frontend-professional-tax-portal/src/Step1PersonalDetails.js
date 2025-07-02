
import React from "react";

export default function Step1PersonalDetails({ data, onUpdate, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!data.name || !data.fatherName || !data.mobile || !data.email || !data.pan) {
      alert("Please fill all required fields.");
      return;
    }

    // Mobile validation
    if (!/^\d{10}$/.test(data.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // PAN validation
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan)) {
      alert("Please enter a valid PAN number (format: ABCDE1234F).");
      return;
    }

    onNext();
  };

  return (
    <div className="container">
      <h2 className="step-title">First Step (Personal Details):</h2>
      
      <form onSubmit={handleSubmit} className="form-section">
        <div className="row">
          <div className="col">
            <label>Full Name*:</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="col">
            <label>Gender*:</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              required
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Father's Name*:</label>
            <input
              type="text"
              name="fatherName"
              value={data.fatherName}
              onChange={handleChange}
              required
              placeholder="Enter father's name"
            />
          </div>
          <div className="col">
            <label>Mobile Number*:</label>
            <input
              type="tel"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit mobile number"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Email Address*:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>
          <div className="col">
            <label>PAN Number*:</label>
            <input
              type="text"
              name="pan"
              value={data.pan}
              onChange={handleChange}
              required
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              placeholder="ABCDE1234F"
              style={{ textTransform: 'uppercase' }}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}