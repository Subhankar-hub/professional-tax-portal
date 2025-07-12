import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  personalInfoSchema, 
  otpVerificationSchema, 
  establishmentInfoSchema,
  establishmentTypeSchema,
  detailedInfoSchema,
  enrollmentSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // OTP endpoints
  app.post("/api/otp/send", async (req, res) => {
    try {
      const { mobileNumber, type } = req.body;
      
      if (!mobileNumber || !type) {
        return res.status(400).json({ 
          success: false, 
          message: "Mobile number and type are required" 
        });
      }
      
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Create OTP verification record
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      await storage.createOtpVerification({
        mobileNumber,
        otp,
        type,
        isUsed: false,
        expiresAt
      });
      
      // In a real implementation, send SMS here
      console.log(`OTP for ${mobileNumber}: ${otp}`);
      
      res.json({ 
        success: true, 
        message: "OTP sent successfully",
        data: null 
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to send OTP" 
      });
    }
  });

  app.post("/api/otp/verify", async (req, res) => {
    try {
      const validatedData = otpVerificationSchema.parse(req.body);
      
      const otpRecord = await storage.getOtpVerification(
        validatedData.mobileNumber,
        validatedData.otp,
        validatedData.type
      );
      
      if (!otpRecord) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid or expired OTP" 
        });
      }
      
      await storage.markOtpAsUsed(otpRecord.id);
      
      res.json({ 
        success: true, 
        message: "OTP verified successfully",
        data: null 
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid OTP data" 
      });
    }
  });

  // Master data endpoints - Updated for PostgreSQL schema
  app.get("/api/master-data/districts", async (req, res) => {
    try {
      const districts = await storage.getDistricts();
      res.json({ 
        success: true, 
        message: "Districts retrieved successfully",
        data: districts 
      });
    } catch (error) {
      console.error("Error retrieving districts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve districts" 
      });
    }
  });

  app.get("/api/master-data/areas/:districtCode", async (req, res) => {
    try {
      const { districtCode } = req.params;
      const areas = await storage.getAreasByDistrict(districtCode);
      res.json({ 
        success: true, 
        message: "Areas retrieved successfully",
        data: areas 
      });
    } catch (error) {
      console.error("Error retrieving areas:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve areas" 
      });
    }
  });

  app.get("/api/master-data/charges/:areaCode", async (req, res) => {
    try {
      const { areaCode } = req.params;
      const charges = await storage.getChargesByArea(areaCode);
      res.json({ 
        success: true, 
        message: "Charges retrieved successfully",
        data: charges 
      });
    } catch (error) {
      console.error("Error retrieving charges:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve charges" 
      });
    }
  });

  app.get("/api/master-data/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json({ 
        success: true, 
        message: "Categories retrieved successfully",
        data: categories 
      });
    } catch (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve categories" 
      });
    }
  });

  app.get("/api/master-data/subcategories/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const subcategories = await storage.getSubcategoriesByCategory(categoryId);
      res.json({ 
        success: true, 
        message: "Subcategories retrieved successfully",
        data: subcategories 
      });
    } catch (error) {
      console.error("Error retrieving subcategories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve subcategories" 
      });
    }
  });

  app.get("/api/master-data/period-of-standing", async (req, res) => {
    try {
      const options = await storage.getPeriodOfStandingOptions();
      res.json({ 
        success: true, 
        message: "Period of standing options retrieved successfully",
        data: options 
      });
    } catch (error) {
      console.error("Error retrieving period options:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve period options" 
      });
    }
  });

  // Enrollment endpoints
  app.post("/api/enrolment/temp-save", async (req, res) => {
    try {
      const enrollmentData = req.body;
      
      // Create or update temporary enrollment
      const enrollment = await storage.createEnrollment({
        ...enrollmentData,
        status: false, // draft status
        applicationId: `TEMP-${Date.now()}`
      });
      
      res.json({ 
        success: true, 
        message: "Enrollment saved temporarily",
        data: enrollment.applicationId 
      });
    } catch (error) {
      console.error("Error saving enrollment:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to save enrollment" 
      });
    }
  });

  app.post("/api/enrolment", async (req, res) => {
    try {
      const validatedData = enrollmentSchema.parse(req.body);
      
      const enrollment = await storage.createEnrollment({
        ...validatedData,
        status: true, // submitted status
        applicationId: `PTAX-${Date.now()}`
      });
      
      res.json({ 
        success: true, 
        message: "Enrollment submitted successfully",
        data: enrollment.applicationId 
      });
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to submit enrollment" 
      });
    }
  });

  app.get("/api/enrolment/:applicationId", async (req, res) => {
    try {
      const { applicationId } = req.params;
      const enrollment = await storage.getEnrollmentByApplicationId(applicationId);
      
      if (!enrollment) {
        return res.status(404).json({ 
          success: false, 
          message: "Enrollment not found" 
        });
      }
      
      res.json({ 
        success: true, 
        message: "Enrollment retrieved successfully",
        data: enrollment 
      });
    } catch (error) {
      console.error("Error retrieving enrollment:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve enrollment" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
