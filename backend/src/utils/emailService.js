const nodemailer = require('nodemailer');

// Configure transporter
const createTransporter = () => {
  // If SMTP credentials are not set, we'll log to console (Mock Mode)
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️ SMTP credentials not found. Email service running in MOCK mode (logging to console).');
    return {
      sendMail: (options) => {
        console.log('--- MOCK EMAIL START ---');
        console.log(`To: ${options.to}`);
        console.log(`Subject: ${options.subject}`);
        console.log('Body:', options.html);
        console.log('--- MOCK EMAIL END ---');
        return Promise.resolve({ messageId: 'mock-id' });
      }
    };
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for others
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const transporter = createTransporter();

// Helper to send Admin Notification
const sendVolunteerNotification = async (volunteer) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #0f172a; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Volunteer Joined!</h1>
      </div>
      <div style="padding: 24px; color: #1e293b;">
        <p>Hello Admin,</p>
        <p>A new volunteer has just submitted an application through the website.</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; margin-bottom: 8px;"><strong>Name:</strong> ${volunteer.name}</p>
          <p style="margin: 0; margin-bottom: 8px;"><strong>Email:</strong> ${volunteer.email}</p>
          <p style="margin: 0; margin-bottom: 8px;"><strong>Phone:</strong> ${volunteer.phone || 'Not provided'}</p>
          <p style="margin: 0;"><strong>Availability:</strong> ${volunteer.availability}</p>
        </div>
        <p>You can manage this application in the Admin Dashboard.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Invenger Foundation" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Volunteer: ${volunteer.name}`,
      html,
    });
  } catch (err) {
    console.error('Email send failed (Admin Notification):', err);
  }
};

// Helper to send Thank You email to Volunteer
const sendVolunteerThankYou = async (volunteer) => {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #10b981; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Welcome to Invenger Foundation</h1>
      </div>
      <div style="padding: 24px; color: #1e293b;">
        <p>Dear ${volunteer.name},</p>
        <p>Thank you so much for your interest in volunteering with the Invenger Foundation! We have received your application and our team will get in touch with you shortly.</p>
        <p>Your willingness to give back to the community is what drives our mission forward.</p>
        <div style="margin: 30px 0; text-align: center;">
          <div style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Together for Change</div>
        </div>
        <p>Best Regards,<br/><strong>Team Invenger Foundation</strong></p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Invenger Foundation" <${process.env.SMTP_USER}>`,
      to: volunteer.email,
      subject: `Welcome to the Team, ${volunteer.name}!`,
      html,
    });
  } catch (err) {
    console.error('Email send failed (Thank You Email):', err);
  }
};

module.exports = {
  sendVolunteerNotification,
  sendVolunteerThankYou,
};
