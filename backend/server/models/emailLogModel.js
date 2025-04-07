import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    page: { type: String, required: true },
    purpose: { type: String, default: "general" }, // e.g., "loan-form", "calculator"
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const EmailLog = mongoose.model("EmailLog", emailLogSchema);
export default EmailLog;
