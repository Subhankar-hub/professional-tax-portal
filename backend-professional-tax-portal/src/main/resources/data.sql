-- Insert Districts for Tripura
INSERT INTO districts (district_code, district_name, lgd_code, state_id, status) VALUES
('DH', 'Dhalai', 269, 1, true),
('NT', 'North Tripura', 270, 1, true),
('ST', 'South Tripura', 271, 1, true),
('WT', 'West Tripura', 272, 1, true),
('KH', 'Khowai', 652, 1, true),
('SP', 'Sepahijala', 653, 1, true),
('GM', 'Gomati', 654, 1, true),
('UN', 'Unakoti', 655, 1, true);

-- Insert Areas for Tripura
INSERT INTO areas (area_code, area_name, district_id, status) VALUES
('AGT', 'Agartala', 4, true),
('BSL', 'Bishalgarh', 6, true),
('UDP', 'Udaipur', 3, true),
('BLN', 'Belonia', 3, true),
('TLM', 'Teliamura', 5, true),
('AMB', 'Ambassa', 1, true),
('KLS', 'Kailasahar', 8, true),
('DMN', 'Dharmanagar', 2, true);

-- Insert Charges
INSERT INTO charges (charge_code, charge_name, area_id, status) VALUES
('AMBA', 'Ambassa', 6, true),
('BELO', 'Belonia', 4, true),
('BISH', 'Bishalgarh', 2, true),
('CH01', 'Charge - I', 1, true),
('CH02', 'Charge - II', 1, true),
('CH03', 'Charge - III', 1, true),
('CH04', 'Charge - IV', 1, true),
('CH05', 'Charge - V', 1, true),
('CH06', 'Charge - VI', 1, true),
('CH07', 'Charge - VII', 1, true),
('CH08', 'Charge - VIII', 1, true),
('DHAR', 'Dharmanagar', 8, true),
('KAIL', 'Kailasahar', 7, true),
('TELI', 'Teliamura', 5, true),
('UDAI', 'Udaipur', 3, true);

-- Insert PTAX Categories
INSERT INTO ptax_categories (cat_id, category_name, category_description, is_active) VALUES
(1, 'Legal Profession', 'Legal Profession', true),
(2, 'Medical Profession', 'Medical Profession', true),
(3, 'Consultants', 'Consultants', true),
(4, 'Engineering Profession', 'Engineering Profession', true),
(5, 'Technicians', 'Technicians', true),
(6, 'Agents', 'Agents', true),
(7, 'Service Providers', 'Service Providers', true),
(8, 'Contractors or Suppliers', 'Contractors or Suppliers (Annual Gross Turnover more than 5 Lakhs)', true),
(9, 'Directors', 'Directors', true),
(10, 'Employers or Establishment', 'Employers or Establishment', true),
(11, 'Dealer, Person, Tax Payer, Traders', 'Dealer, Person, Tax Payer, Traders (Annual Gross Turnover more than 3 Lakhs)', true),
(12, 'Agents and Distributors', 'Agents and Distributors', true),
(13, 'Licenced Vendor', 'Licenced Vendor', true),
(14, 'Owners or Leasees or Licencees or Occupiers', 'Owners or Leasees or Licencees or Occupiers', true),
(15, 'Societies', 'Societies', true),
(16, 'Companies', 'Companies', true),
(17, 'Partnership Firms', 'Partnership Firms', true),
(18, 'Transport Vehicle Holders', 'Holders of Permits of Transport Vehicle granted under MVI Act. 1939 or 1988', true),
(19, 'Individuals or Institutions', 'Individuals or Institutions', true),
(20, 'Others', 'Persons other than those mentioned in any of the preceding entries.', true),
(21, 'Salary & Wage Earner', 'Salary & Wage Earner', true);

-- Insert PTAX Category Subcategories
INSERT INTO ptax_category_subcategories (category_id, subcategory_name, subcategory_description, is_active) VALUES
-- Legal Profession
(1, 'Practitioners', 'Practitioners', true),
(1, 'Solicitors', 'Solicitors', true),
(1, 'Notaries Public', 'Notaries Public', true),
(1, 'Others', 'Others', true),
-- Medical Profession
(2, 'Dentists', 'Dentists', true),
(2, 'Pathologists', 'Pathologists', true),
(2, 'Cardiologist', 'Cardiologist', true),
(2, 'Dermatologist', 'Dermatologist', true),
(2, 'ENT Specialist', 'ENT Specialist', true),
(2, 'Pediatrician', 'Pediatrician', true),
(2, 'Surgeon', 'Surgeon', true),
(2, 'Others', 'Others', true),
-- Consultants
(3, 'Medical Consultants', 'Medical Consultants', true),
(3, 'Management Consultants', 'Management Consultants', true),
(3, 'Software Consultant', 'Software Consultant', true),
(3, 'Chartered Accountant', 'Chartered Accountant', true),
(3, 'Other Consultants', 'Other Consultants', true),
-- Engineering Profession
(4, 'Mechanical Engineer', 'Mechanical Engineer', true),
(4, 'Civil Engineer', 'Civil Engineer', true),
(4, 'Software Engineer', 'Software Engineer', true),
(4, 'Electrical Engineer', 'Electrical Engineer', true),
(4, 'Other Engineers', 'Other Engineers', true);
