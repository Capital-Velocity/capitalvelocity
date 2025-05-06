import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import Rental from "../models/rentalModel.js";
import mailgun from "mailgun-js";

const apiKey = "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379";
const mg = mailgun({ apiKey, domain: "capitalvelocity.com" });
const rentalRouter = express.Router();

// rentalRouter.post(
//   "/addRentalGroup",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       // Create a new Rental document using the request body
//       const newRental = new Rental({
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
//         firstName: req.body.firstName,
//         grossMonthlyRent: req.body.grossMonthlyRent,
//         insuranceCompany: req.body.insuranceCompany,
//         loanPurpose: req.body.loanPurpose,
//         personallyGuranteeing: req.body.personallyGuranteeing,
//         portfolioProperties: req.body.portfolioProperties, // Array of portfolio properties
//         preferredClosingAttorney: req.body.preferredClosingAttorney,
//         propertyMan: req.body.propertyMan,
//         purchasePriceProperty: req.body.purchasePriceProperty,
//         socialSecurity: req.body.socialSecurity,
//         state: req.body.state,
//         titleCompany: req.body.titleCompany,
//         userEmail: req.body.userEmail,
//       });

//       // Save the new rental document to the database
//       const savedRental = await newRental.save();

//       res.status(201).json(savedRental);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error creating rental group", error: error.message });
//     }
//   })
// );

rentalRouter.post(
  "/addRentalGroup",
  expressAsyncHandler(async (req, res) => {
    try {
      // 1. Save to database
      const newRental = new Rental({ ...req.body });
      const savedRental = await newRental.save();

      // 2. Human-readable field labels
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

        state: "State",
        portfolioProperties: "Portfolio Properties",
        loanPurpose: "Loan Purpose",
        purchasePriceProperty: "Purchase Price",
        propertyMan: "Property Management",
        grossMonthlyRent: "Gross Monthly Rent",

        insuranceCompany: "Insurance Company",
        preferredClosingAttorney: "Preferred Closing Attorney",
        closingDate: "Closing Date",
        titleCompany: "Title Company",
        birthMonth: "Birth Month",
        birthDate: "Birth Date",
        birthYear: "Birth Year",
        socialSecurity: "Social Security Number",
        userEmail: "Applicant Email",
      };

      // 3. Format email fields into a table
      const fields = Object.entries(req.body)
        .map(([key, value]) => {
          const label = fieldLabels[key] || key;

          // Handle array of property objects
          if (key === "portfolioProperties" && Array.isArray(value)) {
            const propertiesTable = value
              .map((property, idx) => {
                const propertyRows = Object.entries(property)
                  .map(
                    ([propKey, propValue]) => `
                    <tr>
                      <td style="padding: 4px 8px; border: 1px solid #ccc;">${propKey}</td>
                      <td style="padding: 4px 8px; border: 1px solid #ccc;">${propValue}</td>
                    </tr>
                  `
                  )
                  .join("");
                return `
                <div style="margin-bottom: 12px;">
                  <strong>Property ${idx + 1}</strong>
                  <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 6px;">
                    ${propertyRows}
                  </table>
                </div>
              `;
              })
              .join("");

            return `
            <tr>
              <td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>${label}</strong></td>
              <td style="padding: 6px 12px; border: 1px solid #ccc;">${propertiesTable}</td>
            </tr>
          `;
          }

          // Default handling
          const display = Array.isArray(value) ? value.join(", ") : value;
          return `
          <tr>
            <td style="padding: 6px 12px; border: 1px solid #ccc;"><strong>${label}</strong></td>
            <td style="padding: 6px 12px; border: 1px solid #ccc;">${display}</td>
          </tr>
        `;
        })
        .join("");

      // 4. Compose email content
      const emailData = {
        from: "Capital Velocity <no-reply@capitalvelocity.com>",
        to: ["logan@andrewcartwright.com", "info@capitalvelocity.com"],
        subject: "New Rental Portfolio Loan Submission - Capital Velocity",
        html: `
  <div style="background-color: #f2f2f2; padding: 40px 0;">
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; color: #333;">
      <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
        <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
      </div>

      <h2 style="color: #2a2a2a;">Hi there,</h2>
      <p style="font-size: 16px; line-height: 1.6;">
        A new rental group loan inquiry has been submitted.
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

      res.status(201).json(savedRental);
    } catch (error) {
      res.status(500).json({
        message: "Error creating rental group",
        error: error.message,
      });
    }
  })
);

// Fetch all the rental applications
rentalRouter.get(
  "/getAllRental",
  expressAsyncHandler(async (req, res) => {
    try {
      const rental = await Rental.find({}); // Retrieve all records in the Rental collection
      res.json(rental);
    } catch (error) {
      res.status(500).send({ message: "Error fetching rentals" });
    }
  })
);

export default rentalRouter;
