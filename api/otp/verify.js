// In-memory OTP storage (shared with send.js in production, use Redis or database)
const otpStore = new Map();

// Validate mobile number
function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile);
}

// Validate OTP format
function isValidOTP(otp) {
  return /^\d{6}$/.test(otp);
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
    const { mobile, otp, type = 'mobile' } = req.body;

    // Validate input
    if (!mobile || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and OTP are required'
      });
    }

    if (!isValidMobile(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number format'
      });
    }

    if (!isValidOTP(otp)) {
      return res.status(400).json({
        success: false,
        message: 'OTP must be 6 digits'
      });
    }

    // Get stored OTP
    const storedOTP = otpStore.get(mobile);
    const otpTime = otpStore.get(`${mobile}_time`);

    // Check if OTP exists
    if (!storedOTP) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or expired. Please request a new OTP.'
      });
    }

    // Check if OTP is expired (5 minutes)
    if (otpTime && (Date.now() - otpTime) > 300000) {
      // Clean up expired OTP
      otpStore.delete(mobile);
      otpStore.delete(`${mobile}_time`);
      
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.'
      });
    }

    // Verify OTP
    if (storedOTP === otp) {
      // OTP is correct, clean up
      otpStore.delete(mobile);
      otpStore.delete(`${mobile}_time`);
      
      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        data: 'Verified'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please check and try again.'
      });
    }

  } catch (error) {
    console.error('OTP Verify Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
