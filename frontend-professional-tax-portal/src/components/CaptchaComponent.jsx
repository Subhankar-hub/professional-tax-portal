
import React, { useState, useEffect } from 'react';

const CaptchaComponent = ({ onCaptchaChange, error }) => {
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      default:
        answer = num1 + num2;
    }
    
    setCaptchaQuestion(`${num1}${operator}${num2}=`);
    setCaptchaAnswer(answer.toString());
    setUserAnswer('');
    setIsValid(false);
  };

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setUserAnswer(value);
    
    const valid = value === captchaAnswer;
    setIsValid(valid);
    
    if (onCaptchaChange) {
      onCaptchaChange(valid);
    }
  };

  return (
    <div className="captcha-container">
      <label>Prove that you are not a robot*</label>
      <div className="captcha-input-group">
        <div className="captcha-question">
          <span className="question-icon">?</span>
          <span className="captcha-text">{captchaQuestion}</span>
        </div>
        <input
          type="text"
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder="Expression Result"
          className={`captcha-input ${error ? 'error' : ''} ${isValid ? 'valid' : ''}`}
        />
        <button
          type="button"
          onClick={generateCaptcha}
          className="captcha-refresh"
          title="Refresh Captcha"
        >
          🔄
        </button>
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default CaptchaComponent;
