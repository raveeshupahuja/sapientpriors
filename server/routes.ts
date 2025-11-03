import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Personalization API Demo Endpoints
  // These endpoints simulate the real API and require authentication
  
  app.post("/api/personalization/learn", (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Missing or invalid API key. Contact us at raveeshupahuja@sapientpriors.com to get API access.",
        documentation: "https://docs.sapientpriors.com/authentication"
      });
    }

    // Simulated response for demo purposes
    return res.status(401).json({
      error: "Invalid API Key",
      message: "The provided API key is not valid. Please contact raveeshupahuja@sapientpriors.com to obtain your API access credentials.",
      documentation: "https://docs.sapientpriors.com/authentication"
    });
  });

  app.get("/api/personalization/context/:userId", (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Missing or invalid API key. Contact us at raveeshupahuja@sapientpriors.com to get API access.",
        documentation: "https://docs.sapientpriors.com/authentication"
      });
    }

    // Simulated response for demo purposes
    return res.status(401).json({
      error: "Invalid API Key",
      message: "The provided API key is not valid. Please contact raveeshupahuja@sapientpriors.com to obtain your API access credentials.",
      documentation: "https://docs.sapientpriors.com/authentication"
    });
  });

  // Careers Application Endpoint
  app.post("/api/careers/apply", upload.single('resume'), (req: any, res) => {
    // In a real application, this would:
    // 1. Validate the form data
    // 2. Store the application in a database
    // 3. Send notification emails to the team
    // 4. Send confirmation email to the applicant
    
    const { name, email, phone, linkedin, role, experience, coverLetter } = req.body;
    const resume = req.file;
    
    // Validate required fields
    if (!name || !email || !role || !coverLetter) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide name, email, role, and cover letter.'
      });
    }
    
    // Log the application
    console.log('Career application received:', {
      name,
      email,
      phone,
      linkedin,
      role,
      experience,
      coverLetter: coverLetter.substring(0, 50) + '...',
      resume: resume ? `${resume.originalname} (${resume.size} bytes)` : 'No resume uploaded'
    });

    return res.status(200).json({
      success: true,
      message: "Application received successfully. We'll be in touch soon!"
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
