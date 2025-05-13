import mongoose from "mongoose";

const stabalizedBridgeSchema = new mongoose.Schema(
  {
    additonalPropertyInfo: { type: String },
    addressCity: { type: String },
    addressState: { type: String },
    addressZip: { type: String },
    armsLengthDescription: { type: String },
    asIsValue: { type: String },
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
    completedCapex: { type: String },
    contactLastName: { type: String },
    dateofIncorp: { type: String },
    entityAddress: { type: String },
    entityName: { type: String },
    entityType: { type: String },
    experienceWithRealEstate: { type: Number },
    firstName: { type: String },
    grossMonthlyRent: { type: String },
    homeAddress: { type: String },
    insuranceCompany: { type: String },
    isCondominium: { type: String },
    personallyGuranteeing: { type: Number },
    preferredClosingAttorney: { type: String },
    propertyMonthlyHOAFee: { type: String },
    propertyMonthlyInsurance: { type: String },
    propertyMonthlyOtherExpenses: { type: String },
    propertyMonthlyTaxes: { type: String },
    propertySource: { type: String },
    propertyType: { type: String },
    purchaseDate: { type: String },
    purchasePriceProperty: { type: String },
    purchaseorRefinance: { type: String },
    renovationDescript: { type: [String] }, // Array of strings
    socialSecurity: { type: String },
    titleCompany: { type: String },
    userEmail: { type: String },
    ficoScore: { type: String },
    uploadedDocuments: { type: [String] },
    referralInfo: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const StableBridge = mongoose.model("StableBridge", stabalizedBridgeSchema);
export default StableBridge;
