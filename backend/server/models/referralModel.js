import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    homeAddress: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    youtubeLink: { type: String, required: true },
    referralCode: { type: String, required: true },
    isApproved: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);
const Referral = mongoose.model("Referral", referralSchema);
export default Referral;
