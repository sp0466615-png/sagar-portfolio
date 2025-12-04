// server/server.js (DEBUG VERSION)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/api/ping", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// --- MongoDB connect (with logging)
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sagar_portfolio";
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected:", MONGO))
  .catch((err) => {
    console.error("MongoDB connect error:", err && err.message ? err.message : err);
  });

// Utility: verify SMTP transporter (if env present)
async function verifyTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP_USER or SMTP_PASS not set - skipping transporter verify");
    return null;
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    await transporter.verify(); // this will throw if auth fails
    console.log("SMTP transporter verified (OK)");
    return transporter;
  } catch (err) {
    console.error("SMTP verify failed:", err && err.message ? err.message : err);
    throw err;
  }
}

// Pre-verify transporter at startup (optional)
let verifiedTransporter = null;
verifyTransporter().then(t => { verifiedTransporter = t; }).catch(err => {
  console.warn("Transporter verify failed at startup - you can still POST but mail may fail.");
});

// API: POST /api/contact
app.post("/api/contact", async (req, res) => {
  console.log("POST /api/contact - body:", req.body);
  try {
    const { name = "Visitor", email, subject = "New message from portfolio", message } = req.body;
    if (!email || !message) return res.status(400).json({ error: "Missing fields: email and message are required" });

    // save to DB
    let contact = null;
    try {
      contact = new Contact({ name, email, subject, message });
      await contact.save();
      console.log("Saved contact to DB:", contact._id);
    } catch (dbErr) {
      console.error("DB save error:", dbErr && dbErr.message ? dbErr.message : dbErr);
      // don't block sending email if DB save fails; you can choose otherwise
      // return res.status(500).json({ error: "DB save failed", detail: dbErr.message });
    }

    // prepare transporter (use verifiedTransporter if available)
    let transporter = verifiedTransporter;
    if (!transporter) {
      // create a fresh transporter (will throw if credentials invalid)
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }

    // If we don't have SMTP env vars, return success with saved flag
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials missing - skipping sending email");
      return res.json({ ok: true, msg: "Saved (email not sent because SMTP credentials missing)", saved: !!contact });
    }

    // Send email
    const mailOptions = {
      from: `${name} <${email}>`,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
      subject,
      text: `From: ${name} <${email}>\n\n${message}`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info && info.response ? info.response : info);
      return res.json({ ok: true, msg: "Message saved and email sent", saved: !!contact, mailInfo: info && info.response ? info.response : info });
    } catch (mailErr) {
      console.error("Nodemailer send error:", mailErr && mailErr.message ? mailErr.message : mailErr);
      // Respond with 500 but include error.message for debugging
      return res.status(500).json({ error: "Failed to send email", detail: mailErr && mailErr.message ? mailErr.message : String(mailErr) });
    }
  } catch (err) {
    console.error("Unhandled /api/contact error:", err && err.stack ? err.stack : err);
    return res.status(500).json({ error: "Server error", detail: err && err.message ? err.message : String(err) });
  }
});

// Serve client in production (if exists)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

