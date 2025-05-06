import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import MultiFam from "../models/multiFamModel.js";
import mailgun from "mailgun-js";

const apiKey = "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379";
const mg = mailgun({ apiKey, domain: "capitalvelocity.com" });
const multiFamRouter = express.Router();

// multiFamRouter.post(
//   "/addMultiFam",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const multiFamData = new MultiFam({
//         addressCity: req.body.addressCity,
//         addressState: req.body.addressState,
//         addressZip: req.body.addressZip,
//         afterRepairValue: req.body.afterRepairValue,
//         annualAdministrativeManagementFees:
//           req.body.annualAdministrativeManagementFees,
//         annualHOADues: req.body.annualHOADues,
//         annualInsurance: req.body.annualInsurance,
//         annualMarketingExpense: req.body.annualMarketingExpense,
//         annualPayrollExpense: req.body.annualPayrollExpense,
//         annualPropertyManagementFees: req.body.annualPropertyManagementFees,
//         annualRepairsMaintenanceExpenses:
//           req.body.annualRepairsMaintenanceExpenses,
//         annualReplacementReserve: req.body.annualReplacementReserve,
//         annualTaxes: req.body.annualTaxes,
//         annualUtilitiesExpenses: req.body.annualUtilitiesExpenses,
//         asIsValue: req.body.asIsValue,
//         authorizedSignatory: req.body.authorizedSignatory,
//         background: req.body.background,
//         birthDate: req.body.birthDate,
//         birthMonth: req.body.birthMonth,
//         birthYear: req.body.birthYear,
//         borrowerCitizenshipStatus: req.body.borrowerCitizenshipStatus,
//         borrowerEmail: req.body.borrowerEmail,
//         borrowingEntityInformation: req.body.borrowingEntityInformation,
//         borrowingEntityOwned: req.body.borrowingEntityOwned,
//         cashOut: req.body.cashOut,
//         closingDate: req.body.closingDate,
//         completedCapex: req.body.completedCapex,
//         contactLastName: req.body.contactLastName,
//         dateofIncorp: req.body.dateofIncorp,
//         debt: req.body.debt,
//         debtValue: req.body.debtValue,
//         entityAddress: req.body.entityAddress,
//         entityName: req.body.entityName,
//         entityType: req.body.entityType,
//         exitStrat: req.body.exitStrat,
//         firstName: req.body.firstName,
//         grossMonthlyRent: req.body.grossMonthlyRent,
//         homeAddress: req.body.homeAddress,
//         insuranceCompany: req.body.insuranceCompany,
//         investedCapital: req.body.investedCapital,
//         isCondominium: req.body.isCondominium,
//         lastName: req.body.lastName,
//         liquidity: req.body.liquidity,
//         personallyGuranteeing: req.body.personallyGuranteeing,
//         phoneNumber: req.body.phoneNumber,
//         preferredClosingAttorney: req.body.preferredClosingAttorney,
//         propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
//         propertyMonthlyPropertyTaxes: req.body.propertyMonthlyPropertyTaxes,
//         propertyMonthlyUtilityBills: req.body.propertyMonthlyUtilityBills,
//         propertyOtherMonthlyExpenses: req.body.propertyOtherMonthlyExpenses,
//         propertyPurchasePrice: req.body.propertyPurchasePrice,
//         propertyRehabCost: req.body.propertyRehabCost,
//         propertySource: req.body.propertySource,
//         propertyType: req.body.propertyType,
//         purchaseDate: req.body.purchaseDate,
//         purchaseorRefinance: req.body.purchaseorRefinance,
//         redFlags: req.body.redFlags,
//         renovationDescript: req.body.renovationDescript, // Array of strings
//         socialSecurity: req.body.socialSecurity,
//         titleCompany: req.body.titleCompany,
//         userEmail: req.body.userEmail,
//       });

//       const createdMultiFam = await multiFamData.save();
//       res.json(createdMultiFam);
//     } catch (error) {
//       res.status(401).send({ message: error });
//     }
//   })
// );

multiFamRouter.post(
  "/addMultiFam",
  expressAsyncHandler(async (req, res) => {
    try {
      // 1. Save to database
      const multiFamData = new MultiFam({ ...req.body });
      const createdMultiFam = await multiFamData.save();

      // 2. Define user-friendly labels
      const fieldLabels = {
        firstName: "First Name",
        lastName: "Last Name",
        borrowerEmail: "Email Address",
        phoneNumber: "Phone Number",
        borrowerCitizenshipStatus: "Citizenship Status",
        personallyGuranteeing:
          "Borrower's experience with 5+ unit multifamily and/or mixed-use properties",
        liquidity: "Liquidity",

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
        exitStrat: "Exit Strategy",
        cashOut: "Is the person looking for cash-out?",
        debt: "Is there any debt?",
        debtValue: "How much debt is there?",
        grossMonthlyRent: "Gross Monthly Rent",
        annualTaxes: "Annual Taxes",
        annualInsurance: "Annual Insurance",
        annualHOADues: "Annual HOA Dues",
        annualUtilitiesExpenses: "Annual Utilities Expenses",
        annualRepairsMaintenanceExpenses:
          "Annual Repairs & Maintenance Expenses",
        annualPropertyManagementFees: "Annual Property Management Fees",
        annualAdministrativeManagementFees:
          "Annual Administrative Management Fees",
        annualPayrollExpense: "Annual Payroll Expense",
        annualMarketingExpense: "Annual Marketing Expense",
        annualReplacementReserve: "Annual Replacement Reserve",
        purchaseDate: "Purchase Date",
        investedCapital:
          "What is the renovation budget including renovation capital that has already been invested plus the amount required to complete the project?",
        completedCapex:
          "How much has been invested in completed capex to date?",
        asIsValue: "What is the As-Is Value?",
        background: "Please outline the background/story for this opportunity",
        redFlags: "Outline all of the red flags/concerns",

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

      // 3. Build the HTML table
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

      // 4. Compose the email
      const emailData = {
        from: "Capital Velocity <no-reply@capitalvelocity.com>",
        to: ["logan@andrewcartwright.com", "info@capitalvelocity.com"],
        subject: "New Multifamily Bridge Loan Submission - Capital Velocity",
        html: `
    <div style="background-color: #f2f2f2; padding: 40px 0;">
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; color: #333;">
        <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
          <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
        </div>

        <h2 style="color: #2a2a2a;">Hi there,</h2>
        <p style="font-size: 16px; line-height: 1.6;">
          A new multifamily loan inquiry has been submitted via the platform.
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

      // 5. Send the email
      mg.messages().send(emailData, function (error, body) {
        if (error) {
          console.error("Mailgun error:", error);
        } else {
          console.log("Mailgun sent:", body);
        }
      });

      res.json(createdMultiFam);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Failed to submit application" });
    }
  })
);

export default multiFamRouter;
