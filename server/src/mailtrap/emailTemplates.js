/*
 * emailTemplates.js
 * A collection of HTML email templates for registration, password reset, and notifications.
 * You can import these constants into your mailer modules.
 * Example usage:
 *   const { VERIFICATION_EMAIL, RESET_SUCCESS_EMAIL } = require('./emailTemplates');
 *   await transporter.sendMail({
 *     to: user.email,
 *     subject: "Verify your account",
 *     html: VERIFICATION_EMAIL({ verificationCode: code, appName: 'MyApp' }),
 *   });
 */

// A helper to wrap the HTML with a basic responsive container
const wrap = (bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
</head>
<body style="font-family: Arial, sans-serif; margin:0; padding:20px; color:#333;">
  <div style="max-width:600px; margin:0 auto;">
    ${bodyContent}
  </div>
</body>
</html>`;

// 1. Account Verification Email Template
export const VERIFICATION_EMAIL = ({ verificationCode, appName = 'Your App' }) => wrap(`
  <h2 style="color:#4CAF50;">Welcome to ${appName}!</h2>
  <p>Thank you for registering. Please copy the code below and paste it into the verification page to activate your account:</p>
  <div style="background:#f7f7f7; padding:15px; text-align:center; margin:20px 0;">
    <span style="font-size:28px; font-weight:bold; letter-spacing:5px; color:#4CAF50;">${verificationCode}</span>
  </div>
  <p style="font-size:0.9em; color:#666;">This code will expire in 15 minutes.</p>
  <p>If you did not sign up for this account, please ignore this email.</p>
  <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
  <p style="font-size:0.8em; color:#999; text-align:center;">© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
`);

export const sendWelcomEmail = async (email, name) => {
  const recipient = [{
    
  }]
}