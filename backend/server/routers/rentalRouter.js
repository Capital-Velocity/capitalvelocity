import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import Rental from "../models/rentalModel.js";

const rentalRouter = express.Router();

rentalRouter.post(
  "/addRentalGroup",
  expressAsyncHandler(async (req, res) => {
    try {
      // Create a new Rental document using the request body
      const newRental = new Rental({
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
        firstName: req.body.firstName,
        grossMonthlyRent: req.body.grossMonthlyRent,
        insuranceCompany: req.body.insuranceCompany,
        loanPurpose: req.body.loanPurpose,
        personallyGuranteeing: req.body.personallyGuranteeing,
        portfolioProperties: req.body.portfolioProperties, // Array of portfolio properties
        preferredClosingAttorney: req.body.preferredClosingAttorney,
        propertyMan: req.body.propertyMan,
        purchasePriceProperty: req.body.purchasePriceProperty,
        socialSecurity: req.body.socialSecurity,
        state: req.body.state,
        titleCompany: req.body.titleCompany,
        userEmail: req.body.userEmail,
      });

      // Save the new rental document to the database
      const savedRental = await newRental.save();

      res.status(201).json(savedRental);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating rental group", error: error.message });
    }
  })
);

// Fetch all the rental applications
rentalRouter.get(
  "/getAllRental",
  expressAsyncHandler(async (req, res) => {
    try {
      const rental = await Rental.find({}); // Retrieve all records in the Rental collection
      res.json(rental);
    } catch (error) {
      res.status(500).send({ message: "Error fetching rentals" });
    }
  })
);

export default rentalRouter;
