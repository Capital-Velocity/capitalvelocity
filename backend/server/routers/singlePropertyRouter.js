import express from "express";
import expressAsyncHandler from "express-async-handler";
import SingleProperty from "../models/singlePropertyModel.js";

const singlePropertyRouter = express.Router();

singlePropertyRouter.post(
  "/addSingleProperty",
  expressAsyncHandler(async (req, res) => {
    try {
      // Create a new SingleProperty document using the request body
      const newSingleProperty = new SingleProperty({
        userEmail: req.body.userEmail,
        amortizationType: req.body.amortizationType,
        annualExpenses: req.body.annualExpenses,
        annualInsurance: req.body.annualInsurance,
        annualNOI: req.body.annualNOI,
        annualRepair: req.body.annualRepair,
        annualTaxes: req.body.annualTaxes,
        annualUtilityExpenses: req.body.annualUtilityExpenses,
        birthDate: req.body.birthDate,
        birthMonth: req.body.birthMonth,
        birthYear: req.body.birthYear,
        borrowExperience: req.body.borrowExperience,
        borrowerCell: req.body.borrowerCell,
        borrowerCitizenship: req.body.borrowerCitizenship,
        borrowerEmail: req.body.borrowerEmail,
        borrowerLast: req.body.borrowerLast,
        borrowingEntityInformation: req.body.borrowingEntityInformation,
        brokerPoints: req.body.brokerPoints,
        closingDate: req.body.closingDate,
        contactLastName: req.body.contactLastName,
        creditScore: req.body.creditScore,
        dateofIncorp: req.body.dateofIncorp,
        entityAddress: req.body.entityAddress,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        estimatedAsIsValue: req.body.estimatedAsIsValue,
        experienceWithRealEstate: req.body.experienceWithRealEstate,
        ficoScore: req.body.ficoScore,
        firstName: req.body.firstName,
        grossMonthlyRent: req.body.grossMonthlyRent,
        hoa: req.body.hoa,
        insuranceCompany: req.body.insuranceCompany,
        interestRate: req.body.interestRate,
        interestTerm: req.body.interestTerm,
        intrestMethod: req.body.intrestMethod,
        loanPurpose: req.body.loanPurpose,
        loanToValue: req.body.loanToValue,
        oneTimeYield: req.body.oneTimeYield,
        personallyGuranteeing: req.body.personallyGuranteeing,
        points: req.body.points,
        prePayPen: req.body.prePayPen,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        previosulyBankrupt: req.body.previosulyBankrupt,
        programType: req.body.programType,
        propertyAddress: req.body.propertyAddress,
        propertyFees: req.body.propertyFees,
        propertyType: req.body.propertyType,
        purchasePriceProperty: req.body.purchasePriceProperty,
        rateBuyDown: req.body.rateBuyDown,
        rateType: req.body.rateType,
        shortForSale: req.body.shortForSale,
        socialSecurity: req.body.socialSecurity,
        targetLTV: req.body.targetLTV,
        termMonths: req.body.termMonths,
        titleCompany: req.body.titleCompany,
        totalAnnualIncome: req.body.totalAnnualIncome,
      });

      // Save the new single property to the database
      const savedSingleProperty = await newSingleProperty.save();

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
