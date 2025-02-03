import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import FixForm from "../models/fixandFlipModel.js";

const fixandflipRouter = express.Router();

fixandflipRouter.post(
  "/addFixandFlip",
  expressAsyncHandler(async (req, res) => {
    try {
      const fixandFlip = new FixForm({
        additionalPropertyInfo: req.body.additionalPropertyInfo,
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        addressZip: req.body.addressZip,
        afterRepairValue: req.body.afterRepairValue,
        armsLengthDescription: req.body.armsLengthDescription,
        authorizedSign: req.body.authorizedSign,
        authorizedSignatory: req.body.authorizedSignatory,
        bestTerms: req.body.bestTerms,
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
        closingDate: req.body.closingDate,
        constructionBudgetPercentage: req.body.constructionBudgetPercentage,
        constructionHoldback: req.body.constructionHoldback,
        contactLastName: req.body.contactLastName,
        creditScore: req.body.creditScore,
        dateofIncorp: req.body.dateofIncorp,
        entityAddress: req.body.entityAddress,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        exitStrategry: req.body.exitStrategry,
        firstName: req.body.firstName,
        guranteeLoan: req.body.guranteeLoan,
        homeAddress: req.body.homeAddress,
        initialLoanAmount: req.body.initialLoanAmount,
        insuranceCompany: req.body.insuranceCompany,
        interestRate: req.body.interestRate,
        interestTerm: req.body.interestTerm,
        intrestMethod: req.body.intrestMethod,
        isCondominium: req.body.isCondominium,
        percentageOrAmount: req.body.percentageOrAmount,
        percentageOrAmount2: req.body.percentageOrAmount2,
        personallyGuranteeing: req.body.personallyGuranteeing,
        points: req.body.points,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        propertyPurchasePrice: req.body.propertyPurchasePrice,
        propertySource: req.body.propertySource,
        propertyType: req.body.propertyType,
        purchaseAmount: req.body.purchaseAmount,
        refinance: req.body.refinance,
        renovationBudget: req.body.renovationBudget,
        socialSecurity: req.body.socialSecurity,
        termMonths: req.body.termMonths,
        titleCompany: req.body.titleCompany,
        transactionArmslength: req.body.transactionArmslength,
        wholesalerPay: req.body.wholesalerPay,
        wholesalerSource: req.body.wholesalerSource,
        // New fields added
        userEmail: req.body.userEmail,
        additonalPropertyInfo: req.body.additonalPropertyInfo,
        buyerSellerDescribe: req.body.buyerSellerDescribe,
        experiencedwithBorrowing: req.body.experiencedwithBorrowing,
        experienceWithRealEstate: req.body.experienceWithRealEstate,
        purchase: req.body.purchase,
        renovationDescript: req.body.renovationDescript,
      });

      const createdfixandFlip = await fixandFlip.save();
      res.json(createdfixandFlip);
    } catch (error) {
      res.status(401).send({ message: error });
    }
  })
);

// Fetch all the fixandFlip applications
fixandflipRouter.get(
  "/getAllFixApplications",
  expressAsyncHandler(async (req, res) => {
    try {
      const fixandflip = await FixForm.find({}); // Retrieve all records in the FixForm collection
      res.json(fixandflip);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error fetching fixandflip applications" });
    }
  })
);

export default fixandflipRouter;
