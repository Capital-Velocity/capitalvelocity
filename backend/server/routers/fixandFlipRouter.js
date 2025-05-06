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
        ficoScore: req.body.ficoScore,
        firstName: req.body.firstName,
        homeAddress: req.body.homeAddress,
        insuranceCompany: req.body.insuranceCompany,
        isCondominium: req.body.isCondominium,
        personallyGuranteeing: req.body.personallyGuranteeing,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
        propertyMonthlyPropertyTaxes: req.body.propertyMonthlyPropertyTaxes,
        propertyMonthlyUtilityBills: req.body.propertyMonthlyUtilityBills,
        propertyOtherMonthlyExpenses: req.body.propertyOtherMonthlyExpenses,
        propertyPurchasePrice: req.body.propertyPurchasePrice,
        propertyRehabCost: req.body.propertyRehabCost,
        propertySource: req.body.propertySource,
        propertyType: req.body.propertyType,
        purchaseorRefinance: req.body.purchaseorRefinance,
        renovationDescript: req.body.renovationDescript,
        socialSecurity: req.body.socialSecurity,
        titleCompany: req.body.titleCompany,
        userEmail: req.body.userEmail,
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
