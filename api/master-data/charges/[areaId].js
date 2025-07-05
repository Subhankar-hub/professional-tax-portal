// Master data for charges
const charges = [
  { code: 'AMBA', charge: 'Ambassa', areaCode: 'AMB', chargeSn: 1 },
  { code: 'BELO', charge: 'Belonia', areaCode: 'BLN', chargeSn: 2 },
  { code: 'BISH', charge: 'Bishalgarh', areaCode: 'BSL', chargeSn: 3 },
  { code: 'CH01', charge: 'Charge - I', areaCode: 'AGT', chargeSn: 4 },
  { code: 'CH02', charge: 'Charge - II', areaCode: 'AGT', chargeSn: 5 },
  { code: 'CH03', charge: 'Charge - III', areaCode: 'AGT', chargeSn: 6 },
  { code: 'CH04', charge: 'Charge - IV', areaCode: 'AGT', chargeSn: 7 },
  { code: 'CH05', charge: 'Charge - V', areaCode: 'AGT', chargeSn: 8 },
  { code: 'CH06', charge: 'Charge - VI', areaCode: 'AGT', chargeSn: 9 },
  { code: 'CH07', charge: 'Charge - VII', areaCode: 'AGT', chargeSn: 10 },
  { code: 'CH08', charge: 'Charge - VIII', areaCode: 'AGT', chargeSn: 11 },
  { code: 'DHAR', charge: 'Dharmanagar', areaCode: 'DMN', chargeSn: 12 },
  { code: 'KAIL', charge: 'Kailashahar', areaCode: 'KLS', chargeSn: 13 },
  { code: 'TELI', charge: 'Teliamura', areaCode: 'TLM', chargeSn: 14 },
  { code: 'UDAI', charge: 'Udaipur', areaCode: 'UDP', chargeSn: 15 }
];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { areaId } = req.query;
    
    if (!areaId) {
      return res.status(400).json({
        success: false,
        message: 'Area ID is required'
      });
    }
    
    // Filter charges by area code
    const filteredCharges = charges.filter(charge => charge.areaCode === areaId);
    
    return res.status(200).json({
      success: true,
      message: 'Charges retrieved successfully',
      data: filteredCharges
    });
  } catch (error) {
    console.error('Charges API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
