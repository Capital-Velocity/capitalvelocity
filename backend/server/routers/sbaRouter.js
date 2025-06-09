import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import SBA from "../models/sbaModel.js";
import mailgun from "mailgun-js";

const apiKey = "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379";
const mg = mailgun({ apiKey, domain: "capitalvelocity.com" });
const sbaRouter = express.Router();

// sbaRouter.post(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const formData = new SBA({
//         userEmail: req.body.userEmail,
//         accountsPayable: req.body.accountsPayable,
//         automobiles: req.body.automobiles,
//         bankruptcyProtection: req.body.bankruptcyProtection,
//         birthDate: req.body.birthDate,
//         birthMonth: req.body.birthMonth,
//         birthYear: req.body.birthYear,
//         businessDefault: req.body.businessDefault,
//         cashonHand: req.body.cashonHand,
//         citizenshipStatus: req.body.citizenshipStatus,
//         closingDate: req.body.closingDate,
//         coMaker: req.body.coMaker,
//         countryofCitizenship: req.body.countryofCitizenship,
//         creditScore: req.body.creditScore,
//         daysDelenquet: req.body.daysDelenquet,
//         email: req.body.email,
//         ethinicity: req.body.ethinicity,
//         fileUploadUrl: req.body.fileUploadUrl,
//         financingDelinquent: req.body.financingDelinquent,
//         gender: req.body.gender,
//         installmentAccount: req.body.installmentAccount,
//         insuranceCompany: req.body.insuranceCompany,
//         isArrested: req.body.isArrested,
//         isCriminalOffense: req.body.isCriminalOffense,
//         isIndictment: req.body.isIndictment,
//         legalAction: req.body.legalAction,
//         legalClaims: req.body.legalClaims,
//         lifeInsurance: req.body.lifeInsurance,
//         lifeInsuranceHeld: req.body.lifeInsuranceHeld,
//         loanGuarantor: req.body.loanGuarantor,
//         loanInsurance: req.body.loanInsurance,
//         mortgagesRealEstate: req.body.mortgagesRealEstate,
//         netInvestmentIncome: req.body.netInvestmentIncome,
//         netInvestmentIncomeLiab: req.body.netInvestmentIncomeLiab,
//         notesPayable: req.body.notesPayable,
//         notesReceivable: req.body.notesReceivable,
//         otherAssets: req.body.otherAssets,
//         otherIncome: req.body.otherIncome,
//         otherLiabilities: req.body.otherLiabilities,
//         otherPersonalProperty: req.body.otherPersonalProperty,
//         otherSpecialDebt: req.body.otherSpecialDebt,
//         preferredClosingAttorney: req.body.preferredClosingAttorney,
//         provisionFederalIncomeTax: req.body.provisionFederalIncomeTax,
//         race: req.body.race,
//         realEstate: req.body.realEstate,
//         realEstateIncomeSource: req.body.realEstateIncomeSource,
//         retirementAccount: req.body.retirementAccount,
//         salary: req.body.salary,
//         savingsAccounts: req.body.savingsAccounts,
//         smallBusiness: req.body.smallBusiness,
//         socialSecurity: req.body.socialSecurity,
//         stocksAndBonds: req.body.stocksAndBonds,
//         stocksBonds: req.body.stocksBonds,
//         suspendedFederal: req.body.suspendedFederal,
//         titleCompany: req.body.titleCompany,
//         totalLiabilities: req.body.totalLiabilities,
//         unpaidTaxes: req.body.unpaidTaxes,
//         uscisRegNum: req.body.uscisRegNum,
//         veteran: req.body.veteran,
//         bankruptDetail: req.body.bankruptDetail,
//         legalActionDetails: req.body.legalActionDetails,
//         loanDetails: req.body.loanDetails,
//       });

//       const createdFormData = await formData.save();
//       res.json(createdFormData);
//     } catch (error) {
//       res.status(401).send({ message: error.message });
//     }
//   })
// );

const fieldLabels = {
  userEmail: "User Email",
  accountsPayable: "Accounts Payable",
  automobiles: "Automobiles (Assets)",
  bankruptcyProtection:
    "Have you, or any business you controlled, ever filed for bankruptcy protection?",
  birthDate: "Birth Date",
  birthMonth: "Birth Month",
  birthYear: "Birth Year",
  businessDefault:
    "If you answered Yes to the above, did any loan that was made for business purposes ever default and cause a loss to the Government, including a compromise, resolution or settlement of a loan's principal balance for less than the full amount due?",
  cashonHand: "Cash on Hand & in Banks",
  citizenshipStatus: "Citizenship Status",
  closingDate: "Closing Date",
  coMaker: "As Endorser or Co-Maker",
  countryofCitizenship: "Country of Citizenship",
  creditScore: "Credit Score",
  daysDelenquet:
    "Are you more than 60 days delinquent on any obligation to pay child support arising under an administrative order, court order, repayment agreement between the holder and a custodial parent, or repayment agreement between the holder and a state agency providing child support enforcement services.",
  email: "Email",
  ethinicity: "Ethnicity",
  fileUploadUrl: "File Upload URL",
  financingDelinquent:
    "If you answered Yes to above question, is any of the financing presently considered delinquent?",
  gender: "Gender",
  installmentAccount: "Installment Account",
  insuranceCompany: "Insurance Company",
  isArrested:
    "Have you been arrested in the last 6 months for any criminal offense?",
  isCriminalOffense:
    "For any criminal offense - other than a minor vehicle violation - have you ever: 1) been convicted; 2) pleaded guilty; 3) pleaded nolo contendere; 4) been placed on pretrial diversion; or 5) been placed on any form of parole or probation (including probation before judgment)?",
  isIndictment:
    "Are you presently subject to an indictment, criminal information, arraignment, or other means by which formal criminal charges are brought in any jurisdiction?",
  legalAction:
    "Are you, or any business you control, presently involved in any legal action (including divorce)?",
  legalClaims: "Legal Claims & Judgments",
  lifeInsurance: "Cash Surrender Value Only",
  lifeInsuranceHeld: "Life Insurance Held",
  loanGuarantor:
    "Have you or any business owned or controlled by you ever obtained a direct or guaranteed loan from SBA or any other Federal agency or been a guarantor on such a loan?",
  loanInsurance: "Loan(s) Against Life Insurance",
  mortgagesRealEstate: "Mortgages on Real Estate",
  netInvestmentIncome: "Net Investment Income",
  netInvestmentIncomeLiab: "Net Investment Income Liabilities",
  notesPayable: "Notes Payable",
  notesReceivable: "Accounts & Notes Receivable",
  otherAssets: "Other Assets",
  otherIncome: "Other Income",
  otherLiabilities: "Other Liabilities",
  otherPersonalProperty: "Other Personal Property",
  otherSpecialDebt: "Other Special Debt",
  preferredClosingAttorney: "Preferred Closing Attorney",
  provisionFederalIncomeTax: "Provision for Federal Income Tax",
  race: "Race",
  realEstate: "Real Estate",
  realEstateAssets: "Real Estate (Assets)",
  realEstateIncomeSource: "Real Estate Income",
  retirementAccount: "IRA or Other Retirement Account",
  salary: "Salary",
  savingsAccounts: "Savings Accounts",
  smallBusiness:
    "Do you have any ownership in other businesses that have small businesses loans?",
  socialSecurity: "Social Security Number",
  stocksAndBonds: "Stocks and Bonds",
  stocksBonds: "Notes Payable to Banks and Others",
  suspendedFederal:
    "Are you presently suspended, debarred, proposed for debarment, declared ineligible, or voluntarily excluded from participation in this transaction by any Federal department or agency?",
  titleCompany: "Title Company",
  totalLiabilities: "Total Liabilities",
  unpaidTaxes: "Unpaid Taxes",
  uscisRegNum: "USCIS Registration Number",
  veteran: "Are you a Veteran?",
  bankruptDetail: "Bankruptcy Detail",
  legalActionDetails: "Legal Action Details",
  loanDetails: "Loan Details",
  ficoScore: "FICO Score",
  uploadedDocuments: "Uploaded Documents",
};

sbaRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const formData = new SBA({ ...req.body });
      const createdFormData = await formData.save();

      const fields = Object.entries(req.body)
        .map(([key, value]) => {
          const label = fieldLabels[key] || key;
          if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === "object") {
              const nested = value
                .map(
                  (item, i) =>
                    `<strong>Item ${i + 1}</strong><ul>` +
                    Object.entries(item).map(
                      ([k, v]) => `<li><em>${k}</em>: ${v}</li>`
                    ) +
                    "</ul>"
                )
                .join("<hr/>");
              return `<tr><td style='padding:6px 12px;border:1px solid #ccc'><strong>${label}</strong></td><td style='padding:6px 12px;border:1px solid #ccc'>${nested}</td></tr>`;
            } else {
              return `<tr><td style='padding:6px 12px;border:1px solid #ccc'><strong>${label}</strong></td><td style='padding:6px 12px;border:1px solid #ccc'>${value.join(
                ", "
              )}</td></tr>`;
            }
          } else {
            return `<tr><td style='padding:6px 12px;border:1px solid #ccc'><strong>${label}</strong></td><td style='padding:6px 12px;border:1px solid #ccc'>${value}</td></tr>`;
          }
        })
        .join("");

      const emailData = {
        from: "Capital Velocity <no-reply@capitalvelocity.com>",
        to: ["info@capitalvelocity.com"],
        subject: "New SBA Application Submission - Capital Velocity",
        html: `
          <div style='background-color:#f2f2f2;padding:40px 0'>
            <div style='font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;background-color:#ffffff;color:#333'>
              <div style='text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px'>
                <img src='https://i.imgur.com/rOpYlNu.png' alt='Capital Velocity' style='height:160px' />
              </div>
              <h2 style='color:#2a2a2a'>New SBA Application</h2>
              <table style='width:100%;border-collapse:collapse;font-size:14px'>${fields}</table>
              <p style='font-size:12px;color:#999;text-align:center;margin-top:30px'>© 2025 Capital Velocity, All rights reserved.</p>
            </div>
          </div>`,
      };

      mg.messages().send(emailData, function (error, body) {
        if (error) {
          console.error("Mailgun error:", error);
        } else {
          console.log("Mailgun response:", body);
        }
      });

      res.json(createdFormData);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })
);

export default sbaRouter;
