import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  await transporter.sendMail({
    from: `"EdPlanner" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
