-- Insert Districts for Tripura
INSERT INTO ptax.mas_district (district_lgd_code, district_name, local_code) VALUES
(269, 'Dhalai', 4),
(270, 'North Tripura', 1),
(271, 'South Tripura', 3),
(272, 'West Tripura', 2),
(652, 'Khowai', 6),
(653, 'Sepahijala', 7),
(654, 'Gomati', 8),
(655, 'Unakoti', 5);

-- Insert PTAX Categories
INSERT INTO ptax.mtbl_ptax_category (cat_id, cat_description) VALUES
(1, 'Legal Profession'),
(2, 'Medical Profession'),
(3, 'Consultants'),
(4, 'Engineering Profession'),
(5, 'Technicians'),
(6, 'Agents'),
(7, 'Service Providers'),
(8, 'Contractors or Suppliers'),
(9, 'Directors'),
(10, 'Employers or Establishment'),
(11, 'Dealer, Person, Tax Payer, Traders'),
(12, 'Agents and Distributors'),
(13, 'Licenced Vendor'),
(14, 'Owners or Leasees or Licencees or Occupiers'),
(15, 'Societies'),
(16, 'Companies'),
(17, 'Partnership Firms'),
(18, 'Transport Vehicle Holders'),
(19, 'Individuals or Institutions'),
(20, 'Others'),
(21, 'Salary & Wage Earner');

-- Insert PTAX Category Subcategories
INSERT INTO ptax.mtbl_ptax_category_subcategory (cat_code, cat_description, subcat_code, subcat_description, is_visible) VALUES
-- Legal Profession
(1, 'Legal Profession', 1, 'Practitioners', 1),
(1, 'Legal Profession', 2, 'Solicitors', 1),
(1, 'Legal Profession', 3, 'Notaries Public', 1),
(1, 'Legal Profession', 4, 'Others', 1),
-- Medical Profession
(2, 'Medical Profession', 1, 'Dentists', 1),
(2, 'Medical Profession', 2, 'Pathologists', 1),
(2, 'Medical Profession', 3, 'Cardiologist', 1),
(2, 'Medical Profession', 4, 'Dermatologist', 1),
(2, 'Medical Profession', 5, 'ENT Specialist', 1),
(2, 'Medical Profession', 6, 'Pediatrician', 1),
(2, 'Medical Profession', 7, 'Surgeon', 1),
(2, 'Medical Profession', 8, 'Others', 1),
-- Consultants
(3, 'Consultants', 1, 'Medical Consultants', 1),
(3, 'Consultants', 2, 'Management Consultants', 1),
(3, 'Consultants', 3, 'Software Consultant', 1),
(3, 'Consultants', 4, 'Chartered Accountant', 1),
(3, 'Consultants', 5, 'Other Consultants', 1),
-- Engineering Profession
(4, 'Engineering Profession', 1, 'Mechanical Engineer', 1),
(4, 'Engineering Profession', 2, 'Civil Engineer', 1),
(4, 'Engineering Profession', 3, 'Software Engineer', 1),
(4, 'Engineering Profession', 4, 'Electrical Engineer', 1),
(4, 'Engineering Profession', 5, 'Other Engineers', 1);
