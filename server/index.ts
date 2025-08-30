import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import juice from 'juice';
import crypto from 'crypto';
import 'dotenv/config';

// Initialize Express with security middleware
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? process.env.DEV_FRONTEND_URL 
    : process.env.PRODUCTION_FRONTEND_URL,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10kb' }));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later'
});
app.use('/api/', apiLimiter);

// Validate Environment Variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_KEY',
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
  'EMAIL_FROM_NAME',
  'VERIFICATION_URL'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Email Template Renderer
const renderEmailTemplate = async (data: { code: string; studentName?: string }) => {
  const templatePath = path.join(__dirname, 'templates', 'verification-email.ejs');
  const html = await ejs.renderFile(templatePath, data);
  return juice(html);
};

// Simplified Email Transporter using App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.error('Error with mail transporter:', error);
    throw new Error('Failed to create email transporter');
  } else {
    console.log('Email transporter is ready');
  }
});

// Generate secure random code
const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// API Routes
app.post('/api/send-verification', async (req: Request, res: Response) => {
  try {
    console.log('Verification request from IP:', req.ip);
    const { email } = req.body;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.warn('Invalid email attempt:', email);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email exists in students table
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('student_id, batch, full_name')
      .eq('email', email)
      .single();

    if (studentError || !student) {
      return res.status(400).json({ error: 'Email not registered' });
    }

    // Generate and store verification code
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + (Number(process.env.VERIFICATION_TOKEN_EXPIRE) || 3600) * 1000);

    const { error: codeError } = await supabase
      .from('verification_codes')
      .upsert({
        email,
        code,
        expires_at: expiresAt.toISOString(),
        used: false,
        ip_address: req.ip
      });

    if (codeError) throw codeError;

    // Send email with verification code
    const emailHtml = await renderEmailTemplate({
      code,
      studentName: student.full_name
    });

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your Verification Code',
      html: emailHtml,
      text: `Your verification code is: ${code}\nCode expires at: ${expiresAt.toLocaleString()}`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification code sent to ${email}`);

    res.json({
      success: true,
      batch: student.batch,
      // Only return code in development for testing
      code: process.env.NODE_ENV === 'development' ? code : undefined
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      error: 'Failed to send verification code',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.post('/api/verify-code', async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    // Validate code exists and isn't expired
    const { data: validCode, error: codeError } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (codeError || !validCode) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    // Mark code as used
    await supabase
      .from('verification_codes')
      .update({ used: true })
      .eq('id', validCode.id);

    // Get student data
    const { data: student } = await supabase
      .from('students')
      .select('student_id, batch')
      .eq('email', email)
      .single();

    res.json({ 
      success: true,
      batch: student?.batch,
      studentId: student?.student_id
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Verification failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health Check
app.get('/health', async (req: Request, res: Response) => {
  const services = {
    database: 'unknown',
    email: 'unknown'
  };

  try {
    await supabase.from('students').select('*').limit(1);
    services.database = 'connected';
  } catch (error) {
    services.database = 'disconnected';
  }

  try {
    await transporter.verify();
    services.email = 'connected';
  } catch (error) {
    services.email = 'disconnected';
  }

  res.json({ 
    status: 'healthy',
    services,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Email sender: ${process.env.GMAIL_USER}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});