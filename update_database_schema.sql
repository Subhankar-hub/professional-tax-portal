-- Professional Tax Portal - Updated Database Schema
-- Schema Name: ptax
-- This script creates the complete database structure as per requirements

-- Create ptax schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS ptax;

-- Drop existing tables in correct order (foreign key dependencies)
DROP TABLE IF EXISTS ptax.ttbl_temp_applicant_calling_details CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_temp_applicant_trade_details CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_temp_applicant_profession_details CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_temp_applicant_employment_details CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_temp_applicant_enrolment_details CASCADE;

DROP TABLE IF EXISTS ptax.ttbl_enrolment_application_status CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_applicant_employment_details CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_applicant_calling_details CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_applicant_trade_details CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_applicant_profession_details CASCADE;
DROP TABLE IF EXISTS ptax.ttbl_applicant_enrolment_details CASCADE;
DROP TABLE IF EXISTS ptax.mtbl_users_taxpayers CASCADE;

DROP TABLE IF EXISTS ptax.mtbl_ptax_category_subcategory CASCADE;
DROP TABLE IF EXISTS ptax.mtbl_ptax_category CASCADE;
DROP TABLE IF EXISTS ptax.mtbl_role CASCADE;
DROP TABLE IF EXISTS ptax.mtbl_charge CASCADE;
DROP TABLE IF EXISTS ptax.mtbl_area CASCADE;
DROP TABLE IF EXISTS ptax.mas_district CASCADE;

-- =============================================================================
-- MASTER TABLES
-- =============================================================================

-- Master Table 1: District Master
CREATE TABLE ptax.mas_district (
    district_lgd_code integer NOT NULL,
    district_name character varying(50) NOT NULL,
    local_code integer,
    CONSTRAINT mas_district_pkey PRIMARY KEY (district_lgd_code)
);

-- Master Table 2: Area Master
CREATE TABLE ptax.mtbl_area (
    code character(3),
    name_en character varying(50),
    name_bn character varying(100)
);

-- Master Table 3: Charge Master
CREATE TABLE ptax.mtbl_charge (
    code character varying(4),
    charge character varying(255),
    area_code character(3),
    charge_sn integer
);

-- Master Table 4: Role Master
CREATE TABLE ptax.mtbl_role (
    role_id integer NOT NULL,
    designation_code character varying(10),
    role_name character varying(25),
    role_name_ll character varying(50),
    outside_visibility boolean,
    CONSTRAINT mtbl_role_pkey PRIMARY KEY (role_id)
);

-- Master Table 5: Professional Tax Category Master
CREATE TABLE ptax.mtbl_ptax_category (
    cat_rsn bigserial,
    cat_id integer,
    cat_description character varying(150),
    CONSTRAINT mtbl_ptax_category_pkey PRIMARY KEY (cat_rsn)
);

-- Master Table 6: Professional Tax Category Subcategory Master
CREATE TABLE ptax.mtbl_ptax_category_subcategory (
    record_rsn bigserial,
    cat_code integer,
    cat_description character varying(150),
    subcat_code integer,
    subcat_description character varying(150),
    is_visible integer,
    CONSTRAINT mtbl_ptax_category_subcategory_pkey PRIMARY KEY (record_rsn)
);

-- =============================================================================
-- TEMPORARY TABLES (For enrollment process)
-- =============================================================================

-- Temporary Table 1: Applicant Enrollment Details
CREATE TABLE ptax.ttbl_temp_applicant_enrolment_details (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    name VARCHAR(100),
    gender CHAR(1),
    father_name VARCHAR(100),
    mobile CHAR(10),
    email VARCHAR(100),
    business_name VARCHAR(200),
    jurisdiction_code VARCHAR(3),
    charge_code VARCHAR(4),
    address_text VARCHAR(100),
    subdisctrict_lgd_code INTEGER,
    district_lgd_code INTEGER,
    pincode CHAR(6),
    ptax_category INTEGER,
    ptax_subcategory INTEGER,
    engaged_with_profession BOOLEAN,
    engaged_with_trade BOOLEAN,
    engaged_with_calling BOOLEAN,
    engaged_with_employement BOOLEAN,
    pan CHAR(10),
    inserted_on TIMESTAMP,
    inserted_by VARCHAR(15),
    inserted_from_ipv4 VARCHAR(15),
    welcome_sms_count INTEGER,
    welcome_email_count INTEGER,
    establishment1_name VARCHAR(100),
    establishment1_address VARCHAR(100),
    establishment2_name VARCHAR(100),
    establishment2_address VARCHAR(100),
    establishment3_name VARCHAR(100),
    establishment3_address VARCHAR(100),
    establishment4_name VARCHAR(100),
    establishment4_address VARCHAR(100),
    establishment5_name VARCHAR(100),
    establishment5_address VARCHAR(100),
    applying_as_individual BOOLEAN,
    status BOOLEAN,
    doc_content BYTEA,
    doc_content_trade BYTEA,
    doc_content_death BYTEA,
    doc_type CHAR(1),
    cancellation_explanation VARCHAR(500)
);

-- Temporary Table 2: Employment Details
CREATE TABLE ptax.ttbl_temp_applicant_employment_details (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan CHAR(10),
    vat_number VARCHAR(11),
    cst_number VARCHAR(11),
    gst_number VARCHAR(15),
    employer_name VARCHAR(150),
    employer_address VARCHAR(150),
    monthly_salary NUMERIC(18, 2),
    engaged_with_multiple_employer BOOLEAN,
    employer_name1 VARCHAR(150),
    employer_address1 VARCHAR(150),
    monthly_salary1 NUMERIC(18, 2),
    employer_name2 VARCHAR(150),
    employer_address2 VARCHAR(150),
    monthly_salary2 NUMERIC(18, 2),
    employer_name3 VARCHAR(150),
    employer_address3 VARCHAR(150),
    monthly_salary3 NUMERIC(18, 2),
    inserted_on TIMESTAMP,
    inserted_by VARCHAR(50),
    inserted_from_ipv4 VARCHAR(15),
    updated_on TIMESTAMP,
    updated_by VARCHAR(50),
    updated_from_ipv4 VARCHAR(15),
    status BOOLEAN
);

-- Temporary Table 3: Profession Details
CREATE TABLE ptax.ttbl_temp_applicant_profession_details (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(12),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan CHAR(10),
    annual_gross_business NUMERIC(18, 2),
    avg_workers_monthly INTEGER,
    avg_employees_monthly INTEGER,
    vat_number VARCHAR(11),
    cst_number VARCHAR(11),
    gst_number VARCHAR(15),
    taxi_count INTEGER,
    three_wheeler_count INTEGER,
    lmv_count INTEGER,
    good_vehicle_count INTEGER,
    truck_count INTEGER,
    bus_count INTEGER,
    engaged_with_state_society BOOLEAN,
    engaged_with_district_society BOOLEAN,
    inserted_on TIMESTAMP,
    inserted_by VARCHAR(50),
    inserted_from_ipv4 VARCHAR(15),
    updated_on TIMESTAMP,
    updated_by VARCHAR(50),
    updated_from_ipv4 VARCHAR(15),
    status BOOLEAN
);

-- Temporary Table 4: Trade Details
CREATE TABLE ptax.ttbl_temp_applicant_trade_details (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan CHAR(10),
    annual_gross_business NUMERIC(18, 2),
    annual_turn_over NUMERIC(18, 2),
    avg_workers_monthly INTEGER,
    avg_employees_monthly INTEGER,
    vat_number VARCHAR(11),
    cst_number VARCHAR(11),
    gst_number VARCHAR(15),
    taxi_count INTEGER,
    three_wheeler_count INTEGER,
    lmv_count INTEGER,
    good_vehicle_count INTEGER,
    truck_count INTEGER,
    bus_count INTEGER,
    engaged_with_state_society BOOLEAN,
    engaged_with_district_society BOOLEAN,
    inserted_on TIMESTAMP,
    inserted_by VARCHAR(50),
    inserted_from_ipv4 VARCHAR(15),
    updated_on TIMESTAMP,
    updated_by VARCHAR(50),
    updated_from_ipv4 VARCHAR(15),
    status BOOLEAN
);

-- Temporary Table 5: Calling Details
CREATE TABLE ptax.ttbl_temp_applicant_calling_details (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan CHAR(10),
    annual_gross_business NUMERIC(18, 2),
    avg_workers_monthly INTEGER,
    avg_employees_monthly INTEGER,
    vat_number VARCHAR(11),
    cst_number VARCHAR(11),
    gst_number VARCHAR(15),
    engaged_with_state_society BOOLEAN,
    engaged_with_district_society BOOLEAN,
    inserted_on TIMESTAMP,
    inserted_by VARCHAR(50),
    inserted_from_ipv4 VARCHAR(15),
    updated_on TIMESTAMP,
    updated_by VARCHAR(50),
    updated_from_ipv4 VARCHAR(15),
    status BOOLEAN
);

-- =============================================================================
-- MAIN TABLES (Final enrollment data)
-- =============================================================================

-- Main Table 1: Taxpayer Users
CREATE TABLE ptax.mtbl_users_taxpayers (
    rsn_mstbl_users bigserial,
    userid character varying(15),
    username character varying(100),
    mobile character(10),
    email character varying(100),
    area_code character varying(3),
    charge_code character varying(4),
    userpassword character varying(64),
    userroleid integer,
    date_last_sucessfull_login timestamp without time zone,
    date_last_failure_login timestamp without time zone,
    count_failed_login_attempt integer NOT NULL,
    is_locked boolean NOT NULL,
    is_deleted boolean NOT NULL,
    date_creation timestamp without time zone NOT NULL,
    userid_createdby character varying(15),
    created_from_ipv4 character varying(15),
    date_modification timestamp without time zone,
    userid_modifiedby character varying(15),
    modified_from_ipv4 character varying(15),
    date_deletion timestamp without time zone,
    userid_deletedby character varying(15),
    deleted_from_ipv4 character varying(15),
    date_last_password_change timestamp without time zone,
    remarks character varying(100),
    deletion_remarks character varying(150),
    updated_by character varying(15),
    updated_on timestamp without time zone,
    updated_from_ipv4 character varying(15),
    updation_remarks character varying(150),
    CONSTRAINT mtbl_users_taxpayers_pkey PRIMARY KEY (rsn_mstbl_users)
);

-- Main Table 2: Applicant Enrollment Details (Final)
CREATE TABLE ptax.ttbl_applicant_enrolment_details (
    rsn bigserial,
    application_id character varying(15),
    ptan character varying(10),
    name character varying(100),
    gender character(1),
    father_name character varying(100),
    mobile character(10),
    email character varying(100),
    business_name character varying(200),
    jurisdiction_code character varying(3),
    charge_code character varying(4),
    address_text character varying(100),
    subdisctrict_lgd_code integer,
    district_lgd_code integer,
    pincode character(6),
    ptax_category integer,
    ptax_subcategory integer,
    engaged_with_profession boolean,
    engaged_with_trade boolean,
    engaged_with_calling boolean,
    engaged_with_employement boolean,
    pan character(10),
    inserted_on timestamp without time zone,
    inserted_by character varying(15),
    inserted_from_ipv4 character varying(15),
    welcome_sms_count integer,
    welcome_email_count integer,
    establishment1_name character varying(100),
    establishment1_address character varying(100),
    establishment2_name character varying(100),
    establishment2_address character varying(100),
    establishment3_name character varying(100),
    establishment3_address character varying(100),
    establishment4_name character varying(100),
    establishment4_address character varying(100),
    establishment5_name character varying(100),
    establishment5_address character varying(100),
    applying_as_individual boolean,
    CONSTRAINT ttbl_applicant_enrolment_details_pkey PRIMARY KEY (rsn)
);

-- Main Table 3: Profession Details (Final)
CREATE TABLE ptax.ttbl_applicant_profession_details (
    rsn bigserial,
    application_id character varying(15),
    ptan character varying(12),
    commencement_date date,
    period_of_standing character varying(50),
    pan character(10),
    annual_gross_business numeric(18,2),
    avg_workers_monthly integer,
    avg_employees_monthly integer,
    vat_number character varying(11),
    cst_number character varying(11),
    gst_number character varying(15),
    taxi_count integer,
    three_wheeler_count integer,
    lmv_count integer,
    good_vehicle_count integer,
    truck_count integer,
    bus_count integer,
    engaged_with_state_society boolean,
    engaged_with_district_society boolean,
    inserted_on timestamp without time zone,
    inserted_by character varying(50),
    inserted_from_ipv4 character varying(15),
    updated_on timestamp without time zone,
    updated_by character varying(50),
    updated_from_ipv4 character varying(15),
    CONSTRAINT ttbl_applicant_profession_details_pkey PRIMARY KEY (rsn)
);

-- Main Table 4: Trade Details (Final)
CREATE TABLE ptax.ttbl_applicant_trade_details (
    rsn bigserial,
    application_id character varying(15),
    ptan character varying(10),
    commencement_date date,
    period_of_standing character varying(50),
    pan character(10),
    annual_gross_business numeric(18,2),
    annual_turn_over numeric(18,2),
    avg_workers_monthly integer,
    avg_employees_monthly integer,
    vat_number character varying(11),
    cst_number character varying(11),
    gst_number character varying(15),
    taxi_count integer,
    three_wheeler_count integer,
    lmv_count integer,
    good_vehicle_count integer,
    truck_count integer,
    bus_count integer,
    engaged_with_state_society boolean,
    engaged_with_district_society boolean,
    inserted_on timestamp without time zone,
    inserted_by character varying(50),
    inserted_from_ipv4 character varying(15),
    updated_on timestamp without time zone,
    updated_by character varying(50),
    updated_from_ipv4 character varying(15),
    CONSTRAINT ttbl_applicant_trade_details_pkey PRIMARY KEY (rsn)
);

-- Main Table 5: Calling Details (Final)
CREATE TABLE ptax.ttbl_applicant_calling_details (
    rsn bigserial,
    application_id character varying(15),
    ptan character varying(10),
    commencement_date date,
    period_of_standing character varying(50),
    pan character(10),
    annual_gross_business numeric(18,2),
    avg_workers_monthly integer,
    avg_employees_monthly integer,
    vat_number character varying(11),
    cst_number character varying(11),
    gst_number character varying(15),
    engaged_with_state_society boolean,
    engaged_with_district_society boolean,
    inserted_on timestamp without time zone,
    inserted_by character varying(50),
    inserted_from_ipv4 character varying(15),
    updated_on timestamp without time zone,
    updated_by character varying(50),
    updated_from_ipv4 character varying(15),
    CONSTRAINT ttbl_applicant_calling_details_pkey PRIMARY KEY (rsn)
);

-- Main Table 6: Employment Details (Final)
CREATE TABLE ptax.ttbl_applicant_employment_details (
    rsn bigserial,
    application_id character varying(15),
    ptan character varying(10),
    commencement_date date,
    period_of_standing character varying(50),
    pan character(10),
    vat_number character varying(11),
    cst_number character varying(11),
    gst_number character varying(15),
    employer_name character varying(150),
    employer_address character varying(150),
    monthly_salary numeric(18,2),
    engaged_with_multiple_employer boolean,
    employer_name1 character varying(150),
    employer_address1 character varying(150),
    monthly_salary1 numeric(18,2),
    employer_name2 character varying(150),
    employer_address2 character varying(150),
    monthly_salary2 numeric(18,2),
    employer_name3 character varying(150),
    employer_address3 character varying(150),
    monthly_salary3 numeric(18,2),
    inserted_on timestamp without time zone,
    inserted_by character varying(50),
    inserted_from_ipv4 character varying(15),
    updated_on timestamp without time zone,
    updated_by character varying(50),
    updated_from_ipv4 character varying(15),
    CONSTRAINT ttbl_applicant_employment_details_pkey PRIMARY KEY (rsn)
);

-- Main Table 7: Enrollment Application Status
CREATE TABLE ptax.ttbl_enrolment_application_status (
    rsn bigserial,
    application_id character varying(15),
    ptan character varying(12),
    is_viewed boolean,
    viewed_on timestamp without time zone,
    viewed_by character varying(15),
    viewed_from_ipv4 character varying(15),
    is_forwarded boolean,
    forwarded_on timestamp without time zone,
    forwarded_to character varying(15),
    forwarded_by character varying(15),
    forwarded_from_ipv4 character varying(15),
    forwarding_remarks character varying(500),
    is_inspected boolean,
    inspected_on timestamp without time zone,
    inspected_by character varying(15),
    inspected_from_ipv4 character varying(15),
    inspected_remarks character varying(500),
    is_approved boolean,
    approved_on timestamp without time zone,
    approved_by character varying(15),
    approved_from_ipv4 character varying(15),
    approval_remarks character varying(500),
    is_rejected boolean,
    rejected_on timestamp without time zone,
    rejected_by character varying(15),
    rejected_from_ipv4 character varying(15),
    rejection_remarks character varying(250),
    CONSTRAINT ttbl_enrolment_application_status_pkey PRIMARY KEY (rsn)
);

-- =============================================================================
-- INSERT MASTER DATA
-- =============================================================================

-- Insert District Data
INSERT INTO ptax.mas_district (district_lgd_code, district_name, local_code) VALUES
(269, 'Dhalai', 4),
(270, 'North Tripura', 1),
(271, 'South Tripura', 3),
(272, 'West Tripura', 2),
(652, 'Khowai', 6),
(653, 'Sepahijala', 7),
(654, 'Gomati', 8),
(655, 'Unakoti', 5);

-- Insert Area Data
INSERT INTO ptax.mtbl_area (code, name_en, name_bn) VALUES
('AGT', 'Agartala', NULL),
('BSL', 'Bishalgarh', NULL),
('UDP', 'Udaipur', NULL),
('BLN', 'Belonia', NULL),
('TLM', 'Teliamura', NULL),
('AMB', 'Ambassa', NULL),
('KLS', 'Kailasahar', NULL),
('DMN', 'Dharmanagar', NULL);

-- Insert Charge Data
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
('UDAI', 'Udaipur', 'UDP', 15);

-- Insert Role Data
INSERT INTO ptax.mtbl_role (role_id, designation_code, role_name, role_name_ll, outside_visibility) VALUES
(1, 'ADMIN', 'Website Administrator', NULL, NULL),
(2, 'COMTAX', 'Commissioner of Taxes', NULL, NULL),
(3, 'SUPTAX', 'Supritendent of Taxes', NULL, NULL),
(4, 'INSTAX', 'Inspector of Taxes', NULL, NULL),
(5, 'SCA', 'Senior Computer Assistant', NULL, NULL),
(6, 'CLERK', 'Clerk', NULL, NULL),
(7, 'ENRLUSER', 'Enroled Tax Payer', NULL, NULL),
(8, 'REGUSER', 'Registered Tax Payer', NULL, NULL);

-- Insert Professional Tax Category Data
INSERT INTO ptax.mtbl_ptax_category (cat_rsn, cat_id, cat_description) VALUES
(1, 1, 'Legal Profession'),
(2, 2, 'Medical Profession'),
(3, 3, 'Consultants'),
(4, 4, 'Engineering Profession'),
(5, 5, 'Technicians'),
(6, 6, 'Agents'),
(7, 7, 'Service Providers'),
(8, 8, 'Contractors or Suppliers (Annual Gross Turnover more than 5 Lakhs)'),
(9, 9, 'Directors'),
(10, 10, 'Employers or Establishment'),
(11, 11, 'Dealer, Person, Tax Payer, Traders (Annual Gross Turnover more than 3 Lakhs)'),
(12, 12, 'Agents and Distributors'),
(13, 13, 'Licenced Vendor'),
(14, 14, 'Owners or Leasees or Licencees or Occupiers'),
(15, 15, 'Societies'),
(16, 16, 'Companies'),
(17, 17, 'Partnership Firms'),
(18, 18, 'Holders of Permits of Transport Vehicle granted under MVI Act. 1939 or 1988 which are issued or adopted to be used for hire or reward for'),
(19, 19, 'Individuals or Institutions'),
(20, 20, 'Persons other than those mentioned in any of the preceding entries.'),
(21, 21, 'Salary & Wage Earner');

-- Insert Professional Tax Category Subcategory Data
INSERT INTO ptax.mtbl_ptax_category_subcategory (
    record_rsn, cat_code, cat_description, subcat_code, subcat_description, is_visible
) VALUES
(1, 1, 'Legal Profession', 1, 'Practitioners', 1),
(2, 1, 'Legal Profession', 2, 'Solicitors', 1),
(3, 1, 'Legal Profession', 3, 'Notaries Public', 1),
(4, 1, 'Legal Profession', 4, 'Others', 1),
(5, 2, 'Medical Profession', 1, 'Dentists', 1),
(6, 2, 'Medical Profession', 2, 'Pathologists', 1),
(7, 2, 'Medical Profession', 3, 'Cardiologist', 1),
(8, 2, 'Medical Profession', 4, 'Dermatologist', 1),
(9, 2, 'Medical Profession', 5, 'Endocrinologist', 1),
(10, 2, 'Medical Profession', 6, 'Epidemiologist', 1),
(11, 2, 'Medical Profession', 7, 'Gynecologist', 1),
(12, 2, 'Medical Profession', 8, 'Neurologist', 1),
(13, 2, 'Medical Profession', 9, 'Neurosurgeon', 1),
(14, 2, 'Medical Profession', 10, 'Obstetrician', 1),
(15, 2, 'Medical Profession', 11, 'Orthopedic Surgeon', 1),
(16, 2, 'Medical Profession', 12, 'ENT Specialist', 1),
(17, 2, 'Medical Profession', 13, 'Pediatrician', 1),
(18, 2, 'Medical Profession', 14, 'Physiologist', 1),
(19, 2, 'Medical Profession', 15, 'Plastic Surgeon', 1),
(20, 2, 'Medical Profession', 16, 'Psychiatrist', 1),
(21, 2, 'Medical Profession', 17, 'Radiologist', 1),
(22, 2, 'Medical Profession', 18, 'Urologist', 1),
(23, 2, 'Medical Profession', 19, 'Surgeon', 1),
(24, 2, 'Medical Profession', 20, 'Oncologist', 1),
(25, 2, 'Medical Profession', 21, 'Paramedical', 1),
(26, 2, 'Medical Profession', 22, 'Others', 1),
(27, 3, 'Consultants', 1, 'Medical Consultants', 1),
(28, 3, 'Consultants', 2, 'Management Consultants', 1),
(29, 3, 'Consultants', 3, 'R.C.C. Consultants', 1),
(30, 3, 'Consultants', 4, 'Software Consultant', 1),
(31, 3, 'Consultants', 5, 'Chartered Accountant', 1),
(32, 3, 'Consultants', 6, 'Cost Accountants', 1),
(33, 3, 'Consultants', 7, 'Actuaries', 1),
(34, 3, 'Consultants', 8, 'Market Research Analyst', 1),
(35, 3, 'Consultants', 9, 'Other Consultants', 1),
(36, 4, 'Engineering Profession', 1, 'Mechanical Engineer', 1),
(37, 4, 'Engineering Profession', 2, 'Chemical Engineer', 1),
(38, 4, 'Engineering Profession', 3, 'Software Engineer', 1),
(39, 4, 'Engineering Profession', 4, 'Civil Engineer', 1),
(40, 4, 'Engineering Profession', 5, 'Electrical Engineer', 1),
(41, 4, 'Engineering Profession', 6, 'Electronics Engineer', 1),
(42, 4, 'Engineering Profession', 7, 'Telcom Engineer', 1),
(43, 4, 'Engineering Profession', 8, 'Architects', 1),
(44, 4, 'Engineering Profession', 9, 'Other Engineers', 1);

-- Grant permissions to ptax_user
GRANT ALL PRIVILEGES ON SCHEMA ptax TO ptax_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ptax TO ptax_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA ptax TO ptax_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA ptax GRANT ALL ON TABLES TO ptax_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA ptax GRANT ALL ON SEQUENCES TO ptax_user;

-- Verification queries
SELECT 'Schema created successfully' as status;
SELECT count(*) as district_count FROM ptax.mas_district;
SELECT count(*) as category_count FROM ptax.mtbl_ptax_category;
SELECT count(*) as subcategory_count FROM ptax.mtbl_ptax_category_subcategory;
