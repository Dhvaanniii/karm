const nodemailer = require("nodemailer");
require("dotenv").config();

const transPorter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function senData(to, subject, html) {
  try {
    const mailFormat = {
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to: to,
      subject: subject,
      html: html,
    };
    
    const info = await transPorter.sendMail(mailFormat);
    console.log("Email sent successfully to:", to);
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email to", to, ":", error.message);
    console.error("Full error:", error);
    throw error;
  }
}
module.exports = senData;
