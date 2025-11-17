import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { Resend } from "resend";

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

// Initialize Resend (will be undefined if API key not set)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

  // Beta Contact Form Endpoint
  app.post("/api/contact", async (req, res) => {
    const { name, email, company, useCase, message, subject, to } = req.body;

    // Validate required fields
    if (!name || !email || !company || !useCase) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide name, email, company, and use case.'
      });
    }

    // Log the contact form submission
    console.log('Contact form received:', {
      name,
      email,
      company,
      useCase,
      subject: subject || 'Contact Form Submission'
    });

    // Send email notification if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SapientPriors <noreply@sapientpriors.com>',
          to: to || 'raveeshupahuja@sapientpriors.com',
          subject: subject || `New Contact Form: ${name} from ${company}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Use Case:</strong> ${useCase}</p>

            ${message ? `
              <h3>Additional Information:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            ` : ''}

            <hr>
            <p style="color: #666; font-size: 12px;">This submission was received via the SapientPriors website contact form.</p>
          `
        });
        console.log('Contact email sent successfully');
      } catch (emailError) {
        console.error('Failed to send contact email:', emailError);
        return res.status(500).json({
          error: 'Email delivery failed',
          message: 'We received your submission but failed to send the notification email. Please contact us directly at raveeshupahuja@sapientpriors.com'
        });
      }
    } else {
      console.log('Resend not configured - skipping email notification');
      // In development without Resend, we'll still return success
    }

    return res.status(200).json({
      success: true,
      message: "Your application has been submitted successfully!"
    });
  });

  // Careers Application Endpoint
  app.post("/api/careers/apply", upload.single('resume'), async (req: any, res) => {
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

    // Send email notification if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SapientPriors Careers <careers@sapientpriors.com>',
          to: 'raveeshupahuja@sapientpriors.com',
          subject: `New Job Application: ${role} - ${name}`,
          html: `
            <h2>New Job Application Received</h2>
            <p><strong>Position:</strong> ${role}</p>
            <p><strong>Applicant:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : ''}
            ${experience ? `<p><strong>Experience:</strong> ${experience}</p>` : ''}
            
            <h3>Cover Letter:</h3>
            <p style="white-space: pre-wrap;">${coverLetter}</p>
            
            ${resume ? `<p><strong>Resume:</strong> ${resume.originalname} (${(resume.size / 1024).toFixed(2)} KB)</p>` : '<p><em>No resume attached</em></p>'}
            
            <hr>
            <p style="color: #666; font-size: 12px;">This application was submitted via the SapientPriors careers page.</p>
          `
        });
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('Resend not configured - skipping email notification');
    }

    return res.status(200).json({
      success: true,
      message: "Application received successfully. We'll be in touch soon!"
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
