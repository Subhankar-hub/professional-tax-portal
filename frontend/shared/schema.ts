import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Updated to match your PostgreSQL schema: ttbl_temp_applicant_enrolment_details
export const enrollments = pgTable("ttbl_temp_applicant_enrolment_details", {
  rsn: serial("rsn").primaryKey(),
  applicationId: text("application_id"),
  ptan: text("ptan"),
  name: text("name"),
  gender: text("gender"),
  fatherName: text("father_name"),
  mobile: text("mobile"),
  email: text("email"),
  businessName: text("business_name"),
  jurisdictionCode: text("jurisdiction_code"),
  chargeCode: text("charge_code"),
  addressText: text("address_text"),
  subdistrictLgdCode: integer("subdisctrict_lgd_code"),
  districtLgdCode: integer("district_lgd_code"),
  pincode: text("pincode"),
  ptaxCategory: integer("ptax_category"),
  ptaxSubcategory: integer("ptax_subcategory"),
  engagedWithProfession: boolean("engaged_with_profession"),
  engagedWithTrade: boolean("engaged_with_trade"),
  engagedWithCalling: boolean("engaged_with_calling"),
  engagedWithEmployement: boolean("engaged_with_employement"),
  pan: text("pan"),
  insertedOn: timestamp("inserted_on"),
  insertedBy: text("inserted_by"),
  insertedFromIpv4: text("inserted_from_ipv4"),
  welcomeSmsCount: integer("welcome_sms_count"),
  welcomeEmailCount: integer("welcome_email_count"),
  establishment1Name: text("establishment1_name"),
  establishment1Address: text("establishment1_address"),
  establishment2Name: text("establishment2_name"),
  establishment2Address: text("establishment2_address"),
  establishment3Name: text("establishment3_name"),
  establishment3Address: text("establishment3_address"),
  establishment4Name: text("establishment4_name"),
  establishment4Address: text("establishment4_address"),
  establishment5Name: text("establishment5_name"),
  establishment5Address: text("establishment5_address"),
  applyingAsIndividual: boolean("applying_as_individual"),
  status: boolean("status"),
  docContent: text("doc_content"),
  docContentTrade: text("doc_content_trade"),
  docContentDeath: text("doc_content_death"),
  docType: text("doc_type"),
  cancellationExplanation: text("cancellation_explanation"),
});

// Districts table - mas_district
export const districts = pgTable("mas_district", {
  districtLgdCode: integer("district_lgd_code").primaryKey(),
  districtName: text("district_name").notNull(),
  localCode: integer("local_code"),
});

// Areas table - mtbl_area
export const areas = pgTable("mtbl_area", {
  code: text("code").primaryKey(),
  nameEn: text("name_en"),
  nameBn: text("name_bn"),
});

// Charges table - mtbl_charge
export const charges = pgTable("mtbl_charge", {
  code: text("code").primaryKey(),
  charge: text("charge"),
  areaCode: text("area_code"),
  chargeSn: integer("charge_sn"),
});

// Categories table - mtbl_ptax_category
export const categories = pgTable("mtbl_ptax_category", {
  catRsn: serial("cat_rsn").primaryKey(),
  catId: integer("cat_id"),
  catDescription: text("cat_description"),
});

// Subcategories table - mtbl_ptax_category_subcategory
export const subcategories = pgTable("mtbl_ptax_category_subcategory", {
  recordRsn: serial("record_rsn").primaryKey(),
  catCode: integer("cat_code"),
  catDescription: text("cat_description"),
  subcatCode: integer("subcat_code"),
  subcatDescription: text("subcat_description"),
  isVisible: integer("is_visible"),
});

export const otpVerifications = pgTable("otp_verifications", {
  id: serial("id").primaryKey(),
  mobileNumber: text("mobile_number").notNull(),
  otp: text("otp").notNull(),
  type: text("type").notNull(), // 'mobile', 'final'
  isUsed: boolean("is_used").default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema for form validation
export const personalInfoSchema = z.object({
  applicantType: z.enum(["Individual", "Others"]),
  name: z.string().min(1, "Full name is required"),
  gender: z.enum(["male", "female", "other"]),
  fatherName: z.string().min(1, "Father's name is required"),
  pan: z.string().min(10, "PAN/TAN must be at least 10 characters"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  captchaValue: z.string().min(1, "Captcha is required"),
});

export const otpVerificationSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  type: z.enum(["mobile", "final"]),
});

export const establishmentInfoSchema = z.object({
  establishmentName: z.string().min(1, "Establishment name is required"),
  jurisdictionArea: z.string().min(1, "Area of jurisdiction is required"),
  charge: z.string().min(1, "Charge is required"),
  district: z.string().min(1, "District is required"),
  pincode: z.string().min(6, "PIN code must be 6 digits"),
  establishmentAddress: z.string().min(1, "Establishment address is required"),
  additionalEstablishments: z.array(z.object({
    name: z.string(),
    address: z.string(),
  })).optional(),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
});

export const establishmentTypeSchema = z.object({
  engagementTypes: z.array(z.string()).min(1, "Select at least one engagement type"),
});

export const detailedInfoSchema = z.object({
  dateOfCommencement: z.string().optional(),
  periodOfStanding: z.string().optional(),
  registeredUnderVAT: z.string().optional(),
  registeredUnderCST: z.string().optional(),
  registeredUnderGST: z.string().optional(),
  employerName: z.string().optional(),
  employerAddress: z.string().optional(),
  applicantSalary: z.string().optional(),
  simultaneousEmployment: z.boolean().default(false),
});

export const enrollmentSchema = personalInfoSchema
  .merge(establishmentInfoSchema)
  .merge(establishmentTypeSchema)
  .merge(detailedInfoSchema);

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({ rsn: true });
export const insertOtpVerificationSchema = createInsertSchema(otpVerifications).omit({ id: true });

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type OtpVerification = typeof otpVerifications.$inferSelect;

// Types for master data tables
export type District = typeof districts.$inferSelect;
export type Area = typeof areas.$inferSelect;
export type Charge = typeof charges.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Subcategory = typeof subcategories.$inferSelect;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type EstablishmentInfo = z.infer<typeof establishmentInfoSchema>;
export type EstablishmentType = z.infer<typeof establishmentTypeSchema>;
export type DetailedInfo = z.infer<typeof detailedInfoSchema>;
export type EnrollmentData = z.infer<typeof enrollmentSchema>;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
