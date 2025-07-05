// Master data for subcategories
const subcategories = [
  { recordRsn: 1, catCode: 1, subcatCode: 1, subcatDescription: 'Practitioners' },
  { recordRsn: 2, catCode: 1, subcatCode: 2, subcatDescription: 'Solicitors' },
  { recordRsn: 3, catCode: 1, subcatCode: 3, subcatDescription: 'Notaries Public' },
  { recordRsn: 4, catCode: 1, subcatCode: 4, subcatDescription: 'Others' },
  { recordRsn: 5, catCode: 2, subcatCode: 1, subcatDescription: 'Dentists' },
  { recordRsn: 6, catCode: 2, subcatCode: 2, subcatDescription: 'Pathologists' },
  { recordRsn: 7, catCode: 2, subcatCode: 3, subcatDescription: 'Cardiologist' },
  { recordRsn: 8, catCode: 2, subcatCode: 4, subcatDescription: 'Dermatologist' },
  { recordRsn: 9, catCode: 2, subcatCode: 5, subcatDescription: 'Endocrinologist' },
  { recordRsn: 10, catCode: 2, subcatCode: 6, subcatDescription: 'Epidemiologist' },
  { recordRsn: 11, catCode: 2, subcatCode: 7, subcatDescription: 'Gynecologist' },
  { recordRsn: 12, catCode: 2, subcatCode: 8, subcatDescription: 'Neurologist' },
  { recordRsn: 13, catCode: 2, subcatCode: 9, subcatDescription: 'Neurosurgeon' },
  { recordRsn: 14, catCode: 2, subcatCode: 10, subcatDescription: 'Obstetrician' },
  { recordRsn: 15, catCode: 2, subcatCode: 11, subcatDescription: 'Orthopedic Surgeon' },
  { recordRsn: 16, catCode: 2, subcatCode: 12, subcatDescription: 'ENT Specialist' },
  { recordRsn: 17, catCode: 2, subcatCode: 13, subcatDescription: 'Pediatrician' },
  { recordRsn: 18, catCode: 2, subcatCode: 14, subcatDescription: 'Physiologist' },
  { recordRsn: 19, catCode: 2, subcatCode: 15, subcatDescription: 'Plastic Surgeon' },
  { recordRsn: 20, catCode: 2, subcatCode: 16, subcatDescription: 'Psychiatrist' },
  { recordRsn: 21, catCode: 2, subcatCode: 17, subcatDescription: 'Radiologist' },
  { recordRsn: 22, catCode: 2, subcatCode: 18, subcatDescription: 'Urologist' },
  { recordRsn: 23, catCode: 2, subcatCode: 19, subcatDescription: 'Surgeon' },
  { recordRsn: 24, catCode: 2, subcatCode: 20, subcatDescription: 'Oncologist' },
  { recordRsn: 25, catCode: 2, subcatCode: 21, subcatDescription: 'Paramedical' },
  { recordRsn: 26, catCode: 2, subcatCode: 22, subcatDescription: 'Others' },
  { recordRsn: 27, catCode: 3, subcatCode: 1, subcatDescription: 'Medical Consultants' },
  { recordRsn: 28, catCode: 3, subcatCode: 2, subcatDescription: 'Management Consultants' },
  { recordRsn: 29, catCode: 3, subcatCode: 3, subcatDescription: 'R.C.C. Consultants' },
  { recordRsn: 30, catCode: 3, subcatCode: 4, subcatDescription: 'Software Consultant' },
  { recordRsn: 31, catCode: 3, subcatCode: 5, subcatDescription: 'Chartered Accountant' },
  { recordRsn: 32, catCode: 3, subcatCode: 6, subcatDescription: 'Cost Accountants' },
  { recordRsn: 33, catCode: 3, subcatCode: 7, subcatDescription: 'Actuaries' },
  { recordRsn: 34, catCode: 3, subcatCode: 8, subcatDescription: 'Market Research Analyst' },
  { recordRsn: 35, catCode: 3, subcatCode: 9, subcatDescription: 'Other Consultants' },
  { recordRsn: 36, catCode: 4, subcatCode: 1, subcatDescription: 'Mechanical Engineer' },
  { recordRsn: 37, catCode: 4, subcatCode: 2, subcatDescription: 'Chemical Engineer' },
  { recordRsn: 38, catCode: 4, subcatCode: 3, subcatDescription: 'Software Engineer' },
  { recordRsn: 39, catCode: 4, subcatCode: 4, subcatDescription: 'Civil Engineer' },
  { recordRsn: 40, catCode: 4, subcatCode: 5, subcatDescription: 'Electrical Engineer' },
  { recordRsn: 41, catCode: 4, subcatCode: 6, subcatDescription: 'Electronics Engineer' },
  { recordRsn: 42, catCode: 4, subcatCode: 7, subcatDescription: 'Telcom Engineer' },
  { recordRsn: 43, catCode: 4, subcatCode: 8, subcatDescription: 'Architects' },
  { recordRsn: 44, catCode: 4, subcatCode: 9, subcatDescription: 'Other Engineers' }
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
    const { categoryId } = req.query;
    
    let filteredSubcategories = subcategories;
    
    // Filter by category ID if provided
    if (categoryId) {
      filteredSubcategories = subcategories.filter(subcat => subcat.catCode === parseInt(categoryId));
    }
    
    return res.status(200).json({
      success: true,
      message: 'Subcategories retrieved successfully',
      data: filteredSubcategories
    });
  } catch (error) {
    console.error('Subcategories API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
