-- Create districts table and insert sample data
CREATE TABLE IF NOT EXISTS districts (
    id BIGSERIAL PRIMARY KEY,
    district_code VARCHAR(10) UNIQUE NOT NULL,
    district_name VARCHAR(100) NOT NULL,
    lgd_code INTEGER,
    state_id INTEGER,
    status BOOLEAN DEFAULT true
);

-- Insert sample districts
INSERT INTO districts (district_code, district_name, lgd_code, state_id, status) 
VALUES 
    ('DIS001', 'Kolkata', 711, 1, true),
    ('DIS002', 'Mumbai', 395, 2, true),
    ('DIS003', 'Delhi', 110, 3, true),
    ('DIS004', 'Chennai', 600, 4, true),
    ('DIS005', 'Bangalore', 560, 5, true),
    ('241', 'Khowai', 241, 1, true)
ON CONFLICT (district_code) DO NOTHING;

-- Create other required tables
CREATE TABLE IF NOT EXISTS temp_applicant_enrolment_details (
    id BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(50) UNIQUE NOT NULL,
    applicant_type VARCHAR(20),
    name VARCHAR(100),
    gender VARCHAR(10),
    father_name VARCHAR(100),
    mobile VARCHAR(15),
    email VARCHAR(100),
    business_name VARCHAR(200),
    address_text VARCHAR(500),
    district_lgd_code INTEGER,
    pincode VARCHAR(10),
    pan VARCHAR(15),
    applying_as_individual BOOLEAN DEFAULT true,
    jurisdiction_code VARCHAR(20),
    charge_code VARCHAR(20),
    ptax_category INTEGER,
    ptax_subcategory INTEGER,
    engaged_with_profession BOOLEAN DEFAULT false,
    engaged_with_trade BOOLEAN DEFAULT false,
    engaged_with_calling BOOLEAN DEFAULT false,
    engaged_with_employment BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temp_applicant_profession_details (
    id BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    profession_type VARCHAR(100),
    annual_income DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temp_applicant_trade_details (
    id BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    trade_type VARCHAR(100),
    annual_turnover DECIMAL(15,2),
    auto_rickshaws INTEGER DEFAULT 0,
    taxis INTEGER DEFAULT 0,
    light_motor_vehicles INTEGER DEFAULT 0,
    good_vehicles INTEGER DEFAULT 0,
    trucks INTEGER DEFAULT 0,
    buses INTEGER DEFAULT 0,
    state_level_society BOOLEAN DEFAULT false,
    district_level_society BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temp_applicant_calling_details (
    id BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    calling_type VARCHAR(100),
    annual_income DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temp_applicant_employment_details (
    id BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    employer_name VARCHAR(200),
    employer_address VARCHAR(500),
    monthly_salary DECIMAL(15,2),
    multiple_employers BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temp_applicant_employment_employers (
    id BIGSERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    employer_name VARCHAR(200),
    employer_address VARCHAR(500),
    monthly_salary DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);