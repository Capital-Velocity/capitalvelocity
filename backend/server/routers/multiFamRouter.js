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
        userEmail: req.body.userEmail,
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        addressZip: req.body.addressZip,
        afterRepair: req.body.afterRepair,
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
        authorizedSign: req.body.authorizedSign,
        background: req.body.background,
        birthDate: req.body.birthDate,
        birthMonth: req.body.birthMonth,
        birthYear: req.body.birthYear,
        borrowerCitizenshipStatus: req.body.borrowerCitizenshipStatus,
        borrowerEmail: req.body.borrowerEmail,
        borrowingCreditScore: req.body.borrowingCreditScore,
        borrowingEntityInformation: req.body.borrowingEntityInformation,
        borrowingEntityOwned: req.body.borrowingEntityOwned,
        brokerPoints: req.body.brokerPoints,
        capitalPoints: req.body.capitalPoints,
        capitalPointsExit: req.body.capitalPointsExit,
        cashOut: req.body.cashOut,
        closingDate: req.body.closingDate,
        collectCredit: req.body.collectCredit,
        completedCapex: req.body.completedCapex,
        constructionBudgetPercentage: req.body.constructionBudgetPercentage,
        constructionHoldback: req.body.constructionHoldback,
        contactLastName: req.body.contactLastName,
        creditScore: req.body.creditScore,
        dateofIncorp: req.body.dateofIncorp,
        debt: req.body.debt,
        debtValue: req.body.debtValue,
        entityAddress: req.body.entityAddress,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        exitFees: req.body.exitFees,
        exitStrat: req.body.exitStrat,
        firstName: req.body.firstName,
        grossMonthlyRent: req.body.grossMonthlyRent,
        guranteeLoan: req.body.guranteeLoan,
        homeAddress: req.body.homeAddress,
        initialLoanAmount: req.body.initialLoanAmount,
        insuranceCompany: req.body.insuranceCompany,
        interestRate: req.body.interestRate,
        interestTerm: req.body.interestTerm,
        intrestMethod: req.body.intrestMethod,
        investedCapital: req.body.investedCapital,
        lastName: req.body.lastName,
        liquidity: req.body.liquidity,
        percentageOrAmount: req.body.percentageOrAmount,
        percentageOrAmount2: req.body.percentageOrAmount2,
        personallyGuranteeing: req.body.personallyGuranteeing,
        phoneNumber: req.body.phoneNumber,
        points: req.body.points,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        propertyType: req.body.propertyType,
        purchase: req.body.purchase,
        purchaseAmount: req.body.purchaseAmount,
        purchaseDate: req.body.purchaseDate,
        purchasePrice: req.body.purchasePrice,
        purchaseorRefinance: req.body.purchaseorRefinance,
        redFlags: req.body.redFlags,
        socialSecurity: req.body.socialSecurity,
        termMonths: req.body.termMonths,
        titleCompany: req.body.titleCompany,
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
