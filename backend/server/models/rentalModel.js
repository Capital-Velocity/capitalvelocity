import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  propertyType: { type: String },
  numProperties: { type: String },
  estimatedValue: { type: String },
  monthlyRent: { type: String },
  monthlyTaxes: { type: String },
  monthlyInsurance: { type: String },
  monthlyHOA: { type: String },
  monthlyOtherExpenses: { type: String },
});

const rentalModelSchema = new mongoose.Schema(
  {
    armsLengthDescription: { type: String },
    authorizedSignatory: { type: String },
    bestTerms: { type: String },
    birthDate: { type: String },
    birthMonth: { type: String },
    birthYear: { type: String },
    borrowerCell: { type: String },
    borrowerCitizenship: { type: String },
    borrowerEmail: { type: String },
    borrowerLast: { type: String },
    borrowingEntityInformation: { type: String },
    borrowingEntityOwned: { type: Number },
    closingDate: { type: String },
    contactLastName: { type: String },
    dateofIncorp: { type: String },
    entityAddress: { type: String },
    entityName: { type: String },
    entityType: { type: String },
    experienceWithRealEstate: { type: Number },
    firstName: { type: String },
    grossMonthlyRent: { type: String },
    insuranceCompany: { type: String },
    loanPurpose: { type: String },
    personallyGuranteeing: { type: Number },
    portfolioProperties: { type: [propertySchema] }, // Array of portfolio properties
    preferredClosingAttorney: { type: String },
    propertyMan: { type: String },
    purchasePriceProperty: { type: String },
    socialSecurity: { type: String },
    state: { type: String },
    titleCompany: { type: String },
    userEmail: { type: String },
    ficoScore: { type: String },
    uploadedDocuments: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const Rental = mongoose.model("Rental", rentalModelSchema);
export default Rental;
