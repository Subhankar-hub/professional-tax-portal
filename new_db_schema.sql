-- Schema for Professional Tax Database

-- Main Table: Enrolment Details
CREATE TABLE ptax.ttbl_temp_applicant_enrolment_details (
    rsn bigserial PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    name VARCHAR(100),
    gender CHAR(1),
    father_name VARCHAR(100),
    mobile VARCHAR(10),
    email VARCHAR(100),
    business_name VARCHAR(200),
    jurisdiction_code VARCHAR(3),
    charge_code VARCHAR(4),
    address_text VARCHAR(100),
    subdistrict_lgd_code INTEGER,
    district_lgd_code INTEGER,
    pincode VARCHAR(6),
    ptax_category INTEGER,
    ptax_subcategory INTEGER,
    engaged_with_profession BOOLEAN,
    engaged_with_trade BOOLEAN,
    engaged_with_calling BOOLEAN,
    engaged_with_employement BOOLEAN,
    pan VARCHAR(10),
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
    status BOOLEAN
);

-- Table: Profession Details
CREATE TABLE ptax.ttbl_temp_applicant_profession_details (
    rsn bigserial PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(12),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan VARCHAR(10),
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
    updated_from_ipv4 VARCHAR(15),
    status BOOLEAN
);

-- Table: Trade Details
CREATE TABLE ptax.ttbl_temp_applicant_trade_details (
    rsn bigserial PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan VARCHAR(10),
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
    updated_from_ipv4 VARCHAR(15),
    status BOOLEAN
);

-- Table: Calling Details
CREATE TABLE ptax.ttbl_temp_applicant_calling_details (
    rsn bigserial PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan VARCHAR(10),
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
    updated_from_ipv4 VARCHAR(15),
    status BOOLEAN
);

-- Table: Employment Details
CREATE TABLE ptax.ttbl_temp_applicant_employment_details (
    rsn bigserial PRIMARY KEY,
    application_id VARCHAR(15),
    ptan VARCHAR(10),
    commencement_date DATE,
    period_of_standing VARCHAR(50),
    pan VARCHAR(10),
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
    updated_from_ipv4 VARCHAR(15),
    status BOOLEAN
);

-- Master Table: District
CREATE TABLE ptax.mas_district (
    district_lgd_code INTEGER PRIMARY KEY,
    district_name VARCHAR(50) NOT NULL,
    local_code INTEGER
);

-- Master Table: PTax Category
CREATE TABLE ptax.mtbl_ptax_category (
    cat_rsn bigserial PRIMARY KEY,
    cat_id INTEGER,
    cat_description VARCHAR(150)
);

-- Master Table: PTax Subcategory
CREATE TABLE ptax.mtbl_ptax_category_subcategory (
    record_rsn bigserial PRIMARY KEY,
    cat_code INTEGER,
    cat_description VARCHAR(150),
    subcat_code INTEGER,
    subcat_description VARCHAR(150),
    is_visible INTEGER
);

-- Grant all privileges on the schema to the ptax user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ptax TO ptax;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA ptax TO ptax;

