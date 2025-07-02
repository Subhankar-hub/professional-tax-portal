import React, { useState, useEffect } from 'react';

const CaptchaComponent = ({ onCaptchaChange, isValid }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    generateCaptchaImage(result);
  };

  const generateCaptchaImage = (text) => {
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
    
    // Draw text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 8);
    
    setCaptchaImage(canvas.toDataURL());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const isCorrect = userInput.toLowerCase() === captchaText.toLowerCase();
    onCaptchaChange(isCorrect, userInput);
  }, [userInput, captchaText, onCaptchaChange]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const refreshCaptcha = () => {
    setUserInput('');
    generateCaptcha();
  };

  return (
    <div className="captcha-section">
      <label>Captcha Verification *</label>
      <div className="captcha-container">
        <div className="captcha-image-container">
          <img src={captchaImage} alt="Captcha" style={{border: '1px solid #ddd', borderRadius: '4px'}} />
          <button type="button" onClick={refreshCaptcha} style={{marginLeft: '10px', padding: '5px 10px'}}>
            Refresh
          </button>
        </div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter captcha text"
          style={{
            marginTop: '10px',
            borderColor: isValid === false ? '#f44336' : '#ddd'
          }}
        />
        {isValid === false && (
          <div style={{color: '#f44336', fontSize: '12px', marginTop: '5px'}}>
            Captcha verification failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptchaComponent;
