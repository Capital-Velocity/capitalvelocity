import express from "express";
import expressAsyncHandler from "express-async-handler";
import StableBridge from "../models/stabilizedbridgeModel.js";

const stabalizedRouter = express.Router();

stabalizedRouter.post(
  "/addStabilizedBridge",
  expressAsyncHandler(async (req, res) => {
    try {
      const stabalized = new StableBridge({
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        addressZip: req.body.addressZip,
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
        background: req.body.background,
        cashOut: req.body.cashOut,
        closingDate: req.body.closingDate,
        completedCapex: req.body.completedCapex,
        contactLastName: req.body.contactLastName,
        dateofIncorp: req.body.dateofIncorp,
        entityAddress: req.body.entityAddress,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        experienceWithRealEstate: req.body.experienceWithRealEstate,
        exitStrat: req.body.exitStrat,
        firstName: req.body.firstName,
        grossMonthlyRent: req.body.grossMonthlyRent,
        insuranceCompany: req.body.insuranceCompany,
        investedCapital: req.body.investedCapital,
        isCondominium: req.body.isCondominium,
        loanPurpose: req.body.loanPurpose,
        personallyGuranteeing: req.body.personallyGuranteeing,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        propertyAddress: req.body.propertyAddress,
        propertyMonthlyHOAFee: req.body.propertyMonthlyHOAFee,
        propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
        propertyMonthlyOtherExpenses: req.body.propertyMonthlyOtherExpenses,
        propertyMonthlyTaxes: req.body.propertyMonthlyTaxes,
        propertySource: req.body.propertySource,
        propertyType: req.body.propertyType,
        purchaseDate: req.body.purchaseDate,
        purchasePriceProperty: req.body.purchasePriceProperty,
        purchaseorRefinance: req.body.purchaseorRefinance,
        redFlags: req.body.redFlags,
        renovationDescript: req.body.renovationDescript, // Array of strings
        socialSecurity: req.body.socialSecurity,
        titleCompany: req.body.titleCompany,
        userEmail: req.body.userEmail,
      });

      const createdstabalized = await stabalized.save();
      res.json(createdstabalized);
    } catch (error) {
      res.status(401).send({ message: error });
    }
  })
);

stabalizedRouter.get(
  "/getAllStabalized",
  expressAsyncHandler(async (req, res) => {
    try {
      const stabalized = await StableBridge.find({});
      res.json(stabalized);
    } catch (error) {
      res.status(500).send({ message: "Error fetching referrals" });
    }
  })
);

export default stabalizedRouter;
