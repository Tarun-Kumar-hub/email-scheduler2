import nodemailer from "nodemailer";
import env from "dotenv";

env.config();

const mailTransport = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD,
  },
});

export default mailTransport;
