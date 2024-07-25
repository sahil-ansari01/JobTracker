const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

exports.sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@example.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
