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
        firstName: req.body.firstName,
        borrowerLast: req.body.borrowerLast,
        borrowerEmail: req.body.borrowerEmail,
        borrowerCell: req.body.borrowerCell,
        borrowerCitizenship: req.body.borrowerCitizenship,
        personallyGuranteeing: req.body.personallyGuranteeing,
        experienceWithRealEstate: req.body.experienceWithRealEstate,
        bestTerms: req.body.bestTerms,
        armsLengthDescription: req.body.armsLengthDescription,
        authorizedSignatory: req.body.authorizedSignatory,
        borrowingEntityInformation: req.body.borrowingEntityInformation,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        dateofIncorp: req.body.dateofIncorp,
        contactLastName: req.body.contactLastName,
        entityAddress: req.body.entityAddress,
        borrowingEntityOwned: req.body.borrowingEntityOwned,
        propertyAddress: req.body.propertyAddress,
        addressCity: req.body.addressCity,
        addressZip: req.body.addressZip,
        addressState: req.body.addressState,
        propertyType: req.body.propertyType,
        purchaseorRefinance: req.body.purchaseorRefinance,
        propertySource: req.body.propertySource,
        isCondominium: req.body.isCondominium,
        renovationDescript: req.body.renovationDescript, // Array of strings
        exitStrat: req.body.exitStrat,
        cashOut: req.body.cashOut,
        purchaseDate: req.body.purchaseDate,
        purchasePriceProperty: req.body.purchasePriceProperty,
        investedCapital: req.body.investedCapital,
        completedCapex: req.body.completedCapex,
        asIsValue: req.body.asIsValue,
        background: req.body.background,
        redFlags: req.body.redFlags,
        loanPurpose: req.body.loanPurpose,
        grossMonthlyRent: req.body.grossMonthlyRent,
        propertyMonthlyTaxes: req.body.propertyMonthlyTaxes,
        propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
        propertyMonthlyHOAFee: req.body.propertyMonthlyHOAFee,
        propertyMonthlyOtherExpenses: req.body.propertyMonthlyOtherExpenses,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        closingDate: req.body.closingDate,
        insuranceCompany: req.body.insuranceCompany,
        titleCompany: req.body.titleCompany,
        birthMonth: req.body.birthMonth,
        birthDate: req.body.birthDate,
        birthYear: req.body.birthYear,
        socialSecurity: req.body.socialSecurity,
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
