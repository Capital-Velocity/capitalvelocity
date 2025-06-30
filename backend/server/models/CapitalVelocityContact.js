// models/CapitalVelocityContact.js
import mongoose from "mongoose";

const capitalVelocityContactSchema = new mongoose.Schema(
  {
    formType: { type: String, default: "Capital Velocity Contact" },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    feature: String,
    message: String,
  },
  { timestamps: true }
);

const CapitalVelocityContact = mongoose.model(
  "CapitalVelocityContact",
  capitalVelocityContactSchema,
  "capitalvelocitycontacts"
);

export default CapitalVelocityContact;
