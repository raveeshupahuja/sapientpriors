import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
  app.post("/api/careers/apply", (req, res) => {
    // In a real application, this would:
    // 1. Validate the form data
    // 2. Store the application in a database
    // 3. Send notification emails to the team
    // 4. Send confirmation email to the applicant
    
    // For now, simulate successful submission
    console.log('Career application received:', {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    });

    return res.status(200).json({
      success: true,
      message: "Application received successfully. We'll be in touch soon!"
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
