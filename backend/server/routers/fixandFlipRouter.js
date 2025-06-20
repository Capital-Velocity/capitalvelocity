import express from "express";
import expressAsyncHandler from "express-async-handler";
import FixForm from "../models/fixandFlipModel.js";
import Referral from "../models/referralModel.js";
import mailgun from "mailgun-js";

const apiKey = "0294becf0e814cdbdc96235a75093505-f3238714-90618b40";
const mg = mailgun({ apiKey, domain: "grantvelocity.com" });

const fixandflipRouter = express.Router();

fixandflipRouter.post(
  "/addFixandFlip",
  expressAsyncHandler(async (req, res) => {
    try {
      const { referralCode } = req.body;
      let referralInfo = null;

      // 🔎 Lookup referral code (must be approved)
      if (referralCode) {
        const referralRecord = await Referral.findOne({
          referralCode,
          isApproved: true,
        });

        if (referralRecord) {
          referralInfo = {
            firstName: referralRecord.firstName,
            lastName: referralRecord.lastName,
            email: referralRecord.email,
            phone: referralRecord.phone,
            city: referralRecord.city,
            state: referralRecord.state,
            youtubeLink: referralRecord.youtubeLink,
          };
        }
      }

      // Save form with referralInfo attached
      const fixandFlip = new FixForm({
        ...req.body,
        referralInfo,
      });

      const createdfixandFlip = await fixandFlip.save();

      // ✅ Field labels for display
      const fieldLabels = {
        firstName: "First Name",
        borrowerLast: "Last Name",
        borrowerEmail: "Email Address",
        borrowerCell: "Phone Number",
        borrowerCitizenship: "Citizenship Status",
        personallyGuranteeing: "How experienced with investing is the borrower",
        experienceWithRealEstate:
          "Borrower's experience as a real estate investor",
        bestTerms: "Is this an arm's length transaction?",
        armsLengthDescription: "Description of arm's length transaction",
        authorizedSignatory: "Is the borrower an authorized signatory?",
        borrowingEntityInformation:
          "Do they have the borrowing entity information?",
        entityName: "Entity Name",
        entityType: "Entity Type",
        dateofIncorp: "Entity Date of Incorporation",
        contactLastName: "Entity Contact Last Name",
        entityAddress: "Entity Address",
        borrowingEntityOwned: "Borrowing Entity Ownership Percentage",
        homeAddress: "Property Address",
        addressCity: "Property City",
        addressZip: "Property Zip Code",
        addressState: "Property State",
        propertyType: "Property Type",
        purchaseorRefinance: "Purchase or Refinance?",
        propertySource: "Property Source",
        isCondominium: "Is Property a Condominium?",
        renovationDescript: "Renovation Description",
        exitStrategy: "Exit Strategy",
        additionalPropertyInfo: "Additional Property Info",
        propertyPurchasePrice: "Purchase Price",
        propertyRehabCost: "Rehab Cost",
        propertyMonthlyPropertyTaxes: "Monthly Property Taxes",
        propertyMonthlyInsurance: "Monthly Insurance",
        propertyMonthlyUtilityBills: "Monthly Utility Bills",
        propertyOtherMonthlyExpenses: "Other Monthly Expenses",
        afterRepairValue: "After Repair Value",
        preferredClosingAttorney: "Preferred Closing Attorney",
        closingDate: "Preferred Closing Date",
        insuranceCompany: "Preferred Insurance Company",
        titleCompany: "Preferred Title Company",
        birthMonth: "Birth Month",
        birthDate: "Birth Date",
        birthYear: "Birth Year",
        socialSecurity: "Social Security Number",
        ficoScore: "FICO Score",
        uploadedDocuments: "Uploaded Documents",
        userEmail: "Submitted By (User Email)",
        referralCode: "Referral Code",
      };

      // ✅ Build form fields table
      const fields = Object.entries(req.body)
        .map(([key, value]) => {
          const label = fieldLabels[key] || key;
          const displayValue = Array.isArray(value) ? value.join(", ") : value;
          return `
            <tr>
              <td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>${label}</strong></td>
              <td style="padding: 6px 12px; border: 1px solid #ccc;">${displayValue}</td>
            </tr>
          `;
        })
        .join("");

      // ✅ Add Referral Info Table (if exists)
      const referralFields = referralInfo
        ? `
          <h3 style="color: #2a2a2a;">The person who applied for this loan used a referral code. Here is the information of the person that referred them:</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px;">
            <tr><td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>First Name</strong></td><td style="padding: 6px 12px; border: 1px solid #ccc;">${referralInfo.firstName}</td></tr>
            <tr><td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>Last Name</strong></td><td style="padding: 6px 12px; border: 1px solid #ccc;">${referralInfo.lastName}</td></tr>
            <tr><td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>Email</strong></td><td style="padding: 6px 12px; border: 1px solid #ccc;">${referralInfo.email}</td></tr>
            <tr><td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>Phone</strong></td><td style="padding: 6px 12px; border: 1px solid #ccc;">${referralInfo.phone}</td></tr>
            <tr><td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>City</strong></td><td style="padding: 6px 12px; border: 1px solid #ccc;">${referralInfo.city}</td></tr>
            <tr><td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>State</strong></td><td style="padding: 6px 12px; border: 1px solid #ccc;">${referralInfo.state}</td></tr>
            <tr><td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>YouTube Link</strong></td><td style="padding: 6px 12px; border: 1px solid #ccc;">${referralInfo.youtubeLink}</td></tr>
          </table>
        `
        : "";

      // ✅ Compose email content
      const emailData = {
        from: "Capital Velocity <no-reply@capitalvelocity.com>",
        to: ["logan@andrewcartwright.com", "info@capitalvelocity.com"],
        subject: "New Fix and Flip Form Submission - Capital Velocity",
        html: `
          <div style="background-color: #f2f2f2; padding: 40px 0;">
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; color: #333;">
              <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
              </div>

              <h2 style="color: #2a2a2a;">Hi there,</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                There was a new submission for a Capital Velocity loan.
              </p>

              <hr style="margin: 30px 0;" />

              <h3 style="color: #2a2a2a;">Submitted Application Details:</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                ${fields}
              </table>

              ${referralFields}

              <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
                © 2025 Capital Velocity, All rights reserved.
              </p>
            </div>
          </div>
        `,
      };

      // ✅ Send the email
      mg.messages().send(emailData, function (error, body) {
        if (error) {
          console.error("Mailgun error:", error);
        } else {
          console.log("Mailgun response:", body);
        }
      });

      res.json(createdfixandFlip);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: error.message || "Failed to submit application" });
    }
  })
);

// Fetch all Fix and Flip applications
fixandflipRouter.get(
  "/getAllFixApplications",
  expressAsyncHandler(async (req, res) => {
    try {
      const fixandflip = await FixForm.find({});
      res.json(fixandflip);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error fetching fixandflip applications" });
    }
  })
);

export default fixandflipRouter;
