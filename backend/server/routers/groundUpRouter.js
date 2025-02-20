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
        userEmail: req.body.userEmail,
        firstName: req.body.firstName,
        borrowerLast: req.body.borrowerLast,
        borrowerEmail: req.body.borrowerEmail,
        borrowerCell: req.body.borrowerCell,
        borrowerCitizenship: req.body.borrowerCitizenship,
        personallyGuaranteeing: req.body.personallyGuaranteeing,
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
        homeAddress: req.body.homeAddress,
        addressCity: req.body.addressCity,
        addressZip: req.body.addressZip,
        addressState: req.body.addressState,
        propertyType: req.body.propertyType,
        propertyPurchasePrice: req.body.propertyPurchasePrice,
        afterRepairValue: req.body.afterRepairValue,
        purchaseorRefinance: req.body.purchaseorRefinance,
        propertySource: req.body.propertySource,
        isCondominium: req.body.isCondominium,
        renovationDescript: req.body.renovationDescript, // Array of strings
        exitStrategy: req.body.exitStrategy,
        additonalPropertyInfo: req.body.additonalPropertyInfo,
        asIsValue: req.body.asIsValue,
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
