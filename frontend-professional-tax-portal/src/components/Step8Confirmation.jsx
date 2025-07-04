import React from 'react';

const Step8Confirmation = ({ formData }) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleNewApplication = () => {
    window.location.reload();
  };

  return (
    <div className="step-container confirmation-container">
      <div className="confirmation-header">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-circle">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        </div>
        <h2>Application Submitted Successfully!</h2>
        <p className="submission-time">Submitted on {currentDate}</p>
      </div>

      <div className="confirmation-details">
        <div className="application-info">
          <h3>Application Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Application ID:</label>
              <span className="application-id">{formData.applicationId}</span>
            </div>
            <div className="info-item">
              <label>Applicant Name:</label>
              <span>{formData.name}</span>
            </div>
            <div className="info-item">
              <label>Mobile Number:</label>
              <span>{formData.mobile}</span>
            </div>
            <div className="info-item">
              <label>Email ID:</label>
              <span>{formData.email}</span>
            </div>
            <div className="info-item">
              <label>Establishment Type:</label>
              <span>{formData.establishmentType}</span>
            </div>
            <div className="info-item">
              <label>Business Name:</label>
              <span>{formData.establishmentName}</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-list">
            <div className="next-step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Application Review</h4>
                <p>Your application will be reviewed by the concerned tax authority within 7-10 working days.</p>
              </div>
            </div>
            <div className="next-step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Document Verification</h4>
                <p>If required, you may be contacted for additional documents or clarification.</p>
              </div>
            </div>
            <div className="next-step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>PTAN Generation</h4>
                <p>Upon successful verification, your Professional Tax Account Number (PTAN) will be generated.</p>
              </div>
            </div>
            <div className="next-step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Certificate Issuance</h4>
                <p>Your Professional Tax Registration Certificate will be issued and sent to your registered address.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="important-notes">
          <h3>Important Notes</h3>
          <ul>
            <li>
              <strong>Save this Application ID:</strong> Please save your Application ID <strong>{formData.applicationId}</strong> for future reference.
            </li>
            <li>
              <strong>Status Updates:</strong> You will receive SMS and email updates about your application status.
            </li>
            <li>
              <strong>Query Resolution:</strong> For any queries, contact the tax office with your Application ID.
            </li>
            <li>
              <strong>Document Submission:</strong> If original documents are required, you will be notified separately.
            </li>
            <li>
              <strong>Processing Time:</strong> Normal processing time is 7-10 working days from the date of submission.
            </li>
          </ul>
        </div>

        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="contact-details">
            <div className="contact-item">
              <h4>Commissionerate of Taxes & Excise</h4>
              <p>Government of Tripura</p>
              <p>Email: taxestripura@gov.in</p>
              <p>Phone: +91-381-XXXXXXX</p>
            </div>
            <div className="contact-item">
              <h4>Jurisdiction Office</h4>
              <p>{formData.jurisdictionArea} - {formData.charge}</p>
              <p>District: {formData.district}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button 
          onClick={handlePrint}
          className="btn btn-secondary"
        >
          Print Confirmation
        </button>
        <button 
          onClick={handleNewApplication}
          className="btn btn-primary"
        >
          Submit New Application
        </button>
      </div>

      <div className="footer-note">
        <p>
          This is a system generated confirmation. Please keep this for your records.
        </p>
      </div>
    </div>
  );
};

export default Step8Confirmation;
