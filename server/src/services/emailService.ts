import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: #F2F1EA; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #101719; padding: 32px; text-align: center; }
    .header h1 { color: #38A7D8; font-size: 24px; margin: 0; letter-spacing: 2px; }
    .header p { color: #8D999F; font-size: 11px; margin: 8px 0 0; font-family: monospace; }
    .content { padding: 40px 32px; color: #101719; line-height: 1.6; }
    .footer { background: #101D26; padding: 24px 32px; text-align: center; }
    .footer p { color: #8D999F; font-size: 12px; margin: 0; }
    .btn { display: inline-block; background: #38A7D8; color: #ffffff; padding: 12px 32px; text-decoration: none; font-weight: 600; margin-top: 16px; }
    .data-plate { border: 1px solid #8D999F; padding: 16px; margin: 16px 0; font-family: monospace; font-size: 12px; }
    .label { color: #8D999F; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>UR AEROTECH</h1>
      <p>AIRCRAFT STRUCTURAL REPAIR & PARTS</p>
    </div>
    <div class="content">${content}</div>
    <div class="footer">
      <p>UR Aerotech GmbH · Gaterstr. 66B, 52538 Gangelt, Germany</p>
      <p>info@uraerotech.com · +49 173 250 4540</p>
    </div>
  </div>
</body>
</html>
`;

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!config.smtp.user || !config.smtp.pass) {
    console.log(`[Email skipped] To: ${to}, Subject: ${subject}`);
    return;
  }
  await transporter.sendMail({
    from: config.smtp.from,
    to,
    subject,
    html: baseTemplate(html),
  });
};

export const emailTemplates = {
  welcome: (name: string, verifyUrl: string) => `
    <p>Dear ${name},</p>
    <p>Welcome to UR Aerotech. Your account has been created successfully.</p>
    <p>Please verify your email address to access all features:</p>
    <a href="${verifyUrl}" class="btn">Verify Email</a>
    <div class="data-plate">
      <div class="label">Account Status</div>
      <div>Pending Verification</div>
    </div>
  `,
  passwordReset: (name: string, resetUrl: string) => `
    <p>Dear ${name},</p>
    <p>We received a request to reset your password. Click the button below to proceed:</p>
    <a href="${resetUrl}" class="btn">Reset Password</a>
    <p style="color:#8D999F;font-size:12px;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
  `,
  quoteConfirmation: (name: string, reference: string) => `
    <p>Dear ${name},</p>
    <p>Thank you for your quote request. We have received your inquiry and our team will review it shortly.</p>
    <div class="data-plate">
      <div class="label">Reference Number</div>
      <div style="font-size:18px;color:#38A7D8;">${reference}</div>
      <div class="label" style="margin-top:12px;">Status</div>
      <div>New — Under Initial Review</div>
    </div>
    <p>You can track your request status from your dashboard.</p>
  `,
  quoteStatusUpdate: (name: string, reference: string, status: string) => `
    <p>Dear ${name},</p>
    <p>Your quote request has been updated.</p>
    <div class="data-plate">
      <div class="label">Reference</div>
      <div>${reference}</div>
      <div class="label" style="margin-top:12px;">New Status</div>
      <div style="color:#38A7D8;">${status.replace(/-/g, ' ').toUpperCase()}</div>
    </div>
  `,
  contactConfirmation: (name: string) => `
    <p>Dear ${name},</p>
    <p>Thank you for contacting UR Aerotech. We have received your message and will respond within one business day.</p>
    <p>For urgent AOG inquiries, please call us directly at +49 173 250 4540.</p>
  `,
  adminNotification: (type: string, details: string) => `
    <p><strong>New ${type}</strong></p>
    <div class="data-plate">${details}</div>
    <p>Please review in the admin portal.</p>
  `,
};
