import React, { useState, useEffect } from 'react';

const OTPVerification = ({ mobile, email, onVerificationComplete }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('mobile'); // 'mobile' or 'email'

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const sendOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: verificationMethod === 'mobile' ? mobile : null,
          email: verificationMethod === 'email' ? email : null,
          method: verificationMethod
        }),
      });

      if (response.ok) {
        setOtpSent(true);
        setTimer(300); // 5 minutes
        setCanResend(false);
        alert(`OTP sent to your ${verificationMethod}`);
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP. Please try again.');
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: verificationMethod === 'mobile' ? mobile : null,
          email: verificationMethod === 'email' ? email : null,
          otp: otp,
          method: verificationMethod
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.verified) {
          onVerificationComplete(true);
          alert('OTP verified successfully!');
        } else {
          alert('Invalid OTP. Please try again.');
        }
      } else {
        alert('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="otp-section">
      <h3>Mobile/Email Verification</h3>

      <div className="verification-method">
        <label>
          <input
            type="radio"
            value="mobile"
            checked={verificationMethod === 'mobile'}
            onChange={(e) => setVerificationMethod(e.target.value)}
            disabled={otpSent}
          />
          Verify via Mobile ({mobile})
        </label>
        <label>
          <input
            type="radio"
            value="email"
            checked={verificationMethod === 'email'}
            onChange={(e) => setVerificationMethod(e.target.value)}
            disabled={otpSent}
          />
          Verify via Email ({email})
        </label>
      </div>

      {!otpSent ? (
        <button type="button" onClick={sendOTP} className="btn-primary">
          Send OTP
        </button>
      ) : (
        <>
        <div className="otp-input-section">
          <div className="otp-input-container">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
            />
            <button type="button" onClick={verifyOTP} className="btn-primary">
              Verify OTP
            </button>
          </div>

          <div className="otp-timer">
            {timer > 0 ? (
              <span>Resend OTP in {formatTime(timer)}</span>
            ) : (
              <button
                type="button"
                onClick={sendOTP}
                disabled={!canResend}
                className="btn-secondary"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default OTPVerification;