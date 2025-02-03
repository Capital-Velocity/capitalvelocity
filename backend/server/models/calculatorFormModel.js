// models/User.js

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const CalculatorUser = model("CalculatorUser", userSchema);

export default CalculatorUser;
