import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import fs from "fs";
import Referral from "../models/referralModel.js";
import mailgun from "mailgun-js";

const referralRouter = express.Router();

const mg = mailgun({
  apiKey: "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379",
  domain: "capitalvelocity.com",
});

// referralRouter.post(
//   "/addReferral",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const referral = new Referral({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         homeAddress: req.body.homeAddress,
//         city: req.body.city,
//         zipCode: req.body.zipCode,
//         state: req.body.state,
//         phone: req.body.phone,
//         email: req.body.email,
//         youtubeLink: req.body.youtubeLink,
//         referralCode: req.body.referralCode,
//       });
//       const createdReferral = await referral.save();
//       res.json(createdReferral);
//     } catch (error) {
//       res.status(401).send({ message: error });
//     }
//   })
// );

referralRouter.post(
  "/addReferral",
  expressAsyncHandler(async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        homeAddress,
        city,
        zipCode,
        state,
        phone,
        email,
        youtubeLink,
      } = req.body;

      // Check if email already exists
      const existingReferral = await Referral.findOne({ email });
      if (existingReferral) {
        return res
          .status(400)
          .json({ message: "This email is already registered as a partner." });
      }

      let referralCode;
      let isUnique = false;

      // Keep generating a new referral code until it's unique
      while (!isUnique) {
        referralCode = `${firstName.toUpperCase()}${Math.floor(
          10000 + Math.random() * 90000
        )}`;
        const existingCode = await Referral.findOne({ referralCode });
        if (!existingCode) {
          isUnique = true;
        }
      }

      // Create and save referral
      const referral = new Referral({
        firstName,
        lastName,
        homeAddress,
        city,
        zipCode,
        state,
        phone,
        email,
        youtubeLink,
        referralCode,
      });

      const createdReferral = await referral.save();

      // Now send an email to them showing them their referral code
      const referralSignupLink = `https://capitalvelocity.com/register?ref=${referralCode}`;

      const emailData = {
        from: `info@capitalvelocity.com`,
        to: email, // You can use a default email if none is provided
        subject: "Capital Velocity Partner Program",
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Application Confirmation</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                  color: #333;
                }
                .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .content {
                  margin-bottom: 30px;
                }
                .button {
                  display: inline-block;
                  padding: 12px 20px;
                  background-color: #04ca31;
                  color: #fff;
                  text-decoration: none;
                  font-weight: bold;
                  border-radius: 4px;
                  text-align: center;
                }
                .footer {
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="content">
                  <h3>Thank you for becoming a Capital Velocity Partner! Below is your referral code and link for signups.</h3>
                  <p><strong>Referral Code:</strong> ${
                    referralCode || "Not Provided"
                  }</p>
                  <p><strong>Link for Referred Signups:</strong> 
                    <a href="${referralSignupLink}" target="_blank">${referralSignupLink}</a>
                  </p>
                </div>
                <div class="footer">
                  <img src="https://i.ibb.co/DSD7bkB/cvlogo.png" alt="Capital Velocity Logo" style="width: 200px; display: block; margin: 0 auto;">
                  <p>© 2025 Capital Velocity. All Rights Reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      mg.messages().send(emailData, (error, body) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send message" });
        }
        // console.log("Email sent:", body);

        // Send the response **only after** the email is successfully sent
        res.status(201).json(createdReferral);
      });
    } catch (error) {
      console.error("Error saving referral:", error);
      res.status(500).json({ message: "Internal server error" });
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
