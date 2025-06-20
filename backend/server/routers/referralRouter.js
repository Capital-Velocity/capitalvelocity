import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import fs from "fs";
import Referral from "../models/referralModel.js";
import mailgun from "mailgun-js";

const referralRouter = express.Router();

const mg = mailgun({
  apiKey: "0294becf0e814cdbdc96235a75093505-f3238714-90618b40",
  domain: "grantvelocity.com",
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
        referralCode,
      });

      const createdReferral = await referral.save();

      // Now send an email to them showing them their referral code
      const referralSignupLink = `https://www.capitalvelocity.com/register?ref=${referralCode}`;

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
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="font-size: 18px; color: #333;">
            <h3>Thank you for becoming a Capital Velocity Partner! Below is your referral code.</h3>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 10px 0;">
            <p><strong>Referral Code:</strong> ${
              referralCode || "Not Provided"
            }</p>

            </td>
          </tr>
                                  <hr style="border: 0; height: 1px; background: #ddd; margin: 10px 0;">

          <tr>
            <td align="center" style="padding-top: 20px;">
              <div class="social-icons">
                <a href="https://facebook.com/Andrew-Cartwright-188861491183022" target="_blank"><img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook"></a>
                <a href="https://www.linkedin.com/company/capitalvelocity/" target="_blank"><img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn"></a>
                <a href="https://www.youtube.com/@andrewcartwright" target="_blank"><img src="https://img.icons8.com/color/48/youtube-play.png" alt="YouTube"></a>
              </div>
            </td>
          </tr>

                    <tr>
            <td align="center" style="padding-top: 20px;">
              <img src="https://i.ibb.co/DSD7bkB/cvlogo.png" alt="Capital Velocity Logo" width="150" style="display: block; margin: 0 auto;">
              <p style="font-size: 12px; color: #666;">© 2025 Capital Velocity. All Rights Reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>


        `,
      };

      // <!DOCTYPE html>
      // <html lang="en">
      // <head>
      //   <meta charset="UTF-8">
      //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
      //   <title>Application Confirmation</title>
      // </head>
      // <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
      //   <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      //     <tr>
      //       <td align="center" style="padding: 20px;">
      //         <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
      //           <tr>
      //             <td align="center" style="font-size: 18px; color: #333;">
      //       <h3>Thank you for becoming a Capital Velocity Partner! Below is your referral code and link for signups.</h3>
      //       <p><strong>Referral Code:</strong> ${referralCode || "Not Provided"}</p>
      //       <p><strong>Link for Referred Signups:</strong>
      //         <a href="${referralSignupLink}" target="_blank">${referralSignupLink}</a>
      //       </p>
      //             </td>
      //           </tr>
      //           <tr>
      //             <td align="center" style="padding-top: 20px;">
      //               <img src="https://i.ibb.co/DSD7bkB/cvlogo.png" alt="Capital Velocity Logo" width="200" style="display: block; margin: 0 auto;">
      //               <p style="font-size: 12px; color: #666;">© 2025 Capital Velocity. All Rights Reserved.</p>
      //             </td>
      //           </tr>
      //         </table>
      //       </td>
      //     </tr>
      //   </table>
      // </body>
      // </html>

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
