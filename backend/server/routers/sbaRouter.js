import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import SBA from "../models/sbaModel.js";

const sbaRouter = express.Router();

sbaRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const formData = new SBA({
        userEmail: req.body.userEmail,
        accountsPayable: req.body.accountsPayable,
        automobiles: req.body.automobiles,
        bankruptcyProtection: req.body.bankruptcyProtection,
        birthDate: req.body.birthDate,
        birthMonth: req.body.birthMonth,
        birthYear: req.body.birthYear,
        businessDefault: req.body.businessDefault,
        cashonHand: req.body.cashonHand,
        citizenshipStatus: req.body.citizenshipStatus,
        closingDate: req.body.closingDate,
        coMaker: req.body.coMaker,
        countryofCitizenship: req.body.countryofCitizenship,
        creditScore: req.body.creditScore,
        daysDelenquet: req.body.daysDelenquet,
        email: req.body.email,
        ethinicity: req.body.ethinicity,
        fileUploadUrl: req.body.fileUploadUrl,
        financingDelinquent: req.body.financingDelinquent,
        gender: req.body.gender,
        installmentAccount: req.body.installmentAccount,
        insuranceCompany: req.body.insuranceCompany,
        isArrested: req.body.isArrested,
        isCriminalOffense: req.body.isCriminalOffense,
        isIndictment: req.body.isIndictment,
        legalAction: req.body.legalAction,
        legalClaims: req.body.legalClaims,
        lifeInsurance: req.body.lifeInsurance,
        lifeInsuranceHeld: req.body.lifeInsuranceHeld,
        loanGuarantor: req.body.loanGuarantor,
        loanInsurance: req.body.loanInsurance,
        mortgagesRealEstate: req.body.mortgagesRealEstate,
        netInvestmentIncome: req.body.netInvestmentIncome,
        netInvestmentIncomeLiab: req.body.netInvestmentIncomeLiab,
        notesPayable: req.body.notesPayable,
        notesReceivable: req.body.notesReceivable,
        otherAssets: req.body.otherAssets,
        otherIncome: req.body.otherIncome,
        otherLiabilities: req.body.otherLiabilities,
        otherPersonalProperty: req.body.otherPersonalProperty,
        otherSpecialDebt: req.body.otherSpecialDebt,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        provisionFederalIncomeTax: req.body.provisionFederalIncomeTax,
        race: req.body.race,
        realEstate: req.body.realEstate,
        realEstateIncomeSource: req.body.realEstateIncomeSource,
        retirementAccount: req.body.retirementAccount,
        salary: req.body.salary,
        savingsAccounts: req.body.savingsAccounts,
        smallBusiness: req.body.smallBusiness,
        socialSecurity: req.body.socialSecurity,
        stocksAndBonds: req.body.stocksAndBonds,
        stocksBonds: req.body.stocksBonds,
        suspendedFederal: req.body.suspendedFederal,
        titleCompany: req.body.titleCompany,
        totalLiabilities: req.body.totalLiabilities,
        unpaidTaxes: req.body.unpaidTaxes,
        uscisRegNum: req.body.uscisRegNum,
        veteran: req.body.veteran,
        bankruptDetail: req.body.bankruptDetail,
        legalActionDetails: req.body.legalActionDetails,
        loanDetails: req.body.loanDetails,
      });

      const createdFormData = await formData.save();
      res.json(createdFormData);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })
);

export default sbaRouter;
