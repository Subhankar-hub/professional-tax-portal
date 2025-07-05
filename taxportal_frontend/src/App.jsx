import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate(); // 👈 Add this line

  const [captchaQ, setCaptchaQ] = useState('');
  const [captchaAns, setCaptchaAns] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const [formData, setFormData] = useState({
    applyingAs: 'Individual',
    name: '',
    pan: '',
    mobile: '',
    email: '',
  });

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 50) + 10;
    const n2 = Math.floor(Math.random() * 50) + 10;
    setCaptchaQ(`${n1} + ${n2} =`);
    setCaptchaAns(n1 + n2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateCaptchaAndSubmit = async () => {
  if (parseInt(userAnswer) !== captchaAns) {
    alert('Captcha incorrect. Please try again.');
    generateCaptcha();
    setUserAnswer('');
    return;
  }

  // Convert string to boolean
  const applyingAsIndividual = formData.applyingAs === 'Individual';

  const payload = {
    applyingAsIndividual,
    name: formData.name,
    pan: formData.pan,
    mobile: formData.mobile,
    email: formData.email,
  };

  try {
    const res = await axios.post('http://localhost:8080/api/enrolment/initiate', payload);
    alert(res.data); // e.g., "OTP sent to 8731941367"
    navigate('/otp', { state: { mobile: formData.mobile } }); // Navigate to OTP page with mobile
  } catch (err) {
    console.error(err);
    alert('Submission failed. Please try again.');
  }
};


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#00B2E1] p-4 flex items-center text-white">
        <img src="emblem.png.png" alt="Logo" className="h-20 mr-4" />
        <div>
          <h2 className="text-3xl font-bold">P₹ofession Tax</h2>
          <p className="text-black text-sm">Commissionerate of Taxes & Excise</p>
          <p className="text-black text-sm">Government of Tripura</p>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 mt-6 shadow-md rounded-md">
        {/* Applying As */}
        <div className="mb-6">
          <label className="block font-bold mb-2">Applying as:</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="applyingAs"
                value="Individual"
                checked={formData.applyingAs === 'Individual'}
                onChange={handleChange}
              />
              Individual
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="applyingAs"
                value="Others"
                checked={formData.applyingAs === 'Others'}
                onChange={handleChange}
              />
              Others
            </label>
          </div>
        </div>

        {/* Business Info */}
        <div className="mb-6">
          <h4 className="text-[#00a9e0] font-bold mb-1">Business Information</h4>
          <label className="block font-bold mb-1">Name of the Establishment*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Applicant's Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-[#00a9e0] text-sm mt-1">
            Name must match your PAN/TAN. Avoid prefixes like Sri/Smt/Mr etc.
          </p>
        </div>

        {/* PAN */}
        <div className="mb-6">
          <label className="block font-bold mb-1">PAN or TAN*</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            required
            placeholder="Enter PAN/TAN"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-[#00a9e0] text-sm mt-1">PAN/TAN issued to you.</p>
        </div>

        {/* Mobile */}
        <div className="mb-6">
          <label className="block font-bold mb-1">Mobile Number*</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="Enter Mobile Number"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-[#00a9e0] text-sm mt-1">
            Valid 10-digit number (without +91).
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block font-bold mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Email Address"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-[#00a9e0] text-sm mt-1">Valid email address.</p>
        </div>

        {/* Captcha */}
        <div className="mb-6">
          <label className="block font-bold mb-1">Prove you're not a robot*</label>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg font-semibold">{captchaQ}</span>
            <input
              type="text"
              placeholder="Result"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-24 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={validateCaptchaAndSubmit}
          className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
