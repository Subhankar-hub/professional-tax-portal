-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS ptax;

-- Set search path to ptax schema
SET search_path TO ptax;

-- Temporary Tables
-- Table 1: ttbl_temp_applicant_enrolment_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_temp_applicant_enrolment_details (
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

-- Table 2: ttbl_temp_applicant_employment_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_temp_applicant_employment_details (
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

-- Table 3: ttbl_temp_applicant_profession_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_temp_applicant_profession_details (
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

-- Table 4: ttbl_temp_applicant_trade_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_temp_applicant_trade_details (
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

-- Table 5: ttbl_temp_applicant_calling_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_temp_applicant_calling_details (
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

-- Main Tables
-- Table 1: mtbl_users_taxpayers
CREATE TABLE IF NOT EXISTS ptax.mtbl_users_taxpayers (
    rsn_mstbl_users BIGSERIAL PRIMARY KEY,
    userid VARCHAR(15),
    username VARCHAR(100),
    mobile CHAR(10),
    email VARCHAR(100),
    area_code VARCHAR(3),
    charge_code VARCHAR(4),
    userpassword VARCHAR(64),
    userroleid INTEGER,
    date_last_sucessfull_login TIMESTAMP,
    date_last_failure_login TIMESTAMP,
    count_failed_login_attempt INTEGER NOT NULL DEFAULT 0,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userid_createdby VARCHAR(15),
    created_from_ipv4 VARCHAR(15),
    date_modification TIMESTAMP,
    userid_modifiedby VARCHAR(15),
    modified_from_ipv4 VARCHAR(15),
    date_deletion TIMESTAMP,
    userid_deletedby VARCHAR(15),
    deleted_from_ipv4 VARCHAR(15),
    date_last_password_change TIMESTAMP,
    remarks VARCHAR(100),
    deletion_remarks VARCHAR(150),
    updated_by VARCHAR(15),
    updated_on TIMESTAMP,
    updated_from_ipv4 VARCHAR(15),
    updation_remarks VARCHAR(150)
);

-- Table 2: ttbl_applicant_enrolment_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_applicant_enrolment_details (
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
    applying_as_individual BOOLEAN
);

-- Table 3: ttbl_applicant_profession_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_applicant_profession_details (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(12),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan CHAR(10),
    annual_gross_business NUMERIC(18,2),
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
    updated_from_ipv4 VARCHAR(15)
);

-- Table 4: ttbl_applicant_trade_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_applicant_trade_details (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan CHAR(10),
    annual_gross_business NUMERIC(18,2),
    annual_turn_over NUMERIC(18,2),
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
    updated_from_ipv4 VARCHAR(15)
);

-- Table 5: ttbl_applicant_calling_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_applicant_calling_details (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan CHAR(10),
    annual_gross_business NUMERIC(18,2),
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
    updated_from_ipv4 VARCHAR(15)
);

-- Table 6: ttbl_applicant_employment_details
CREATE TABLE IF NOT EXISTS ptax.ttbl_applicant_employment_details (
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
    monthly_salary NUMERIC(18,2),
    engaged_with_multiple_employer BOOLEAN,
    employer_name1 VARCHAR(150),
    employer_address1 VARCHAR(150),
    monthly_salary1 NUMERIC(18,2),
    employer_name2 VARCHAR(150),
    employer_address2 VARCHAR(150),
    monthly_salary2 NUMERIC(18,2),
    employer_name3 VARCHAR(150),
    employer_address3 VARCHAR(150),
    monthly_salary3 NUMERIC(18,2),
    inserted_on TIMESTAMP,
    inserted_by VARCHAR(50),
    inserted_from_ipv4 VARCHAR(15),
    updated_on TIMESTAMP,
    updated_by VARCHAR(50),
    updated_from_ipv4 VARCHAR(15)
);

-- Table 7: ttbl_enrolment_application_status
CREATE TABLE IF NOT EXISTS ptax.ttbl_enrolment_application_status (
    rsn BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(12),
    is_viewed BOOLEAN,
    viewed_on TIMESTAMP,
    viewed_by VARCHAR(15),
    viewed_from_ipv4 VARCHAR(15),
    is_forwarded BOOLEAN,
    forwarded_on TIMESTAMP,
    forwarded_to VARCHAR(15),
    forwarded_by VARCHAR(15),
    forwarded_from_ipv4 VARCHAR(15),
    forwarding_remarks VARCHAR(500),
    is_inspected BOOLEAN,
    inspected_on TIMESTAMP,
    inspected_by VARCHAR(15),
    inspected_from_ipv4 VARCHAR(15),
    inspected_remarks VARCHAR(500),
    is_approved BOOLEAN,
    approved_on TIMESTAMP,
    approved_by VARCHAR(15),
    approved_from_ipv4 VARCHAR(15),
    approval_remarks VARCHAR(500),
    is_rejected BOOLEAN,
    rejected_on TIMESTAMP,
    rejected_by VARCHAR(15),
    rejected_from_ipv4 VARCHAR(15),
    rejection_remarks VARCHAR(250)
);

-- Master Tables
-- Master Table 1: mas_district
CREATE TABLE IF NOT EXISTS ptax.mas_district (
    district_lgd_code INTEGER PRIMARY KEY,
    district_name VARCHAR(50) NOT NULL,
    local_code INTEGER
);

-- Master Table 2: mtbl_area
CREATE TABLE IF NOT EXISTS ptax.mtbl_area (
    code CHAR(3) PRIMARY KEY,
    name_en VARCHAR(50),
    name_bn VARCHAR(100)
);

-- Master Table 3: mtbl_charge
CREATE TABLE IF NOT EXISTS ptax.mtbl_charge (
    code VARCHAR(4) PRIMARY KEY,
    charge VARCHAR(255),
    area_code CHAR(3),
    charge_sn INTEGER
);

-- Master Table 4: mtbl_role
CREATE TABLE IF NOT EXISTS ptax.mtbl_role (
    role_id INTEGER PRIMARY KEY,
    designation_code VARCHAR(10),
    role_name VARCHAR(25),
    role_name_ll VARCHAR(50),
    outside_visibility BOOLEAN
);

-- Master Table 5: mtbl_ptax_category
CREATE TABLE IF NOT EXISTS ptax.mtbl_ptax_category (
    cat_rsn BIGSERIAL PRIMARY KEY,
    cat_id INTEGER,
    cat_description VARCHAR(150)
);

-- Master Table 6: mtbl_ptax_category_subcategory
CREATE TABLE IF NOT EXISTS ptax.mtbl_ptax_category_subcategory (
    record_rsn BIGSERIAL PRIMARY KEY,
    cat_code INTEGER,
    cat_description VARCHAR(150),
    subcat_code INTEGER,
    subcat_description VARCHAR(150),
    is_visible INTEGER
);
