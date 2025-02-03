// routes/users.js

import express from "express";
import CalculatorUser from "../models/calculatorFormModel.js";

const calcFormRouter = express.Router();

// POST route to store user info
calcFormRouter.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    // Create a new user instance
    const newUser = new CalculatorUser({
      firstName,
      lastName,
      email,
      phone,
    });

    // Save user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save user information" });
  }
});

export default calcFormRouter;
