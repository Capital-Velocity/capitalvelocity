import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import fs from "fs";
import Referral from "../models/referralModel.js";
const referralRouter = express.Router();

referralRouter.post(
  "/addReferral",
  expressAsyncHandler(async (req, res) => {
    try {
      const referral = new Referral({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        homeAddress: req.body.homeAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
        state: req.body.state,
        phone: req.body.phone,
        email: req.body.email,
        youtubeLink: req.body.youtubeLink,
        referralCode: req.body.referralCode,
      });
      const createdReferral = await referral.save();
      res.json(createdReferral);
    } catch (error) {
      res.status(401).send({ message: error });
    }
  })
);

// Fetch all users
referralRouter.get(
  "/getAllReferrals",
  expressAsyncHandler(async (req, res) => {
    try {
      const referrals = await Referral.find({}); // Retrieve all records in the Referral collection
      res.json(referrals);
    } catch (error) {
      res.status(500).send({ message: "Error fetching referrals" });
    }
  })
);

// Make sure the referalCode is there
referralRouter.get(
  "/check-referral-code/:code",
  expressAsyncHandler(async (req, res) => {
    const { code } = req.params;
    try {
      const referralCode = await Referral.findOne({ referralCode: code }); // Retrieve all records in the Referral collection
      if (referralCode.isApproved) {
        res.status(200).json({ isValid: true });
      } else {
        res.status(200).json({ isValid: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ isValid: false });
    }
  })
);

// Delete a referral by ID
referralRouter.delete(
  "/deleteReferral/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const referralId = req.params.id;

      // Use Mongoose to find and delete the record by ID
      const deletedReferral = await Referral.findByIdAndDelete(referralId);

      if (deletedReferral) {
        res.status(200).json({ message: "Referral deleted successfully" });
      } else {
        res.status(404).json({ message: "Referral not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting referral" });
    }
  })
);

// Delete a referral by ID
referralRouter.post(
  "/approveReferral/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const referralId = req.params.id;
      console.log(referralId);
      // Use Mongoose to find and delete the record by ID
      const application = await Referral.findOne({ _id: referralId });

      if (application) {
        application.isApproved = true;
        await application.save();
        res
          .status(200)
          .json({ message: "Referral application approved successfully" });
      } else {
        res.status(404).json({ message: "Referral application not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error approving referral" });
    }
  })
);

export default referralRouter;
