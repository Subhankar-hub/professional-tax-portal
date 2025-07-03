
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PTaxEnrollmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationType, setApplicationType] = useState('Individual');
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [captcha, setCaptcha] = useState('');
  
  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    fatherName: '',
    gender: 'Male',
    panTan: '',
    mobile: '',
    email: '',
    
    // Business Information (for Others)
    establishmentName: '',
    businessPan: '',
    businessMobile: '',
    businessEmail: '',
    
    // Establishment Information
    businessName: '',
    areaOfJurisdiction: '',
    charge: '',
    district: '',
    pinCode: '',
    establishmentAddress: '',
    
    // Additional establishments
    additionalEstablishments: [],
    
    // Category information
    category: '',
    subcategory: '',
    
    // Other Details
    engagedWith: {
      profession: false,
      trade: false,
      calling: false,
      employment: false
    },
    
    // Profession Details
    professionDetails: {
      dateOfCommencement: '',
      periodOfStanding: '',
      panTan: '',
      annualGrossBusiness: '',
      monthlyAvgWorkers: '',
      monthlyAvgEmployees: '',
      registeredUnderVAT: false,
      vatNumber: '',
      registeredUnderCST: false,
      cstNumber: '',
      registeredUnderGST: false,
      gstNumber: ''
    },
    
    // Trade Details
    tradeDetails: {
      dateOfCommencement: '',
      periodOfStanding: '',
      panTan: '',
      annualGrossBusiness: '',
      annualTurnover: '',
      monthlyAvgWorkers: '',
      monthlyAvgEmployees: '',
      registeredUnderVAT: false,
      vatNumber: '',
      registeredUnderCST: false,
      cstNumber: '',
      registeredUnderGST: false,
      gstNumber: ''
    },
    
    // Calling Details
    callingDetails: {
      dateOfCommencement: '',
      periodOfStanding: '',
      panTan: '',
      annualGrossBusiness: '',
      monthlyAvgWorkers: '',
      monthlyAvgEmployees: '',
      registeredUnderVAT: false,
      vatNumber: '',
      registeredUnderCST: false,
      cstNumber: '',
      registeredUnderGST: false,
      gstNumber: ''
    },
    
    // Employment Details
    employmentDetails: {
      dateOfCommencement: '',
      periodOfStanding: '',
      panTan: '',
      registeredUnderVAT: false,
      vatNumber: '',
      registeredUnderCST: false,
      cstNumber: '',
      registeredUnderGST: false,
      gstNumber: '',
      employerName: '',
      employerAddress: '',
      monthlySalary: '',
      simultaneousEmployment: false,
      additionalEmployers: []
    },
    
    // Vehicle Details
    vehicles: {
      taxis: { selected: false, count: 0 },
      threeWheelers: { selected: false, count: 0 },
      lightMotorVehicles: { selected: false, count: 0 },
      goodVehicles: { selected: false, count: 0 },
      trucks: { selected: false, count: 0 },
      buses: { selected: false, count: 0 }
    },
    
    // Cooperative Society
    cooperativeSociety: {
      stateLevelSociety: false,
      districtLevelSociety: false
    },
    
    // Declaration
    declaration: false
  });

  // Load master data on component mount
  useEffect(() => {
    loadMasterData();
    generateCaptcha();
  }, []);

  const loadMasterData = async () => {
    try {
      const [districtsRes, categoriesRes] = await Promise.all([
        axios.get('http://localhost:8080/master-data/districts'),
        axios.get('http://localhost:8080/master-data/ptax-categories')
      ]);
      
      if (districtsRes.data.success) {
        setDistricts(districtsRes.data.data);
      }
      
      if (categoriesRes.data.success) {
        setCategories(categoriesRes.data.data);
      }
    } catch (error) {
      console.error('Error loading master data:', error);
    }
  };

  const loadSubcategories = async (categoryCode) => {
    try {
      const response = await axios.get(`http://localhost:8080/master-data/ptax-subcategories/${categoryCode}`);
      if (response.data.success) {
        setSubcategories(response.data.data);
      }
    } catch (error) {
      console.error('Error loading subcategories:', error);
    }
  };

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 50) + 10;
    const num2 = Math.floor(Math.random() * 50) + 10;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    setCaptcha(`${num1}${operator}${num2}=`);
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCategoryChange = (categoryCode) => {
    setFormData(prev => ({ ...prev, category: categoryCode, subcategory: '' }));
    loadSubcategories(categoryCode);
  };

  const addEstablishment = () => {
    setFormData(prev => ({
      ...prev,
      additionalEstablishments: [
        ...prev.additionalEstablishments,
        { name: '', address: '' }
      ]
    }));
  };

  const addEmployer = () => {
    setFormData(prev => ({
      ...prev,
      employmentDetails: {
        ...prev.employmentDetails,
        additionalEmployers: [
          ...prev.employmentDetails.additionalEmployers,
          { name: '', address: '', salary: '' }
        ]
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/enrolment', formData);
      if (response.data.success) {
        alert(`Application submitted successfully! Application ID: ${response.data.applicationId}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const renderStep1 = () => (
    <div className="form-content">
      <div className="applying-as">
        <label>Applying as:</label>
        <div className="toggle-switch">
          <button 
            className={`toggle-button ${applicationType === 'Individual' ? 'active' : ''}`}
            onClick={() => setApplicationType('Individual')}
          >
            Individual
          </button>
          <button 
            className={`toggle-button ${applicationType === 'Others' ? 'active' : ''}`}
            onClick={() => setApplicationType('Others')}
          >
            Others
          </button>
        </div>
      </div>

      {applicationType === 'Individual' ? (
        <>
          <h3 className="section-title">Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Name of the Applicant*</label>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange(null, 'name', e.target.value)}
              />
              <span className="help-text">
                Name (Individual/Business Entity) must match with the name provided on your PAN/TAN card.
                If entering name of individual, it should not have any prefix like Sir/Smt/Mr/Miss/Dr/Er etc.
              </span>
            </div>
            <div className="form-group">
              <label>Gender*</label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange(null, 'gender', e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Father's Name of the Applicant*</label>
              <input
                type="text"
                placeholder="Fathers Name"
                value={formData.fatherName}
                onChange={(e) => handleInputChange(null, 'fatherName', e.target.value)}
              />
              <span className="help-text">Please, Do not write Mr/Shri/Er/Doc etc.</span>
            </div>
            <div className="form-group">
              <label>PAN or TAN*</label>
              <input
                type="text"
                placeholder="AAAAA1111G"
                value={formData.panTan}
                onChange={(e) => handleInputChange(null, 'panTan', e.target.value)}
              />
              <span className="help-text">PAN/TAN issued to you</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number*</label>
              <input
                type="text"
                placeholder="9999999999"
                value={formData.mobile}
                onChange={(e) => handleInputChange(null, 'mobile', e.target.value)}
              />
              <span className="help-text">
                Please write Valid Mobile Number only without Country Code (+91).
              </span>
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                placeholder="test@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange(null, 'email', e.target.value)}
              />
              <span className="help-text">
                Please provide a valid email address otherwise you will not be able to complete the Enrolment.
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="section-title">Business Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Name of the Establishment*</label>
              <input
                type="text"
                placeholder="Applicant's Name"
                value={formData.establishmentName}
                onChange={(e) => handleInputChange(null, 'establishmentName', e.target.value)}
              />
              <span className="help-text">
                Name (Individual/Business Entity) must match with the name provided on your PAN/TAN card.
                If entering name of individual, it should not have any prefix like Sir/Smt/Mr/Miss/Dr/Er etc.
              </span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>PAN or TAN*</label>
              <input
                type="text"
                placeholder="PAN"
                value={formData.businessPan}
                onChange={(e) => handleInputChange(null, 'businessPan', e.target.value)}
              />
              <span className="help-text">PAN/TAN issued to you</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number*</label>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={formData.businessMobile}
                onChange={(e) => handleInputChange(null, 'businessMobile', e.target.value)}
              />
              <span className="help-text">
                Please write Valid Mobile Number only without Country Code (+91).
              </span>
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                value={formData.businessEmail}
                onChange={(e) => handleInputChange(null, 'businessEmail', e.target.value)}
              />
              <span className="help-text">
                Please provide a valid email address otherwise you will not be able to complete the Enrolment.
              </span>
            </div>
          </div>
        </>
      )}

      <div className="form-row single">
        <div className="form-group">
          <label>Prove that you are not a robot*</label>
          <div className="captcha-container">
            <div className="captcha-image">{captcha}</div>
            <button type="button" className="captcha-refresh" onClick={generateCaptcha}>
              🔄
            </button>
            <input
              type="text"
              className="captcha-input"
              placeholder="75"
            />
          </div>
        </div>
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-primary" onClick={nextStep}>
          ➤ Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-content">
      <h3 className="section-title">Establishment Information</h3>
      <p style={{ color: '#dc3545', marginBottom: '20px' }}>
        (Note: You may be engaged with any one or multiple among Profession/Trade/Calling/Employment, 
        but here you need to furnish the details of only one among Profession/Trade/Calling/Employment 
        from which you have the maximum earning.)
      </p>

      <div className="form-row single">
        <div className="form-group">
          <label>Name of Establishment (Profession/Trade/Calling/Employment)*</label>
          <input
            type="text"
            placeholder="Establishment Name"
            value={formData.businessName}
            onChange={(e) => handleInputChange(null, 'businessName', e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Area of Jurisdiction*</label>
          <select
            value={formData.areaOfJurisdiction}
            onChange={(e) => handleInputChange(null, 'areaOfJurisdiction', e.target.value)}
          >
            <option value="">Select Area</option>
            <option value="Agartala">Agartala</option>
          </select>
        </div>
        <div className="form-group">
          <label>Charge*</label>
          <select
            value={formData.charge}
            onChange={(e) => handleInputChange(null, 'charge', e.target.value)}
          >
            <option value="">Select Charge</option>
            <option value="Charge - I">Charge - I</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>District*</label>
          <select
            value={formData.district}
            onChange={(e) => handleInputChange(null, 'district', e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.distId} value={district.distId}>
                {district.distName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>PIN Code*</label>
          <input
            type="text"
            placeholder="799001"
            value={formData.pinCode}
            onChange={(e) => handleInputChange(null, 'pinCode', e.target.value)}
          />
          <span className="help-text">Know your Jurisdiction.</span>
        </div>
      </div>

      <div className="form-row single">
        <div className="form-group">
          <label>Establishment Address*</label>
          <textarea
            placeholder="Establishment Address"
            rows="3"
            value={formData.establishmentAddress}
            onChange={(e) => handleInputChange(null, 'establishmentAddress', e.target.value)}
          />
          <span className="help-text">Shop Number / Building Number / Street Name / Road Name etc.</span>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h4 style={{ color: '#17a2b8', marginBottom: '15px' }}>
          If you are having Additional Place of work, please specify Name and Address
        </h4>
        
        {formData.additionalEstablishments.map((est, index) => (
          <div key={index} className="establishment-row">
            <div className="form-group">
              <label>Name of Establishment (Profession/Trade/Calling/Employment)</label>
              <input
                type="text"
                placeholder="Establishment Type"
                value={est.name}
                onChange={(e) => {
                  const newEstablishments = [...formData.additionalEstablishments];
                  newEstablishments[index].name = e.target.value;
                  setFormData(prev => ({ ...prev, additionalEstablishments: newEstablishments }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Establishment Address (Full Address)</label>
              <input
                type="text"
                placeholder="Establishment Address"
                value={est.address}
                onChange={(e) => {
                  const newEstablishments = [...formData.additionalEstablishments];
                  newEstablishments[index].address = e.target.value;
                  setFormData(prev => ({ ...prev, additionalEstablishments: newEstablishments }));
                }}
              />
            </div>
          </div>
        ))}

        <button type="button" className="add-more-btn" onClick={addEstablishment}>
          ➕ Add More (Max 5)
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <div className="form-row">
          <div className="form-group">
            <label>Category of Profession/Trade/Calling/Employment*</label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.catId} value={category.catId}>
                  {category.catDescription}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Sub-Category of Profession/Trade/Calling/Employment*</label>
            <select
              value={formData.subcategory}
              onChange={(e) => handleInputChange(null, 'subcategory', e.target.value)}
            >
              <option value="">Select Sub-Category</option>
              {subcategories.map(subcategory => (
                <option key={subcategory.subcatCode} value={subcategory.subcatCode}>
                  {subcategory.subcatDescription}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={nextStep}>
          ➤ Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-content">
      <h3 className="section-title">Other Details</h3>
      
      <div>
        <label style={{ fontWeight: '600', marginBottom: '15px', display: 'block' }}>
          Engaged With*
        </label>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="profession"
              checked={formData.engagedWith.profession}
              onChange={(e) => handleInputChange('engagedWith', 'profession', e.target.checked)}
            />
            <label htmlFor="profession">Profession</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="trade"
              checked={formData.engagedWith.trade}
              onChange={(e) => handleInputChange('engagedWith', 'trade', e.target.checked)}
            />
            <label htmlFor="trade">Trade</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="calling"
              checked={formData.engagedWith.calling}
              onChange={(e) => handleInputChange('engagedWith', 'calling', e.target.checked)}
            />
            <label htmlFor="calling">Calling</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="employment"
              checked={formData.engagedWith.employment}
              onChange={(e) => handleInputChange('engagedWith', 'employment', e.target.checked)}
            />
            <label htmlFor="employment">Employment</label>
          </div>
        </div>
      </div>

      {/* Profession Details */}
      {formData.engagedWith.profession && (
        <div className="details-section">
          <h4 style={{ color: '#17a2b8', marginBottom: '20px' }}>
            Furnish the Details of Profession:
          </h4>
          
          <div className="form-row triple">
            <div className="form-group">
              <label>Date of Commencement*</label>
              <input
                type="date"
                value={formData.professionDetails.dateOfCommencement}
                onChange={(e) => handleInputChange('professionDetails', 'dateOfCommencement', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Period of Standing*</label>
              <input
                type="text"
                placeholder="0 Year 0 Month 9 Days"
                value={formData.professionDetails.periodOfStanding}
                onChange={(e) => handleInputChange('professionDetails', 'periodOfStanding', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>PAN/TAN*</label>
              <input
                type="text"
                placeholder="AAAAA1111G"
                value={formData.professionDetails.panTan}
                onChange={(e) => handleInputChange('professionDetails', 'panTan', e.target.value)}
              />
              <span className="help-text">Permanent Income Tax Account Number</span>
            </div>
          </div>

          <div className="form-row triple">
            <div className="form-group">
              <label>Annual Gross Business*</label>
              <input
                type="number"
                placeholder="10,000"
                value={formData.professionDetails.annualGrossBusiness}
                onChange={(e) => handleInputChange('professionDetails', 'annualGrossBusiness', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Monthly Average Number of Workers</label>
              <input
                type="number"
                placeholder="10000"
                value={formData.professionDetails.monthlyAvgWorkers}
                onChange={(e) => handleInputChange('professionDetails', 'monthlyAvgWorkers', e.target.value)}
              />
              <span className="help-text">during the last preceding year in the establishment</span>
            </div>
            <div className="form-group">
              <label>Monthly Average Number of Employees</label>
              <input
                type="number"
                placeholder="100"
                value={formData.professionDetails.monthlyAvgEmployees}
                onChange={(e) => handleInputChange('professionDetails', 'monthlyAvgEmployees', e.target.value)}
              />
              <span className="help-text">during the last preceding year in the establishment</span>
            </div>
          </div>

          {/* Tax Registration Section */}
          <div style={{ marginTop: '25px' }}>
            <h5 style={{ color: '#17a2b8', marginBottom: '15px' }}>
              If registered taxpayer under one or more from the list below, Please select:
            </h5>
            
            <div className="form-row triple">
              <div>
                <div className="checkbox-item" style={{ marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.professionDetails.registeredUnderVAT}
                    onChange={(e) => handleInputChange('professionDetails', 'registeredUnderVAT', e.target.checked)}
                  />
                  <label>Registered Under VAT</label>
                </div>
                <input
                  type="text"
                  placeholder="11111"
                  value={formData.professionDetails.vatNumber}
                  onChange={(e) => handleInputChange('professionDetails', 'vatNumber', e.target.value)}
                />
              </div>
              <div>
                <div className="checkbox-item" style={{ marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.professionDetails.registeredUnderCST}
                    onChange={(e) => handleInputChange('professionDetails', 'registeredUnderCST', e.target.checked)}
                  />
                  <label>Registered Under CST</label>
                </div>
                <input
                  type="text"
                  placeholder="11111"
                  value={formData.professionDetails.cstNumber}
                  onChange={(e) => handleInputChange('professionDetails', 'cstNumber', e.target.value)}
                />
              </div>
              <div>
                <div className="checkbox-item" style={{ marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.professionDetails.registeredUnderGST}
                    onChange={(e) => handleInputChange('professionDetails', 'registeredUnderGST', e.target.checked)}
                  />
                  <label>Registered Under GST</label>
                </div>
                <input
                  type="text"
                  placeholder="11111"
                  value={formData.professionDetails.gstNumber}
                  onChange={(e) => handleInputChange('professionDetails', 'gstNumber', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Vehicle Section */}
          <div className="vehicle-section">
            <h5 style={{ color: '#17a2b8', marginBottom: '15px' }}>
              If held Vehicles under the Motor Vehicles Act-1939, Please select:
            </h5>
            
            <div className="vehicle-grid">
              {Object.entries(formData.vehicles).map(([key, vehicle]) => (
                <div
                  key={key}
                  className={`vehicle-item ${vehicle.selected ? 'selected' : ''}`}
                  onClick={() => handleInputChange('vehicles', key, { ...vehicle, selected: !vehicle.selected })}
                >
                  <span className="vehicle-icon">🚗</span>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="number"
                    className="vehicle-input"
                    value={vehicle.count}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleInputChange('vehicles', key, { ...vehicle, count: parseInt(e.target.value) || 0 });
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cooperative Society Section */}
          <div className="society-section">
            <h5 style={{ color: '#17a2b8', marginBottom: '15px' }}>
              If engaged with Co-operative Society, Please select:
            </h5>
            
            <div className="society-options">
              <div
                className={`society-item ${formData.cooperativeSociety.stateLevelSociety ? 'selected' : ''}`}
                onClick={() => handleInputChange('cooperativeSociety', 'stateLevelSociety', !formData.cooperativeSociety.stateLevelSociety)}
              >
                <input
                  type="checkbox"
                  checked={formData.cooperativeSociety.stateLevelSociety}
                  readOnly
                />
                <label>State Level Society</label>
              </div>
              <div
                className={`society-item ${formData.cooperativeSociety.districtLevelSociety ? 'selected' : ''}`}
                onClick={() => handleInputChange('cooperativeSociety', 'districtLevelSociety', !formData.cooperativeSociety.districtLevelSociety)}
              >
                <input
                  type="checkbox"
                  checked={formData.cooperativeSociety.districtLevelSociety}
                  readOnly
                />
                <label>District Level Society</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trade Details */}
      {formData.engagedWith.trade && (
        <div className="details-section">
          <h4 style={{ color: '#17a2b8', marginBottom: '20px' }}>
            Furnish the Details of Trade:
          </h4>
          
          {/* Similar structure as profession details */}
          <div className="form-row triple">
            <div className="form-group">
              <label>Date of Commencement*</label>
              <input
                type="date"
                value={formData.tradeDetails.dateOfCommencement}
                onChange={(e) => handleInputChange('tradeDetails', 'dateOfCommencement', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Period of Standing*</label>
              <input
                type="text"
                placeholder="0 Year 0 Month 9 Days"
                value={formData.tradeDetails.periodOfStanding}
                onChange={(e) => handleInputChange('tradeDetails', 'periodOfStanding', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>PAN/TAN*</label>
              <input
                type="text"
                placeholder="AAAAA1111G"
                value={formData.tradeDetails.panTan}
                onChange={(e) => handleInputChange('tradeDetails', 'panTan', e.target.value)}
              />
              <span className="help-text">Permanent Income Tax Account Number</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Annual Gross Business*</label>
              <input
                type="number"
                placeholder="1,00,000"
                value={formData.tradeDetails.annualGrossBusiness}
                onChange={(e) => handleInputChange('tradeDetails', 'annualGrossBusiness', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Annual Turnover of all Sales/Purchases</label>
              <input
                type="number"
                placeholder="10,000"
                value={formData.tradeDetails.annualTurnover}
                onChange={(e) => handleInputChange('tradeDetails', 'annualTurnover', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Monthly Average Number of Workers</label>
              <input
                type="number"
                placeholder="100"
                value={formData.tradeDetails.monthlyAvgWorkers}
                onChange={(e) => handleInputChange('tradeDetails', 'monthlyAvgWorkers', e.target.value)}
              />
              <span className="help-text">during the last preceding year in the establishment</span>
            </div>
            <div className="form-group">
              <label>Monthly Average Number of Employees</label>
              <input
                type="number"
                placeholder="100"
                value={formData.tradeDetails.monthlyAvgEmployees}
                onChange={(e) => handleInputChange('tradeDetails', 'monthlyAvgEmployees', e.target.value)}
              />
              <span className="help-text">during the last preceding year in the establishment</span>
            </div>
          </div>

          {/* Similar tax registration and vehicle sections as profession */}
        </div>
      )}

      {/* Calling Details */}
      {formData.engagedWith.calling && (
        <div className="details-section">
          <h4 style={{ color: '#17a2b8', marginBottom: '20px' }}>
            Furnish the Details of Calling:
          </h4>
          
          <div className="form-row triple">
            <div className="form-group">
              <label>Date of Commencement*</label>
              <input
                type="date"
                value={formData.callingDetails.dateOfCommencement}
                onChange={(e) => handleInputChange('callingDetails', 'dateOfCommencement', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Period of Standing*</label>
              <input
                type="text"
                placeholder="0 Year 0 Month 9 Days"
                value={formData.callingDetails.periodOfStanding}
                onChange={(e) => handleInputChange('callingDetails', 'periodOfStanding', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>PAN/TAN</label>
              <input
                type="text"
                placeholder="AAAAA1111G"
                value={formData.callingDetails.panTan}
                onChange={(e) => handleInputChange('callingDetails', 'panTan', e.target.value)}
              />
              <span className="help-text">Permanent Income Tax Account Number</span>
            </div>
          </div>

          <div className="form-row triple">
            <div className="form-group">
              <label>Annual Gross Business</label>
              <input
                type="number"
                placeholder="1,000"
                value={formData.callingDetails.annualGrossBusiness}
                onChange={(e) => handleInputChange('callingDetails', 'annualGrossBusiness', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Monthly Average Number of Workers</label>
              <input
                type="number"
                placeholder="1000"
                value={formData.callingDetails.monthlyAvgWorkers}
                onChange={(e) => handleInputChange('callingDetails', 'monthlyAvgWorkers', e.target.value)}
              />
              <span className="help-text">during the last preceding year in the establishment</span>
            </div>
            <div className="form-group">
              <label>Monthly Average Number of Employees</label>
              <input
                type="number"
                placeholder="1000"
                value={formData.callingDetails.monthlyAvgEmployees}
                onChange={(e) => handleInputChange('callingDetails', 'monthlyAvgEmployees', e.target.value)}
              />
              <span className="help-text">during the last preceding year in the establishment</span>
            </div>
          </div>
        </div>
      )}

      {/* Employment Details */}
      {formData.engagedWith.employment && (
        <div className="details-section">
          <h4 style={{ color: '#17a2b8', marginBottom: '20px' }}>
            Furnish the Details of Employment:
          </h4>
          
          <div className="form-row triple">
            <div className="form-group">
              <label>Date of Commencement*</label>
              <input
                type="date"
                value={formData.employmentDetails.dateOfCommencement}
                onChange={(e) => handleInputChange('employmentDetails', 'dateOfCommencement', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Period of Standing*</label>
              <input
                type="text"
                placeholder="0 Year 0 Month 9 Days"
                value={formData.employmentDetails.periodOfStanding}
                onChange={(e) => handleInputChange('employmentDetails', 'periodOfStanding', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>PAN/TAN</label>
              <input
                type="text"
                placeholder="AAAAA1111G"
                value={formData.employmentDetails.panTan}
                onChange={(e) => handleInputChange('employmentDetails', 'panTan', e.target.value)}
              />
              <span className="help-text">Permanent Income Tax Account Number</span>
            </div>
          </div>

          {/* Tax Registration for Employment */}
          <div className="form-row triple">
            <div>
              <div className="checkbox-item" style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={formData.employmentDetails.registeredUnderVAT}
                  onChange={(e) => handleInputChange('employmentDetails', 'registeredUnderVAT', e.target.checked)}
                />
                <label>Registered Under VAT</label>
              </div>
              <input
                type="text"
                placeholder="1111111111"
                value={formData.employmentDetails.vatNumber}
                onChange={(e) => handleInputChange('employmentDetails', 'vatNumber', e.target.value)}
              />
            </div>
            <div>
              <div className="checkbox-item" style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={formData.employmentDetails.registeredUnderCST}
                  onChange={(e) => handleInputChange('employmentDetails', 'registeredUnderCST', e.target.checked)}
                />
                <label>Registered Under CST</label>
              </div>
              <input
                type="text"
                placeholder="11111111111"
                value={formData.employmentDetails.cstNumber}
                onChange={(e) => handleInputChange('employmentDetails', 'cstNumber', e.target.value)}
              />
            </div>
            <div>
              <div className="checkbox-item" style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={formData.employmentDetails.registeredUnderGST}
                  onChange={(e) => handleInputChange('employmentDetails', 'registeredUnderGST', e.target.checked)}
                />
                <label>Registered Under GST</label>
              </div>
              <input
                type="text"
                placeholder="1111111111111"
                value={formData.employmentDetails.gstNumber}
                onChange={(e) => handleInputChange('employmentDetails', 'gstNumber', e.target.value)}
              />
            </div>
          </div>

          {/* Employer Details */}
          <div style={{ marginTop: '25px' }}>
            <h5 style={{ color: '#17a2b8', marginBottom: '15px' }}>
              If an Employee of any Diplomatic or Consular Office or Trade Commissioner or any Foreign Country, provide following details:
            </h5>
            
            <div className="form-row triple">
              <div className="form-group">
                <label>Name of the Employer</label>
                <input
                  type="text"
                  placeholder="Name of the Employer"
                  value={formData.employmentDetails.employerName}
                  onChange={(e) => handleInputChange('employmentDetails', 'employerName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Address of the Employer</label>
                <input
                  type="text"
                  placeholder="Address of the Employer"
                  value={formData.employmentDetails.employerAddress}
                  onChange={(e) => handleInputChange('employmentDetails', 'employerAddress', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Monthly Salary/Wages of the Applicant</label>
                <input
                  type="number"
                  placeholder="Monthly Salary/Wages"
                  value={formData.employmentDetails.monthlySalary}
                  onChange={(e) => handleInputChange('employmentDetails', 'monthlySalary', e.target.value)}
                />
              </div>
            </div>

            <div style={{ margin: '20px 0' }}>
              <label style={{ fontWeight: '600', marginRight: '15px' }}>
                Are you simultaneously engaged in employment of more than one employer?
              </label>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <label>
                  <input
                    type="radio"
                    name="simultaneousEmployment"
                    value="false"
                    checked={!formData.employmentDetails.simultaneousEmployment}
                    onChange={() => handleInputChange('employmentDetails', 'simultaneousEmployment', false)}
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="simultaneousEmployment"
                    value="true"
                    checked={formData.employmentDetails.simultaneousEmployment}
                    onChange={() => handleInputChange('employmentDetails', 'simultaneousEmployment', true)}
                  />
                  Yes
                </label>
              </div>
            </div>

            {formData.employmentDetails.simultaneousEmployment && (
              <div className="employer-section">
                <h6 style={{ color: '#007bff', marginBottom: '15px' }}>Details of Employer - 1</h6>
                
                {formData.employmentDetails.additionalEmployers.map((employer, index) => (
                  <div key={index} className="form-row triple" style={{ marginBottom: '20px' }}>
                    <div className="form-group">
                      <label>Name of the Employer</label>
                      <input
                        type="text"
                        placeholder="Name of the Employer"
                        value={employer.name}
                        onChange={(e) => {
                          const newEmployers = [...formData.employmentDetails.additionalEmployers];
                          newEmployers[index].name = e.target.value;
                          handleInputChange('employmentDetails', 'additionalEmployers', newEmployers);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Address of the Employer</label>
                      <input
                        type="text"
                        placeholder="Address of the Employer"
                        value={employer.address}
                        onChange={(e) => {
                          const newEmployers = [...formData.employmentDetails.additionalEmployers];
                          newEmployers[index].address = e.target.value;
                          handleInputChange('employmentDetails', 'additionalEmployers', newEmployers);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Monthly Salary/Wages of the Applicant</label>
                      <input
                        type="number"
                        placeholder="Monthly Salary/Wages"
                        value={employer.salary}
                        onChange={(e) => {
                          const newEmployers = [...formData.employmentDetails.additionalEmployers];
                          newEmployers[index].salary = e.target.value;
                          handleInputChange('employmentDetails', 'additionalEmployers', newEmployers);
                        }}
                      />
                    </div>
                  </div>
                ))}

                <button type="button" className="add-employer-btn" onClick={addEmployer}>
                  ➕ Add Employer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={nextStep}>
          Submit
        </button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="review-section">
      <h2 className="review-title">Review Information</h2>
      <p className="review-subtitle">Applying as {applicationType}</p>

      {/* Personal/Business Information */}
      <div className="review-card">
        <h3 className="review-card-title">
          {applicationType === 'Individual' ? 'Personal/' : ''} Business Information
        </h3>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Name:</span>
            <span className="review-value">
              {applicationType === 'Individual' ? formData.name : formData.establishmentName}
            </span>
          </div>
          {applicationType === 'Individual' && (
            <>
              <div className="review-item">
                <span className="review-label">Gender:</span>
                <span className="review-value">{formData.gender}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Father's Name:</span>
                <span className="review-value">{formData.fatherName}</span>
              </div>
            </>
          )}
          <div className="review-item">
            <span className="review-label">PAN/TAN:</span>
            <span className="review-value">
              {applicationType === 'Individual' ? formData.panTan : formData.businessPan}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Mobile:</span>
            <span className="review-value">
              {applicationType === 'Individual' ? formData.mobile : formData.businessMobile}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Email:</span>
            <span className="review-value">
              {applicationType === 'Individual' ? formData.email : formData.businessEmail}
            </span>
          </div>
        </div>
      </div>

      {/* Establishment Information */}
      <div className="review-card">
        <h3 className="review-card-title">Establishment Information</h3>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Business Name:</span>
            <span className="review-value">{formData.businessName}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Area of Jurisdiction:</span>
            <span className="review-value">{formData.areaOfJurisdiction}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Charge:</span>
            <span className="review-value">{formData.charge}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Address:</span>
            <span className="review-value">{formData.establishmentAddress}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Category:</span>
            <span className="review-value">
              {categories.find(c => c.catId == formData.category)?.catDescription}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Sub Category:</span>
            <span className="review-value">
              {subcategories.find(s => s.subcatCode == formData.subcategory)?.subcatDescription}
            </span>
          </div>
        </div>

        {formData.additionalEstablishments.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#007bff', marginBottom: '10px' }}>Other Establishment Details</h4>
            {formData.additionalEstablishments.map((est, index) => (
              <div key={index} className="review-grid" style={{ marginBottom: '10px' }}>
                <div className="review-item">
                  <span className="review-label">Name:</span>
                  <span className="review-value">{est.name}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Address:</span>
                  <span className="review-value">{est.address}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Other Details */}
      <div className="review-card">
        <h3 className="review-card-title">Other Details</h3>
        
        {/* Engaged With */}
        <div style={{ marginBottom: '20px' }}>
          <span className="review-label" style={{ display: 'block', marginBottom: '10px' }}>
            Engaged With:
          </span>
          <div style={{ display: 'flex', gap: '15px' }}>
            {Object.entries(formData.engagedWith).map(([key, value]) => 
              value && (
                <span key={key} style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '12px' 
                }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              )
            )}
          </div>
        </div>

        {/* Show details for each engaged category */}
        {formData.engagedWith.employment && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#28a745', marginBottom: '10px' }}>Employment Details</h4>
            <div className="review-grid">
              <div className="review-item">
                <span className="review-label">Date of Commencement:</span>
                <span className="review-value">{formData.employmentDetails.dateOfCommencement}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Period of Standing:</span>
                <span className="review-value">{formData.employmentDetails.periodOfStanding}</span>
              </div>
              <div className="review-item">
                <span className="review-label">PAN:</span>
                <span className="review-value">{formData.employmentDetails.panTan}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Declaration */}
      <div className="declaration-section">
        <div className="declaration-checkbox">
          <input
            type="checkbox"
            id="declaration"
            checked={formData.declaration}
            onChange={(e) => handleInputChange(null, 'declaration', e.target.checked)}
          />
          <label htmlFor="declaration" className="declaration-text">
            I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.
          </label>
        </div>
      </div>

      {/* Final Captcha */}
      <div className="final-captcha">
        <div className="captcha-image">{captcha}</div>
        <button type="button" className="captcha-refresh" onClick={generateCaptcha}>
          🔄
        </button>
        <input
          type="text"
          className="captcha-input"
          placeholder="Expression Result"
        />
      </div>

      {/* Final Buttons */}
      <div className="final-buttons">
        <button type="button" className="btn btn-secondary">
          📝 Edit
        </button>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={submitForm}
          disabled={!formData.declaration}
        >
          📋 Submit
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <header className="header">
        <img src="/api/placeholder/60/60" alt="Government Logo" className="header-logo" />
        <div className="header-content">
          <h1>Profession Tax</h1>
          <h2>Commissionerate of Taxes & Excise</h2>
          <h3>Government of Tripura</h3>
        </div>
      </header>

      <div className="form-container">
        {currentStep < 4 && (
          <div className="step-header">
            <h2 className="step-title">Step: {currentStep} of 3</h2>
          </div>
        )}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderReviewStep()}
      </div>
    </div>
  );
};

export default PTaxEnrollmentForm;
