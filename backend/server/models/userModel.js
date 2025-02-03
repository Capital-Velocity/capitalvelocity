import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    email: { type: String, require: true },
    phone: { type: String, default: false, required: true },
    password: { type: String, default: false, required: true },
    accessLendioToken: { type: String },
    accessLendioTokenExpires: { type: Date },
    lendioJWT: { type: String },
    referralCode: { type: String },
    lendioJWTExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
