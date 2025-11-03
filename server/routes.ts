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

  const httpServer = createServer(app);

  return httpServer;
}
