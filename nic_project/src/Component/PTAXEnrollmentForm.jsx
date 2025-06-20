import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PTAXEnrollmentForm = () => {
  const [formData, setFormData] = useState({
    applyingAs: "Individual",
    fullName: "",
    gender: "Male",
    fatherName: "",
    panOrTan: "",
    mobile: "",
    email: "",
    captchaInput: "",
  });

  const captchaAnswer = 75;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.captchaInput) !== captchaAnswer) {
      alert("Captcha is incorrect.");
    } else {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success">PTAX Enrolment Module for Tax Payer</h2>
      <h4 className="text-center text-danger mt-3">First Step (Personal Details):</h4>
      <h5 className="text-danger mt-4">Individual:</h5>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Applying as:</label><br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="applyingAs"
              value="Individual"
              checked={formData.applyingAs === "Individual"}
              onChange={handleChange}
            />
            <label className="form-check-label">Individual</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="applyingAs"
              value="Others"
              checked={formData.applyingAs === "Others"}
              onChange={handleChange}
            />
            <label className="form-check-label">Others</label>
          </div>
        </div>

        <h5 className="text-info">Personal Information</h5>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Name of the Applicant*</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <small className="text-muted">
              Name (Individual/Business Entity) must match with the name provided on your PAN/TAN card.
            </small>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Gender*</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Father's Name of the Applicant*</label>
            <input
              type="text"
              className="form-control"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Father's Name"
              required
            />
            <small className="text-muted">Please, Do not write Mr/Shri/Er/Doc etc.</small>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">PAN or TAN*</label>
            <input
              type="text"
              className="form-control"
              name="panOrTan"
              value={formData.panOrTan}
              onChange={handleChange}
              placeholder="AAAAA1111G"
              required
            />
            <small className="text-muted">PAN/TAN issued to you</small>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Mobile Number*</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="9999999999"
              required
            />
            <small className="text-muted">Valid number only (without +91)</small>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email*</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="test@gmail.com"
              required
            />
            <small className="text-muted">Please provide a valid email address</small>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Prove that you are not a robot*</label>
          <div className="d-flex align-items-center">
            <strong className="me-2">10 + 65 =</strong>
            <input
              type="number"
              className="form-control w-auto"
              name="captchaInput"
              value={formData.captchaInput}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-warning">Next</button>
      </form>
    </div>
  );
};

export default PTAXEnrollmentForm;
