import express from "express";
import expressAsyncHandler from "express-async-handler";
import SingleProperty from "../models/singlePropertyModel.js";
import Referral from "../models/referralModel.js";
import mailgun from "mailgun-js";

const apiKey = "0294becf0e814cdbdc96235a75093505-f3238714-90618b40";
const mg = mailgun({ apiKey, domain: "grantvelocity.com" });
const singlePropertyRouter = express.Router();

singlePropertyRouter.post(
  "/addSingleProperty",
  expressAsyncHandler(async (req, res) => {
    try {
      const { referralCode } = req.body;
      let referralInfo = null;

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

      const newSingleProperty = new SingleProperty({
        ...req.body,
        referralInfo,
      });

      const savedSingleProperty = await newSingleProperty.save();

      const fieldLabels = {
        firstName: "First Name",
        borrowerLast: "Last Name",
        borrowerEmail: "Email",
        borrowerCell: "Phone Number",
        borrowerCitizenship: "Citizenship Status",
        personallyGuranteeing: "Borrower's Investment Experience",
        experienceWithRealEstate: "Real Estate Experience",
        bestTerms: "Arm's Length Transaction",
        armsLengthDescription: "Arm's Length Description",
        authorizedSignatory: "Authorized Signatory",
        borrowingEntityInformation: "Entity Information Provided?",
        entityName: "Entity Name",
        entityType: "Entity Type",
        dateofIncorp: "Date of Incorporation",
        contactLastName: "Entity Contact Last Name",
        entityAddress: "Entity Address",
        borrowingEntityOwned: "Entity Ownership Percentage",
        propertyAddress: "Property Address",
        addressCity: "City",
        addressZip: "Zip Code",
        addressState: "State",
        propertyType: "Property Type",
        propertySource: "Property Source",
        isCondominium: "Is Condominium?",
        renovationDescript: "Renovation Description",
        exitStrat: "Exit Strategy",
        cashOut: "Cash Out",
        purchaseDate: "Purchase Date",
        purchasePriceProperty: "Purchase Price",
        investedCapital: "Invested Capital + Remaining Budget",
        completedCapex: "Completed Capex",
        asIsValue: "As-Is Value",
        background: "Opportunity Background/Story",
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
        referralCode: "Referral Code",
      };

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

      const emailData = {
        from: "Capital Velocity <no-reply@capitalvelocity.com>",
        to: ["anthony@andrewcartwright.com", "info@capitalvelocity.com"],
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

              ${referralFields}

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
      console.error(error);
      res.status(500).json({
        message: "Error adding single property",
        error: error.message,
      });
    }
  })
);

singlePropertyRouter.get(
  "/getAllSingle",
  expressAsyncHandler(async (req, res) => {
    try {
      const singleProperties = await SingleProperty.find({});
      res.json(singleProperties);
    } catch (error) {
      res.status(500).send({ message: "Error fetching single properties" });
    }
  })
);

export default singlePropertyRouter;
