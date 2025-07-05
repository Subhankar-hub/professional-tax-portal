// Master data for districts
const districts = [
  { districtLgdCode: 269, districtName: 'Dhalai', localCode: 4 },
  { districtLgdCode: 270, districtName: 'North Tripura', localCode: 1 },
  { districtLgdCode: 271, districtName: 'South Tripura', localCode: 3 },
  { districtLgdCode: 272, districtName: 'West Tripura', localCode: 2 },
  { districtLgdCode: 652, districtName: 'Khowai', localCode: 6 },
  { districtLgdCode: 653, districtName: 'Sepahijala', localCode: 7 },
  { districtLgdCode: 654, districtName: 'Gomati', localCode: 8 },
  { districtLgdCode: 655, districtName: 'Unakoti', localCode: 5 }
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
    return res.status(200).json({
      success: true,
      message: 'Districts retrieved successfully',
      data: districts
    });
  } catch (error) {
    console.error('Districts API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
