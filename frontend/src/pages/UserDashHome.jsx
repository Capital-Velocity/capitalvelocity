import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AntDesignSideBarUser from "../components/AntDesignSideBarUser";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function UserDashHome(props) {
  const theme = useTheme();
  const params = useParams();
  const [fixForms, setFixForms] = useState([]);
  const navigate = useNavigate();
  const commonStyles = {
    bgcolor: "background.paper",
    m: 1,
  };
  const [email, setEmail] = useState("");
  const [matchingEntries, setMatchingEntries] = useState([]);

  const handleExportRow = (rowData) => {
    const worksheet = XLSX.utils.json_to_sheet([rowData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FixForm");
    XLSX.writeFile(workbook, `fixForm_${rowData._id}.xlsx`);
  };
  const handleViewAsHtml = (rowData) => {
    let htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
              color: #333;
              background-color: #f5f5f5;
            }
            h2,h3 {
              color: #498dd6;
              border-bottom: 2px solid #498dd6;
              padding-bottom: 10px;
            }
            p {
              margin: 10px 0;
              padding: 5px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            table, th, td {
              border: 1px solid #ddd;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #498dd6;
              color: white;
            }
            .details {
              margin-bottom: 20px;
              padding: 10px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
          <div class="details">
            <h2>Application Details</h2>
            <h3>Application Type : ${rowData.model}</h3>
            <p><strong>Created At:</strong> ${new Date(
              rowData.createdAt
            ).toLocaleString()}</p>
            <p><strong>Application ID:</strong> ${rowData._id}</p>
            <p><strong>Email:</strong> ${rowData.userEmail}</p>
      `;

    if (rowData.model === "Sba") {
      htmlContent += `
        <p><strong>Accounts Payable:</strong> ${rowData.accountsPayable}</p>
        <p><strong>Automobiles:</strong> ${rowData.automobiles}</p>
        <p><strong>Bankruptcy Protection:</strong> ${rowData.bankruptcyProtection}</p>
        <p><strong>Birth Date:</strong> ${rowData.birthDate}</p>
        <p><strong>Birth Month:</strong> ${rowData.birthMonth}</p>
        <p><strong>Birth Year:</strong> ${rowData.birthYear}</p>
        <p><strong>Business Default:</strong> ${rowData.businessDefault}</p>
        <p><strong>Cash on Hand:</strong> ${rowData.cashonHand}</p>
        <p><strong>Citizenship Status:</strong> ${rowData.citizenshipStatus}</p>
        <p><strong>Closing Date:</strong> ${rowData.closingDate}</p>
        <p><strong>Co-Maker:</strong> ${rowData.coMaker}</p>
        <p><strong>Country of Citizenship:</strong> ${rowData.countryofCitizenship}</p>
        <p><strong>Credit Score:</strong> ${rowData.creditScore}</p>
        <p><strong>Days Delinquent:</strong> ${rowData.daysDelenquet}</p>
        <p><strong>Email:</strong> ${rowData.email}</p>
        <p><strong>Ethnicity:</strong> ${rowData.ethinicity}</p>
        <p><strong>Financing Delinquent:</strong> ${rowData.financingDelinquent}</p>
        <p><strong>Gender:</strong> ${rowData.gender}</p>
        <p><strong>Installment Account:</strong> ${rowData.installmentAccount}</p>
        <p><strong>Insurance Company:</strong> ${rowData.insuranceCompany}</p>
        <p><strong>Is Arrested:</strong> ${rowData.isArrested}</p>
        <p><strong>Is Criminal Offense:</strong> ${rowData.isCriminalOffense}</p>
        <p><strong>Is Indictment:</strong> ${rowData.isIndictment}</p>
        <p><strong>Legal Action:</strong> ${rowData.legalAction}</p>
        <p><strong>Legal Claims:</strong> ${rowData.legalClaims}</p>
        <p><strong>Life Insurance:</strong> ${rowData.lifeInsurance}</p>
        <p><strong>Life Insurance Held:</strong> ${rowData.lifeInsuranceHeld}</p>
        <p><strong>Loan Guarantor:</strong> ${rowData.loanGuarantor}</p>
        <p><strong>Loan Insurance:</strong> ${rowData.loanInsurance}</p>
        <p><strong>Mortgages Real Estate:</strong> ${rowData.mortgagesRealEstate}</p>
        <p><strong>Net Investment Income:</strong> ${rowData.netInvestmentIncome}</p>
        <p><strong>Net Investment Income Liability:</strong> ${rowData.netInvestmentIncomeLiab}</p>
        <p><strong>Notes Payable:</strong> ${rowData.notesPayable}</p>
        <p><strong>Notes Receivable:</strong> ${rowData.notesReceivable}</p>
        <p><strong>Other Assets:</strong> ${rowData.otherAssets}</p>
        <p><strong>Other Income:</strong> ${rowData.otherIncome}</p>
        <p><strong>Other Liabilities:</strong> ${rowData.otherLiabilities}</p>
        <p><strong>Other Personal Property:</strong> ${rowData.otherPersonalProperty}</p>
        <p><strong>Other Special Debt:</strong> ${rowData.otherSpecialDebt}</p>
        <p><strong>Preferred Closing Attorney:</strong> ${rowData.preferredClosingAttorney}</p>
        <p><strong>Provision Federal Income Tax:</strong> ${rowData.provisionFederalIncomeTax}</p>
        <p><strong>Race:</strong> ${rowData.race}</p>
        <p><strong>Real Estate:</strong> ${rowData.realEstate}</p>
        <p><strong>Real Estate Income Source:</strong> ${rowData.realEstateIncomeSource}</p>
        <p><strong>Retirement Account:</strong> ${rowData.retirementAccount}</p>
        <p><strong>Salary:</strong> ${rowData.salary}</p>
        <p><strong>Savings Accounts:</strong> ${rowData.savingsAccounts}</p>
        <p><strong>Small Business:</strong> ${rowData.smallBusiness}</p>
        <p><strong>Social Security:</strong> ${rowData.socialSecurity}</p>
        <p><strong>Stocks and Bonds:</strong> ${rowData.stocksAndBonds}</p>
        <p><strong>Stocks Bonds:</strong> ${rowData.stocksBonds}</p>
        <p><strong>Suspended Federal:</strong> ${rowData.suspendedFederal}</p>
        <p><strong>Title Company:</strong> ${rowData.titleCompany}</p>
        <p><strong>Total Liabilities:</strong> ${rowData.totalLiabilities}</p>
        <p><strong>Unpaid Taxes:</strong> ${rowData.unpaidTaxes}</p>
        <p><strong>Veteran:</strong> ${rowData.veteran}</p>
        <p><strong>USCIS Registration Number:</strong> ${rowData.uscisRegNum}</p>
        <p><strong>Bankruptcy Detail:</strong> ${rowData.bankruptDetail}</p>
        <p><strong>Legal Action Details:</strong> ${rowData.legalActionDetails}</p>
        <p><strong>Loan Details:</strong></p>
      `;
    }
    if (rowData.model === "Fix and Flip") {
      htmlContent += `
        <p><strong>Email:</strong> ${rowData.userEmail}</p>
        <p><strong>Additional Property Info:</strong> ${rowData.additonalPropertyInfo}</p>
        <p><strong>City:</strong> ${rowData.addressCity}</p>
        <p><strong>State:</strong> ${rowData.addressState}</p>
        <p><strong>Zip:</strong> ${rowData.addressZip}</p>
        <p><strong>After Repair Value:</strong> ${rowData.afterRepairValue}</p>
        <p><strong>Arms Length Description:</strong> ${rowData.armsLengthDescription}</p>
        <p><strong>Authorized Sign:</strong> ${rowData.authorizedSign}</p>
        <p><strong>Authorized Signatory:</strong> ${rowData.authorizedSignatory}</p>
        <p><strong>Best Terms:</strong> ${rowData.bestTerms}</p>
        <p><strong>Birth Date:</strong> ${rowData.birthDate}</p>
        <p><strong>Birth Month:</strong> ${rowData.birthMonth}</p>
        <p><strong>Birth Year:</strong> ${rowData.birthYear}</p>
        <p><strong>Borrower Cell:</strong> ${rowData.borrowerCell}</p>
        <p><strong>Borrower Citizenship:</strong> ${rowData.borrowerCitizenship}</p>
        <p><strong>Borrower Email:</strong> ${rowData.borrowerEmail}</p>
        <p><strong>Borrower Last:</strong> ${rowData.borrowerLast}</p>
        <p><strong>Borrower Social Security:</strong> ${rowData.borrowerSocialSecurity}</p>
        <p><strong>Borrowing Entity Information:</strong> ${rowData.borrowingEntityInformation}</p>
        <p><strong>Experience With Real Estate:</strong> ${rowData.experienceWithRealEstate}</p>
        <p><strong>Broker Points:</strong> ${rowData.brokerPoints}</p>
        <p><strong>Buyer Seller Describe:</strong> ${rowData.buyerSellerDescribe}</p>
        <p><strong>Closing Date:</strong> ${rowData.closingDate}</p>
        <p><strong>Construction Budget Percentage:</strong> ${rowData.constructionBudgetPercentage}</p>
        <p><strong>Construction Holdback:</strong> ${rowData.constructionHoldback}</p>
        <p><strong>Contact Last Name:</strong> ${rowData.contactLastName}</p>
        <p><strong>Credit Score:</strong> ${rowData.creditScore}</p>
        <p><strong>Date of Incorporation:</strong> ${rowData.dateofIncorp}</p>
        <p><strong>Entity Address:</strong> ${rowData.entityAddress}</p>
        <p><strong>Entity Name:</strong> ${rowData.entityName}</p>
        <p><strong>Entity Type:</strong> ${rowData.entityType}</p>
        <p><strong>Exit Strategy:</strong> ${rowData.exitStrategry}</p>
        <p><strong>First Name:</strong> ${rowData.firstName}</p>
        <p><strong>Guarantee Loan:</strong> ${rowData.guranteeLoan}</p>
        <p><strong>Home Address:</strong> ${rowData.homeAddress}</p>
        <p><strong>Initial Loan Amount:</strong> ${rowData.initialLoanAmount}</p>
        <p><strong>Insurance Company:</strong> ${rowData.insuranceCompany}</p>
        <p><strong>Interest Rate:</strong> ${rowData.interestRate}</p>
        <p><strong>Interest Term:</strong> ${rowData.interestTerm}</p>
        <p><strong>Interest Method:</strong> ${rowData.intrestMethod}</p>
        <p><strong>Is Condominium:</strong> ${rowData.isCondominium}</p>
        <p><strong>Percentage or Amount:</strong> ${rowData.percentageOrAmount}</p>
        <p><strong>Percentage or Amount 2:</strong> ${rowData.percentageOrAmount2}</p>
        <p><strong>Experienced with Borrowing:</strong> ${rowData.experiencedwithBorrowing}</p>
        <p><strong>Points:</strong> ${rowData.points}</p>
        <p><strong>Preferred Closing Attorney:</strong> ${rowData.preferredClosingAttorney}</p>
        <p><strong>Property Purchase Price:</strong> ${rowData.propertyPurchasePrice}</p>
        <p><strong>Property Source:</strong> ${rowData.propertySource}</p>
        <p><strong>Property Type:</strong> ${rowData.propertyType}</p>
        <p><strong>Purchase Amount:</strong> ${rowData.purchaseAmount}</p>
        <p><strong>Purchase:</strong> ${rowData.purchase}</p>
        <p><strong>Refinance:</strong> ${rowData.refinance}</p>
        <p><strong>Renovation Budget:</strong> ${rowData.renovationBudget}</p>
        <p><strong>Renovation Description:</strong> ${rowData.renovationDescript}</p>
        <p><strong>Social Security:</strong> ${rowData.socialSecurity}</p>
        <p><strong>Term Months:</strong> ${rowData.termMonths}</p>
        <p><strong>Title Company:</strong> ${rowData.titleCompany}</p>
        <p><strong>Transaction Armslength:</strong> ${rowData.transactionArmslength}</p>
        <p><strong>Wholesaler Pay:</strong> ${rowData.wholesalerPay}</p>
        <p><strong>Wholesaler Source:</strong> ${rowData.wholesalerSource}</p>
      `;
    }
    if (rowData.model === "Ground Up") {
      htmlContent += `
        <p><strong>Email:</strong> ${rowData.userEmail}</p>
        <p><strong>Additional Property Info:</strong> ${rowData.additonalPropertyInfo}</p>
        <p><strong>City:</strong> ${rowData.addressCity}</p>
        <p><strong>State:</strong> ${rowData.addressState}</p>
        <p><strong>Zip:</strong> ${rowData.addressZip}</p>
        <p><strong>After Repair Value:</strong> ${rowData.afterRepairValue}</p>
        <p><strong>Arms Length Description:</strong> ${rowData.armsLengthDescription}</p>
        <p><strong>Authorized Sign:</strong> ${rowData.authorizedSign}</p>
        <p><strong>Authorized Signatory:</strong> ${rowData.authorizedSignatory}</p>
        <p><strong>Best Terms:</strong> ${rowData.bestTerms}</p>
        <p><strong>Birth Date:</strong> ${rowData.birthDate}</p>
        <p><strong>Birth Month:</strong> ${rowData.birthMonth}</p>
        <p><strong>Birth Year:</strong> ${rowData.birthYear}</p>
        <p><strong>Borrower Cell:</strong> ${rowData.borrowerCell}</p>
        <p><strong>Borrower Citizenship:</strong> ${rowData.borrowerCitizenship}</p>
        <p><strong>Borrower Email:</strong> ${rowData.borrowerEmail}</p>
        <p><strong>Borrower Last:</strong> ${rowData.borrowerLast}</p>
        <p><strong>Borrower Social Security:</strong> ${rowData.borrowerSocialSecurity}</p>
        <p><strong>Borrowing Entity Information:</strong> ${rowData.borrowingEntityInformation}</p>
        <p><strong>Buyer Seller Describe:</strong> ${rowData.buyerSellerDescribe}</p>
        <p><strong>Closing Date:</strong> ${rowData.closingDate}</p>
        <p><strong>Contact Last Name:</strong> ${rowData.contactLastName}</p>
        <p><strong>Credit Score:</strong> ${rowData.creditScore}</p>
        <p><strong>Date of Incorporation:</strong> ${rowData.dateofIncorp}</p>
        <p><strong>Entity Address:</strong> ${rowData.entityAddress}</p>
        <p><strong>Entity Name:</strong> ${rowData.entityName}</p>
        <p><strong>Entity Type:</strong> ${rowData.entityType}</p>
        <p><strong>Exit Strategy:</strong> ${rowData.exitStrategry}</p>
        <p><strong>Experience With Real Estate:</strong> ${rowData.experienceWithRealEstate}</p>
        <p><strong>First Name:</strong> ${rowData.firstName}</p>
        <p><strong>Guarantee Loan:</strong> ${rowData.guranteeLoan}</p>
        <p><strong>Home Address:</strong> ${rowData.homeAddress}</p>
        <p><strong>Insurance Company:</strong> ${rowData.insuranceCompany}</p>
        <p><strong>Is Condominium:</strong> ${rowData.isCondominium}</p>
        <p><strong>Personally Guaranteeing:</strong> ${rowData.personallyGuranteeing}</p>
        <p><strong>Preferred Closing Attorney:</strong> ${rowData.preferredClosingAttorney}</p>
        <p><strong>Property Purchase Price:</strong> ${rowData.propertyPurchasePrice}</p>
        <p><strong>Property Source:</strong> ${rowData.propertySource}</p>
        <p><strong>Property Type:</strong> ${rowData.propertyType}</p>
        <p><strong>Purchase or Refinance:</strong> ${rowData.purchaseorRefinance}</p>
        <p><strong>Renovation Budget:</strong> ${rowData.renovationBudget}</p>
        <p><strong>Renovation Description:</strong> ${rowData.renovationDescript}</p>
        <p><strong>Social Security:</strong> ${rowData.socialSecurity}</p>
        <p><strong>Title Company:</strong> ${rowData.titleCompany}</p>
        <p><strong>Transaction Arms Length:</strong> ${rowData.transactionArmslength}</p>
        <p><strong>Wholesaler Pay:</strong> ${rowData.wholesalerPay}</p>
        <p><strong>Wholesaler Source:</strong> ${rowData.wholesalerSource}</p>
      `;
    }

    if (rowData.model === "Multi Family") {
      htmlContent += `
        <p><strong>Email:</strong> ${rowData.userEmail}</p>
        <p><strong>City:</strong> ${rowData.addressCity}</p>
        <p><strong>State:</strong> ${rowData.addressState}</p>
        <p><strong>Zip:</strong> ${rowData.addressZip}</p>
        <p><strong>After Repair:</strong> ${rowData.afterRepair}</p>
        <p><strong>Annual Administrative Management Fees:</strong> ${rowData.annualAdministrativeManagementFees}</p>
        <p><strong>Annual HOA Dues:</strong> ${rowData.annualHOADues}</p>
        <p><strong>Annual Insurance:</strong> ${rowData.annualInsurance}</p>
        <p><strong>Annual Marketing Expense:</strong> ${rowData.annualMarketingExpense}</p>
        <p><strong>Annual Payroll Expense:</strong> ${rowData.annualPayrollExpense}</p>
        <p><strong>Annual Property Management Fees:</strong> ${rowData.annualPropertyManagementFees}</p>
        <p><strong>Annual Repairs Maintenance Expenses:</strong> ${rowData.annualRepairsMaintenanceExpenses}</p>
        <p><strong>Annual Replacement Reserve:</strong> ${rowData.annualReplacementReserve}</p>
        <p><strong>Annual Taxes:</strong> ${rowData.annualTaxes}</p>
        <p><strong>Annual Utilities Expenses:</strong> ${rowData.annualUtilitiesExpenses}</p>
        <p><strong>As Is Value:</strong> ${rowData.asIsValue}</p>
        <p><strong>Authorized Sign:</strong> ${rowData.authorizedSign}</p>
        <p><strong>Background:</strong> ${rowData.background}</p>
        <p><strong>Birth Date:</strong> ${rowData.birthDate}</p>
        <p><strong>Birth Month:</strong> ${rowData.birthMonth}</p>
        <p><strong>Birth Year:</strong> ${rowData.birthYear}</p>
        <p><strong>Borrower Citizenship Status:</strong> ${rowData.borrowerCitizenshipStatus}</p>
        <p><strong>Borrower Email:</strong> ${rowData.borrowerEmail}</p>
        <p><strong>Borrowing Credit Score:</strong> ${rowData.borrowingCreditScore}</p>
        <p><strong>Borrowing Entity Information:</strong> ${rowData.borrowingEntityInformation}</p>
        <p><strong>Borrowing Entity Owned:</strong> ${rowData.borrowingEntityOwned}</p>
        <p><strong>Broker Points:</strong> ${rowData.brokerPoints}</p>
        <p><strong>Capital Points:</strong> ${rowData.capitalPoints}</p>
        <p><strong>Capital Points Exit:</strong> ${rowData.capitalPointsExit}</p>
        <p><strong>Cash Out:</strong> ${rowData.cashOut}</p>
        <p><strong>Closing Date:</strong> ${rowData.closingDate}</p>
        <p><strong>Collect Credit:</strong> ${rowData.collectCredit}</p>
        <p><strong>Completed Capex:</strong> ${rowData.completedCapex}</p>
        <p><strong>Construction Budget Percentage:</strong> ${rowData.constructionBudgetPercentage}</p>
        <p><strong>Construction Holdback:</strong> ${rowData.constructionHoldback}</p>
        <p><strong>Contact Last Name:</strong> ${rowData.contactLastName}</p>
        <p><strong>Credit Score:</strong> ${rowData.creditScore}</p>
        <p><strong>Date of Incorporation:</strong> ${rowData.dateofIncorp}</p>
        <p><strong>Debt:</strong> ${rowData.debt}</p>
        <p><strong>Debt Value:</strong> ${rowData.debtValue}</p>
        <p><strong>Entity Address:</strong> ${rowData.entityAddress}</p>
        <p><strong>Entity Name:</strong> ${rowData.entityName}</p>
        <p><strong>Entity Type:</strong> ${rowData.entityType}</p>
        <p><strong>Exit Fees:</strong> ${rowData.exitFees}</p>
        <p><strong>Exit Strategy:</strong> ${rowData.exitStrat}</p>
        <p><strong>First Name:</strong> ${rowData.firstName}</p>
        <p><strong>Gross Monthly Rent:</strong> ${rowData.grossMonthlyRent}</p>
        <p><strong>Guarantee Loan:</strong> ${rowData.guranteeLoan}</p>
        <p><strong>Home Address:</strong> ${rowData.homeAddress}</p>
        <p><strong>Initial Loan Amount:</strong> ${rowData.initialLoanAmount}</p>
        <p><strong>Insurance Company:</strong> ${rowData.insuranceCompany}</p>
        <p><strong>Interest Rate:</strong> ${rowData.interestRate}</p>
        <p><strong>Interest Term:</strong> ${rowData.interestTerm}</p>
        <p><strong>Interest Method:</strong> ${rowData.intrestMethod}</p>
        <p><strong>Invested Capital:</strong> ${rowData.investedCapital}</p>
        <p><strong>Last Name:</strong> ${rowData.lastName}</p>
        <p><strong>Liquidity:</strong> ${rowData.liquidity}</p>
        <p><strong>Percentage or Amount:</strong> ${rowData.percentageOrAmount}</p>
        <p><strong>Percentage or Amount 2:</strong> ${rowData.percentageOrAmount2}</p>
        <p><strong>Personally Guaranteeing:</strong> ${rowData.personallyGuranteeing}</p>
        <p><strong>Phone Number:</strong> ${rowData.phoneNumber}</p>
        <p><strong>Points:</strong> ${rowData.points}</p>
        <p><strong>Preferred Closing Attorney:</strong> ${rowData.preferredClosingAttorney}</p>
        <p><strong>Property Type:</strong> ${rowData.propertyType}</p>
        <p><strong>Purchase:</strong> ${rowData.purchase}</p>
        <p><strong>Purchase Amount:</strong> ${rowData.purchaseAmount}</p>
        <p><strong>Purchase Date:</strong> ${rowData.purchaseDate}</p>
        <p><strong>Purchase Price:</strong> ${rowData.purchasePrice}</p>
        <p><strong>Purchase or Refinance:</strong> ${rowData.purchaseorRefinance}</p>
        <p><strong>Red Flags:</strong> ${rowData.redFlags}</p>
        <p><strong>Social Security:</strong> ${rowData.socialSecurity}</p>
        <p><strong>Term Months:</strong> ${rowData.termMonths}</p>
        <p><strong>Title Company:</strong> ${rowData.titleCompany}</p>
      `;
    }

    if (rowData.model === "Rental") {
      htmlContent += `
        <p><strong>Email:</strong> ${rowData.userEmail}</p>
        <p><strong>Amortization Type:</strong> ${rowData.amortizationType}</p>
        <p><strong>Birth Date:</strong> ${rowData.birthDate}</p>
        <p><strong>Birth Month:</strong> ${rowData.birthMonth}</p>
        <p><strong>Birth Year:</strong> ${rowData.birthYear}</p>
        <p><strong>Borrower Cell:</strong> ${rowData.borrowerCell}</p>
        <p><strong>Borrower Citizenship:</strong> ${rowData.borrowerCitizenship}</p>
        <p><strong>Borrower Email:</strong> ${rowData.borrowerEmail}</p>
        <p><strong>Borrower Last:</strong> ${rowData.borrowerLast}</p>
        <p><strong>Borrower Social Security:</strong> ${rowData.borrowerSocialSecurity}</p>
        <p><strong>Borrowing Entity Information:</strong> ${rowData.borrowingEntityInformation}</p>
        <p><strong>Broker Points:</strong> ${rowData.brokerPoints}</p>
        <p><strong>Cash Flow Max As Value:</strong> ${rowData.cashFlowmaxAsValue}</p>
        <p><strong>Cash Flow Min As Value:</strong> ${rowData.cashFlowminAsValue}</p>
        <p><strong>Cash Flow Property Management:</strong> ${rowData.cashFlowpropertyMan}</p>
        <p><strong>Closing Date:</strong> ${rowData.closingDate}</p>
        <p><strong>Contact Last Name:</strong> ${rowData.contactLastName}</p>
        <p><strong>Credit Score:</strong> ${rowData.creditScore}</p>
        <p><strong>Date of Incorporation:</strong> ${rowData.dateofIncorp}</p>
        <p><strong>Entity Address:</strong> ${rowData.entityAddress}</p>
        <p><strong>Entity Name:</strong> ${rowData.entityName}</p>
        <p><strong>Entity Type:</strong> ${rowData.entityType}</p>
        <p><strong>Estimated Value:</strong> ${rowData.estimatedValue}</p>
        <p><strong>Experience With Real Estate:</strong> ${rowData.experienceWithRealEstate}</p>
        <p><strong>First Name:</strong> ${rowData.firstName}</p>
        <p><strong>Gross Monthly Rent:</strong> ${rowData.grossmontly}</p>
        <p><strong>Insurance Company:</strong> ${rowData.insuranceCompany}</p>
        <p><strong>Interest Rate:</strong> ${rowData.interestRate}</p>
        <p><strong>Interest Term:</strong> ${rowData.interestTerm}</p>
        <p><strong>Interest Method:</strong> ${rowData.intrestMethod}</p>
        <p><strong>Loan Purpose:</strong> ${rowData.loanPurpose}</p>
        <p><strong>Loan Recourse:</strong> ${rowData.loanRecourse}</p>
        <p><strong>Loan-to-Value:</strong> ${rowData.loanToValue}</p>
        <p><strong>LTV:</strong> ${rowData.ltv}</p>
        <p><strong>Max As Value:</strong> ${rowData.maxAsValue}</p>
        <p><strong>Min As Value:</strong> ${rowData.minAsValue}</p>
        <p><strong>Number of Properties:</strong> ${rowData.numProperties}</p>
        <p><strong>One-Time Yield:</strong> ${rowData.oneTimeYield}</p>
        <p><strong>Percentage or Amount 2:</strong> ${rowData.percentageOrAmount2}</p>
        <p><strong>Personally Guaranteeing:</strong> ${rowData.personallyGuranteeing}</p>
        <p><strong>Points:</strong> ${rowData.points}</p>
        <p><strong>Pre-Pay Penalty:</strong> ${rowData.prePayPen}</p>
        <p><strong>Preferred Closing Attorney:</strong> ${rowData.preferredClosingAttorney}</p>
        <p><strong>Program Type:</strong> ${rowData.programType}</p>
        <p><strong>Property Management:</strong> ${rowData.propertyMan}</p>
        <p><strong>Property Type:</strong> ${rowData.propertyType}</p>
        <p><strong>Purchase Price Property:</strong> ${rowData.purchasePriceProperty}</p>
        <p><strong>Rate Buy Down:</strong> ${rowData.rateBuyDown}</p>
        <p><strong>Rate Type:</strong> ${rowData.rateType}</p>
        <p><strong>Social Security:</strong> ${rowData.socialSecurity}</p>
        <p><strong>State:</strong> ${rowData.state}</p>
        <p><strong>Term Months:</strong> ${rowData.termMonths}</p>
        <p><strong>Title Company:</strong> ${rowData.titleCompany}</p>
        <p><strong>Portfolio Properties:</strong> ${rowData.portfolioProperties}</p>
      `;
    }

    if (rowData.model === "Single Property") {
      htmlContent += `
        <p><strong>Email:</strong> ${rowData.userEmail}</p>
        <p><strong>Amortization Type:</strong> ${rowData.amortizationType}</p>
        <p><strong>Annual Expenses:</strong> ${rowData.annualExpenses}</p>
        <p><strong>Annual Insurance:</strong> ${rowData.annualInsurance}</p>
        <p><strong>Annual NOI:</strong> ${rowData.annualNOI}</p>
        <p><strong>Annual Repair:</strong> ${rowData.annualRepair}</p>
        <p><strong>Annual Taxes:</strong> ${rowData.annualTaxes}</p>
        <p><strong>Annual Utility Expenses:</strong> ${rowData.annualUtilityExpenses}</p>
        <p><strong>Birth Date:</strong> ${rowData.birthDate}</p>
        <p><strong>Birth Month:</strong> ${rowData.birthMonth}</p>
        <p><strong>Birth Year:</strong> ${rowData.birthYear}</p>
        <p><strong>Borrower Experience:</strong> ${rowData.borrowExperience}</p>
        <p><strong>Borrower Cell:</strong> ${rowData.borrowerCell}</p>
        <p><strong>Borrower Citizenship:</strong> ${rowData.borrowerCitizenship}</p>
        <p><strong>Borrower Email:</strong> ${rowData.borrowerEmail}</p>
        <p><strong>Borrower Last:</strong> ${rowData.borrowerLast}</p>
        <p><strong>Borrowing Entity Information:</strong> ${rowData.borrowingEntityInformation}</p>
        <p><strong>Broker Points:</strong> ${rowData.brokerPoints}</p>
        <p><strong>Closing Date:</strong> ${rowData.closingDate}</p>
        <p><strong>Contact Last Name:</strong> ${rowData.contactLastName}</p>
        <p><strong>Credit Score:</strong> ${rowData.creditScore}</p>
        <p><strong>Date of Incorporation:</strong> ${rowData.dateofIncorp}</p>
        <p><strong>Entity Address:</strong> ${rowData.entityAddress}</p>
        <p><strong>Entity Name:</strong> ${rowData.entityName}</p>
        <p><strong>Entity Type:</strong> ${rowData.entityType}</p>
        <p><strong>Estimated As Is Value:</strong> ${rowData.estimatedAsIsValue}</p>
        <p><strong>Experience With Real Estate:</strong> ${rowData.experienceWithRealEstate}</p>
        <p><strong>FICO Score:</strong> ${rowData.ficoScore}</p>
        <p><strong>First Name:</strong> ${rowData.firstName}</p>
        <p><strong>Gross Monthly Rent:</strong> ${rowData.grossMonthlyRent}</p>
        <p><strong>HOA:</strong> ${rowData.hoa}</p>
        <p><strong>Insurance Company:</strong> ${rowData.insuranceCompany}</p>
        <p><strong>Interest Rate:</strong> ${rowData.interestRate}</p>
        <p><strong>Interest Term:</strong> ${rowData.interestTerm}</p>
        <p><strong>Interest Method:</strong> ${rowData.intrestMethod}</p>
        <p><strong>Loan Purpose:</strong> ${rowData.loanPurpose}</p>
        <p><strong>Loan-to-Value:</strong> ${rowData.loanToValue}</p>
        <p><strong>One-Time Yield:</strong> ${rowData.oneTimeYield}</p>
        <p><strong>Personally Guaranteeing:</strong> ${rowData.personallyGuranteeing}</p>
        <p><strong>Points:</strong> ${rowData.points}</p>
        <p><strong>Pre-Pay Penalty:</strong> ${rowData.prePayPen}</p>
        <p><strong>Preferred Closing Attorney:</strong> ${rowData.preferredClosingAttorney}</p>
        <p><strong>Previously Bankrupt:</strong> ${rowData.previosulyBankrupt}</p>
        <p><strong>Program Type:</strong> ${rowData.programType}</p>
        <p><strong>Property Address:</strong> ${rowData.propertyAddress}</p>
        <p><strong>Property Fees:</strong> ${rowData.propertyFees}</p>
        <p><strong>Property Type:</strong> ${rowData.propertyType}</p>
        <p><strong>Purchase Price Property:</strong> ${rowData.purchasePriceProperty}</p>
        <p><strong>Rate Buy Down:</strong> ${rowData.rateBuyDown}</p>
        <p><strong>Rate Type:</strong> ${rowData.rateType}</p>
        <p><strong>Short For Sale:</strong> ${rowData.shortForSale}</p>
        <p><strong>Social Security:</strong> ${rowData.socialSecurity}</p>
        <p><strong>Target LTV:</strong> ${rowData.targetLTV}</p>
        <p><strong>Term Months:</strong> ${rowData.termMonths}</p>
        <p><strong>Title Company:</strong> ${rowData.titleCompany}</p>
        <p><strong>Total Annual Income:</strong> ${rowData.totalAnnualIncome}</p>
      `;
    }
    if (rowData.model === "Stable Bridge") {
      htmlContent += `
        <p><strong>Email:</strong> ${rowData.userEmail}</p>
        <p><strong>Address City:</strong> ${rowData.addressCity}</p>
        <p><strong>Address State:</strong> ${rowData.addressState}</p>
        <p><strong>Address Zip:</strong> ${rowData.addressZip}</p>
        <p><strong>Authorized Sign:</strong> ${rowData.authorizedSign}</p>
        <p><strong>Birth Date:</strong> ${rowData.birthDate}</p>
        <p><strong>Birth Month:</strong> ${rowData.birthMonth}</p>
        <p><strong>Birth Year:</strong> ${rowData.birthYear}</p>
        <p><strong>Borrower Cell:</strong> ${rowData.borrowerCell}</p>
        <p><strong>Borrower Citizenship:</strong> ${rowData.borrowerCitizenship}</p>
        <p><strong>Borrower Email:</strong> ${rowData.borrowerEmail}</p>
        <p><strong>Borrower Last:</strong> ${rowData.borrowerLast}</p>
        <p><strong>Borrower Social Security:</strong> ${rowData.borrowerSocialSecurity}</p>
        <p><strong>Borrowing Entity Information:</strong> ${rowData.borrowingEntityInformation}</p>
        <p><strong>Broker Points:</strong> ${rowData.brokerPoints}</p>
        <p><strong>Closing Date:</strong> ${rowData.closingDate}</p>
        <p><strong>Collect Credit:</strong> ${rowData.collectCredit}</p>
        <p><strong>Completed Capex:</strong> ${rowData.completedCapex}</p>
        <p><strong>Contact Last Name:</strong> ${rowData.contactLastName}</p>
        <p><strong>Credit Score:</strong> ${rowData.creditScore}</p>
        <p><strong>Date of Incorporation:</strong> ${rowData.dateofIncorp}</p>
        <p><strong>Entity Address:</strong> ${rowData.entityAddress}</p>
        <p><strong>Entity Name:</strong> ${rowData.entityName}</p>
        <p><strong>Entity Type:</strong> ${rowData.entityType}</p>
        <p><strong>Experience With Real Estate:</strong> ${rowData.experienceWithRealEstate}</p>
        <p><strong>FICO Score:</strong> ${rowData.ficoScore}</p>
        <p><strong>First Name:</strong> ${rowData.firstName}</p>
        <p><strong>Gross Annual:</strong> ${rowData.grossAnnual}</p>
        <p><strong>Gross Monthly Rent:</strong> ${rowData.grossMonthlyRent}</p>
        <p><strong>Gross Taxes:</strong> ${rowData.grossTaxes}</p>
        <p><strong>Guarantee Loan:</strong> ${rowData.guranteeLoan}</p>
        <p><strong>HOA:</strong> ${rowData.hoa}</p>
        <p><strong>Home Address:</strong> ${rowData.homeAddress}</p>
        <p><strong>Insurance Company:</strong> ${rowData.insuranceCompany}</p>
        <p><strong>Interest Rate:</strong> ${rowData.interestRate}</p>
        <p><strong>Interest Term:</strong> ${rowData.interestTerm}</p>
        <p><strong>Interest Method:</strong> ${rowData.intrestMethod}</p>
        <p><strong>Loan Amount:</strong> ${rowData.loanAmount}</p>
        <p><strong>Loan Purpose:</strong> ${rowData.loanPurpose}</p>
        <p><strong>Loan to Value:</strong> ${rowData.loantoValue}</p>
        <p><strong>Percentage or Amount:</strong> ${rowData.percentageOrAmount}</p>
        <p><strong>Percentage or Amount 2:</strong> ${rowData.percentageOrAmount2}</p>
        <p><strong>Personally Guaranteeing:</strong> ${rowData.personallyGuranteeing}</p>
        <p><strong>Points:</strong> ${rowData.points}</p>
        <p><strong>Preferred Closing Attorney:</strong> ${rowData.preferredClosingAttorney}</p>
        <p><strong>Property Type:</strong> ${rowData.propertyType}</p>
        <p><strong>Purchase Date:</strong> ${rowData.purchaseDate}</p>
        <p><strong>Purchase Price Property:</strong> ${rowData.purchasePriceProperty}</p>
        <p><strong>Social Security:</strong> ${rowData.socialSecurity}</p>
        <p><strong>Term Months:</strong> ${rowData.termMonths}</p>
        <p><strong>Title Company:</strong> ${rowData.titleCompany}</p>
      `;
    }

    if (rowData.model === "Project99") {
      htmlContent += `
        <p><strong>Email:</strong> ${rowData.userEmail}</p>
        <p><strong>What Motivates You:</strong> ${rowData.motivation}</p>
        <p><strong>How much Money you looking make per year?:</strong> ${rowData.moneyperYear}</p>
        <p><strong>How much Money you looking make per year?</strong> ${rowData.industryExperience}</p>
        <p><strong>What positions have you held?</strong> ${rowData.positionsHeld}</p>
        <p><strong>When are you looking to be running our company?</strong> ${rowData.runningCompany}</p>
        <p><strong>What state do you want to do business in?</strong> ${rowData.stateBusiness}</p>
        <p><strong>Average Monthly Sales you've managed to achieve?</strong> ${rowData.monthlySalesExpected}</p>
        <p><strong>What of the following apply to you?</strong> ${rowData.whichApply}</p>
        <p><strong>Which is most important to you?</strong> ${rowData.whichImportant}</p>
        <p><strong>Borrower Email:</strong> ${rowData.borrowerEmail}</p>
        <p><strong>Borrower Last:</strong> ${rowData.borrowerLast}</p>
        <p><strong>Borrower Social Security:</strong> ${rowData.borrowerSocialSecurity}</p>
        <p><strong>Borrowing Entity Information:</strong> ${rowData.borrowingEntityInformation}</p>
        <p><strong>Broker Points:</strong> ${rowData.brokerPoints}</p>
        <p><strong>Closing Date:</strong> ${rowData.closingDate}</p>
        <p><strong>Collect Credit:</strong> ${rowData.collectCredit}</p>
        <p><strong>Completed Capex:</strong> ${rowData.completedCapex}</p>
        <p><strong>Contact Last Name:</strong> ${rowData.contactLastName}</p>
        <p><strong>Credit Score:</strong> ${rowData.creditScore}</p>
        <p><strong>Date of Incorporation:</strong> ${rowData.dateofIncorp}</p>
        <p><strong>Entity Address:</strong> ${rowData.entityAddress}</p>
        <p><strong>Entity Name:</strong> ${rowData.entityName}</p>
        <p><strong>Entity Type:</strong> ${rowData.entityType}</p>
        <p><strong>Experience With Real Estate:</strong> ${rowData.experienceWithRealEstate}</p>
        <p><strong>FICO Score:</strong> ${rowData.ficoScore}</p>
        <p><strong>First Name:</strong> ${rowData.firstName}</p>
        <p><strong>Gross Annual:</strong> ${rowData.grossAnnual}</p>
        <p><strong>Gross Monthly Rent:</strong> ${rowData.grossMonthlyRent}</p>
        <p><strong>Gross Taxes:</strong> ${rowData.grossTaxes}</p>
        <p><strong>Guarantee Loan:</strong> ${rowData.guranteeLoan}</p>
        <p><strong>HOA:</strong> ${rowData.hoa}</p>
        <p><strong>Home Address:</strong> ${rowData.homeAddress}</p>
        <p><strong>Insurance Company:</strong> ${rowData.insuranceCompany}</p>
        <p><strong>Interest Rate:</strong> ${rowData.interestRate}</p>
        <p><strong>Interest Term:</strong> ${rowData.interestTerm}</p>
        <p><strong>Interest Method:</strong> ${rowData.intrestMethod}</p>
        <p><strong>Loan Amount:</strong> ${rowData.loanAmount}</p>
        <p><strong>Loan Purpose:</strong> ${rowData.loanPurpose}</p>
        <p><strong>Loan to Value:</strong> ${rowData.loantoValue}</p>
        <p><strong>Percentage or Amount:</strong> ${rowData.percentageOrAmount}</p>
        <p><strong>Percentage or Amount 2:</strong> ${rowData.percentageOrAmount2}</p>
        <p><strong>Personally Guaranteeing:</strong> ${rowData.personallyGuranteeing}</p>
        <p><strong>Points:</strong> ${rowData.points}</p>
        <p><strong>Preferred Closing Attorney:</strong> ${rowData.preferredClosingAttorney}</p>
        <p><strong>Property Type:</strong> ${rowData.propertyType}</p>
        <p><strong>Purchase Date:</strong> ${rowData.purchaseDate}</p>
        <p><strong>Purchase Price Property:</strong> ${rowData.purchasePriceProperty}</p>
        <p><strong>Social Security:</strong> ${rowData.socialSecurity}</p>
        <p><strong>Term Months:</strong> ${rowData.termMonths}</p>
        <p><strong>Title Company:</strong> ${rowData.titleCompany}</p>
      `;
    }

    htmlContent += `
        </div>
      </body>
    </html>
    `;

    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  useEffect(() => {
    const getEmailFromCookieAndSearch = async () => {
      const userEmailFromCookie = Cookies.get("email"); // Replace 'userEmail' with your cookie name
      if (userEmailFromCookie) {
        setEmail(userEmailFromCookie);
        console.log();

        try {
          const response = await axios.post(
            `https://3.139.67.124:8080/search/${userEmailFromCookie}`
          );
          console.log(response);
          setMatchingEntries(response.data.matchingEntries);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    getEmailFromCookieAndSearch();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <AntDesignSideBarUser />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Typography variant="h4" style={{ color: "grey" }}>
            Your Applications
          </Typography>

          <Divider />
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Created At</TableCell>
                    <TableCell>Application Type</TableCell>
                    <TableCell>Application ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {matchingEntries.map((form, index) => (
                    <TableRow key={index}>
                      <TableCell>{form.createdAt}</TableCell>
                      <TableCell>{form.model}</TableCell>
                      <TableCell>{form._id}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleExportRow(form)}
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 8 }}
                        >
                          Export as CSV
                        </Button>
                        <Button
                          onClick={() => handleViewAsHtml(form)}
                          variant="contained"
                          color="secondary"
                        >
                          View as HTML
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>
    </div>
  );
}

UserDashHome.propTypes = {
  window: PropTypes.func,
};

export default UserDashHome;
