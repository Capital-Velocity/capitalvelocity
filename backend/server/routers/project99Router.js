import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Project99 from "../models/project99Model.js";
import mailgun from "mailgun-js";

const apiKey = "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379";
const mg = mailgun({ apiKey, domain: "capitalvelocity.com" });
const project99Router = express.Router();

const getToken = async () => {
  const apiEndpoint =
    "https://api-uat.corelogic.com/order-gateway-oauth2/token";
  const username = "oWflIK8yoNW9AmNDP1PsvjCr1jwcTPTR";
  const password = "zwZGMlf9nLcBeCX3";

  try {
    const response = await axios.post(
      apiEndpoint,
      null, // No request body needed for client_credentials grant
      {
        auth: {
          username,
          password,
        },
        params: {
          grant_type: "client_credentials",
        },
      }
    );

    if (response.status === 200) {
      const token = response.data.access_token;
      return token;
    } else {
      throw new Error("Failed to retrieve token");
    }
  } catch (error) {
    throw new Error("Error while making the request: " + error.message);
  }
};

async function sendCreditServiceRequest(
  firstName,
  lastName,
  birthMonth,
  birthDay,
  birthYear,
  marriageStatus,
  cityName,
  zipCode,
  state,
  address,
  social
) {
  // Get the access token using your getToken function
  const accessToken = await getToken();

  const borrowerFirstName = firstName;
  const borrowerLastName = lastName;
  const borrowerBirthMonth = birthMonth;
  const borrowerBirthDay = birthDay;
  const borrowerBirthYear = birthYear;
  const borrowBirthDate = `${borrowerBirthYear}-${borrowerBirthMonth
    .toString()
    .padStart(2, "0")}-${birthDay.toString().padStart(2, "0")}`;
  const currentYear = new Date().getFullYear();
  const age = currentYear - borrowerBirthYear;
  const splitAddress = address.match(/(\d+) (.+)/);
  const streetValue = splitAddress[1];
  const toAddress = splitAddress[2];
  const guid = uuidv4();
  // Define your XML body as a string
  const xmlBody = `
  <MESSAGE xmlns="http://www.mismo.org/residential/2009/schemas" xmlns:cl="http://globalgateway.corelogic.com/order/2015" xmlns:xlink="http://www.w3.org/1999/xlink" MISMOReferenceModelIdentifier="3.4[B324]">
  <DEAL_SETS>
  <DEAL_SET>
  <DEALS>
  <DEAL>
  <LOANS>
  <LOAN LoanRoleType="SubjectLoan">
  <LOAN_IDENTIFIERS>
  <LOAN_IDENTIFIER>
  <LoanIdentifier>202309261</LoanIdentifier>
  <LoanIdentifierType>LenderCase</LoanIdentifierType>
  </LOAN_IDENTIFIER>
  </LOAN_IDENTIFIERS>
  <ORIGINATION_SYSTEMS>
  <ORIGINATION_SYSTEM>
  <!--  required to submit assigned Origin Code value  -->
  <LoanOriginationSystemName>CVC</LoanOriginationSystemName>
  </ORIGINATION_SYSTEM>
  </ORIGINATION_SYSTEMS>
  </LOAN>
  </LOANS>
  <!--   The Borrower Parties   -->
  <PARTIES>
  <PARTY SequenceNumber="1">
  <INDIVIDUAL>
  <NAME>
  <FirstName>${borrowerFirstName}</FirstName>
  <LastName>${borrowerLastName}</LastName>
  </NAME>
  </INDIVIDUAL>
  <ROLES>
  <ROLE xlink:label="Borrower01">
  <BORROWER>
  <BORROWER_DETAIL>
  <!--  Borrower's Age at application based on the BorrowerBirthDate field value  -->
  <BorrowerAgeAtApplicationYearsCount>${age}</BorrowerAgeAtApplicationYearsCount>
  <BorrowerBirthDate>${borrowBirthDate}</BorrowerBirthDate>
  <BorrowerClassificationType>Primary</BorrowerClassificationType>
  <MaritalStatusType>${marriageStatus}</MaritalStatusType>
  </BORROWER_DETAIL>
  <RESIDENCES>
  <RESIDENCE SequenceNumber="1">
  <ADDRESS>
  <AddressFormatType>Individual</AddressFormatType>
  <AddressType>Current</AddressType>
  <CityName>${cityName}</CityName>
  <CountryCode>US</CountryCode>
  <PostalCode>${zipCode}</PostalCode>
  <StateCode>${state}</StateCode>
  <StreetName>${toAddress}</StreetName>
  <StreetPrimaryNumberText>${streetValue}</StreetPrimaryNumberText>
  <StreetSuffixText/>
  </ADDRESS>
  <RESIDENCE_DETAIL>
  <BorrowerResidencyType>Current</BorrowerResidencyType>
  </RESIDENCE_DETAIL>
  </RESIDENCE>
  </RESIDENCES>
  </BORROWER>
  <ROLE_DETAIL>
  <PartyRoleType>Borrower</PartyRoleType>
  </ROLE_DETAIL>
  </ROLE>
  </ROLES>
  <TAXPAYER_IDENTIFIERS>
  <TAXPAYER_IDENTIFIER>
  <TaxpayerIdentifierType>SocialSecurityNumber</TaxpayerIdentifierType>
  <TaxpayerIdentifierValue>${social}</TaxpayerIdentifierValue>
  </TAXPAYER_IDENTIFIER>
  </TAXPAYER_IDENTIFIERS>
  </PARTY>
  </PARTIES>
  <SERVICES>
  <SERVICE>
  <CREDIT>
  <CREDIT_REQUEST>
  <CREDIT_REQUEST_DATAS>
  <CREDIT_REQUEST_DATA xlink:label="CreditRequest001">
  <CREDIT_REPOSITORY_INCLUDED>
  <CreditRepositoryIncludedEquifaxIndicator>false</CreditRepositoryIncludedEquifaxIndicator>
  <CreditRepositoryIncludedExperianIndicator>false</CreditRepositoryIncludedExperianIndicator>
  <CreditRepositoryIncludedTransUnionIndicator>true</CreditRepositoryIncludedTransUnionIndicator>
  </CREDIT_REPOSITORY_INCLUDED>
  <CREDIT_REQUEST_DATA_DETAIL>
  <CreditReportRequestActionType>Submit</CreditReportRequestActionType>
  <CreditReportType>Other</CreditReportType>
  <CreditReportTypeOtherDescription>Prequal</CreditReportTypeOtherDescription>
  <CreditRequestType>Individual</CreditRequestType>
  </CREDIT_REQUEST_DATA_DETAIL>
  </CREDIT_REQUEST_DATA>
  </CREDIT_REQUEST_DATAS>
  </CREDIT_REQUEST>
  </CREDIT>
  <REPORTING_INFORMATION>
  <!-- CDG Required Field -->
  <ReportingInformationIdentifier>GG002108</ReportingInformationIdentifier>
  <!-- CDG Required Field -->
  <ReportingInformationName>GlobalGatewayLenderIdentifier</ReportingInformationName>
  </REPORTING_INFORMATION>
  </SERVICE>
  </SERVICES>
  <EXTENSION>
  <OTHER>
  <cl:DEAL>
  <cl:KEYS>
  <!-- 
  One of several examples for a Key Identifier/Value has been provided 
   -->
  <cl:KEY>
  <cl:KeyIdentifier>SubmittingPartyOrderIdentifier</cl:KeyIdentifier>
  <cl:KeyValue>${guid}</cl:KeyValue>
  </cl:KEY>
  </cl:KEYS>
  </cl:DEAL>
  </OTHER>
  </EXTENSION>
  </DEAL>
  </DEALS>
  </DEAL_SET>
  <!-- 
  The MESSAGE Parties - Requesting Party / Submitting Party (if any) / Receiving Party  -->
  <PARTIES>
  <PARTY SequenceNumber="1">
  <ROLES>
  <ROLE xlink:label="RequestingParty001">
  <RETURN_TO>
  <PREFERRED_RESPONSES>
  <PREFERRED_RESPONSE>
  <PreferredResponseFormatType>PDF</PreferredResponseFormatType>
  <PreferredResponseFormatTypeOtherDescription>PDF</PreferredResponseFormatTypeOtherDescription>
  <PreferredResponseUseEmbeddedFileIndicator>true</PreferredResponseUseEmbeddedFileIndicator>
  </PREFERRED_RESPONSE>
  <PREFERRED_RESPONSE>
  <PreferredResponseFormatType>XML</PreferredResponseFormatType>
  <PreferredResponseUseEmbeddedFileIndicator>false</PreferredResponseUseEmbeddedFileIndicator>
  </PREFERRED_RESPONSE>
  </PREFERRED_RESPONSES>
  </RETURN_TO>
  <ROLE_DETAIL>
  <PartyRoleType>RequestingParty</PartyRoleType>
  </ROLE_DETAIL>
  </ROLE>
  <ROLE SequenceNumber="2" xlink:label="RequestingParty002">
  <REQUESTING_PARTY>
  <InternalAccountIdentifier>122</InternalAccountIdentifier>
  <RequestedByName>Ro-Hanna Jowallah</RequestedByName>
  <EXTENSION>
  <OTHER>
  <cl:REQUESTING_PARTY>
  <cl:LoginAccountIdentifier>4004369</cl:LoginAccountIdentifier>
  <cl:LoginAccountPassword>J70Y8QS3</cl:LoginAccountPassword>
  </cl:REQUESTING_PARTY>
  </OTHER>
  </EXTENSION>
  </REQUESTING_PARTY>
  </ROLE>
  </ROLES>
  </PARTY>
  <PARTY SequenceNumber="2">
  <LEGAL_ENTITY>
  <LEGAL_ENTITY_DETAIL>
  <FullName>Capital Velocity LLC</FullName>
  </LEGAL_ENTITY_DETAIL>
  </LEGAL_ENTITY>
  <ROLES>
  <ROLE xlink:label="ReceivingParty001">
  <ROLE_DETAIL>
  <PartyRoleType>ReceivingParty</PartyRoleType>
  </ROLE_DETAIL>
  </ROLE>
  </ROLES>
  </PARTY>
  </PARTIES>
  </DEAL_SETS>
  </MESSAGE>
  `;

  // Define the API endpoint for the credit service request
  const creditServiceEndpoint =
    "https://uat1.globalgateway.corelogic.com/order/creditservicerequest/credit?action=Submit";

  // Define the headers, including the Bearer token
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/xml",
  };

  try {
    // Make the POST request with the XML data
    const response = await axios.post(creditServiceEndpoint, xmlBody, {
      headers,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    throw new Error("Error while making the request: " + error.message);
  }
}

// project99Router.post(
//   "/addproject99",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       // lets try the core logic request here
//       // if (req.score > 600) {
//       //   sendCreditServiceRequest(
//       //     req.body.firstName,
//       //     req.body.lastName,
//       //     req.body.birthMonth,
//       //     req.body.birthDay,
//       //     req.body.birthYear,
//       //     req.body.marriageStatus,
//       //     req.body.PrimaryBusinessAddressCity,
//       //     req.body.PrimaryBusinessAddressZip,
//       //     req.body.ProjectAddressState,
//       //     req.body.PrimaryBusinessAddress,
//       //     req.body.socialSecurity
//       //   );
//       // }
//       const project99Data = new Project99({
//         accountsPayable: req.body.accountsPayable,
//         anualAdministrativeManagementFees:
//           req.body.anualAdministrativeManagementFees,
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
//         aplicantA: req.body.aplicantA,
//         armsLengthDescription: req.body.armsLengthDescription,
//         authorizedSignatory: req.body.authorizedSignatory,
//         automobiles: req.body.automobiles,
//         background: req.body.background,
//         bankruptcyProtection: req.body.bankruptcyProtection,
//         birthDate: req.body.birthDate,
//         birthMonth: req.body.birthMonth,
//         birthYear: req.body.birthYear,
//         borrowerCell: req.body.borrowerCell,
//         borrowerCitizenship: req.body.borrowerCitizenship,
//         borrowerEmail: req.body.borrowerEmail,
//         borrowerLast: req.body.borrowerLast,
//         borrowingEntityInformation: req.body.borrowingEntityInformation,
//         borrowingEntityOwned: req.body.borrowingEntityOwned,
//         businessDefault: req.body.businessDefault,
//         businessEmail: req.body.businessEmail,
//         businessPercentage: req.body.businessPercentage,
//         businessTaxID: req.body.businessTaxID,
//         cashOnHand: req.body.cashOnHand,
//         closingDate: req.body.closingDate,
//         coMaker: req.body.coMaker,
//         completedCapex: req.body.completedCapex,
//         daysDelenquet: req.body.daysDelenquet,
//         debt: req.body.debt,
//         debtValue: req.body.debtValue,
//         dBATradename: req.body.dBATradename,
//         ethinicity: req.body.ethinicity,
//         experienceWithRealEstate: req.body.experienceWithRealEstate,
//         financingDelinquent: req.body.financingDelinquent,
//         firstName: req.body.firstName,
//         gender: req.body.gender,
//         industryExperience: req.body.industryExperience,
//         insuranceCompany: req.body.insuranceCompany,
//         investedCapital: req.body.investedCapital,
//         isArrested: req.body.isArrested,
//         isCriminalOffense: req.body.isCriminalOffense,
//         isIndictment: req.body.isIndictment,
//         lastName: req.body.lastName,
//         legalAction: req.body.legalAction,
//         legalClaims: req.body.legalClaims,
//         lifeInsurance: req.body.lifeInsurance,
//         lifeInsuranceHeld: req.body.lifeInsuranceHeld,
//         loanGuarantor: req.body.loanGuarantor,
//         loanPurpose: req.body.loanPurpose,
//         managmentCompany: req.body.managmentCompany,
//         moneyperYear: req.body.moneyperYear,
//         mortgagesRealEstate: req.body.mortgagesRealEstate,
//         motivation: req.body.motivation,
//         netInvestmentIncome: req.body.netInvestmentIncome,
//         netInvestmentIncomeLiab: req.body.netInvestmentIncomeLiab,
//         notesPayable: req.body.notesPayable,
//         notesReceivable: req.body.notesReceivable,
//         operatingBusinessLegalName: req.body.operatingBusinessLegalName,
//         otherAssets: req.body.otherAssets,
//         otherIncome: req.body.otherIncome,
//         otherLiabilities: req.body.otherLiabilities,
//         otherPersonalProperty: req.body.otherPersonalProperty,
//         otherSpecialDebt: req.body.otherSpecialDebt,
//         ownershipOfApplicant: req.body.ownershipOfApplicant,
//         personallyGuranteeing: req.body.personallyGuranteeing,
//         plantoUse: req.body.plantoUse,
//         positionsHeld: req.body.positionsHeld,
//         primaryBusinessAddress: req.body.primaryBusinessAddress,
//         primaryBusinessAddressCounty: req.body.primaryBusinessAddressCounty,
//         primaryBusinessAddressState: req.body.primaryBusinessAddressState,
//         primaryBusinessAddressZip: req.body.primaryBusinessAddressZip,
//         primaryBusinessPhone: req.body.primaryBusinessPhone,
//         preferredClosingAttorney: req.body.preferredClosingAttorney,
//         projectAddress: req.body.projectAddress,
//         projectAddressCounty: req.body.projectAddressCounty,
//         projectAddressState: req.body.projectAddressState,
//         projectAddressZip: req.body.projectAddressZip,
//         provisionFederalIncomeTax: req.body.provisionFederalIncomeTax,
//         realEstate: req.body.realEstate,
//         realEstateAssets: req.body.realEstateAssets,
//         realEstateIncomeSource: req.body.realEstateIncomeSource,
//         renovationDescript: req.body.renovationDescript,
//         runningCompany: req.body.runningCompany,
//         salary: req.body.salary,
//         savingsAccounts: req.body.savingsAccounts,
//         smallBusiness: req.body.smallBusiness,
//         socialSecurity: req.body.socialSecurity,
//         stateBusiness: req.body.stateBusiness,
//         stocksAndBonds: req.body.stocksAndBonds,
//         stocksBonds: req.body.stocksBonds,
//         suspendedFederal: req.body.suspendedFederal,
//         titleCompany: req.body.titleCompany,
//         uSCISRegNum: req.body.uSCISRegNum,
//         unpaidTaxes: req.body.unpaidTaxes,
//         userEmail: req.body.userEmail,
//         veteran: req.body.veteran,
//         whichApply: req.body.whichApply,
//         whichImportant: req.body.whichImportant,
//       });
//       const createdproject99 = await project99Data.save();
//       res.json(createdproject99);
//     } catch (error) {
//       res.status(401).send({ message: error });
//     }
//   })
// );

const fieldLabels = {
  accountsPayable: "Accounts Payable",
  anualAdministrativeManagementFees: "Anual Administrative Management Fees",
  annualHOADues: "Annual HOA Dues",
  annualInsurance: "Annual Insurance",
  annualMarketingExpense: "Annual Marketing Expense",
  annualPayrollExpense: "Annual Payroll Expense",
  annualPropertyManagementFees: "Annual Property Management Fees",
  annualRepairsMaintenanceExpenses: "Annual Repairs & Maintenance Expenses",
  annualReplacementReserve: "Annual Replacement Reserve",
  annualTaxes: "Annual Taxes",
  annualUtilitiesExpenses: "Annual Utilities Expenses",
  aplicantA: "Is the Applicant:",
  armsLengthDescription: "Arms Length Description",
  authorizedSignatory: "Authorized Signatory",
  automobiles: "Automobile Assets",
  background: "Background",
  bankruptcyProtection:
    "Have you, or any business you controlled, ever filed for bankruptcy protection?",
  birthDate: "Birth Date",
  birthMonth: "Birth Month",
  birthYear: "Birth Year",
  borrowerCell: "Borrower Cell",
  borrowerCitizenship: "Borrower Citizenship",
  borrowerEmail: "Borrower Email",
  borrowerLast: "Borrower Last Name",
  borrowingEntityInformation: "Do you have the Borrowing Entity Information?",
  borrowingEntityOwned: "Borrowing Entity Owned (%)",
  businessDefault:
    "If you answered Yes to the above, did any loan that was made for business purposes ever default and cause a loss to the Government, including a compromise, resolution or settlement of a loan's principal balance for less than the full amount due?",
  businessEmail: "Business Email Address",
  businessPercentage: "Business Ownership % you are looking for",
  businessTaxID: "Business Tax ID",
  cashOnHand: "Cash on Hand & in Banks",
  closingDate: "Closing Date",
  coMaker: "As Endorser or Co-Maker",
  completedCapex: "Completed CapEx",
  daysDelenquet:
    "Are you more than 60 days delinquent on any obligation to pay child support arising under an administrative order, court order, repayment agreement between the holder and a custodial parent, or repayment agreement between the holder and a state agency providing child support enforcement services.",
  debt: "Debt",
  debtValue: "Debt Value",
  dBATradename: "DBA / Tradename",
  ethinicity: "Ethnicity",
  race: "Race",
  experienceWithRealEstate:
    "How many businesses has this partner managed with a hands-on approach?",
  financingDelinquent:
    "If you answered Yes to above question, is any of the financing presently considered delinquent?",
  firstName: "Borrower First Name",
  gender: "Gender",
  industryExperience: "Business/Industry you have experience in?",
  insuranceCompany: "Insurance Company",
  investedCapital: "Invested Capital",
  installmentAccount: "Installment Account",
  isArrested:
    "Have you been arrested in the last 6 months for any criminal offense?",
  isCriminalOffense:
    "For any criminal offense - other than a minor vehicle violation - have you ever: 1) been convicted; 2) pleaded guilty; 3) pleaded nolo contendere; 4) been placed on pretrial diversion; or 5) been placed on any form of parole or probation (including probation before judgment)?",
  isIndictment:
    "Are you presently subject to an indictment, criminal information, arraignment, or other means by which formal criminal charges are brought in any jurisdiction?",
  lastName: "Last Name",
  legalAction:
    "Are you, or any business you control, presently involved in any legal action (including divorce)?",
  legalClaims: "Legal Claims & Judgments",
  lifeInsurance: "Cash Surrender Value Only",
  lifeInsuranceHeld: "Life Insurance Held",
  loanGuarantor:
    "Have you or any business owned or controlled by you ever obtained a direct or guaranteed loan from SBA or any other Federal agency or been a guarantor on such a loan?",
  loanPurpose: "Loan Purpose",
  loanInsurance: "Loan(s) against Life Insurance",
  managmentCompany:
    "Do you have or plan to use a Management Company to manage the day-to-day operations?",
  moneyperYear: "How much money are you looking to make per year?",
  mortgagesRealEstate: "Mortgages on Real Estate",
  motivation: "What motivates you?",
  netInvestmentIncome: "Net Investment Income",
  netInvestmentIncomeLiab: "Net Investment Income (Liabilities)",
  notesPayable: "Notes Payable",
  notesReceivable: "Accounts & Notes Receivable",
  operatingBusinessLegalName: "Operating Business Legal Name",
  otherAssets: "Other Assets",
  otherIncome: "Other Income",
  otherLiabilities: "Other Liabilities",
  otherPersonalProperty: "Other Personal Property",
  otherSpecialDebt: "Other Special Debt",
  ownershipOfApplicant: "Ownership of Applicant",
  personallyGuranteeing: "How many businesses has this partner owned?",
  plantoUse: "Do you have or plan to use a 401(K) Plan?",
  positionsHeld: "Positions Held",
  primaryBusinessAddress: "Primary Business Address",
  primaryBusinessAddressCounty: "Business County",
  primaryBusinessAddressState: "Business State",
  primaryBusinessAddressZip: "Business ZIP Code",
  primaryBusinessPhone: "Primary Business Phone",
  preferredClosingAttorney: "Preferred Closing Attorney",
  projectAddress: "Project Address (if other than primary business address)",
  projectAddressCounty:
    "Project Address County (if other than primary business address)",
  projectAddressState:
    "Project Address State (if other than primary business address)",
  projectAddressZip:
    "Project Address Zip (if other than primary business address)",
  provisionFederalIncomeTax: "Provision for Federal Income Tax",
  numbEmployees: "Number of existing employees employed by business?",
  realEstate: "Real Estate",
  realEstateAssets: "Real Estate Assets",
  realEstateIncomeSource: "Real Estate Income",
  retirementAccount: "IRA or Other Retirement Account",
  renovationDescript: "Renovation Description",
  runningCompany: "When are you looking to be running our company?",
  salary: "Salary",
  savingsAccounts: "Savings Accounts",
  smallBusiness:
    "Do you have any ownership in other businesses that have small businesses loans?",
  socialSecurity: "Social Security Number",
  stateBusiness: "What state do you want to do business in?",
  stocksAndBonds: "Stocks and Bonds",
  stocksBonds: "Notes Payable to Banks and Others",
  suspendedFederal:
    "Are you presently suspended, debarred, proposed for debarment, declared ineligible, or voluntarily excluded from participation in this transaction by any Federal department or agency?",
  titleCompany: "Title Company",
  uSCISRegNum: "USCIS Registration Number",
  unpaidTaxes: "Unpaid Taxes",
  userEmail: "User Email",
  veteran: "Veteran Status",
  monthlySalesExpected: "Average monthly sales you've managed to achieve?",
  whichApply: "Which of the following apply to you?",
  whichImportant: "Which is most important to you?",
  ficoScore: "FICO Score",
  uploadedDocuments: "Uploaded Documents",
};

project99Router.post(
  "/addproject99",
  expressAsyncHandler(async (req, res) => {
    try {
      const project99Data = new Project99({ ...req.body });
      const createdProject = await project99Data.save();

      const fields = Object.entries(req.body)
        .map(([key, value]) => {
          const label = fieldLabels[key] || key;

          if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === "object") {
              const nested = value
                .map(
                  (item, i) =>
                    `<strong>Item ${i + 1}</strong><ul>` +
                    Object.entries(item)
                      .map(([k, v]) => `<li><em>${k}</em>: ${v}</li>`)
                      .join("") +
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
        subject: "New Project99 Submission - Capital Velocity",
        html: `
        <div style="background-color:#f2f2f2;padding:40px 0">
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;background-color:#ffffff;color:#333">
            <div style="text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px">
              <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height:160px" />
            </div>
            <h2 style="color:#2a2a2a">Hi there,</h2>
            <p style="font-size:16px;line-height:1.6">A new Project99 application has been submitted.</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px">${fields}</table>
            <p style="font-size:12px;color:#999;text-align:center;margin-top:30px">© 2025 Capital Velocity, All rights reserved.</p>
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

      res.json(createdProject);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

// Fetch all the fixandFlip applications
project99Router.get(
  "/getAllProject99",
  expressAsyncHandler(async (req, res) => {
    try {
      const groundUp = await Project99.find({}); // Retrieve all records in the Referral collection
      res.json(groundUp);
    } catch (error) {
      res.status(500).send({ message: "Error fetching referrals" });
    }
  })
);
export default project99Router;
