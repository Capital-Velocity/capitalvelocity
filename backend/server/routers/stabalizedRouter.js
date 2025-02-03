import express from "express";
import expressAsyncHandler from "express-async-handler";
import StableBridge from "../models/stabilizedbridgeModel.js";

const stabalizedRouter = express.Router();

stabalizedRouter.post(
  "/addStabilizedBridge",
  expressAsyncHandler(async (req, res) => {
    try {
      const stabalized = new StableBridge({
        userEmail: req.body.userEmail,
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        addressZip: req.body.addressZip,
        authorizedSign: req.body.authorizedSign,
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
        collectCredit: req.body.collectCredit,
        completedCapex: req.body.completedCapex,
        contactLastName: req.body.contactLastName,
        creditScore: req.body.creditScore,
        dateofIncorp: req.body.dateofIncorp,
        entityAddress: req.body.entityAddress,
        entityName: req.body.entityName,
        entityType: req.body.entityType,
        experienceWithRealEstate: req.body.experienceWithRealEstate,
        ficoScore: req.body.ficoScore,
        firstName: req.body.firstName,
        grossAnnual: req.body.grossAnnual,
        grossMonthlyRent: req.body.grossMonthlyRent,
        grossTaxes: req.body.grossTaxes,
        guranteeLoan: req.body.guranteeLoan,
        hoa: req.body.hoa,
        homeAddress: req.body.homeAddress,
        insuranceCompany: req.body.insuranceCompany,
        interestRate: req.body.interestRate,
        interestTerm: req.body.interestTerm,
        intrestMethod: req.body.intrestMethod,
        loanAmount: req.body.loanAmount,
        loanPurpose: req.body.loanPurpose,
        loantoValue: req.body.loantoValue,
        percentageOrAmount: req.body.percentageOrAmount,
        percentageOrAmount2: req.body.percentageOrAmount2,
        personallyGuranteeing: req.body.personallyGuranteeing,
        points: req.body.points,
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        propertyType: req.body.propertyType,
        purchaseDate: req.body.purchaseDate,
        purchasePriceProperty: req.body.purchasePriceProperty,
        socialSecurity: req.body.socialSecurity,
        termMonths: req.body.termMonths,
        titleCompany: req.body.titleCompany,
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
