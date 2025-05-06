import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import FixForm from "../models/fixandFlipModel.js";
import mailgun from "mailgun-js";

const apiKey = "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379";
const mg = mailgun({ apiKey, domain: "capitalvelocity.com" });

const fixandflipRouter = express.Router();

// fixandflipRouter.post(
//   "/addFixandFlip",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const fixandFlip = new FixForm({
//         additionalPropertyInfo: req.body.additionalPropertyInfo,
//         addressCity: req.body.addressCity,
//         addressState: req.body.addressState,
//         addressZip: req.body.addressZip,
//         afterRepairValue: req.body.afterRepairValue,
//         armsLengthDescription: req.body.armsLengthDescription,
//         authorizedSignatory: req.body.authorizedSignatory,
//         bestTerms: req.body.bestTerms,
//         birthDate: req.body.birthDate,
//         birthMonth: req.body.birthMonth,
//         birthYear: req.body.birthYear,
//         borrowerCell: req.body.borrowerCell,
//         borrowerCitizenship: req.body.borrowerCitizenship,
//         borrowerEmail: req.body.borrowerEmail,
//         borrowerLast: req.body.borrowerLast,
//         borrowingEntityInformation: req.body.borrowingEntityInformation,
//         borrowingEntityOwned: req.body.borrowingEntityOwned,
//         closingDate: req.body.closingDate,
//         contactLastName: req.body.contactLastName,
//         dateofIncorp: req.body.dateofIncorp,
//         entityAddress: req.body.entityAddress,
//         entityName: req.body.entityName,
//         entityType: req.body.entityType,
//         experienceWithRealEstate: req.body.experienceWithRealEstate,
//         exitStrategy: req.body.exitStrategy,
//         ficoScore: req.body.ficoScore,
//         firstName: req.body.firstName,
//         homeAddress: req.body.homeAddress,
//         insuranceCompany: req.body.insuranceCompany,
//         isCondominium: req.body.isCondominium,
//         personallyGuranteeing: req.body.personallyGuranteeing,
//         preferredClosingAttorney: req.body.preferredClosingAttorney,
//         propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
//         propertyMonthlyPropertyTaxes: req.body.propertyMonthlyPropertyTaxes,
//         propertyMonthlyUtilityBills: req.body.propertyMonthlyUtilityBills,
//         propertyOtherMonthlyExpenses: req.body.propertyOtherMonthlyExpenses,
//         propertyPurchasePrice: req.body.propertyPurchasePrice,
//         propertyRehabCost: req.body.propertyRehabCost,
//         propertySource: req.body.propertySource,
//         propertyType: req.body.propertyType,
//         purchaseorRefinance: req.body.purchaseorRefinance,
//         renovationDescript: req.body.renovationDescript,
//         socialSecurity: req.body.socialSecurity,
//         titleCompany: req.body.titleCompany,
//         uploadedDocuments: req.body.uploadedDocuments,
//         userEmail: req.body.userEmail,
//       });

//       const createdfixandFlip = await fixandFlip.save();
//       res.json(createdfixandFlip);
//     } catch (error) {
//       res.status(401).send({ message: error });
//     }
//   })
// );

fixandflipRouter.post(
  "/addFixandFlip",
  expressAsyncHandler(async (req, res) => {
    try {
      // 1. Save to database
      const fixandFlip = new FixForm({ ...req.body });
      const createdfixandFlip = await fixandFlip.save();

      // ✅ Define user-friendly field labels
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
        borrowingEntityOwned:
          "What percentage of the borrowing entity does the borrower own?",
        homeAddress: "Property Address",
        addressCity: "Property City",
        addressZip: "Property Zip Code",
        addressState: "Property State",
        propertyType: "Property Type",
        purchaseorRefinance: "Purchase or Refinance?",
        propertySource: "How is the property being sourced?",
        isCondominium: "Is the property being converted to condominiums?",
        renovationDescript: "Please describe the renovation",
        exitStrategy: "Exit Strategy",
        additionalPropertyInfo: "Additional property comments",
        propertyPurchasePrice: "Property Purchase Price",
        propertyRehabCost: "Property Rehab Cost",
        propertyMonthlyPropertyTaxes: "Property Taxes (Monthly)",
        propertyMonthlyInsurance: "Property Monthly Insurance",
        propertyMonthlyUtilityBills: "Property Monthly Utility Bills",
        propertyOtherMonthlyExpenses: "Property Other Monthly Expenses",
        afterRepairValue: "Property After Repair Value",
        preferredClosingAttorney: "Preferred Closing Attorney",
        closingDate: "Preferred Closing Date",
        insuranceCompany: "Preferred Insurance Company",
        titleCompany: "Preferred Title Company",
        birthMonth: "Date of Birth (Month)",
        birthDate: "Date of Birth (Date)",
        birthYear: "Date of Birth (Year)",
        socialSecurity: "Social Security Number",
        ficoScore: "FICO Score",
        uploadedDocuments: "Uploaded Documents",
        userEmail: "Account of the person who submitted the form",
      };

      // 2. Build the HTML table for the fields
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

      // 3. Compose email content
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

        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
          © 2025 Capital Velocity, All rights reserved.
        </p>
      </div>
    </div>
        `,
      };

      // 4. Send the email
      mg.messages().send(emailData, function (error, body) {
        if (error) {
          console.error("Mailgun error:", error);
        } else {
          console.log("Mailgun response:", body);
        }
      });

      res.json(createdfixandFlip);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Failed to submit application" });
    }
  })
);

// Fetch all the fixandFlip applications
fixandflipRouter.get(
  "/getAllFixApplications",
  expressAsyncHandler(async (req, res) => {
    try {
      const fixandflip = await FixForm.find({}); // Retrieve all records in the FixForm collection
      res.json(fixandflip);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error fetching fixandflip applications" });
    }
  })
);

export default fixandflipRouter;
