import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import Rental from "../models/rentalModel.js";

const rentalRouter = express.Router();

rentalRouter.post(
  "/addRentalGroup",
  expressAsyncHandler(async (req, res) => {
    try {
      // Create a new Rental document using the request body
      const newRental = new Rental({
        amortizationType: req.body.amortizationType,
        birthDate: req.body.birthDate,
        birthMonth: req.body.birthMonth,
        birthYear: req.body.birthYear,
        borrowerCell: req.body.borrowerCell,
        borrowerCitizenship: req.body.borrowerCitizenship,
        borrowerEmail: req.body.borrowerEmail,
        borrowerLast: req.body.borrowerLast,
        borrowerSocialSecurity: req.body.borrowerSocialSecurity,
        borrowingEntityInformation: req.body.borrowingEntityInformation,
        borrowingEntityOwned: req.body.borrowingEntityOwned,
        brokerPoints: req.body.brokerPoints,
        cashFlowmaxAsValue: req.body.cashFlowmaxAsValue,
        cashFlowminAsValue: req.body.cashFlowminAsValue,
        cashFlowpropertyMan: req.body.cashFlowpropertyMan,
        closingDate: req.body.closingDate,
        contactLastName: req.body.contactLastName,
        creditScore: req.body.creditScore,
        dateofIncorp: req.body.dateofIncorp,
        entityAddress: req.body.entityAddress,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        estimatedValue: req.body.estimatedValue,
        experienceWithRealEstate: req.body.experienceWithRealEstate,
        firstName: req.body.firstName,
        grossmontly: req.body.grossmontly,
        insuranceCompany: req.body.insuranceCompany,
        interestRate: req.body.interestRate,
        interestTerm: req.body.interestTerm,
        intrestMethod: req.body.intrestMethod,
        loanPurpose: req.body.loanPurpose,
        loanRecourse: req.body.loanRecourse,
        loanToValue: req.body.loanToValue,
        ltv: req.body.ltv,
        maxAsValue: req.body.maxAsValue,
        minAsValue: req.body.minAsValue,
        numProperties: req.body.numProperties,
        oneTimeYield: req.body.oneTimeYield,
        percentageOrAmount: req.body.percentageOrAmount,
        percentageOrAmount2: req.body.percentageOrAmount2,
        personallyGuranteeing: req.body.personallyGuranteeing,
        points: req.body.points,
        prePayPen: req.body.prePayPen,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        programType: req.body.programType,
        propertyMan: req.body.propertyMan,
        propertyType: req.body.propertyType,
        purchasePriceProperty: req.body.purchasePriceProperty,
        rateBuyDown: req.body.rateBuyDown,
        rateType: req.body.rateType,
        socialSecurity: req.body.socialSecurity,
        state: req.body.state,
        termMonths: req.body.termMonths,
        titleCompany: req.body.titleCompany,
        portfolioProperties: req.body.portfolioProperties,
        userEmail: req.body.userEmail,
      });

      // Save the new rental document to the database
      const savedRental = await newRental.save();

      res.status(201).json(savedRental);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating rental group", error: error.message });
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
