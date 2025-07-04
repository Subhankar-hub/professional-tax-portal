import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { formatOTP, customValidators } from '../utils/validation';

const Step2OTPVerification = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // In a real implementation, this would call the backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsOtpSent(true);
      setCountdown(30);
      setSuccess(`OTP sent to ${formData.mobile}`);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validate OTP format first
    const otpError = customValidators.otpLength(otp);
    if (otpError) {
      setError(otpError);
      setLoading(false);
      return;
    }
    
    try {
      // In a real implementation, this would verify with backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // For demo purposes, accept any 6-digit OTP
      updateFormData({ 
        mobileOtp: otp,
        mobileOtpVerified: true 
      });
      nextStep();
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      sendOTP();
    } else {
      verifyOTP();
    }
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h3>Step 2: OTP Verification</h3>
        <p>Verify your mobile number: {formData.mobile}</p>
      </div>

      <form onSubmit={handleSubmit} className="step-form">
        {!isOtpSent ? (
          <div className="form-section">
            <div className="info-box">
              <p>We will send a 6-digit OTP to your registered mobile number for verification.</p>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={prevStep}
                className="btn btn-secondary"
                disabled={loading}
              >
                Back
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </div>
        ) : (
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="otp">Enter OTP *</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(formatOTP(e.target.value))}
                placeholder="Enter 6-digit OTP"
                className="form-control"
                maxLength={6}
                required
              />
            </div>

            {countdown > 0 && (
              <p className="countdown-text">
                Resend OTP in {countdown} seconds
              </p>
            )}

            {countdown === 0 && (
              <button 
                type="button"
                onClick={sendOTP}
                className="btn btn-link"
                disabled={loading}
              >
                Resend OTP
              </button>
            )}

            {success && (
              <div className="success-message">
                <p>{success}</p>
              </div>
            )}
            
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                onClick={prevStep}
                className="btn btn-secondary"
                disabled={loading}
              >
                Back
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={loading || otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Step2OTPVerification;
