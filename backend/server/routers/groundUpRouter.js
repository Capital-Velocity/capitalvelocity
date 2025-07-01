import express from "express";
import expressAsyncHandler from "express-async-handler";
import GroundUp from "../models/groundUpModel.js";
import Referral from "../models/referralModel.js";
import mailgun from "mailgun-js";

const apiKey = "0294becf0e814cdbdc96235a75093505-f3238714-90618b40";
const mg = mailgun({ apiKey, domain: "grantvelocity.com" });
const groundUpRouter = express.Router();

groundUpRouter.post(
  "/addGroundUp",
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

      const groundUpData = new GroundUp({
        ...req.body,
        referralInfo,
      });

      const createdGroundUp = await groundUpData.save();

      const fieldLabels = {
        firstName: "First Name",
        borrowerLast: "Last Name",
        borrowerEmail: "Email",
        borrowerCell: "Phone Number",
        borrowerCitizenship: "Citizenship",
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
        homeAddress: "Property Address",
        addressCity: "City",
        addressState: "State",
        addressZip: "Zip Code",
        propertyType: "Property Type",
        propertySource: "Property Source",
        propertyPurchasePrice: "Purchase Price",
        isCondominium: "Is Condominium?",
        renovationDescript: "Renovation Description",
        purchaseorRefinance: "Purchase or Refinance",
        proposedConstructionBudget: "Proposed Construction Budget",
        marketValueAfterCompletion: "Market Value After Completion",
        sellerCredit: "Seller Credit",
        permitsInPlace: "Permits In Place",
        ownedByBorrower: "Owned By Borrower",
        ownerOfRecord: "Owner of Record",
        subdividedIntoLots: "Subdivided Into Lots",
        exitStrategy: "Exit Strategy",
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
        additonalPropertyInfo: "Additional Property Info",
        asIsValue: "As-Is Value",
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
        subject: "New Ground Up Loan Submission - Capital Velocity",
        html: `
          <div style="background-color: #f2f2f2; padding: 40px 0;">
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; color: #333;">
              <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
              </div>

              <h2 style="color: #2a2a2a;">Hi there,</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                A new ground-up construction loan inquiry has been submitted.
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

      mg.messages().send(emailData, (error, body) => {
        if (error) {
          console.error("Mailgun error:", error);
        } else {
          console.log("Mailgun sent:", body);
        }
      });

      res.json(createdGroundUp);
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: error.message });
    }
  })
);

groundUpRouter.get(
  "/getAllGroundUp",
  expressAsyncHandler(async (req, res) => {
    try {
      const groundUp = await GroundUp.find({});
      res.json(groundUp);
    } catch (error) {
      res.status(500).send({ message: "Error fetching GroundUp applications" });
    }
  })
);

export default groundUpRouter;
