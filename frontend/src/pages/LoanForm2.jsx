import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import congrats from "../Images/congrats.png";
import project99 from "../Images/project99.png";
import Container from "../screens/Container";
// SBA Form Credit Info
import MultifamilyBridgeIcon from "@mui/icons-material/ApartmentOutlined";
import FixAndFlipIcon from "@mui/icons-material/BuildOutlined";
import GroundUpIcon from "@mui/icons-material/ConstructionOutlined";
import SinglePropertyIcon from "@mui/icons-material/HouseOutlined";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import StabilizedBridgeIcon from "@mui/icons-material/ViewComfyOutlined";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer2 from "../components/Footer2";
import BorrowerStep from "../components/Loan Form/BorrowerStep";
import BorrowerStep2 from "../components/Loan Form/BorrowerStep2";
import BorrowerStep3 from "../components/Loan Form/BorrowerStep3";
import BorrowerStep3Single from "../components/Loan Form/BorrowerStep3Single";
import BorrowerStep4 from "../components/Loan Form/BorrowerStep4";
import BorrowerStepNew from "../components/Loan Form/BorrowerStepNew";
import BrokerStep from "../components/Loan Form/BrokerStep";
import EntityInformation from "../components/Loan Form/EntityInformation";
import EntityInformationNew from "../components/Loan Form/EntityInformationNew";
import LoanPricer from "../components/Loan Form/LoanPricer";
import LoanPricer2 from "../components/Loan Form/LoanPricer2";
import LoanPricer3 from "../components/Loan Form/LoanPricer3";
import LoanPricer4 from "../components/Loan Form/LoanPricer4";
import LoanPricerSummary from "../components/Loan Form/LoanPricerSummary";
import LoanTerms from "../components/Loan Form/LoanTerms";
import LoanTerms2 from "../components/Loan Form/LoanTerms2";
import LoanTerms2New from "../components/Loan Form/LoanTerms2New";
import LoanTerms3 from "../components/Loan Form/LoanTerms3";
import LoanTerms3New from "../components/Loan Form/LoanTerms3New";
import LoanTermsMulti from "../components/Loan Form/LoanTermsMulti";
import MultiFamBorrowerStep from "../components/Loan Form/MultiFamBorrowerStep";
import MultiFamBorrowerStep2 from "../components/Loan Form/MultiFamBorrowerStep2";
import MultiFamBorrowerStep3 from "../components/Loan Form/MultiFamBorrowerStep3";
import MultiFamDetails from "../components/Loan Form/MultiFamDetails";
import MultiFamProperty from "../components/Loan Form/MultiFamProperty";
import MultiFamProperty2 from "../components/Loan Form/MultiFamProperty2";
import MultiFamPropertyPre from "../components/Loan Form/MultiFamPropertyPre";
import MultiFamilyIntrest from "../components/Loan Form/MultiFamilyIntrest";
import MultiFamilyPricing from "../components/Loan Form/MultiFamilyPricing";
import PropertyInformation from "../components/Loan Form/PropertyInformation";
import PropertyInformation2 from "../components/Loan Form/PropertyInformation2";
import PropertyInformation3 from "../components/Loan Form/PropertyInformation3";
import PropertyInformation4 from "../components/Loan Form/PropertyInformation4";
import PropertyInformation5 from "../components/Loan Form/PropertyInformation5";
import RenovationDetails from "../components/Loan Form/RenovationDetails";
import RentalLoanPrice from "../components/Loan Form/RentalLoanPrice";
import RentalLoanPrice2 from "../components/Loan Form/RentalLoanPrice2";
import RentalLoanPrice3 from "../components/Loan Form/RentalLoanPrice3";
import StabalizedBridgeBorrower from "../components/Loan Form/StabalizedBridgeBorrower";
import StabalizedBridgeProperty2 from "../components/Loan Form/StabalizedBridgeProperty2";
import StabalizedBridgeProperty3 from "../components/Loan Form/StabalizedBridgeProperty3";
import StabalizedBridgeProperty4 from "../components/Loan Form/StabalizedBridgeProperty4";
import BusinessUpload from "./Project99/BusinessUpload";
import CreditScore from "./Project99/CreditScore";
import GetToKnowYou from "./Project99/GetToKnowYou";
import SBA10 from "./Project99/SBA10";
import SBA11 from "./Project99/SBA11";
import SBA12 from "./Project99/SBA12";
import SBA13 from "./Project99/SBA13";
import SBA14 from "./Project99/SBA14";
import SBA15 from "./Project99/SBA15";
import SBA16 from "./Project99/SBA16";
import SBA17 from "./Project99/SBA17";
import SBA18 from "./Project99/SBA18";
import SBA19 from "./Project99/SBA19";
import SBA20 from "./Project99/SBA20";
import SBA21 from "./Project99/SBA21";
import SBA22 from "./Project99/SBA22";
import SBA23 from "./Project99/SBA23";
import SBA24 from "./Project99/SBA24";
import SBA25 from "./Project99/SBA25";
import SBA26 from "./Project99/SBA26";
import SBA9 from "./Project99/SBA9";
import SoftPull from "./Project99/SoftPull";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";

const selectionData = [
  {
    title: "Small Business Loan",
    icon: <CreditScoreIcon />,
    value: "Lendio(PLACEHOLDER)",
  },

  {
    title: "SBA",
    icon: <CreditScoreIcon />,
    value: "SBA",
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
const dividerStyle = {
  height: "100%",
  margin: "0 16px", // Adjust the margin as needed
  borderRight: "1px solid rgba(0, 0, 0, 0.12)", // You can change the border style and color
};

const forms = {
  FixFlip: [
    "SBA9",
    "CreditScore",
    "SoftPull",
    "Borrower Infromation",
    "Borrower Infromation2",
    "Borrower Infromation3",
    "Borrower Infromation4",
    "Entity Information",
    "Property Information",
    "Property Information2",
    "Property Information3",
    "Property Information4",
    "Property Information5",
    "Loan Terms",
    "Loan Terms2",
    "Loan Terms3",
    "Summary Flip",
  ],
  GroundUp: [
    "SBA9",
    "CreditScore",
    "SoftPull",
    "Borrower Infromation",
    "Borrower Infromation2",
    "Borrower Infromation3",
    "Borrower Infromation4",
    "Entity Information",
    "Property Information",
    "Property Information2",
    "Property Information3",
    "Property Information4",
    "Property Information5",
    "Loan Terms2",
    "Loan Terms3",
    "Summary Flip",
  ],
  MultifamilyBridge: [
    "SBA9",
    "CreditScore",
    "SoftPull",
    "MultiFamBorrowerStep",
    "Borrower Infromation2",
    "MultiFamBorrowerStep2",
    "MultiFamBorrowerStep3",
    "Entity Information",
    "MultiFamPropertyPre",
    "MultiFamProperty",
    "MultiFamProperty2",
    "RenovationDetails",
    "MultiFamDetails",
    "MultiFamDetails",
    "Loan Terms",
    "MultiFamilyPricing",
    "MultiFamilyIntrest",
  ],
  StabilizedBridge: [
    "SBA9",
    "CreditScore",
    "SoftPull",
    "Borrower Infromation",
    "Borrower Infromation2",
    "Borrower Infromation3",
    "StabalizedBridgeBorrower",
    "Entity Information",
    "Property Information",
    "StabalizedBridgeProperty2",
    "StabalizedBridgeProperty3",
    "StabalizedBridgeProperty4",
    "LoanTermsMulti",
    "Loan Terms2",
    "Loan Terms3",
    "Summary Flip",
  ],
  SingleProperty: [
    "SBA9",
    "CreditScore",
    "SoftPull",
    "LoanPricer",
    "LoanPricer2",
    "LoanPricer3",
    "LoanPricer4",
    "LoanPricerSummary",
    "BorrowerStepNew",
    "BorrowerStep3Single",
    "EntityInformationNew",
    "LoanTerms2New",
    "LoanTerms3New",
  ],
  RentalPortfolios: [
    "SBA9",
    "CreditScore",
    "SoftPull",
    "RentalLoanPrice",
    "RentalLoanPrice2",
    "RentalLoanPrice3",
    "LoanPricerSummary",
    "BorrowerStepNew",
    "BorrowerStep3Single",
    "EntityInformationNew",
    "LoanTerms2New",
    "LoanTerms3New",
  ],
  SBA: [
    "SBA10",
    "SBA11",
    "SBA12",
    "SBA13",
    "SBA18",
    "SBA19",
    "SBA20",
    "SBA21",
    "SBA22",
    "SBA23",
    "SBA24",
    "CreditScore",
    "SoftPull",
    "BusinessUpload",
    //"SBA2",
    //"SBA4",
    //"SBA5",
    //"SBA6",
    //"SBA7",
  ],
};

const USER_OBJECT = {
  login: "rohannajowallah@gmail.com", // REQUIRED -- Typically an email or username
  email: "rohannajowallah@gmail.com", // REQUIRED IF NOT AVAILABLE THROUGH AUTHORIZATION FLOW -- can be provided through jwt
  first: "Ro-Hanna", // RECOMMENDED -- can be provided through jwt
  last: "Jowallah", // RECOMMENDED -- can be provided through jwt
};

const ORGANIZATION_OBJECT = {
  id: "org123", // REQUIRED
  name: "ABC Inc.", // REQUIRED
  street: "123 Main St", // REQUIRED
  city: "Anytown", // REQUIRED
  state: "CA", // REQUIRED
  zipId: 32801, // REQUIRED
  timeInBusiness: 24, // OPTIONAL
  averageMonthlySales: 50000, // OPTIONAL
  industry: "Retail", // OPTIONAL
  entityType: "LLC", // OPTIONAL
  percentOwnership: 100, // OPTIONAL
  creditScore: 720, // OPTIONAL
  annualPersonalIncome: 80000, // OPTIONAL
  financeAmount: 100000, // OPTIONAL
  loanPurpose: "Working Capital", // OPTIONAL
  federalStateTaxId: "123456789", // OPTIONAL
  nonprofit: false, // OPTIONAL
  bankruptcy: false, // OPTIONAL
  bankruptcyStatus: "Not Applicable", // OPTIONAL
  bankruptcyDischargedDate: "2022-01-15", // OPTIONAL
  ownerBirthDate: "1985-05-10", // OPTIONAL
  contact: {
    // Object: CURRENT USER CONTACT DETAILS
    ssn: "123-45-6789", // OPTIONAL
    mobilePhone: 1234567890, // OPTIONAL
  },
};

const LoanForm2 = () => {
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

  const firstnameCookie = Cookies.get("firstName");

  const handleOptionChange = (value) => {
    const option = value;
    // setSelectedOption(option);
    // const token = Cookies.get("token");
    // const email = Cookies.get("email");
    setFormData({});

    if (!firstnameCookie) {
      // If the user is not logged in, redirect to the /register page
      navigate("/register"); // Redirect to /register using navigate
    } else {
      // If logged in, proceed with the option selection
      setSelectedOption(option);
    }
  };

  const handleNavigateLendio = () => {
    if (!firstnameCookie) {
      // If the user is not logged in, redirect to the /register page
      navigate("/register"); // Redirect to /register using navigate
    } else {
      // If logged in, navigate to /lendio
      navigate("/lendio");
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
  const checkCookieEmail = () => {
    const cookieEmail = Cookies.get("email"); // Replace 'yourCookieName' with the actual name of your cookie
    if (cookieEmail) {
      setCookieEmailFound(true);
    }
  };
  useEffect(() => {
    // Check for the cookie email when the component mounts
    checkCookieEmail();
  }, []);
  const fetchToken = () => {
    // Get the information from cookies
    const email = Cookies.get("email");
    const firtsName = Cookies.get("firstName");
    const lastName = Cookies.get("lastName");
    axios
      .post("https://52.165.80.134:4000/api/users/checkToken", {
        email: email,
      })
      .then((response) => {
        if (window.lendio) {
          window.lendio.initialize({
            jwt: response.data,
            user: {
              // Define properties and values for the user object directly
              login: email,
              email: email,
              first: firtsName,
              last: lastName,
              // Add any other properties as needed
            },
            organization: ORGANIZATION_OBJECT,
          });
          if (window.lendio.initialize) {
            window.lendio.launchLoanApplication();
          }
        }
      })
      .catch((error) => {
        // Handle any errors here (e.g., show an error message)
        console.error("Error:", error);
        toast.error(
          "This service is down at the moment, please try again soon."
        );
      });
  };

  const handleButtonClick = (value) => {
    setSelectedValue(value);
  };

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
    if (stepName === "Borrower Infromation") {
      if (!formData.borrowerFirst) {
        errors.borrowerFirst = "First Name is required ";
      }
      if (!formData.borrowerLast) {
        errors.borrowerLast = "First Last is required ";
      }
      if (!formData.borrowerEmail) {
        if (
          !formData.borrowerEmail.includes("@") ||
          !formData.borrowerEmail.endsWith(".com")
        ) {
          errors.borrowerEmail = "Please enter a valid email";
        }
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

    if (stepName === "Borrower Infromation4") {
      if (!formData.bestTerms) {
        errors.bestTerms = "First Name is required ";
      }
    }
    if (stepName === "SBA9") {
      if (!formData.firstName) {
        errors.firstName = "First name is required.";
      }
      if (!formData.lastName) {
        errors.lastName = "Last name is required.";
      }
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
      if (!formData.email) {
        errors.email = "Email is required.";
      } else if (
        !formData.email.includes("@") ||
        !formData.email.includes(".com")
      ) {
        errors.email = "Invalid email format. Please include '@' and '.com'.";
      }
      if (!formData.phoneNumber) {
        errors.phoneNumber = "Phone is required.";
      }
      if (!formData.password) {
        errors.password = "Password is required.";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
      } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(formData.password)) {
        errors.password = "Password must contain a special character.";
      } else if (!/[A-Z]/.test(formData.password)) {
        errors.password =
          "Password must contain at least one uppercase letter.";
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }
      if (!formData.createAgreement) {
        errors.createAgreement = "Please Check Box";
      }
      if (!formData.createAgreementTerms) {
        errors.createAgreementTerms = "Please Check Box";
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
    if (stepName === "SBA10") {
      // Add similar validations for other steps
      if (!formData.veteran) {
        errors.veteran = "Please Enter Your Veteran Status";
      }
      if (!formData.gender) {
        errors.gender = "Please Enter Your Gender";
      }
      if (!formData.race) {
        errors.race = "Please Enter Your Race";
      }
      if (!formData.ethinicity) {
        errors.ethinicity = "Please Enter Your Ethinicity";
      }
    }
    if (stepName === "SBA11") {
      // Add similar validations for other steps
      if (!formData.isIndictment) {
        errors.isIndictment = "Please Enter Your Indictment Status";
      }
      if (!formData.isArrested) {
        errors.isArrested = "Please Enter Your Arrested Status";
      }
      if (!formData.isCriminalOffense) {
        errors.isCriminalOffense = "Please Enter Your CriminalOffense";
      }
    }
    if (stepName === "SBA12") {
      // Add similar validations for other steps
      if (!formData.citizenshipStatus) {
        errors.citizenshipStatus = "Please Enter Your Citizenship Status";
      }
      if (!formData.countryofCitizenship) {
        errors.countryofCitizenship =
          "Please Enter Your Country of Citizenship";
      }
    }
    if (stepName === "SBA13") {
      // Add similar validations for other steps
      if (!formData.suspendedFederal) {
        errors.suspendedFederal = "Please Enter Your Citizenship Status";
      }
      if (!formData.daysDelenquet) {
        errors.daysDelenquet = "Please Enter Your days delenquent";
      }
      if (!formData.smallBusiness) {
        errors.smallBusiness = "Please Enter Your Country of Citizenship";
      }
      if (!formData.bankruptcyProtection) {
        errors.bankruptcyProtection = "Please Enter Your Citizenship Status";
      }

      if (!formData.legalAction) {
        errors.legalAction = "Please Enter Your Country of Citizenship";
      }

      if (!formData.legalAction) {
        errors.legalAction = "Please Enter Your Country of Citizenship";
      }
      if (!formData.loanGuarantor) {
        errors.loanGuarantor = "Please Enter Your  USCIS Registration Number";
      }
      if (!formData.financingDelinquent) {
        errors.financingDelinquent = "Please Enter Your Country of Citizenship";
      }
      if (!formData.businessDefault) {
        errors.businessDefault = "Please Enter Your Country of Citizenship";
      }
    }
    if (stepName === "SBA19") {
      // Add similar validations for other steps
      if (!formData.accountsPayable) {
        errors.accountsPayable = "Please Enter Your Accounts Payable";
      }
      if (!formData.notesPayable) {
        errors.notesPayable = "Please Enter Your Notes Payable ";
      }
      if (!formData.loanInsurance) {
        errors.loanInsurance = "Please Enter Your Loan Insurance";
      }
      if (!formData.mortgagesRealEstate) {
        errors.mortgagesRealEstate = "Please Enter Your Mortage Real Estate";
      }
      if (!formData.unpaidTaxes) {
        errors.unpaidTaxes = "Please Enter Your Unpaid Taxes";
      }

      //
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
    if (stepName === "SBA18") {
      // Add similar validations for other steps
      if (!formData.cashonHand) {
        errors.cashonHand = "Please Enter Your Cash on Hand";
      }
      if (!formData.savingsAccounts) {
        errors.savingsAccounts =
          "Please Enter Your Savings Account Information";
      }
      if (!formData.retirementAccount) {
        errors.retirementAccount =
          "Please Enter Your Country of Retirment Account Amount";
      }
      if (!formData.notesReceivable) {
        errors.notesReceivable = "Please Enter Notes Receivable";
      }
      if (!formData.lifeInsurance) {
        errors.lifeInsurance = "Please Enter Your Life Insurance Information";
      }
      if (!formData.stocksBonds) {
        errors.stocksBonds = "Please Enter Your Stocks and Bonds Amount";
      }
      //
      if (!formData.realEstate) {
        errors.realEstate = "Please Enter Your Real Estate";
      }
      if (!formData.automobiles) {
        errors.automobiles = "Please Enter Your automobiles Information";
      }
      if (!formData.otherPersonalProperty) {
        errors.otherPersonalProperty =
          "Please Enter Your Other Personal Property";
      }
      if (!formData.otherAssets) {
        errors.otherAssets = "Please Enter Your Other Assets";
      }
    }
    //
    if (stepName === "SBA20") {
      // Add similar validations for other steps
      if (!formData.salary) {
        errors.salary = "Please Enter Your Salary";
      }
      if (!formData.netInvestmentIncome) {
        errors.netInvestmentIncome = "Please Enter Your net investment income";
      }
      if (!formData.otherIncome) {
        errors.otherIncome = "Please Enter other Income";
      }
      if (!formData.realEstateIncomeSource) {
        errors.realEstateIncomeSource =
          "Please Enter Real Estate Income Source";
      }
      if (!formData.coMaker) {
        errors.coMaker = "Please Enter Notes As Endorser or Co-Maker";
      }
      if (!formData.netInvestmentIncome) {
        errors.netInvestmentIncome = "Please Enter Your Net Investment Icome";
      }
      if (!formData.legalClaims) {
        errors.legalClaims = "Please Enter Legal Claims & Judgments";
      }
      //
      if (!formData.provisionFederalIncomeTax) {
        errors.provisionFederalIncomeTax =
          "Please Enter Provision Federal Income Tax";
      }

      if (!formData.otherSpecialDebt) {
        errors.otherSpecialDebt = "Please Enter Your Other Assets";
      }
    }
    if (stepName === "SBA2") {
      // Add similar validations for other steps

      if (formData.ProjectAddressZip) {
        if (!/^\d{5}$/.test(formData.ProjectAddressZip)) {
          errors.ProjectAddressZip = "Please enter a valid zip";
        }
      }
      if (formData.PrimaryBusinessPhone) {
        if (!/^\d{10}$/.test(formData.PrimaryBusinessPhone)) {
          errors.ProjectAddressZip = "Please enter a valid phone number";
        }
      }
      if (formData.PrimaryBusinessPhone) {
        if (!/^\d{10}$/.test(formData.PrimaryBusinessPhone)) {
          errors.ProjectAddressZip = "Please enter a valid phone number";
        }
      }
      if (formData.businessEmail) {
        if (
          !formData.businessEmail.includes("@") ||
          !formData.businessEmail.endsWith(".com")
        ) {
          errors.businessEmail = "Please enter a valid email";
        }
      }
    }

    // Add similar validations for other steps

    return errors;
  };

  const handleSubmit = () => {
    // Get email from cookies
    const email = Cookies.get("email");
    // Add email to formData
    formData.userEmail = email;
    let apiUrl = "";
    if (forms.SBA) {
      apiUrl = "https://52.165.80.134:4000/api/sba"; // Replace with your actual API endpoint URL
    }
    console.log(formData);
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
      case "Entity Information":
        return (
          <EntityInformation formData={formData} setFormData={setFormData} />
        );
      case " EntityInformationNew":
        return (
          <EntityInformationNew formData={formData} setFormData={setFormData} />
        );

      case "Borrower Infromation":
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
          <PropertyInformation formData={formData} setFormData={setFormData} />
        );
      case "Property Information2":
        return (
          <PropertyInformation2 formData={formData} setFormData={setFormData} />
        );
      case "Property Information3":
        return (
          <PropertyInformation3 formData={formData} setFormData={setFormData} />
        );
      case "Property Information4":
        return (
          <PropertyInformation4 formData={formData} setFormData={setFormData} />
        );
      case "Property Information5":
        return (
          <PropertyInformation5 formData={formData} setFormData={setFormData} />
        );
      case "SBA10":
        return (
          <SBA10
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

      case "SBA11":
        return (
          <SBA11
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA12":
        return (
          <SBA12
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA13":
        return (
          <SBA13
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA14":
        return <SBA14 formData={formData} setFormData={setFormData} />;
      case "SBA26":
        return <SBA26 formData={formData} setFormData={setFormData} />;
      case "BusinessUpload":
        return <BusinessUpload formData={formData} setFormData={setFormData} />;
      case "SBA15":
        return <SBA15 formData={formData} setFormData={setFormData} />;

      case "SoftPull":
        return (
          <SoftPull
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA16":
        return <SBA16 formData={formData} setFormData={setFormData} />;
      case "SBA17":
        return <SBA17 formData={formData} setFormData={setFormData} />;
      case "SBA18":
        return (
          <SBA18
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA19":
        return (
          <SBA19
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA20":
        return (
          <SBA20
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA21":
        return <SBA21 formData={formData} setFormData={setFormData} />;
      case "SBA22":
        return <SBA22 formData={formData} setFormData={setFormData} />;
      case "SBA23":
        return <SBA23 formData={formData} setFormData={setFormData} />;
      case "SBA24":
        return <SBA24 formData={formData} setFormData={setFormData} />;
      case "SBA25":
        return <SBA25 formData={formData} setFormData={setFormData} />;
      case "CreditScore":
        return (
          <CreditScore
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "Loan Terms":
        return <LoanTerms formData={formData} setFormData={setFormData} />;
      case "Loan Terms2":
        return <LoanTerms2 formData={formData} setFormData={setFormData} />;
      case "LoanTerms2New":
        return <LoanTerms2New formData={formData} setFormData={setFormData} />;
      case "Loan Terms3":
        return <LoanTerms3 formData={formData} setFormData={setFormData} />;
      case "LoanTerms3New":
        return <LoanTerms3New formData={formData} setFormData={setFormData} />;
      case "MultiFamBorrowerStep":
        return (
          <MultiFamBorrowerStep formData={formData} setFormData={setFormData} />
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

      // case "CreditScore":
      //   return (
      //     <CreditScore
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );
      // case "SoftPull":
      //   return (
      //     <SoftPull
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );

      case "MultiFamBorrowerStep3":
        return (
          <MultiFamBorrowerStep3
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "MultiFamProperty":
        return (
          <MultiFamProperty formData={formData} setFormData={setFormData} />
        );
      case "MultiFamPropertyPre":
        return (
          <MultiFamPropertyPre formData={formData} setFormData={setFormData} />
        );
      case "MultiFamProperty2":
        return (
          <MultiFamProperty2 formData={formData} setFormData={setFormData} />
        );
      case "RenovationDetails":
        return (
          <RenovationDetails formData={formData} setFormData={setFormData} />
        );
      case "MultiFamDetails":
        return (
          <MultiFamDetails formData={formData} setFormData={setFormData} />
        );
      case "MultiFamilyPricing":
        return (
          <MultiFamilyPricing formData={formData} setFormData={setFormData} />
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
          />
        );
      case "StabalizedBridgeProperty2":
        return (
          <StabalizedBridgeProperty2
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "StabalizedBridgeProperty3":
        return (
          <StabalizedBridgeProperty3
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "StabalizedBridgeProperty4":
        return (
          <StabalizedBridgeProperty4
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "LoanPricer":
        return <LoanPricer formData={formData} setFormData={setFormData} />;
      case "LoanPricer2":
        return <LoanPricer2 formData={formData} setFormData={setFormData} />;
      case "LoanPricer3":
        return <LoanPricer3 formData={formData} setFormData={setFormData} />;
      case "LoanPricer4":
        return <LoanPricer4 formData={formData} setFormData={setFormData} />;

      case "LoanTermsMulti":
        return <LoanTermsMulti formData={formData} setFormData={setFormData} />;

      case "LoanPricerSummary":
        return (
          <LoanPricerSummary formData={formData} setFormData={setFormData} />
        );
      case "BorrowerStep3Single":
        return (
          <BorrowerStep3Single formData={formData} setFormData={setFormData} />
        );
      case "RentalLoanPrice":
        return (
          <RentalLoanPrice formData={formData} setFormData={setFormData} />
        );
      case "RentalLoanPrice2":
        return (
          <RentalLoanPrice2 formData={formData} setFormData={setFormData} />
        );
      case "RentalLoanPrice3":
        return (
          <RentalLoanPrice3 formData={formData} setFormData={setFormData} />
        );
      default:
        return <LoanTerms3 formData={formData} setFormData={setFormData} />;
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
              Business Loans
            </Typography>

            <Divider style={{ color: "grey", marginBottom: "10px" }} />
            <Grid container spacing={2}>
              <Grid item sm={12}>
                {/* // Render this content when the cookie email is found */}
                <>
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
                            Find the financing solution that fits your business
                            needs and your wallet. Secure your loan today.
                          </Typography>
                        </Box>
                        <Box>
                          <Container style={{ marginTop: "-50px" }}>
                            <Grid
                              ref={featuresRef}
                              className={` ${
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
                                    onClick={() =>
                                      handleOptionChange(item.value)
                                    }
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
                                        <Box
                                          sx={{
                                            color: "#498dd6",

                                            bottom: 0,
                                          }}
                                        >
                                          {item.icon}
                                        </Box>
                                      </Box>
                                      <Typography
                                        variant={"subtitle1"}
                                        align={"center"}
                                        style={{ textDecoration: "none" }}
                                        sx={{
                                          fontWeight: 500,
                                          marginTop: 2,
                                          textDecoration: "none",
                                        }}
                                      >
                                        {item.title}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Container>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  {/* <Grid container spacing={2}>
                  <Grid item sm={6}>
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
                      onClick={handleNavigateLendio} // Handle navigation on button click
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
                        <CreditScoreIcon />
                      </div>
                      <div style={{ fontWeight: "bold" }}>
                        Small Business Loan
                      </div>
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      style={{
                        marginBottom: "10px",
                        width: "300px",
                        color: "grey",
                        border: "1px solid grey",
                        height: "100px",
                        borderRadius: "8px",
                      }}
                      onClick={() => handleOptionChange("SBA")}
                      variant={"outlined"}
                      onMouseEnter={(e) => (e.target.style.color = "white")} // Change text color on hover
                      onMouseLeave={(e) => (e.target.style.color = "grey")} // Restore text color when not hovering
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
                        <CreditScoreIcon />
                      </div>
                      <div style={{ fontWeight: "bold" }}>SBA</div>
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Box
                      component={"img"}
                      src={project99}
                      width={1}
                      sx={{
                        filter:
                          theme.palette.mode === "dark"
                            ? "brightness(0.8)"
                            : "none",
                      }}
                    />
                  </Grid>
                </Grid> */}
                </>
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
            <img
              src={project99}
              className="text-center"
              style={{ width: "25%" }}
            />
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
          <Button
            variant="contained"
            style={{
              backgroundColor: "#498dd6",
              marginBottom: 40,
              borderRadius: "30px",
            }}
            onClick={handleNextStep}
          >
            {isSoftPullStep ? "I Agree" : "Next"}
          </Button>
        </Container>
      );
    }

    return (
      <Container>
        {renderFormStep("Loan Terms3")}
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

export default LoanForm2;
