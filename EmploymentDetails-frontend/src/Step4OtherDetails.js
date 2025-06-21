import React, { useState } from "react";
import "./Establishment.css";

export default function Step4OtherDetails({ onBack, onSubmit }) {
  const [engagedWith, setEngagedWith] = useState({ profession: false, trade: false, calling: false, employment: false });

  return (
    <div className="container">
      <h2 className="step-title">Fourth Step (Type of Establishment):</h2>
      <div className="form-section">
        <p>Engaged With:</p>
        {["profession","trade","calling","employment"].map((field) => (
          <label key={field} className="checkbox-label">
            <input
              type="checkbox"
              checked={engagedWith[field]}
              onChange={() => setEngagedWith({ ...engagedWith, [field]: !engagedWith[field] })}
            />
            {field[0].toUpperCase() + field.slice(1)}
          </label>
        ))}

        <div className="buttons">
          <button className="btn btn-back" onClick={onBack}>Back</button>
          <button className="btn btn-submit" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
