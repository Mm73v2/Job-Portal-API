import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const NODE_MAILER_AUTH_USER = process.env.NODE_MAILER_AUTH_USER;
const NODE_MAILER_AUTH_PASS = process.env.NODE_MAILER_AUTH_USER;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: NODE_MAILER_AUTH_USER,
    pass: NODE_MAILER_AUTH_PASS,
  },
});

export default transporter;
