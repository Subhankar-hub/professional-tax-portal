import React, { useState } from "react";
import "./Establishment.css"; // we'll make this CSS file next

export default function Step3Establishment({ onNext }) {
  const [establishment, setEstablishment] = useState({
    name: "", area: "Agartala", charge: "Charge - I",
    district: "West Tripura", pin: "799001", address: "",
    extraAddresses: [{ name: "", address: "" }]
  });

  return (
    <div className="container">
      <h2 className="step-title">Third Step (Establishment Information):</h2>
      <div className="form-section">

        <label>Name of Establishment (Profession/Trade/Calling/Employment):</label>
        <input value={establishment.name} onChange={e => setEstablishment({ ...establishment, name: e.target.value })} />

        <div className="row">
          <div className="col">
            <label>Area of Jurisdiction:</label>
            <select value={establishment.area} onChange={e => setEstablishment({ ...establishment, area: e.target.value })}>
              <option>Agartala</option>
              <option>Other City</option>
            </select>
          </div>
          <div className="col">
            <label>Charge:</label>
            <select value={establishment.charge} onChange={e => setEstablishment({ ...establishment, charge: e.target.value })}>
              <option>Charge - I</option>
              <option>Charge - II</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>District:</label>
            <input value={establishment.district} onChange={e => setEstablishment({ ...establishment, district: e.target.value })} />
          </div>
          <div className="col">
            <label>PIN Code:</label>
            <input value={establishment.pin} onChange={e => setEstablishment({ ...establishment, pin: e.target.value })} />
          </div>
        </div>

        <label>Establishment Address:</label>
        <input value={establishment.address} onChange={e => setEstablishment({ ...establishment, address: e.target.value })} />

        <button className="btn add-btn">Add More (Max 5)</button>

        <div className="buttons">
          <button className="btn btn-next" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}
