import React, { useState } from "react";
import "./Establishment.css";

export default function Step1PersonalDetails({ data, onUpdate, onNext }) {
  const [captcha, setCaptcha] = useState("");
  const captchaAnswer = 75; // 10 + 65

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(captcha) !== captchaAnswer) {
      alert("Captcha is incorrect. Please try again.");
      return;
    }
    
    // Validate required fields
    if (!data.name || !data.mobile || !data.email || !data.pan) {
      alert("Please fill in all required fields.");
      return;
    }
    
    onNext();
  };

  return (
    <div className="container">
      <h2 className="step-title">First Step (Personal Details):</h2>
      <h5 className="text-danger">Individual:</h5>
      
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
            <select name="gender" value={data.gender} onChange={handleChange} required>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Father's Name:</label>
            <input
              type="text"
              name="fatherName"
              value={data.fatherName}
              onChange={handleChange}
              placeholder="Enter father's name"
            />
          </div>
          <div className="col">
            <label>PAN/TAN*:</label>
            <input
              type="text"
              name="pan"
              value={data.pan}
              onChange={handleChange}
              required
              placeholder="ABCDE1234F"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]"
              title="Please enter a valid PAN number"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Mobile*:</label>
            <input
              type="tel"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              required
              placeholder="9876543210"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit mobile number"
            />
          </div>
          <div className="col">
            <label>Email*:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              placeholder="test@gmail.com"
            />
            <small className="text-muted">Please provide a valid email address</small>
          </div>
        </div>

        <div className="captcha-section">
          <label>Prove that you are not a robot*:</label>
          <div className="captcha-container">
            <strong>10 + 65 = </strong>
            <input
              type="number"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              required
              placeholder="Enter answer"
            />
          </div>
        </div>

        <div className="buttons">
          <button type="submit" className="btn btn-next">Next</button>
        </div>
      </form>
    </div>
  );
}
