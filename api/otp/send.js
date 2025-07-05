import fetch from 'node-fetch';

// In-memory OTP storage (in production, use Redis or database)
const otpStore = new Map();

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Validate mobile number
function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile);
}

// Send SMS via Fast2SMS
async function sendSMS(mobile, otp) {
  const apiKey = process.env.FAST2SMS_API_KEY;
  const apiUrl = 'https://www.fast2sms.com/dev/bulkV2';
  
  if (!apiKey) {
    throw new Error('Fast2SMS API key not configured');
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: 'otp',
        variables_values: otp,
        numbers: mobile,
        flash: '0'
      })
    });

    const result = await response.json();
    console.log('Fast2SMS Response:', result);
    
    return result.return === true || result.return === 'true';
  } catch (error) {
    console.error('Fast2SMS Error:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { mobile, type = 'mobile' } = req.body;

    // Validate input
    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required'
      });
    }

    if (!isValidMobile(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number format'
      });
    }

    // Rate limiting - allow only 1 OTP per mobile every 2 minutes
    const lastOtpTime = otpStore.get(`${mobile}_time`);
    if (lastOtpTime && (Date.now() - lastOtpTime) < 120000) {
      return res.status(429).json({
        success: false,
        message: 'Please wait 2 minutes before requesting another OTP'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Send SMS
    const smsSent = await sendSMS(mobile, otp);
    
    if (smsSent) {
      // Store OTP with 5-minute expiry
      otpStore.set(mobile, otp);
      otpStore.set(`${mobile}_time`, Date.now());
      
      // Auto-delete after 5 minutes
      setTimeout(() => {
        otpStore.delete(mobile);
        otpStore.delete(`${mobile}_time`);
      }, 300000);

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        data: `OTP sent to ${mobile}`
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.'
      });
    }

  } catch (error) {
    console.error('OTP Send Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
