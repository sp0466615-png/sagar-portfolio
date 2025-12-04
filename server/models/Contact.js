// server/models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Contact", ContactSchema);
