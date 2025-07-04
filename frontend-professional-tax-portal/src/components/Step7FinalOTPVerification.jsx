import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const Step7FinalOTPVerification = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendFinalOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await ApiService.sendOTP(formData.mobile, 'final');
      if (response.success) {
        setIsOtpSent(true);
        setCountdown(30);
        alert('Final OTP sent to ' + formData.mobile);
      } else {
        setError(response.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyFinalOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await ApiService.verifyOTP(formData.mobile, otp, 'final');
      if (response.success) {
        // Submit the final application
        const submissionResponse = await ApiService.submitEnrolment(formData);
        if (submissionResponse.success) {
          updateFormData({ 
            finalOtp: otp,
            finalOtpVerified: true,
            applicationId: submissionResponse.data,
            submitted: true
          });
          nextStep();
        } else {
          setError(submissionResponse.message || 'Failed to submit application');
        }
      } else {
        setError(response.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP or submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      sendFinalOTP();
    } else {
      verifyFinalOTP();
    }
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h3>Step 7: Final OTP Verification</h3>
        <p>Final verification before submitting your application</p>
      </div>

      <form onSubmit={handleSubmit} className="step-form">
        {!isOtpSent ? (
          <div className="form-section">
            <div className="info-box">
              <h4>Ready to Submit</h4>
              <p>You are about to submit your Professional Tax Enrolment Application.</p>
              <p>We will send a final OTP to your registered mobile number: <strong>{formData.mobile}</strong></p>
              <p>After verification, your application will be submitted successfully.</p>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={prevStep}
                className="btn btn-secondary"
                disabled={loading}
              >
                Back to Review
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send Final OTP'}
              </button>
            </div>
          </div>
        ) : (
          <div className="form-section">
            <div className="info-box">
              <p>Final OTP has been sent to your mobile number: <strong>{formData.mobile}</strong></p>
              <p>Please enter the OTP to submit your application.</p>
            </div>

            <div className="form-group">
              <label htmlFor="finalOtp">Enter Final OTP *</label>
              <input
                type="text"
                id="finalOtp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
                onClick={sendFinalOTP}
                className="btn btn-link"
                disabled={loading}
              >
                Resend Final OTP
              </button>
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
                {loading ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Step7FinalOTPVerification;
