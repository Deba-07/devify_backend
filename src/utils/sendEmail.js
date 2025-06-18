const nodemailer = require('nodemailer');

// For development/testing, you can use ethereal.email or mailtrap
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"DevifyX Scheduler" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
  }
};

module.exports = sendEmail;
