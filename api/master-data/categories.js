// Master data for categories
const categories = [
  { catRsn: 1, catId: 1, catDescription: 'Legal Profession' },
  { catRsn: 2, catId: 2, catDescription: 'Medical Profession' },
  { catRsn: 3, catId: 3, catDescription: 'Consultants' },
  { catRsn: 4, catId: 4, catDescription: 'Engineering Profession' },
  { catRsn: 5, catId: 5, catDescription: 'Technicians' },
  { catRsn: 6, catId: 6, catDescription: 'Agents' },
  { catRsn: 7, catId: 7, catDescription: 'Service Providers' },
  { catRsn: 8, catId: 8, catDescription: 'Contractors or Suppliers (Annual Gross Turnover more than 5 Lakhs)' },
  { catRsn: 9, catId: 9, catDescription: 'Directors' },
  { catRsn: 10, catId: 10, catDescription: 'Employers or Establishment' },
  { catRsn: 11, catId: 11, catDescription: 'Dealer, Person, Tax Payer, Traders (Annual Gross Turnover more than 3 Lakhs)' },
  { catRsn: 12, catId: 12, catDescription: 'Agents and Distributors' },
  { catRsn: 13, catId: 13, catDescription: 'Licenced Vendor' },
  { catRsn: 14, catId: 14, catDescription: 'Owners or Leasees or Licencees or Occupiers' },
  { catRsn: 15, catId: 15, catDescription: 'Societies' },
  { catRsn: 16, catId: 16, catDescription: 'Companies' },
  { catRsn: 17, catId: 17, catDescription: 'Partnership Firms' },
  { catRsn: 18, catId: 18, catDescription: 'Holders of Permits of Transport Vehicle granted under MVI Act. 1939 or 1988 which are issued or adopted to be used for hire or reward for' },
  { catRsn: 19, catId: 19, catDescription: 'Individuals or Institutions' },
  { catRsn: 20, catId: 20, catDescription: 'Persons other than those mentioned in any of the preceding entries.' },
  { catRsn: 21, catId: 21, catDescription: 'Salary & Wage Earner' }
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
      message: 'Categories retrieved successfully',
      data: categories
    });
  } catch (error) {
    console.error('Categories API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
