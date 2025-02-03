import mongoose from "mongoose";

const groundUpSchema = new mongoose.Schema(
  {
    userEmail: { type: String }, // Add userEmail field
    afterRepairValue: { type: String },
    authorizedSign: { type: String },
    authorizedSignatory: { type: String },
    bestTerms: { type: String },
    birthDate: { type: String },
    birthMonth: { type: String },
    birthYear: { type: String },
    borrowerCell: { type: String },
    borrowerCitizenship: { type: String },
    borrowerEmail: { type: String },
    borrowerLast: { type: String },
    borrowerSocialSecurity: { type: String },
    borrowingEntityInformation: { type: String },
    borrowingEntityOwned: { type: Number },
    createdAt: { type: Date },
    creditScore: { type: String },
    exitStrategy: { type: String },
    guaranteeLoan: { type: String },
    homeAddress: { type: String },
    isCondominium: { type: String },
    personallyGuaranteeing: { type: Number },
    propertyPurchasePrice: { type: String },
    propertySource: { type: String },
    propertyType: { type: String },
    refinance: { type: String },
    renovationBudget: { type: String },
    socialSecurity: { type: String },
    transactionArmslength: { type: String },
    updatedAt: { type: Date },
    wholesalerPay: { type: String },
    wholesalerSource: { type: String },
  },
  {
    timestamps: true,
  }
);

const GroundUp = mongoose.model("GroundUp", groundUpSchema);
export default GroundUp;
