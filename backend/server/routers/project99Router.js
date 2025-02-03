import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Project99 from "../models/project99Model.js";
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

project99Router.post(
  "/addproject99",
  expressAsyncHandler(async (req, res) => {
    try {
      // lets try the core logic request here
      if (req.score > 600) {
        sendCreditServiceRequest(
          req.body.firstName,
          req.body.lastName,
          req.body.birthMonth,
          req.body.birthDay,
          req.body.birthYear,
          req.body.marriageStatus,
          req.body.PrimaryBusinessAddressCity,
          req.body.PrimaryBusinessAddressZip,
          req.body.ProjectAddressState,
          req.body.PrimaryBusinessAddress,
          req.body.socialSecurity
        );
      }
      const project99Data = new Project99({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.userEmail,
        AmountPayment: req.body.AmountPayment,
        Businesspresentlysuspended: req.body.Businesspresentlysuspended,
        Fnancingdelinquent: req.body.Fnancingdelinquent,
        PrimaryBusinessAddress: req.body.PrimaryBusinessAddress,
        PrimaryBusinessAddressCounty: req.body.PrimaryBusinessAddressCounty,
        PrimaryBusinessAddressState: req.body.PrimaryBusinessAddressState,
        PrimaryBusinessAddressCity: req.body.PrimaryBusinessAddressCity,
        PrimaryBusinessAddressZip: req.body.PrimaryBusinessAddressZip,
        PrimaryBusinessPhone: req.body.PrimaryBusinessPhone,
        ProjectAddress: req.body.ProjectAddress,
        ProjectAddressCounty: req.body.ProjectAddressCounty,
        ProjectAddressState: req.body.ProjectAddressState,
        ProjectAddressZip: req.body.ProjectAddressZip,
        SeperatefederalGovernmentEmployee:
          req.body.SeperatefederalGovernmentEmployee,
        address: req.body.address,
        affiliatesBankruptcy: req.body.affiliatesBankruptcy,
        affiliatesLegalAction: req.body.affiliatesLegalAction,
        aplicantA: req.body.authorizedSignatory,
        birthDate: req.body.birthDate,
        birthMonth: req.body.birthMonth,
        birthYear: req.body.birthYear,
        marriageStatus: req.body.marriageStatus,
        businessCoOwner: req.body.businessCoOwner,
        businessEmail: req.body.borrowerEmail,
        businessHaveAffiliates: req.body.businessHaveAffiliates,
        businessProducts: req.body.businessProducts,
        businessTaxID: req.body.businessTaxID,
        cost: req.body.propertyPurchasePrice,
        creditScore: req.body.creditScore,
        dBATradename: req.body.dBATradename,
        federalGovLoss: req.body.federalGovLoss,
        federalGovernmentEmployee: req.body.federalGovernmentEmployee,
        financeAgreeement: req.body.financeAgreeement,
        lifeInsuranceHeld: req.body.lifeInsuranceHeld,
        managmentCompany: req.body.borrowingEntityInformation,
        nameAddress: req.body.nameAddress,
        numbEmployees: req.body.numbEmployees,
        operatingBusinessLegalName: req.body.nameAddress, // Replace with the appropriate field from your schema
        originalCost: req.body.originalCost,
        otherAssets: req.body.otherAssets,
        otherLiabilities: req.body.otherLiabilities,
        ownershipOfApplicant: req.body.borrowingEntityOwned, // Replace with the appropriate field from your schema
        plantoUse: req.body.propertySource,
        presentMarketValue: req.body.presentMarketValue,
        purchaseDate: req.body.purchaseDate,
        realEstateType: req.body.propertyType,
        revenuesDerived: req.body.revenuesDerived,
        score: req.body.score,
        socialSecurity: req.body.socialSecurity,
        statusMortgage: req.body.statusMortgage,
        tenPercentageFederal: req.body.tenPercentageFederal,
        tenPercentageGS13: req.body.tenPercentageGS13,
        unpaidTaxes: req.body.unpaidTaxes,
        // New fields added below
        projectManager: req.body.projectManager,
        estimatedCompletionDate: req.body.estimatedCompletionDate,
        fundingSource: req.body.fundingSource,
        projectStage: req.body.projectStage,
        projectRisks: req.body.projectRisks,
        projectDependencies: req.body.projectDependencies,
        projectStakeholders: req.body.projectStakeholders,
        projectMilestones: req.body.projectMilestones,
        projectDeliverables: req.body.projectDeliverables,
        projectBudget: req.body.projectBudget,
        projectResources: req.body.projectResources,
        projectTimeline: req.body.projectTimeline,
      });
      const createdproject99 = await project99Data.save();
      res.json(createdproject99);
    } catch (error) {
      res.status(401).send({ message: error });
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
