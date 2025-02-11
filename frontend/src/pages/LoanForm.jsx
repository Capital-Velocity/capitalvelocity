import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "../screens/Container";
import { useTheme } from "@mui/material/styles";
import Confetti from "react-confetti";
import Box from "@mui/material/Box";
import congrats from "../Images/congrats.png";
import GetToKnowYou from "../pages/Project99/GetToKnowYou";
import { Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
// SBA Form Credit Info
import SBA9 from "./Project99/SBA9";
import CreditScore from "./Project99/CreditScore";
import SoftPull from "./Project99/SoftPull";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import Cookies from "js-cookie";
import StabalizedBridgeProperty2 from "../components/Loan Form/StabalizedBridgeProperty2";
import RenovationDetails from "../components/Loan Form/RenovationDetails";
import BrokerStep from "../components/Loan Form/BrokerStep";
import BorrowerStep from "../components/Loan Form/BorrowerStep";
import EntityInformation from "../components/Loan Form/EntityInformation";
import BorrowerStep2 from "../components/Loan Form/BorrowerStep2";
import BorrowerStep3 from "../components/Loan Form/BorrowerStep3";
import BorrowerStep4 from "../components/Loan Form/BorrowerStep4";
import Button from "@mui/material/Button";
import FixAndFlipIcon from "@mui/icons-material/BuildOutlined";
import GroundUpIcon from "@mui/icons-material/ConstructionOutlined";
import MultifamilyBridgeIcon from "@mui/icons-material/ApartmentOutlined";
import StabilizedBridgeIcon from "@mui/icons-material/ViewComfyOutlined";
import SinglePropertyIcon from "@mui/icons-material/HouseOutlined";
import MultiFamPropertyPre from "../components/Loan Form/MultiFamPropertyPre";
import LoanTerms from "../components/Loan Form/LoanTerms";
import LoanTermsMulti from "../components/Loan Form/LoanTermsMulti";
import LoanTerms2 from "../components/Loan Form/LoanTerms2";
import LoanTerms3 from "../components/Loan Form/LoanTerms3";
import MultiFamDetails from "../components/Loan Form/MultiFamDetails";
import MultiFamProperty2 from "../components/Loan Form/MultiFamProperty2";
import MultiFamBorrowerStep from "../components/Loan Form/MultiFamBorrowerStep";
import MultiFamBorrowerStep2 from "../components/Loan Form/MultiFamBorrowerStep2";
import MultiFamBorrowerStep3 from "../components/Loan Form/MultiFamBorrowerStep3";
import PropertyInformation2 from "../components/Loan Form/PropertyInformation2";
import MultiFamProperty from "../components/Loan Form/MultiFamProperty";
import MultiFamilyPricing from "../components/Loan Form/MultiFamilyPricing";
import PropertyInformation3 from "../components/Loan Form/PropertyInformation3";
import StabalizedBridgeBorrower from "../components/Loan Form/StabalizedBridgeBorrower";
import StabalizedBridgeProperty3 from "../components/Loan Form/StabalizedBridgeProperty3";
import StabalizedBridgeProperty4 from "../components/Loan Form/StabalizedBridgeProperty4";
import PropertyInformation from "../components/Loan Form/PropertyInformation";
import PropertyInformation4 from "../components/Loan Form/PropertyInformation4";
import PropertyInformation5 from "../components/Loan Form/PropertyInformation5";
import MultiFamilyIntrest from "../components/Loan Form/MultiFamilyIntrest";
import Footer2 from "../components/Footer2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoanPricer from "../components/Loan Form/LoanPricer";
import LoanPricer2 from "../components/Loan Form/LoanPricer2";
import LoanPricer3 from "../components/Loan Form/LoanPricer3";
import LoanPricer4 from "../components/Loan Form/LoanPricer4";
import LoanPricerSummary from "../components/Loan Form/LoanPricerSummary";
import BorrowerStep3Single from "../components/Loan Form/BorrowerStep3Single";
import RentalLoanPrice from "../components/Loan Form/RentalLoanPrice";
import RentalLoanPrice2 from "../components/Loan Form/RentalLoanPrice2";
import RentalLoanPrice3 from "../components/Loan Form/RentalLoanPrice3";
import EntityInformationNew from "../components/Loan Form/EntityInformationNew";
import BorrowerStepNew from "../components/Loan Form/BorrowerStepNew";
import LoanTerms2New from "../components/Loan Form/LoanTerms2New";
import LoanTerms3New from "../components/Loan Form/LoanTerms3New";
import SBA26 from "./Project99/SBA26";
import SBA27 from "./Project99/SBA27";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import project99 from "../Images/project99.png";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { green } from "@mui/material/colors";

const firstnameCookie = Cookies.get("firstName");

const selectionData = [
  {
    title: "Fix and Flip",
    icon: <FixAndFlipIcon />,
    value: "FixFlip",
    tooltip: "Short-term financing for purchasing and renovating properties.",
    checks: ["Fast Approval", "Short-Term Loan", "No Prepayment Penalties"],
  },
  {
    title: "Multifamily Bridge",
    icon: <MultifamilyBridgeIcon />,
    value: "MultifamilyBridge",
    tooltip: "Interim financing for multifamily property acquisitions.",
    checks: ["Flexible Terms", "Low Interest Rates", "Fast Funding"],
  },
  {
    title: "Rental Portfolios",
    icon: <HouseSidingIcon />,
    value: "RentalPortfolios",
    tooltip: "Long-term loans for multiple rental properties.",
    checks: [
      "Portfolio Financing",
      "Fixed or Adjustable Rates",
      "Tax-Deductible Interest",
    ],
  },
  {
    title: "Ground Up",
    icon: <GroundUpIcon />,
    value: "GroundUp",
    tooltip: "Financing for new construction projects from the ground up.",
    checks: [
      "Construction Loans",
      "Phased Disbursement",
      "Flexible Repayment Options",
    ],
  },
  {
    title: "Cashed Out Refinance",
    icon: <StabilizedBridgeIcon />,
    value: "StabilizedBridge",
    tooltip: "Refinancing to pull out cash from existing properties.",
    checks: ["Cash-Out Options", "Equity-Based Loans", "Debt Consolidation"],
  },
  {
    title: "Single Property",
    icon: <SinglePropertyIcon />,
    value: "SingleProperty",
    tooltip: "Loans for individual real estate investments.",
    checks: ["Individual Financing", "No Portfolio Required", "Quick Approval"],
  },
];

const selectionData2 = [
  { title: "Ground Up", icon: <GroundUpIcon />, value: "GroundUp" },

  {
    title: "Stabilized Bridge",
    icon: <StabilizedBridgeIcon />,
    value: "StabilizedBridge",
  },
  {
    title: "Single Property",
    icon: <SinglePropertyIcon />,
    value: "SingleProperty",
  },
];

const forms = {
  FixFlip: [
    "BorrowerInfromation", //DONE
    "Borrower Infromation2", //DONE
    "Borrower Infromation3", //DONE
    "Borrower Infromation4", //DONE
    "Entity Information", //DONE
    "Property Information", //DONE
    "Property Information2", //DONE
    "Property Information3", //DONE
    "Property Information4", //DONE
    "Property Information5", //DONE
    "Loan Terms", //DONE
    "Loan Terms2", //DONE
    "Loan Terms3", //DONE
    "CreditScore", //DONE
    "SoftPull", //DONE
    "SBA26",
  ],
  GroundUp: [
    "BorrowerInfromation", //DONE
    "Borrower Infromation2", //DONE
    "Borrower Infromation3", //DONE
    "Borrower Infromation4", //DONE
    "Entity Information", //DONE
    "Property Information", //DONE
    "Property Information2", //DONE
    "Property Information3", //DONE
    "Property Information4", //DONE
    "Property Information5", //DONE
    "CreditScore", //DONE
    "SoftPull", //DONE
    "Summary Flip", //DONE
    "SBA26",
  ],
  MultifamilyBridge: [
    "MultiFamBorrowerStep", //DONE
    "Borrower Infromation2", //DONE
    "MultiFamBorrowerStep2", //DONE
    "MultiFamBorrowerStep3", //DONE
    "Entity Information", //DONE
    "Property Information", // DONE
    "MultiFamProperty", //DONE
    "MultiFamProperty2", // DONE
    "RenovationDetails", // DONE
    "MultiFamDetails", //DONW
    "Loan Terms", //DONW
    "MultiFamilyPricing", //DONW
    "Loan Terms2", //DONW
    "Loan Terms3", //DONW
    "CreditScore", //DONE
    "SoftPull", //DONE
    "SBA26",
  ],
  StabilizedBridge: [
    "BorrowerInfromation", //DONE
    "Borrower Infromation2", //DONE
    "Borrower Infromation3", //DONE
    "StabalizedBridgeBorrower", //DONE
    "Entity Information", //DONE
    "Property Information", //DONE
    "StabalizedBridgeProperty2", //DONE
    "StabalizedBridgeProperty3", //Done
    "StabalizedBridgeProperty4", //DONE
    "LoanTermsMulti", //DONE
    "Loan Terms2", //DONE
    "Loan Terms3", //DONE
    "CreditScore", //DONE
    "SoftPull", //DONE
    "SBA26",
  ],
  SingleProperty: [
    "LoanPricer", //DONE
    "LoanPricer2", //DONW
    "LoanPricer3", //DONE
    "LoanPricer4", //DONE
    "LoanPricerSummary", //DONE
    "BorrowerInfromation", //DOME
    "Borrower Infromation3", //DONE
    "Entity Information", //DONW
    "Loan Terms2", //DONE
    "Loan Terms3", //DONE
    "CreditScore", //DONE
    "SoftPull", //DONE
    "SBA26",
  ],
  RentalPortfolios: [
    "RentalLoanPrice", /// DONE
    "RentalLoanPrice2", //DONE
    "RentalLoanPrice3",
    "LoanPricerSummary", //DONE
    "BorrowerInfromation", //DONE
    "Borrower Infromation3", //DONE
    "Entity Information", //done
    "Loan Terms2", //done
    "Loan Terms3", //DONE
    "CreditScore", //DONE
    "SoftPull", //DONE
    "SBA26",
  ],
};

const LoanForm = () => {
  const theme = useTheme();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState("");
  const [jwt, setJWT] = useState("");
  const [cookieEmailFound, setCookieEmailFound] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loanType = queryParams.get("type"); // Extracting "type" from URL
  const navigate = useNavigate(); // useNavigate hook for React Router v6

  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const featuresRef = useRef(null); // New ref for features

  useEffect(() => {
    const handleIntersection = (entries, observer, setVisibility) => {
      const entry = entries[0];
      setVisibility(entry.isIntersecting);
    };

    const headingObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, headingObserver, setIsHeadingVisible),
      { threshold: 0.2 } // Trigger when 50% of the element is visible
    );

    const paragraphObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, paragraphObserver, setIsParagraphVisible),
      { threshold: 0.2 }
    );

    const featuresObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, featuresObserver, setIsFeaturesVisible),
      { threshold: 0.1 } // Trigger when 50% of the element is visible
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);
    if (paragraphRef.current) paragraphObserver.observe(paragraphRef.current);
    if (featuresRef.current) featuresObserver.observe(featuresRef.current);

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      if (paragraphRef.current)
        paragraphObserver.unobserve(paragraphRef.current);
      if (featuresRef.current) featuresObserver.unobserve(featuresRef.current);
    };
  }, []);

  const handleOptionChange = (value) => {
    const option = value;
    console.log(option);
    // setSelectedOption(option);
    setFormData({});

    if (!firstnameCookie) {
      // If the user is not logged in, redirect to the /register page
      navigate("/register"); // Redirect to /register using navigate
    } else {
      // If logged in, proceed with the option selection
      setSelectedOption(value);
    }
  };

  // Function to go back a step
  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setFieldErrors({});
    }
  };
  const [skipToSubmit, setSkipToSubmit] = useState(false); // New state variable for skipping
  // Function to handle SKIP button click
  const handleSkipClick = () => {
    setSkipToSubmit(true); // Set the skip state to true
  };

  const handleButtonClick = (value) => {
    setSkipToSubmit(true);
  };

  useEffect(() => {
    if (loanType) {
      setSelectedOption(loanType); // Set the loan type based on query param
    }
  }, [loanType]);

  const validateStep = (stepName) => {
    const errors = {};

    if (stepName === "Borrower Infromation2") {
      if (!formData.guranteeLoan && !formData.guranteeLoanNo) {
        errors.guranteeLoan = "Gurantee Loan is required.";
      }
      if (!formData.authorizedSign && !formData.authorizedSignNo) {
        errors.authorizedSign = "Authorized signatory is required.";
      }
    }
    if (stepName === "Property Information2") {
      if (!formData.authorizedSignatory) {
        errors.authorizedSignatory = "Required.";
      }
    }
    if (stepName === "BorrowerInfromation") {
      if (!formData.firstName) {
        errors.firstName = "First Name is required ";
      }
      if (!formData.borrowerLast) {
        errors.borrowerLast = "First Last is required ";
      }
      if (!formData.borrowerEmail) {
        errors.borrowerEmail = "Email is required.";
      } else if (
        !formData.borrowerEmail.includes("@") ||
        !formData.borrowerEmail.includes(".com")
      ) {
        errors.borrowerEmail =
          "Invalid email format. Please include '@' and '.com'.";
      }
      if (!formData.borrowerCell) {
        errors.borrowerCell = "Cell is required ";
      }
      if (!formData.borrowerCitizenship) {
        errors.borrowerCitizenship = "Citizenship information is required ";
      }
    }
    if (stepName === "Borrower Infromation2") {
      if (!formData.guranteeLoan) {
        errors.guranteeLoan = "First Name is required ";
      }
      if (!formData.authorizedSign) {
        errors.authorizedSign = "First Last is required ";
      }
    }

    if (stepName === "Entity Information") {
      if (!formData.borrowingEntityInformation) {
        errors.borrowingEntityInformation = "Required ";
      }
    }

    if (stepName === "Property Information5") {
      if (!formData.afterRepairValue) {
        errors.afterRepairValue = "Required ";
      }
      if (!formData.exitStrategry) {
        errors.exitStrategry = "Required ";
      }
    }

    if (stepName === "Loan Terms") {
      if (!formData.initialLoanAmount) {
        errors.initialLoanAmount = "Required ";
      }
      if (!formData.constructionHoldback) {
        errors.constructionHoldback = "Required ";
      }
    }

    if (stepName === "Property Information3") {
      if (!formData.propertyPurchasePrice) {
        errors.propertyPurchasePrice = "Required ";
      }
      if (!formData.propertySource) {
        errors.propertySource = "Required ";
      }
      if (!formData.wholesalerSource) {
        errors.wholesalerSource = "Required ";
      }
      if (!formData.wholesalerPay) {
        errors.wholesalerPay = "Required ";
      }
      if (!formData.transactionArmslength) {
        errors.transactionArmslength = "Required ";
      }
    }
    if (stepName === "Loan Terms2") {
      if (!formData.interestRate) {
        errors.interestRate = "Required ";
      }
      if (!formData.points) {
        errors.points = "Required ";
      }

      if (!formData.brokerPoints) {
        errors.brokerPoints = "Required ";
      }
      if (!formData.termMonths) {
        errors.termMonths = "Required ";
      }
      if (!formData.intrestMethod) {
        errors.intrestMethod = "Required ";
      }
      if (!formData.interestTerm) {
        errors.interestTerm = "Required ";
      }
    }
    if (stepName === "Loan Terms3") {
      if (!formData.preferredClosingAttorney) {
        errors.preferredClosingAttorney = "Required";
      }
      if (!formData.closingDate) {
        errors.closingDate = "Required ";
      }

      if (!formData.insuranceCompany) {
        errors.insuranceCompany = "Required ";
      }
      if (!formData.titleCompany) {
        errors.titleCompany = "Required ";
      }
      if (!formData.intrestMethod) {
        errors.intrestMethod = "Required ";
      }
      if (!formData.interestTerm) {
        errors.interestTerm = "Required ";
      }
    }
    if (stepName === "Property Information4") {
      if (!formData.renovationBudget) {
        errors.renovationBudget = "Required ";
      }

      if (!formData.isCondominium) {
        errors.isCondominium = "Required ";
      }
    }
    if (stepName === "GetToKnowYou") {
      // Add similar validations for other steps
      if (!formData.motivation) {
        errors.motivation = "Please Enter a value";
      }
      if (!formData.moneyperYear) {
        errors.moneyperYear = "Please Enter a value";
      }
      if (!formData.industryExperience) {
        errors.industryExperience = "Please Enter a value";
      }

      if (!formData.runningCompany) {
        errors.runningCompany = "Please Enter a value";
      }
      if (!formData.stateBusiness) {
        errors.stateBusiness = "Please Enter a value";
      }
      //
      if (!formData.monthlySalesExpected) {
        errors.monthlySalesExpected = "Please Enter a value";
      }
      if (!formData.businessPercentage) {
        errors.businessPercentage = "Please Enter a value";
      }

      if (!formData.whichImportant) {
        errors.whichImportant = "Please Enter a value";
      }
    }
    if (stepName === "Borrower Infromation4") {
      if (!formData.bestTerms) {
        errors.bestTerms = "Best Terms is required. ";
      }
    }
    if (stepName === "CreditScore") {
      if (!formData.creditScore) {
        errors.creditScore = "Please Enter Your Credit Score";
      }
    }
    if (stepName === "SoftPull") {
      if (!formData.birthMonth) {
        errors.birthMonth = "Please Enter Your Birth Month";
      }
      if (!formData.birthDate) {
        errors.birthDate = "Please Enter Your Birth Date";
      }
      if (!formData.birthYear) {
        errors.birthYear = "Please Enter Your Birth Year";
      }
      if (!formData.socialSecurity) {
        errors.socialSecurity =
          "Please Enter Your Social Security or 0 if none";
      }
    }
    if (stepName === "Property Information") {
      if (!formData.homeAddress) {
        errors.homeAddress = "Address is required";
      }
      if (!formData.addressCity) {
        errors.addressCity = "Address city is required.";
      }
      if (!formData.addressZip) {
        errors.addressZip = "Address Zip is required.";
      }
      if (!formData.addressState) {
        errors.addressState = "Address state is required.";
      }
      if (!formData.propertyType) {
        errors.propertyType = "Property type state is required.";
      }
    }
    if (stepName === "MultiFamBorrowerStep") {
      if (!formData.firstName) {
        errors.firstName = "Required";
      }
      if (!formData.lastName) {
        errors.lastName = "Required";
      }
      if (!formData.borrowerEmail) {
        errors.borrowerEmail = "Email is required.";
      } else if (
        !formData.borrowerEmail.includes("@") ||
        !formData.borrowerEmail.includes(".com")
      ) {
        errors.borrowerEmail =
          "Invalid email format. Please include '@' and '.com'.";
      }
      if (!formData.phoneNumber) {
        errors.phoneNumber = "Required";
      }
      if (!formData.borrowerCitizenshipStatus) {
        errors.borrowerCitizenshipStatus = "Required";
      }
      if (!formData.liquidity) {
        errors.liquidity = "Required";
      }
      if (!formData.socialSecurity) {
        errors.socialSecurity = "Required";
      }
    }
    if (stepName === "MultiFamBorrowerStep3") {
      if (!formData.collectCredit) {
        errors.collectCredit = "Required";
      }
    }
    if (stepName === "MultiFamProperty2") {
      if (!formData.cashOut) {
        errors.cashOut = "Required";
      }
      if (!formData.debt) {
        errors.debt = "Required";
      }

      if (!formData.purchaseDate) {
        errors.purchaseDate = "Required";
      }
      if (!formData.purchasePrice) {
        errors.purchasePrice = "Required";
      }
    }

    if (stepName === "RenovationDetails") {
      if (!formData.investedCapital) {
        errors.investedCapital = "Required";
      }
      if (!formData.completedCapex) {
        errors.completedCapex = "Required";
      }
    }

    if (stepName === "MultiFamDetails") {
      if (!formData.asIsValue) {
        errors.asIsValue = "Required";
      }
      if (!formData.afterRepair) {
        errors.afterRepair = "Required";
      }
      if (!formData.asIsValue) {
        errors.asIsValue = "Required";
      }
      if (!formData.exitStrat) {
        errors.exitStrat = "Required";
      }
      if (!formData.background) {
        errors.background = "Required";
      }
      if (!formData.redFlags) {
        errors.redFlags = "Required";
      }
    }

    if (stepName === "MultiFamilyPricing") {
      if (!formData.interestRate) {
        errors.interestRate = "Required";
      }
      if (!formData.points) {
        errors.points = "Required";
      }
      if (!formData.exitFees) {
        errors.exitFees = "Required";
      }
      if (!formData.brokerPoints) {
        errors.brokerPoints = "Required";
      }
      if (!formData.capitalPoints) {
        errors.capitalPoints = "Required";
      }
      if (!formData.capitalPointsExit) {
        errors.capitalPointsExit = "Required";
      }
    }
    if (stepName === "StabalizedBridgeBorrower") {
      if (!formData.collectCredit) {
        errors.collectCredit = "Required";
      }
    }
    if (stepName === "StabalizedBridgeProperty2") {
      if (!formData.loanPurpose) {
        errors.loanPurpose = "Required";
      }
      if (!formData.purchasePriceProperty) {
        errors.purchasePriceProperty = "Required";
      }
      if (!formData.purchaseDate) {
        errors.purchaseDate = "Required";
      }
      if (!formData.completedCapex) {
        errors.completedCapex = "Required";
      }
    }
    if (stepName === "StabalizedBridgeProperty3") {
      if (!formData.guranteeLoan) {
        errors.guranteeLoan = "Required";
      }
      if (!formData.purchasePriceProperty) {
        errors.purchasePriceProperty = "Required";
      }
    }
    if (stepName === "StabalizedBridgeProperty4") {
      if (!formData.grossMonthlyRent) {
        errors.grossMonthlyRent = "Required";
      }
      if (!formData.grossTaxes) {
        errors.grossTaxes = "Required";
      }
      if (!formData.grossAnnual) {
        errors.grossAnnual = "Required";
      }
      if (!formData.hoa) {
        errors.hoa = "Required";
      }
    }
    if (stepName === "LoanTermsMulti") {
      if (!formData.loanPurpose) {
        errors.loanPurpose = "Required";
      }
      if (!formData.loanAmount) {
        errors.loanAmount = "Required";
      }
    }
    if (stepName === "LoanPricer") {
      if (!formData.propertyAddress) {
        errors.propertyAddress = "Required";
      }
      if (!formData.propertyType) {
        errors.propertyType = "Required";
      }
      if (!formData.loanPurpose) {
        errors.loanPurpose = "Required";
      }
      if (!formData.purchasePriceProperty) {
        errors.purchasePriceProperty = "Required";
      }
    }
    if (stepName === "LoanPricer2") {
      if (!formData.estimatedAsIsValue) {
        errors.estimatedAsIsValue = "Required";
      }
      if (!formData.grossMonthlyRent) {
        errors.grossMonthlyRent = "Required";
      }
      if (!formData.annualTaxes) {
        errors.annualTaxes = "Required";
      }
      if (!formData.annualExpenses) {
        errors.annualExpenses = "Required";
      }
      if (!formData.annualInsurance) {
        errors.annualInsurance = "Required";
      }
      if (!formData.hoa) {
        errors.hoa = "Required";
      }
      if (!formData.annualUtilityExpenses) {
        errors.annualUtilityExpenses = "Required";
      }
      if (!formData.annualRepair) {
        errors.annualRepair = "Required";
      }
      if (!formData.propertyFees) {
        errors.propertyFees = "Required";
      }
      if (!formData.totalAnnualIncome) {
        errors.totalAnnualIncome = "Required";
      }
      if (!formData.annualNOI) {
        errors.annualNOI = "Required";
      }
      if (!formData.targetLTV) {
        errors.targetLTV = "Required";
      }
    }
    if (stepName === "LoanPricer3") {
      if (!formData.borrowExperience) {
        errors.borrowExperience = "Required";
      }
      if (!formData.borrowerCitizenship) {
        errors.borrowerCitizenship = "Required";
      }
      if (!formData.socialSecurity) {
        errors.socialSecurity = "Required";
      }
    }
    if (stepName === "LoanPricer4") {
      if (!formData.previosulyBankrupt) {
        errors.previosulyBankrupt = "Required";
      }
      if (!formData.shortForSale) {
        errors.shortForSale = "Required";
      }
    }
    if (stepName === "LoanPricerSummary") {
      if (!formData.amortizationType) {
        errors.amortizationType = "Required";
      }
      if (!formData.prePayPen) {
        errors.prePayPen = "Required";
      }
      if (!formData.rateBuyDown) {
        errors.rateBuyDown = "Required";
      }
      if (!formData.socialSecurity) {
        errors.socialSecurity = "Required";
      }
      if (!formData.rateType) {
        errors.rateType = "Required";
      }
      if (!formData.programType) {
        errors.programType = "Required";
      }
    }
    if (stepName === "RentalLoanPrice") {
      if (!formData.state) {
        errors.state = "Required";
      }
      if (!formData.loanPurpose) {
        errors.loanPurpose = "Required";
      }
      if (!formData.purchasePriceProperty) {
        errors.purchasePriceProperty = "Required";
      }
      if (!formData.loanRecourse) {
        errors.loanRecourse = "Required";
      }
    }
    if (stepName === "RentalLoanPrice2") {
      if (!formData.ltv) {
        errors.ltv = "Required";
      }
      if (!formData.minAsValue) {
        errors.minAsValue = "Required";
      }
      if (!formData.maxAsValue) {
        errors.maxAsValue = "Required";
      }
      if (!formData.propertyMan) {
        errors.propertyMan = "Required";
      }
    }
    if (stepName === "RentalLoanPrice3") {
      if (!formData.grossmontly) {
        errors.grossmontly = "Required";
      }
      if (!formData.cashFlowminAsValue) {
        errors.cashFlowminAsValue = "Required";
      }
      if (!formData.cashFlowmaxAsValue) {
        errors.cashFlowmaxAsValue = "Required";
      }
      if (!formData.cashFlowpropertyMan) {
        errors.cashFlowpropertyMan = "Required";
      }
    }

    // Add similar validations for other steps

    return errors;
  };

  const handleSubmit = () => {
    const userEmail = Cookies.get("email");
    formData.userEmail = userEmail;
    let apiUrl = "";
    // set the form
    if (selectedOption == "FixFlip") {
      apiUrl = "https://52.165.80.134:4000/api/fixandFlip/addFixandFlip";
    }
    if (selectedOption == "GroundUp") {
      apiUrl = "https://52.165.80.134:4000/api/groundUp/addGroundUp";
    }
    if (selectedOption == "MultifamilyBridge") {
      apiUrl = "https://52.165.80.134:4000/api/multifam/addMultiFam";
    }
    if (selectedOption == "RentalPortfolios") {
      apiUrl = "https://52.165.80.134:4000/api/rental/addRentalGroup";
    }
    if (selectedOption == "SingleProperty") {
      apiUrl =
        "https://52.165.80.134:4000/api/singleProperty/addSingleProperty";
    }
    if (selectedOption == "StabilizedBridge") {
      apiUrl =
        "https://52.165.80.134:4000/api/stabilizedBridge/addStabilizedBridge";
    }
    console.log(apiUrl);
    // Handle form submission here
    axios
      .post(apiUrl, formData)
      .then((response) => {
        // Handle success response
        console.log("Response from server:", response.data);
        setIsFormSubmitted(true); // Set the form submission state to true
      })
      .catch((error) => {
        // Handle error
        toast.error(error);
        console.error("Error:", error);
      });
  };

  // Check if the current step is "SoftPull"
  const selectedFormSteps = forms[selectedOption];

  // Check if the current step is "SoftPull"
  const isSoftPullStep =
    selectedFormSteps &&
    currentStep < selectedFormSteps.length &&
    selectedFormSteps[currentStep] === "SoftPull";

  // Check if the current step is "SoftPull"
  const isSkipstep =
    selectedFormSteps &&
    currentStep < selectedFormSteps.length &&
    selectedFormSteps[currentStep] === "SBA2";

  const isDoc =
    selectedFormSteps &&
    currentStep < selectedFormSteps.length &&
    selectedFormSteps[currentStep] === "SBA26";

  const renderFormStep = (stepName) => {
    switch (stepName) {
      case "Broker Information":
        return (
          <BrokerStep
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "GetToKnowYou":
        return (
          <GetToKnowYou
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Entity Information":
        return (
          <EntityInformation
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case " EntityInformationNew":
        return (
          <EntityInformationNew formData={formData} setFormData={setFormData} />
        );

      case "BorrowerInfromation":
        return (
          <BorrowerStep
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "BorrowerStepNew":
        return (
          <BorrowerStepNew formData={formData} setFormData={setFormData} />
        );
      case "Borrower Infromation2":
        return (
          <BorrowerStep2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Borrower Infromation3":
        return (
          <BorrowerStep3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Borrower Infromation4":
        return (
          <BorrowerStep4
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Property Information":
        return (
          <PropertyInformation
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Property Information2":
        return (
          <PropertyInformation2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Property Information3":
        return (
          <PropertyInformation3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Property Information4":
        return (
          <PropertyInformation4
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Property Information5":
        return (
          <PropertyInformation5
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Loan Terms":
        return (
          <LoanTerms
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Loan Terms2":
        return (
          <LoanTerms2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "LoanTerms2New":
        return <LoanTerms2New formData={formData} setFormData={setFormData} />;
      case "Loan Terms3":
        return (
          <LoanTerms3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "LoanTerms3New":
        return <LoanTerms3New formData={formData} setFormData={setFormData} />;
      case "MultiFamBorrowerStep":
        return (
          <MultiFamBorrowerStep
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "MultiFamBorrowerStep2":
        return (
          <MultiFamBorrowerStep2
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "SBA9":
        return (
          <SBA9
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );

      case "CreditScore":
        return (
          <CreditScore
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SoftPull":
        return (
          <SoftPull
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );

      case "MultiFamBorrowerStep3":
        return (
          <MultiFamBorrowerStep3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "MultiFamProperty":
        return (
          <MultiFamProperty
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "MultiFamPropertyPre":
        return (
          <MultiFamPropertyPre formData={formData} setFormData={setFormData} />
        );
      case "MultiFamProperty2":
        return (
          <MultiFamProperty2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "RenovationDetails":
        return (
          <RenovationDetails
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "MultiFamDetails":
        return (
          <MultiFamDetails
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "MultiFamilyPricing":
        return (
          <MultiFamilyPricing
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "MultiFamilyIntrest":
        return (
          <MultiFamilyIntrest formData={formData} setFormData={setFormData} />
        );
      case "StabalizedBridgeBorrower":
        return (
          <StabalizedBridgeBorrower
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "StabalizedBridgeProperty2":
        return (
          <StabalizedBridgeProperty2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "StabalizedBridgeProperty3":
        return (
          <StabalizedBridgeProperty3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "StabalizedBridgeProperty4":
        return (
          <StabalizedBridgeProperty4
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "LoanPricer":
        return (
          <LoanPricer
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "LoanPricer2":
        return (
          <LoanPricer2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "LoanPricer3":
        return (
          <LoanPricer3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "LoanPricer4":
        return (
          <LoanPricer4
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );

      case "LoanTermsMulti":
        return (
          <LoanTermsMulti
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );

      case "LoanPricerSummary":
        return (
          <LoanPricerSummary
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "BorrowerStep3Single":
        return (
          <BorrowerStep3Single
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "RentalLoanPrice":
        return (
          <RentalLoanPrice
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "RentalLoanPrice2":
        return (
          <RentalLoanPrice2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );

      case "RentalLoanPrice3":
        return (
          <RentalLoanPrice3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA26":
        return (
          <SBA26
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA27":
        return (
          <SBA27
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      default:
        return (
          <LoanTerms3
            fieldErrors={fieldErrors}
            formData={formData}
            setFormData={setFormData}
          />
        );
    }
  };

  const renderForm = () => {
    if (selectedOption === "") {
      return (
        <div>
          <Container style={{ backgroundColor: "#c0dced" }}>
            <Typography
              ref={headingRef}
              className={`text-center fade-in ${
                isHeadingVisible ? "fade-in-show" : "fade-in-hide"
              }`}
              variant="h4"
              color="black"
              gutterBottom
            >
              Real Estate Loans
            </Typography>

            <Divider style={{ marginBottom: "10px" }} />
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Box style={{}}>
                  <Box marginBottom={4}>
                    <Typography
                      align={"center"}
                      color={"text.secondary"}
                      data-aos={"fade-up"}
                      ref={paragraphRef}
                      className={` ${
                        isParagraphVisible
                          ? "fade-in-show paragraph-fade-in-show"
                          : "fade-in-hide"
                      }`}
                    >
                      Find the financing solution that fits your real estate
                      needs and your wallet. Secure your loan today.
                    </Typography>
                  </Box>
                  <Box>
                    <Container style={{ marginTop: "-50px" }}>
                      <Grid
                        ref={featuresRef}
                        className={`${
                          isFeaturesVisible
                            ? "fade-in-show paragraph-fade-in-show-extra"
                            : "fade-in-hide"
                        }`}
                        container
                        spacing={2}
                      >
                        {selectionData.map((item, i) => (
                          <Grid item xs={4} md={4} key={i}>
                            <Box
                              display={"block"}
                              width={1}
                              height={1}
                              sx={{
                                textDecoration: "none",
                                transition: "all .2s ease-in-out",
                                "&:hover": {
                                  transform: "translateY(-4px)",
                                },
                              }}
                              onClick={() => handleOptionChange(item.value)}
                            >
                              <Box
                                component={Card}
                                padding={2}
                                width={1}
                                height={1}
                                borderRadius={2}
                                bgcolor={"alternate.main"}
                                data-aos={"fade-up"}
                                data-aos-delay={i * 100}
                                data-aos-offset={100}
                                data-aos-duration={600}
                              >
                                <Box
                                  position={"relative"}
                                  display={"flex"}
                                  justifyContent={"center"}
                                >
                                  <Box sx={{ color: "#498dd6", bottom: 0 }}>
                                    {item.icon}
                                  </Box>
                                </Box>

                                {/* Title and Description with Divider */}
                                <Box
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="center"
                                  mt={2}
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    sx={{
                                      fontWeight: 500,
                                      textDecoration: "none",
                                    }}
                                  >
                                    {item.title}
                                  </Typography>

                                  {/* Divider between title and tooltip */}
                                  <Divider sx={{ width: "100%", my: 1 }} />

                                  <Typography
                                    variant="body2"
                                    sx={{ textAlign: "center" }}
                                  >
                                    {item.tooltip}
                                  </Typography>

                                  {/* Render Checkmarks */}
                                  <Box sx={{ mt: 1 }}>
                                    {item.checks.map((check, index) => (
                                      <Box
                                        key={index}
                                        display="flex"
                                        alignItems="center"
                                        mb={1}
                                      >
                                        <Checkbox
                                          defaultChecked
                                          sx={{
                                            color: green[400],
                                            "&.Mui-checked": {
                                              color: green[400],
                                            },
                                            transform: "scale(0.9)", // Make it 50% larger
                                          }}
                                        />
                                        <Typography
                                          sx={{ fontSize: "0.875rem" }}
                                        >
                                          {check}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Container>
                  </Box>
                </Box>

                {/* <Grid container spacing={2}>
                <Grid item sm={6}>
                  {selectionData.map((item, index) => (
                    <Grid item sm={2} key={index}>
                      <Button
                        style={{
                          marginBottom: "10px",
                          width: "200px",
                          color: "grey",
                          border: "1px solid grey",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                        variant={"outlined"}
                        onClick={() => handleOptionChange(item.value)}
                        //onMouseEnter={(e) => (e.target.style.color = "white")} // Change text color on hover
                        //onMouseLeave={(e) => (e.target.style.color = "grey")} // Restore text color when not hovering
                        sx={{
                          "&:hover": {
                            backgroundColor: "#498dd6",
                          },
                        }}
                      >
                        <div
                          style={{
                            fontSize: "60px",
                            color: "grey",
                            marginBottom: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          {item.icon}
                        </div>
                        <div style={{ fontWeight: "bold" }}>{item.title}</div>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Grid item sm={6}>
                  {selectionData2.map((item, index) => (
                    <Grid item sm={2} key={index}>
                      <Button
                        style={{
                          marginBottom: "10px",
                          width: "200px",
                          color: "grey",
                          border: "1px solid grey",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                        variant={"outlined"}
                        onClick={() => handleOptionChange(item.value)}
                        //onMouseEnter={(e) => (e.target.style.color = "white")} // Change text color on hover
                        //onMouseLeave={(e) => (e.target.style.color = "grey")} // Restore text color when not hovering
                        sx={{
                          "&:hover": {
                            backgroundColor: "#498dd6",
                          },
                        }}
                      >
                        <div
                          style={{
                            fontSize: "60px",
                            color: "grey",
                            marginBottom: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          {item.icon}
                        </div>
                        <div style={{ fontWeight: "bold" }}>{item.title}</div>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid> */}
              </Grid>
            </Grid>
          </Container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <img
              src={project99}
              className="text-center"
              style={{ width: "25%" }}
            /> */}
          </div>
        </div>
      );
    }

    const selectedFormSteps = forms[selectedOption];
    const handleNextStep = () => {
      const stepName = selectedFormSteps[currentStep];
      const errors = validateStep(stepName);

      if (Object.keys(errors).length === 0) {
        setCurrentStep(currentStep + 1);
        setFieldErrors({});
      } else {
        setFieldErrors(errors);
        console.log(errors);
        //toast.error("One or more errors. Please check the form.");
      }
    };
    if (currentStep < selectedFormSteps.length) {
      const stepName = selectedFormSteps[currentStep];
      return (
        <Container>
          {renderFormStep(stepName)}
          <Button
            variant="contained"
            style={{
              backgroundColor: "#498dd6",
              marginRight: 10,
              marginBottom: 40,
              borderRadius: "30px",
            }}
            onClick={handleBackStep} // Handle going back a step
          >
            Back
          </Button>
          {isSoftPullStep ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#498dd6",
                marginBottom: 40,
                borderRadius: "30px",
              }}
              onClick={handleNextStep}
            >
              I Agree
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#498dd6",
                marginBottom: 40,
                borderRadius: "30px",
              }}
              onClick={handleNextStep}
            >
              Next
            </Button>
          )}

          {isSkipstep ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#498dd6",
                marginBottom: 40,
                marginleft: 20,
                borderRadius: "30px",
              }}
              onClick={handleSubmit}
            >
              Skip
            </Button>
          ) : null}
          {isSkipstep ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#498dd6",
                marginBottom: 40,
                marginleft: 20,
                borderRadius: "30px",
              }}
              onClick={handleSubmit}
            >
              Skip
            </Button>
          ) : null}
        </Container>
      );
    }

    return (
      <Container>
        {renderFormStep("SBA27")}
        <Button
          variant="contained"
          style={{
            backgroundColor: "#498dd6",
            marginRight: 10,

            borderRadius: "30px",
          }}
          onClick={handleBackStep} // Handle going back a step
        >
          Back
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#498dd6",

            borderRadius: "30px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    );
  };

  return (
    <div style={{ backgroundColor: "#c0dced" }}>
      <div style={{ backgroundColor: "#c0dced" }}>
        {/* Your content */}
        {isFormSubmitted ? (
          <div id="confetti-container">
            <Confetti
              width={800}
              height={600}
              numberOfPieces={30}
              tweenDuration={2}
            />

            <Container>
              <Typography variant="h4" color="black" gutterBottom>
                Congratulations! Your application has been processed.
              </Typography>
              <Box
                src={congrats}
                width={1}
                style={{
                  width: "500px",
                  marginTop: "50px",
                  marginRight: "10px",
                  marginLeft: "50px",
                }}
                maxWidth={1}
              />
              <Link href="/">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#498dd6",

                    borderRadius: "30px",
                  }}
                >
                  Back to Home
                </Button>
              </Link>

              {/* Add any additional content or styling as needed */}
            </Container>
          </div>
        ) : (
          // Render the form if form is not yet submitted
          renderForm()
        )}
        <ToastContainer />
      </div>
      {/* <Footer2 /> */}
    </div>
  );
};

export default LoanForm;
