-- Insert Districts for Tripura
INSERT INTO ptax.mas_district (district_lgd_code, district_name, local_code) VALUES
(269, 'Dhalai', 4),
(270, 'North Tripura', 1),
(271, 'South Tripura', 3),
(272, 'West Tripura', 2),
(652, 'Khowai', 6),
(653, 'Sepahijala', 7),
(654, 'Gomati', 8),
(655, 'Unakoti', 5)
ON CONFLICT (district_lgd_code) DO NOTHING;

-- Insert Areas
INSERT INTO ptax.mtbl_area (code, name_en, name_bn) VALUES
('AGT', 'Agartala', NULL),
('BSL', 'Bishalgarh', NULL),
('UDP', 'Udaipur', NULL),
('BLN', 'Belonia', NULL),
('TLM', 'Teliamura', NULL),
('AMB', 'Ambassa', NULL),
('KLS', 'Kailasahar', NULL),
('DMN', 'Dharmanagar', NULL)
ON CONFLICT (code) DO NOTHING;

-- Insert Charges
INSERT INTO ptax.mtbl_charge (code, charge, area_code, charge_sn) VALUES
('AMBA', 'Ambassa', 'AMB', 1),
('BELO', 'Belonia', 'BLN', 2),
('BISH', 'Bishalgarh', 'BSL', 3),
('CH01', 'Charge - I', 'AGT', 4),
('CH02', 'Charge - II', 'AGT', 5),
('CH03', 'Charge - III', 'AGT', 6),
('CH04', 'Charge - IV', 'AGT', 7),
('CH05', 'Charge - V', 'AGT', 8),
('CH06', 'Charge - VI', 'AGT', 9),
('CH07', 'Charge - VII', 'AGT', 10),
('CH08', 'Charge - VIII', 'AGT', 11),
('DHAR', 'Dharmanagar', 'DMN', 12),
('KAIL', 'Kailashahar', 'KLS', 13),
('TELI', 'Teliamura', 'TLM', 14),
('UDAI', 'Udaipur', 'UDP', 15)
ON CONFLICT (code) DO NOTHING;

-- Insert Roles
INSERT INTO ptax.mtbl_role (role_id, designation_code, role_name, role_name_ll, outside_visibility) VALUES
(1, 'ADMIN', 'Website Administrator', NULL, NULL),
(2, 'COMTAX', 'Commissioner of Taxes', NULL, NULL),
(3, 'SUPTAX', 'Supritendent of Taxes', NULL, NULL),
(4, 'INSTAX', 'Inspector of Taxes', NULL, NULL),
(5, 'SCA', 'Senior Computer Assistant', NULL, NULL),
(6, 'CLERK', 'Clerk', NULL, NULL),
(7, 'ENRLUSER', 'Enroled Tax Payer', NULL, NULL),
(8, 'REGUSER', 'Registered Tax Payer', NULL, NULL)
ON CONFLICT (role_id) DO NOTHING;

-- Insert PTAX Categories
INSERT INTO ptax.mtbl_ptax_category (cat_id, cat_description) VALUES
(1, 'Legal Profession'),
(2, 'Medical Profession'),
(3, 'Consultants'),
(4, 'Engineering Profession'),
(5, 'Technicians'),
(6, 'Agents'),
(7, 'Service Providers'),
(8, 'Contractors or Suppliers (Annual Gross Turnover more than 5 Lakhs)'),
(9, 'Directors'),
(10, 'Employers or Establishment'),
(11, 'Dealer, Person, Tax Payer, Traders (Annual Gross Turnover more than 3 Lakhs)'),
(12, 'Agents and Distributors'),
(13, 'Licenced Vendor'),
(14, 'Owners or Leasees or Licencees or Occupiers'),
(15, 'Societies'),
(16, 'Companies'),
(17, 'Partnership Firms'),
(18, 'Holders of Permits of Transport Vehicle granted under MVI Act. 1939 or 1988 which are issued or adopted to be used for hire or reward for'),
(19, 'Individuals or Institutions'),
(20, 'Persons other than those mentioned in any of the preceding entries.'),
(21, 'Salary & Wage Earner')
ON CONFLICT DO NOTHING;

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
(2, 'Medical Profession', 5, 'Endocrinologist', 1),
(2, 'Medical Profession', 6, 'Epidemiologist', 1),
(2, 'Medical Profession', 7, 'Gynecologist', 1),
(2, 'Medical Profession', 8, 'Neurologist', 1),
(2, 'Medical Profession', 9, 'Neurosurgeon', 1),
(2, 'Medical Profession', 10, 'Obstetrician', 1),
(2, 'Medical Profession', 11, 'Orthopedic Surgeon', 1),
(2, 'Medical Profession', 12, 'ENT Specialist', 1),
(2, 'Medical Profession', 13, 'Pediatrician', 1),
(2, 'Medical Profession', 14, 'Physiologist', 1),
(2, 'Medical Profession', 15, 'Plastic Surgeon', 1),
(2, 'Medical Profession', 16, 'Psychiatrist', 1),
(2, 'Medical Profession', 17, 'Radiologist', 1),
(2, 'Medical Profession', 18, 'Urologist', 1),
(2, 'Medical Profession', 19, 'Surgeon', 1),
(2, 'Medical Profession', 20, 'Oncologist', 1),
(2, 'Medical Profession', 21, 'Paramedical', 1),
(2, 'Medical Profession', 22, 'Others', 1),
-- Consultants
(3, 'Consultants', 1, 'Medical Consultants', 1),
(3, 'Consultants', 2, 'Management Consultants', 1),
(3, 'Consultants', 3, 'R.C.C. Consultants', 1),
(3, 'Consultants', 4, 'Software Consultant', 1),
(3, 'Consultants', 5, 'Chartered Accountant', 1),
(3, 'Consultants', 6, 'Cost Accountants', 1),
(3, 'Consultants', 7, 'Actuaries', 1),
(3, 'Consultants', 8, 'Market Research Analyst', 1),
(3, 'Consultants', 9, 'Other Consultants', 1),
-- Engineering Profession
(4, 'Engineering Profession', 1, 'Mechanical Engineer', 1),
(4, 'Engineering Profession', 2, 'Chemical Engineer', 1),
(4, 'Engineering Profession', 3, 'Software Engineer', 1),
(4, 'Engineering Profession', 4, 'Civil Engineer', 1),
(4, 'Engineering Profession', 5, 'Electrical Engineer', 1),
(4, 'Engineering Profession', 6, 'Electronics Engineer', 1),
(4, 'Engineering Profession', 7, 'Telcom Engineer', 1),
(4, 'Engineering Profession', 8, 'Architects', 1),
(4, 'Engineering Profession', 9, 'Other Engineers', 1)
ON CONFLICT DO NOTHING;
