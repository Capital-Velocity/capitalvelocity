import express from "express";
import expressAsyncHandler from "express-async-handler";
import SingleProperty from "../models/singlePropertyModel.js";
import mailgun from "mailgun-js";

const apiKey = "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379";
const mg = mailgun({ apiKey, domain: "capitalvelocity.com" });
const singlePropertyRouter = express.Router();

// singlePropertyRouter.post(
//   "/addSingleProperty",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       // Create a new SingleProperty document using the request body
//       const newSingleProperty = new SingleProperty({
//         userEmail: req.body.userEmail,
//         firstName: req.body.firstName,
//         borrowerLast: req.body.borrowerLast,
//         borrowerEmail: req.body.borrowerEmail,
//         borrowerCell: req.body.borrowerCell,
//         borrowerCitizenship: req.body.borrowerCitizenship,
//         personallyGuranteeing: req.body.personallyGuranteeing,
//         experienceWithRealEstate: req.body.experienceWithRealEstate,
//         bestTerms: req.body.bestTerms,
//         armsLengthDescription: req.body.armsLengthDescription,
//         authorizedSignatory: req.body.authorizedSignatory,
//         borrowingEntityInformation: req.body.borrowingEntityInformation,
//         entityName: req.body.entityName,
//         entityType: req.body.entityType,
//         dateofIncorp: req.body.dateofIncorp,
//         contactLastName: req.body.contactLastName,
//         entityAddress: req.body.entityAddress,
//         borrowingEntityOwned: req.body.borrowingEntityOwned,
//         propertyAddress: req.body.propertyAddress,
//         addressCity: req.body.addressCity,
//         addressZip: req.body.addressZip,
//         addressState: req.body.addressState,
//         propertyType: req.body.propertyType,
//         purchaseorRefinance: req.body.purchaseorRefinance,
//         propertySource: req.body.propertySource,
//         isCondominium: req.body.isCondominium,
//         renovationDescript: req.body.renovationDescript, // Array of strings
//         exitStrat: req.body.exitStrat,
//         cashOut: req.body.cashOut,
//         purchaseDate: req.body.purchaseDate,
//         purchasePriceProperty: req.body.purchasePriceProperty,
//         investedCapital: req.body.investedCapital,
//         completedCapex: req.body.completedCapex,
//         asIsValue: req.body.asIsValue,
//         background: req.body.background,
//         redFlags: req.body.redFlags,
//         loanPurpose: req.body.loanPurpose,
//         grossMonthlyRent: req.body.grossMonthlyRent,
//         propertyMonthlyTaxes: req.body.propertyMonthlyTaxes,
//         propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
//         propertyMonthlyHOAFee: req.body.propertyMonthlyHOAFee,
//         propertyMonthlyOtherExpenses: req.body.propertyMonthlyOtherExpenses,
//         preferredClosingAttorney: req.body.preferredClosingAttorney,
//         closingDate: req.body.closingDate,
//         insuranceCompany: req.body.insuranceCompany,
//         titleCompany: req.body.titleCompany,
//         birthMonth: req.body.birthMonth,
//         birthDate: req.body.birthDate,
//         birthYear: req.body.birthYear,
//         socialSecurity: req.body.socialSecurity,
//       });

//       // Save the new single property to the database
//       const savedSingleProperty = await newSingleProperty.save();

//       res.status(201).json(savedSingleProperty);
//     } catch (error) {
//       res.status(500).json({
//         message: "Error adding single property",
//         error: error.message,
//       });
//     }
//   })
// );

singlePropertyRouter.post(
  "/addSingleProperty",
  expressAsyncHandler(async (req, res) => {
    try {
      // 1. Save to database
      const newSingleProperty = new SingleProperty({ ...req.body });
      const savedSingleProperty = await newSingleProperty.save();

      // 2. Human-friendly field labels
      const fieldLabels = {
        firstName: "First Name",
        borrowerLast: "Last Name",
        borrowerEmail: "Email",
        borrowerCell: "Phone Number",
        borrowerCitizenship: "Citizenship Status",
        personallyGuranteeing:
          "How experienced with investing is the borrower?",
        experienceWithRealEstate:
          "Borrower's experience as a real estate investor",
        bestTerms: "Is this an arm's length transaction?",
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

        propertyAddress: "Property Address",
        addressCity: "City",
        addressZip: "Zip Code",
        addressState: "State",
        propertyType: "Property Type",
        propertySource: "How is the property being sourced?",
        isCondominium: "Is Condominium?",
        renovationDescript: "Renovation Description",
        exitStrat: "Exit Strategy",
        cashOut: "Cash Out",
        purchaseDate: "Purchase Date",
        purchasePriceProperty: "Purchase Price",
        investedCapital:
          "What is the renovation budget including renovation capital that has already been invested plus the amount required to complete the project?",
        completedCapex: "Completed Capex",
        asIsValue: "As-Is Value",
        background:
          "Please outline the background / story for this opportunity",
        redFlags: "Red Flags",
        loanPurpose: "Loan Purpose",

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
        ficoScore: "FICO Score",

        uploadedDocuments: "Uploaded Documents",
        userEmail: "Applicant Email",
      };

      // 3. Build email rows
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

      // 4. Compose and send email
      const emailData = {
        from: "Capital Velocity <no-reply@capitalvelocity.com>",
        to: ["logan@andrewcartwright.com", "info@capitalvelocity.com"],
        subject:
          "New Single Property Rental Loan Submission - Capital Velocity",
        html: `
    <div style="background-color: #f2f2f2; padding: 40px 0;">
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; color: #333;">
        <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
          <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
        </div>

        <h2 style="color: #2a2a2a;">Hi there,</h2>
        <p style="font-size: 16px; line-height: 1.6;">
          A new single property loan inquiry has been submitted via the platform.
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

      mg.messages().send(emailData, function (error, body) {
        if (error) {
          console.error("Mailgun error:", error);
        } else {
          console.log("Mailgun response:", body);
        }
      });

      res.status(201).json(savedSingleProperty);
    } catch (error) {
      res.status(500).json({
        message: "Error adding single property",
        error: error.message,
      });
    }
  })
);

// Fetch all the single property applications
singlePropertyRouter.get(
  "/getAllSingle",
  expressAsyncHandler(async (req, res) => {
    try {
      const singleProperties = await SingleProperty.find({}); // Retrieve all records in the SingleProperty collection
      res.json(singleProperties);
    } catch (error) {
      res.status(500).send({ message: "Error fetching single properties" });
    }
  })
);

export default singlePropertyRouter;
