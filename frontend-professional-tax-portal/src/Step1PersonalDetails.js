import React, { useState } from "react";
import CaptchaComponent from "./CaptchaComponent";
import OTPVerification from "./OTPVerification";
import "./Establishment.css";

export default function Step1PersonalDetails({ data, onUpdate, onNext }) {
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

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

    if (!captchaValid) {
      alert("Please complete captcha verification.");
      return;
    }
    if (!otpVerified) {
      alert("Please complete mobile/email verification.");
      return;
    }

    onNext();
  };

  const handleCaptchaChange = (isValid, value) => {
    setCaptchaValid(isValid);
    setCaptchaValue(value);
  };

  const handleVerificationComplete = (verified) => {
    setOtpVerified(verified);
    if (verified) {
      // Keep the verification status even if user modifies other fields
      console.log('OTP verification completed successfully');
    }
  };

  const handleMobileEmailChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });

    // Show OTP verification when both mobile and email are filled, but don't reset if already verified
    if ((name === 'mobile' || name === 'email') && data.mobile && data.email) {
      setShowOTPVerification(true);
      // Only reset OTP verification if the values actually changed significantly
      if (!otpVerified) {
        setOtpVerified(false);
      }
    }
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
              value={data.mobile || ""}
              onChange={handleMobileEmailChange}
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
              value={data.email || ""}
              onChange={handleMobileEmailChange}
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

        {showOTPVerification && data.mobile && data.email && (
          <OTPVerification
            mobile={data.mobile}
            email={data.email}
            onVerificationComplete={handleVerificationComplete}
          />
        )}

        <CaptchaComponent
          onCaptchaChange={handleCaptchaChange}
          isValid={captchaValid}
        />

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}