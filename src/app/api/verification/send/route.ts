import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import juice from 'juice';
import crypto from 'crypto';

import { NextResponse, NextRequest } from 'next/server';
import supabaseClient from "../../../../services/supabaseClient";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "joshcreatives081200@gmail.com",
    pass: "lrluqlreuqecwhjx"
  }
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.error('Error with mail transporter:', error);
  } else {
    console.log('Email transporter is ready');
  }
});

// Email Template Renderer
const renderEmailTemplate = async (data: { code: string; studentName?: string }) => {
  const templatePath = path.join(process.cwd(), 'src/app/api/verification/templates', 'verification-email.ejs');
  console.log('templatePath: ', templatePath)
  const html = await ejs.renderFile(templatePath, data);
  return juice(html);
};

// Generate secure random code
const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const email = req.email;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.warn('Invalid email attempt:', email);
      return NextResponse.json({ message: 'Invalid format' }, { status: 400 });
    }

    // Check if email exists in students table
    // COMMENTED FOR TESTING, uncomment when deploying
    // const { data: student, error: studentError } = await supabaseClient
    //   .from('students')
    //   .select('student_id, batch, full_name')
    //   .eq('email', email)
    //   .single();

    // if (studentError || !student) {
    //   return NextResponse.json({ message: 'Email not registered' }, { status: 400 });
    // }

    // Generate and store verification code
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 3600 * 1000);

    const { error: codeError } = await supabaseClient
      .from('verification_codes')
      .upsert({
        // email,
        email: "johnedwardescuyos@gmail.com",
        code,
        expires_at: expiresAt.toISOString(),
        used: false,
        ip_address: req.ip
      });

    if (codeError) throw codeError;

    // Send email with verification code
    const emailHtml = await renderEmailTemplate({
      code,
      // studentName: student.full_name
      studentName: "John Escuyos"
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

    return new Response(JSON.stringify({
      success: true,
      // batch: student.batch,
      batch: "2010",
      // Only return code in development for testing
      code: process.env.NODE_ENV === 'development' ? code : undefined
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Verification error:', error);
    console.log(error)
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}