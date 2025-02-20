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
        additonalPropertyInfo: req.body.additonalPropertyInfo,
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        addressZip: req.body.addressZip,
        afterRepairValue: req.body.afterRepairValue,
        armsLengthDescription: req.body.armsLengthDescription,
        asIsValue: req.body.asIsValue,
        authorizedSignatory: req.body.authorizedSignatory,
        bestTerms: req.body.bestTerms,
        birthDate: req.body.birthDate,
        birthMonth: req.body.birthMonth,
        birthYear: req.body.birthYear,
        borrowerCell: req.body.borrowerCell,
        borrowerCitizenship: req.body.borrowerCitizenship,
        borrowerEmail: req.body.borrowerEmail,
        borrowerLast: req.body.borrowerLast,
        borrowingEntityInformation: req.body.borrowingEntityInformation,
        borrowingEntityOwned: req.body.borrowingEntityOwned,
        closingDate: req.body.closingDate,
        contactLastName: req.body.contactLastName,
        dateofIncorp: req.body.dateofIncorp,
        entityAddress: req.body.entityAddress,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        experienceWithRealEstate: req.body.experienceWithRealEstate,
        exitStrategy: req.body.exitStrategy,
        firstName: req.body.firstName,
        grossMonthlyRent: req.body.grossMonthlyRent,
        homeAddress: req.body.homeAddress,
        insuranceCompany: req.body.insuranceCompany,
        isCondominium: req.body.isCondominium,
        personallyGuaranteeing: req.body.personallyGuaranteeing,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        propertyMonthlyHOAFee: req.body.propertyMonthlyHOAFee,
        propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
        propertyMonthlyOtherExpenses: req.body.propertyMonthlyOtherExpenses,
        propertyMonthlyTaxes: req.body.propertyMonthlyTaxes,
        propertyPurchasePrice: req.body.propertyPurchasePrice,
        propertySource: req.body.propertySource,
        propertyType: req.body.propertyType,
        purchaseorRefinance: req.body.purchaseorRefinance,
        renovationDescript: req.body.renovationDescript, // Array of strings
        socialSecurity: req.body.socialSecurity,
        titleCompany: req.body.titleCompany,
        userEmail: req.body.userEmail,
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
