import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import GroundUp from "../models/groundUpModel.js";

const groundUpRouter = express.Router();

groundUpRouter.post(
  "/addGroundUp",
  expressAsyncHandler(async (req, res) => {
    try {
      const groundUpData = new GroundUp({
        afterRepairValue: req.body.afterRepairValue,
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
        creditScore: req.body.creditScore,
        exitStrategy: req.body.exitStrategy,
        guaranteeLoan: req.body.guaranteeLoan,
        homeAddress: req.body.homeAddress,
        isCondominium: req.body.isCondominium,
        personallyGuaranteeing: req.body.personallyGuaranteeing,
        propertyPurchasePrice: req.body.propertyPurchasePrice,
        propertySource: req.body.propertySource,
        propertyType: req.body.propertyType,
        refinance: req.body.refinance,
        renovationBudget: req.body.renovationBudget,
        socialSecurity: req.body.socialSecurity,
        transactionArmslength: req.body.transactionArmslength,
        wholesalerPay: req.body.wholesalerPay,
        wholesalerSource: req.body.wholesalerSource,
        userEmail: req.body.userEmail, // Add userEmail field
      });
      const createdGroundUp = await groundUpData.save();
      res.json(createdGroundUp);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })
);

// Fetch all the GroundUp applications
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
