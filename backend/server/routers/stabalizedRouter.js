import express from "express";
import expressAsyncHandler from "express-async-handler";
import StableBridge from "../models/stabilizedbridgeModel.js";
import mailgun from "mailgun-js";

const apiKey = "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379";
const mg = mailgun({ apiKey, domain: "capitalvelocity.com" });
const stabalizedRouter = express.Router();

// stabalizedRouter.post(
//   "/addStabilizedBridge",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const stabalized = new StableBridge({
//         additonalPropertyInfo: req.body.additonalPropertyInfo,
//         addressCity: req.body.addressCity,
//         addressState: req.body.addressState,
//         addressZip: req.body.addressZip,
//         armsLengthDescription: req.body.armsLengthDescription,
//         asIsValue: req.body.asIsValue,
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
//         completedCapex: req.body.completedCapex,
//         contactLastName: req.body.contactLastName,
//         dateofIncorp: req.body.dateofIncorp,
//         entityAddress: req.body.entityAddress,
//         entityName: req.body.entityName,
//         entityType: req.body.entityType,
//         experienceWithRealEstate: req.body.experienceWithRealEstate,
//         firstName: req.body.firstName,
//         grossMonthlyRent: req.body.grossMonthlyRent,
//         homeAddress: req.body.homeAddress,
//         insuranceCompany: req.body.insuranceCompany,
//         isCondominium: req.body.isCondominium,
//         personallyGuranteeing: req.body.personallyGuranteeing,
//         preferredClosingAttorney: req.body.preferredClosingAttorney,
//         propertyMonthlyHOAFee: req.body.propertyMonthlyHOAFee,
//         propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
//         propertyMonthlyOtherExpenses: req.body.propertyMonthlyOtherExpenses,
//         propertyMonthlyTaxes: req.body.propertyMonthlyTaxes,
//         propertySource: req.body.propertySource,
//         propertyType: req.body.propertyType,
//         purchaseDate: req.body.purchaseDate,
//         purchasePriceProperty: req.body.purchasePriceProperty,
//         purchaseorRefinance: req.body.purchaseorRefinance,
//         renovationDescript: req.body.renovationDescript, // Array of strings
//         socialSecurity: req.body.socialSecurity,
//         titleCompany: req.body.titleCompany,
//         userEmail: req.body.userEmail,
//       });

//       const createdstabalized = await stabalized.save();
//       res.json(createdstabalized);
//     } catch (error) {
//       res.status(401).send({ message: error });
//     }
//   })
// );

stabalizedRouter.post(
  "/addStabilizedBridge",
  expressAsyncHandler(async (req, res) => {
    try {
      // 1. Save to database
      const stabalized = new StableBridge({ ...req.body });
      const createdstabalized = await stabalized.save();

      // 2. Human-readable labels
      const fieldLabels = {
        firstName: "First Name",
        borrowerLast: "Last Name",
        borrowerEmail: "Email",
        borrowerCell: "Phone Number",
        borrowerCitizenship: "Citizenship",
        personallyGuranteeing:
          "How experienced with investing is the borrower?",
        experienceWithRealEstate:
          "Borrower's experience as a real estate investor",
        bestTerms: "Is this an arm's length transaction",
        armsLengthDescription: "Arm's Length Description",

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
        addressCity: "City",
        addressState: "State",
        addressZip: "Zip Code",
        propertyType: "Property Type",
        propertySource: "Property Source",
        purchasePriceProperty: "Purchase Price",
        isCondominium: "Is Condominium?",
        renovationDescript: "Renovation Description",
        purchaseorRefinance: "Purchase or Refinance",
        purchaseDate: "Purchase Date",
        completedCapex: "Completed Capex",
        asIsValue: "As-Is Value",
        grossMonthlyRent: "Gross Monthly Rent",
        propertyMonthlyTaxes: "Monthly Taxes",
        propertyMonthlyInsurance: "Monthly Insurance",
        propertyMonthlyHOAFee: "Monthly HOA Fee",
        propertyMonthlyOtherExpenses: "Other Monthly Expenses",
        preferredClosingAttorney: "Preferred Closing Attorney",
        closingDate: "Closing Date",
        insuranceCompany: "Insurance Company",
        titleCompany: "Title Company",
        birthMonth: "Birth Month",
        birthDate: "Birth Date",
        birthYear: "Birth Year",
        socialSecurity: "Social Security Number",
        additonalPropertyInfo: "Additional Property Info",
        ficoScore: "FICO Score",
        uploadedDocuments: "Uploaded Documents",
        userEmail: "Applicant Email",
      };

      // 3. Format email rows
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

      // 4. Build email
      const emailData = {
        from: "Capital Velocity <no-reply@capitalvelocity.com>",
        to: ["logan@andrewcartwright.com", "info@capitalvelocity.com"], // multiple recipients
        subject: "New Cashed Out Refinance Loan Submission - Capital Velocity",
        html: `
  <div style="background-color: #f2f2f2; padding: 40px 0;">
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; color: #333;">
      <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
        <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
      </div>

      <h2 style="color: #2a2a2a;">Hi there,</h2>
      <p style="font-size: 16px; line-height: 1.6;">
        A new cashed out refinance loan inquiry has been submitted.
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

      // 5. Send email
      mg.messages().send(emailData, (error, body) => {
        if (error) {
          console.error("Mailgun error:", error);
        } else {
          console.log("Mailgun response:", body);
        }
      });

      res.json(createdstabalized);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })
);

stabalizedRouter.get(
  "/getAllStabalized",
  expressAsyncHandler(async (req, res) => {
    try {
      const stabalized = await StableBridge.find({});
      res.json(stabalized);
    } catch (error) {
      res.status(500).send({ message: "Error fetching referrals" });
    }
  })
);

export default stabalizedRouter;
