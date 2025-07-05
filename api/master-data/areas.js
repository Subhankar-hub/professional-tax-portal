// Master data for areas
const areas = [
  { code: 'AGT', name: 'Agartala', nameEn: 'Agartala' },
  { code: 'BSL', name: 'Bishalgarh', nameEn: 'Bishalgarh' },
  { code: 'UDP', name: 'Udaipur', nameEn: 'Udaipur' },
  { code: 'BLN', name: 'Belonia', nameEn: 'Belonia' },
  { code: 'TLM', name: 'Teliamura', nameEn: 'Teliamura' },
  { code: 'AMB', name: 'Ambassa', nameEn: 'Ambassa' },
  { code: 'KLS', name: 'Kailasahar', nameEn: 'Kailasahar' },
  { code: 'DMN', name: 'Dharmanagar', nameEn: 'Dharmanagar' }
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
    const { districtId } = req.query;
    
    // If district ID is provided, filter areas (for now return all as areas are not district-specific in this data)
    let filteredAreas = areas;
    
    return res.status(200).json({
      success: true,
      message: 'Areas retrieved successfully',
      data: filteredAreas
    });
  } catch (error) {
    console.error('Areas API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
