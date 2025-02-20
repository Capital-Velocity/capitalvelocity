import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import MultiFam from "../models/multiFamModel.js";

const multiFamRouter = express.Router();

multiFamRouter.post(
  "/addMultiFam",
  expressAsyncHandler(async (req, res) => {
    try {
      const multiFamData = new MultiFam({
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        addressZip: req.body.addressZip,
        afterRepairValue: req.body.afterRepairValue,
        annualAdministrativeManagementFees:
          req.body.annualAdministrativeManagementFees,
        annualHOADues: req.body.annualHOADues,
        annualInsurance: req.body.annualInsurance,
        annualMarketingExpense: req.body.annualMarketingExpense,
        annualPayrollExpense: req.body.annualPayrollExpense,
        annualPropertyManagementFees: req.body.annualPropertyManagementFees,
        annualRepairsMaintenanceExpenses:
          req.body.annualRepairsMaintenanceExpenses,
        annualReplacementReserve: req.body.annualReplacementReserve,
        annualTaxes: req.body.annualTaxes,
        annualUtilitiesExpenses: req.body.annualUtilitiesExpenses,
        asIsValue: req.body.asIsValue,
        authorizedSignatory: req.body.authorizedSignatory,
        background: req.body.background,
        birthDate: req.body.birthDate,
        birthMonth: req.body.birthMonth,
        birthYear: req.body.birthYear,
        borrowerCitizenshipStatus: req.body.borrowerCitizenshipStatus,
        borrowerEmail: req.body.borrowerEmail,
        borrowingEntityInformation: req.body.borrowingEntityInformation,
        borrowingEntityOwned: req.body.borrowingEntityOwned,
        cashOut: req.body.cashOut,
        closingDate: req.body.closingDate,
        completedCapex: req.body.completedCapex,
        contactLastName: req.body.contactLastName,
        dateofIncorp: req.body.dateofIncorp,
        debt: req.body.debt,
        debtValue: req.body.debtValue,
        entityAddress: req.body.entityAddress,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        exitStrat: req.body.exitStrat,
        firstName: req.body.firstName,
        grossMonthlyRent: req.body.grossMonthlyRent,
        homeAddress: req.body.homeAddress,
        insuranceCompany: req.body.insuranceCompany,
        investedCapital: req.body.investedCapital,
        isCondominium: req.body.isCondominium,
        lastName: req.body.lastName,
        liquidity: req.body.liquidity,
        personallyGuranteeing: req.body.personallyGuranteeing,
        phoneNumber: req.body.phoneNumber,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        propertyMonthlyInsurance: req.body.propertyMonthlyInsurance,
        propertyMonthlyPropertyTaxes: req.body.propertyMonthlyPropertyTaxes,
        propertyMonthlyUtilityBills: req.body.propertyMonthlyUtilityBills,
        propertyOtherMonthlyExpenses: req.body.propertyOtherMonthlyExpenses,
        propertyPurchasePrice: req.body.propertyPurchasePrice,
        propertyRehabCost: req.body.propertyRehabCost,
        propertySource: req.body.propertySource,
        propertyType: req.body.propertyType,
        purchaseDate: req.body.purchaseDate,
        purchaseorRefinance: req.body.purchaseorRefinance,
        redFlags: req.body.redFlags,
        renovationDescript: req.body.renovationDescript, // Array of strings
        socialSecurity: req.body.socialSecurity,
        titleCompany: req.body.titleCompany,
        userEmail: req.body.userEmail,
      });

      const createdMultiFam = await multiFamData.save();
      res.json(createdMultiFam);
    } catch (error) {
      res.status(401).send({ message: error });
    }
  })
);

multiFamRouter.get(
  "/getAllMultiFam",
  expressAsyncHandler(async (req, res) => {
    try {
      const multifam = await MultiFam.find({});
      res.json(multifam);
    } catch (error) {
      res.status(500).send({ message: "Error fetching referrals" });
    }
  })
);

export default multiFamRouter;
