import { 
  users, 
  enrollments, 
  districts,
  areas,
  charges,
  categories,
  subcategories,
  otpVerifications,
  type User, 
  type InsertUser,
  type Enrollment,
  type InsertEnrollment,
  type District,
  type Area,
  type Charge,
  type Category,
  type Subcategory,
  type OtpVerification
} from "@shared/schema";

// Generic interface for API responses
export interface MasterDataItem {
  id: number;
  code: string;
  name: string;
  parentCode?: string;
  isActive?: boolean;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Enrollment methods
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getEnrollmentByApplicationId(applicationId: string): Promise<Enrollment | undefined>;
  updateEnrollment(id: number, enrollment: Partial<InsertEnrollment>): Promise<Enrollment>;
  
  // Master data methods - updated for your PostgreSQL schema
  getDistricts(): Promise<MasterDataItem[]>;
  getAreasByDistrict(districtCode: string): Promise<MasterDataItem[]>;
  getChargesByArea(areaCode: string): Promise<MasterDataItem[]>;
  getCategories(): Promise<MasterDataItem[]>;
  getSubcategoriesByCategory(categoryId: number): Promise<MasterDataItem[]>;
  getPeriodOfStandingOptions(): Promise<MasterDataItem[]>;
  
  // OTP methods
  createOtpVerification(otp: Omit<OtpVerification, 'id' | 'createdAt'>): Promise<OtpVerification>;
  getOtpVerification(mobileNumber: string, otp: string, type: string): Promise<OtpVerification | undefined>;
  markOtpAsUsed(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private enrollments: Map<number, Enrollment>;
  private districts: Map<number, District>;
  private areas: Map<string, Area>;
  private charges: Map<string, Charge>;
  private categories: Map<number, Category>;
  private subcategories: Map<number, Subcategory>;
  private otpVerifications: Map<number, OtpVerification>;
  private currentUserId: number;
  private currentEnrollmentId: number;
  private currentOtpId: number;

  constructor() {
    this.users = new Map();
    this.enrollments = new Map();
    this.districts = new Map();
    this.areas = new Map();
    this.charges = new Map();
    this.categories = new Map();
    this.subcategories = new Map();
    this.otpVerifications = new Map();
    this.currentUserId = 1;
    this.currentEnrollmentId = 1;
    this.currentOtpId = 1;
    
    // Initialize master data from your PostgreSQL schema
    this.initializeMasterData();
  }

  private initializeMasterData() {
    // Initialize districts from your PostgreSQL schema
    const districtData = [
      { districtLgdCode: 269, districtName: 'Dhalai', localCode: 4 },
      { districtLgdCode: 270, districtName: 'North Tripura', localCode: 1 },
      { districtLgdCode: 271, districtName: 'South Tripura', localCode: 3 },
      { districtLgdCode: 272, districtName: 'West Tripura', localCode: 2 },
      { districtLgdCode: 652, districtName: 'Khowai', localCode: 6 },
      { districtLgdCode: 653, districtName: 'Sepahijala', localCode: 7 },
      { districtLgdCode: 654, districtName: 'Gomati', localCode: 8 },
      { districtLgdCode: 655, districtName: 'Unakoti', localCode: 5 },
    ];
    
    districtData.forEach(item => {
      this.districts.set(item.districtLgdCode, item);
    });
    
    // Initialize areas from your PostgreSQL schema
    const areaData = [
      { code: 'AGT', nameEn: 'Agartala', nameBn: null },
      { code: 'BSL', nameEn: 'Bishalgarh', nameBn: null },
      { code: 'UDP', nameEn: 'Udaipur', nameBn: null },
      { code: 'BLN', nameEn: 'Belonia', nameBn: null },
      { code: 'TLM', nameEn: 'Teliamura', nameBn: null },
      { code: 'AMB', nameEn: 'Ambassa', nameBn: null },
      { code: 'KLS', nameEn: 'Kailasahar', nameBn: null },
      { code: 'DMN', nameEn: 'Dharmanagar', nameBn: null },
    ];
    
    areaData.forEach(item => {
      this.areas.set(item.code, item);
    });
    
    // Initialize charges from your PostgreSQL schema
    const chargeData = [
      { code: 'AMBA', charge: 'Ambassa', areaCode: 'AMB', chargeSn: 1 },
      { code: 'BELO', charge: 'Belonia', areaCode: 'BLN', chargeSn: 2 },
      { code: 'BISH', charge: 'Bishalgarh', areaCode: 'BSL', chargeSn: 3 },
      { code: 'CH01', charge: 'Charge - I', areaCode: 'AGT', chargeSn: 4 },
      { code: 'CH02', charge: 'Charge - II', areaCode: 'AGT', chargeSn: 5 },
      { code: 'CH03', charge: 'Charge - III', areaCode: 'AGT', chargeSn: 6 },
      { code: 'CH04', charge: 'Charge - IV', areaCode: 'AGT', chargeSn: 7 },
      { code: 'CH05', charge: 'Charge - V', areaCode: 'AGT', chargeSn: 8 },
      { code: 'CH06', charge: 'Charge - VI', areaCode: 'AGT', chargeSn: 9 },
      { code: 'CH07', charge: 'Charge - VII', areaCode: 'AGT', chargeSn: 10 },
      { code: 'CH08', charge: 'Charge - VIII', areaCode: 'AGT', chargeSn: 11 },
      { code: 'DHAR', charge: 'Dharmanagar', areaCode: 'DMN', chargeSn: 12 },
      { code: 'KAIL', charge: 'Kailashahar', areaCode: 'KLS', chargeSn: 13 },
      { code: 'TELI', charge: 'Teliamura', areaCode: 'TLM', chargeSn: 14 },
      { code: 'UDAI', charge: 'Udaipur', areaCode: 'UDP', chargeSn: 15 },
    ];
    
    chargeData.forEach(item => {
      this.charges.set(item.code, item);
    });
    
    // Initialize categories from your PostgreSQL schema
    const categoryData = [
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
      { catRsn: 21, catId: 21, catDescription: 'Salary & Wage Earner' },
    ];
    
    categoryData.forEach(item => {
      this.categories.set(item.catRsn, item);
    });
    
    // Initialize sample subcategories from your PostgreSQL schema
    const subcategoryData = [
      { recordRsn: 1, catCode: 1, catDescription: 'Legal Profession', subcatCode: 1, subcatDescription: 'Practitioners', isVisible: 1 },
      { recordRsn: 2, catCode: 1, catDescription: 'Legal Profession', subcatCode: 2, subcatDescription: 'Solicitors', isVisible: 1 },
      { recordRsn: 3, catCode: 1, catDescription: 'Legal Profession', subcatCode: 3, subcatDescription: 'Notaries Public', isVisible: 1 },
      { recordRsn: 4, catCode: 1, catDescription: 'Legal Profession', subcatCode: 4, subcatDescription: 'Others', isVisible: 1 },
      { recordRsn: 5, catCode: 2, catDescription: 'Medical Profession', subcatCode: 1, subcatDescription: 'Dentists', isVisible: 1 },
      { recordRsn: 6, catCode: 2, catDescription: 'Medical Profession', subcatCode: 2, subcatDescription: 'Pathologists', isVisible: 1 },
      { recordRsn: 7, catCode: 2, catDescription: 'Medical Profession', subcatCode: 3, subcatDescription: 'Cardiologist', isVisible: 1 },
      { recordRsn: 8, catCode: 2, catDescription: 'Medical Profession', subcatCode: 4, subcatDescription: 'Dermatologist', isVisible: 1 },
      { recordRsn: 9, catCode: 2, catDescription: 'Medical Profession', subcatCode: 5, subcatDescription: 'Endocrinologist', isVisible: 1 },
      { recordRsn: 10, catCode: 2, catDescription: 'Medical Profession', subcatCode: 6, subcatDescription: 'Epidemiologist', isVisible: 1 },
      { recordRsn: 11, catCode: 3, catDescription: 'Consultants', subcatCode: 1, subcatDescription: 'Medical Consultants', isVisible: 1 },
      { recordRsn: 12, catCode: 3, catDescription: 'Consultants', subcatCode: 2, subcatDescription: 'Management Consultants', isVisible: 1 },
      { recordRsn: 13, catCode: 3, catDescription: 'Consultants', subcatCode: 3, subcatDescription: 'R.C.C. Consultants', isVisible: 1 },
      { recordRsn: 14, catCode: 3, catDescription: 'Consultants', subcatCode: 4, subcatDescription: 'Software Consultant', isVisible: 1 },
      { recordRsn: 15, catCode: 4, catDescription: 'Engineering Profession', subcatCode: 1, subcatDescription: 'Mechanical Engineer', isVisible: 1 },
      { recordRsn: 16, catCode: 4, catDescription: 'Engineering Profession', subcatCode: 2, subcatDescription: 'Chemical Engineer', isVisible: 1 },
      { recordRsn: 17, catCode: 4, catDescription: 'Engineering Profession', subcatCode: 3, subcatDescription: 'Software Engineer', isVisible: 1 },
      { recordRsn: 18, catCode: 4, catDescription: 'Engineering Profession', subcatCode: 4, subcatDescription: 'Civil Engineer', isVisible: 1 },
    ];
    
    subcategoryData.forEach(item => {
      this.subcategories.set(item.recordRsn, item);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const rsn = this.currentEnrollmentId++;
    const newEnrollment: Enrollment = { 
      rsn,
      applicationId: enrollment.applicationId || null,
      ptan: enrollment.ptan || null,
      name: enrollment.name || null,
      gender: enrollment.gender || null,
      fatherName: enrollment.fatherName || null,
      mobile: enrollment.mobile || null,
      email: enrollment.email || null,
      businessName: enrollment.businessName || null,
      jurisdictionCode: enrollment.jurisdictionCode || null,
      chargeCode: enrollment.chargeCode || null,
      addressText: enrollment.addressText || null,
      subdistrictLgdCode: enrollment.subdistrictLgdCode || null,
      districtLgdCode: enrollment.districtLgdCode || null,
      pincode: enrollment.pincode || null,
      ptaxCategory: enrollment.ptaxCategory || null,
      ptaxSubcategory: enrollment.ptaxSubcategory || null,
      engagedWithProfession: enrollment.engagedWithProfession || null,
      engagedWithTrade: enrollment.engagedWithTrade || null,
      engagedWithCalling: enrollment.engagedWithCalling || null,
      engagedWithEmployement: enrollment.engagedWithEmployement || null,
      pan: enrollment.pan || null,
      establishment1Name: enrollment.establishment1Name || null,
      establishment1Address: enrollment.establishment1Address || null,
      establishment2Name: enrollment.establishment2Name || null,
      establishment2Address: enrollment.establishment2Address || null,
      establishment3Name: enrollment.establishment3Name || null,
      establishment3Address: enrollment.establishment3Address || null,
      establishment4Name: enrollment.establishment4Name || null,
      establishment4Address: enrollment.establishment4Address || null,
      establishment5Name: enrollment.establishment5Name || null,
      establishment5Address: enrollment.establishment5Address || null,
      applyingAsIndividual: enrollment.applyingAsIndividual || null,
      status: enrollment.status || null,
      docContent: enrollment.docContent || null,
      docContentTrade: enrollment.docContentTrade || null,
      docContentDeath: enrollment.docContentDeath || null,
      docType: enrollment.docType || null,
      cancellationExplanation: enrollment.cancellationExplanation || null,
      insertedOn: new Date(),
      insertedBy: 'system',
      insertedFromIpv4: '127.0.0.1',
      welcomeSmsCount: 0,
      welcomeEmailCount: 0
    };
    this.enrollments.set(rsn, newEnrollment);
    return newEnrollment;
  }

  async getEnrollmentByApplicationId(applicationId: string): Promise<Enrollment | undefined> {
    return Array.from(this.enrollments.values()).find(enrollment => enrollment.applicationId === applicationId);
  }

  async updateEnrollment(id: number, enrollment: Partial<InsertEnrollment>): Promise<Enrollment> {
    const existing = this.enrollments.get(id);
    if (!existing) {
      throw new Error('Enrollment not found');
    }
    
    const updated = { ...existing, ...enrollment };
    this.enrollments.set(id, updated);
    return updated;
  }

  async getDistricts(): Promise<MasterDataItem[]> {
    return Array.from(this.districts.values()).map(district => ({
      id: district.districtLgdCode,
      code: district.districtLgdCode.toString(),
      name: district.districtName,
      isActive: true
    }));
  }

  async getAreasByDistrict(districtCode: string): Promise<MasterDataItem[]> {
    // In a real implementation, you would filter by district relationship
    return Array.from(this.areas.values()).map(area => ({
      id: area.code.length, // Simple ID generation
      code: area.code,
      name: area.nameEn || area.code,
      isActive: true
    }));
  }

  async getChargesByArea(areaCode: string): Promise<MasterDataItem[]> {
    return Array.from(this.charges.values())
      .filter(charge => charge.areaCode === areaCode)
      .map(charge => ({
        id: charge.chargeSn || 0,
        code: charge.code,
        name: charge.charge || charge.code,
        parentCode: charge.areaCode || undefined,
        isActive: true
      }));
  }

  async getCategories(): Promise<MasterDataItem[]> {
    return Array.from(this.categories.values()).map(category => ({
      id: category.catRsn,
      code: category.catId?.toString() || category.catRsn.toString(),
      name: category.catDescription || '',
      isActive: true
    }));
  }

  async getSubcategoriesByCategory(categoryId: number): Promise<MasterDataItem[]> {
    return Array.from(this.subcategories.values())
      .filter(subcat => subcat.catCode === categoryId && subcat.isVisible === 1)
      .map(subcat => ({
        id: subcat.recordRsn,
        code: subcat.subcatCode?.toString() || subcat.recordRsn.toString(),
        name: subcat.subcatDescription || '',
        parentCode: subcat.catCode?.toString() || undefined,
        isActive: true
      }));
  }

  async getPeriodOfStandingOptions(): Promise<MasterDataItem[]> {
    // Default period of standing options
    return [
      { id: 1, code: 'P1', name: '0 Year 0 Month 9 Days', isActive: true },
      { id: 2, code: 'P2', name: '1-2 Years', isActive: true },
      { id: 3, code: 'P3', name: '2-5 Years', isActive: true },
      { id: 4, code: 'P4', name: '5+ Years', isActive: true },
    ];
  }

  async createOtpVerification(otp: Omit<OtpVerification, 'id' | 'createdAt'>): Promise<OtpVerification> {
    const id = this.currentOtpId++;
    const newOtp: OtpVerification = { 
      ...otp, 
      id,
      createdAt: new Date()
    };
    this.otpVerifications.set(id, newOtp);
    return newOtp;
  }

  async getOtpVerification(mobileNumber: string, otp: string, type: string): Promise<OtpVerification | undefined> {
    return Array.from(this.otpVerifications.values()).find(
      verification => verification.mobileNumber === mobileNumber && 
                    verification.otp === otp && 
                    verification.type === type &&
                    !verification.isUsed &&
                    verification.expiresAt > new Date()
    );
  }

  async markOtpAsUsed(id: number): Promise<void> {
    const verification = this.otpVerifications.get(id);
    if (verification) {
      verification.isUsed = true;
      this.otpVerifications.set(id, verification);
    }
  }
}

export const storage = new MemStorage();