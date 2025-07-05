import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile || ''; // received from App.jsx

  const handleVerify = async () => {
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      alert('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/enrolment/verify-otp',
        {
          mobile: mobile,
          otp: otp,
        }
      );
      alert(response.data); // e.g., "OTP verified and status updated."
      // navigate('/success'); // or wherever you want to go next
    } catch (error) {
      console.error(error);
      alert('OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl border-t border-black pt-8">
        <h2 className="text-red-700 text-xl md:text-2xl font-bold mb-6 text-center">
          Second Step (OTP Verification using Mobile Number):
        </h2>

        <p className="text-center mb-4 text-gray-700">
          Dear <span className="text-red-600 font-semibold">Full Name</span>, To proceed further
          with the Enrolment/Registration process you need to verify your Mobile Number.
        </p>

        <p className="text-center text-gray-700 mb-1">
          We have sent a <span className="font-bold">6 Digit Numeric OTP</span> on your mobile
          number <span className="text-red-600 font-semibold">XXXXXX{mobile.slice(-4)}</span>.
        </p>

        <p className="text-center text-blue-600 text-sm mb-6">
          Do you want to change the Name/Mobile Number/Email?{' '}
          <button
            onClick={() => navigate('/')}
            className="font-bold underline text-blue-700 hover:text-blue-900"
          >
            Click Here
          </button>
        </p>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="border rounded-l-md bg-gray-100 px-3 py-2 text-gray-500 text-sm">
            🔒
          </div>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border border-gray-300 rounded-r-md px-4 py-2 w-full max-w-xs focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleVerify}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded flex items-center gap-2"
          >
            ✅ Verify & Proceed Further
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
