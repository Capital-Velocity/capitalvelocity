import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer2 from "../components/Footer2";
import greenLeaf from "../Images/greenLeaf.png";
import Container from "../screens/Container";
import BusinessUpload from "./Project99/BusinessUpload";
import CreditScore from "./Project99/CreditScore";
import GetToKnowYou from "./Project99/GetToKnowYou";
import SBA1 from "./Project99/SBA1";
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
import SBA2 from "./Project99/SBA2";
import SBA20 from "./Project99/SBA20";
import SBA21 from "./Project99/SBA21";
import SBA22 from "./Project99/SBA22";
import SBA23 from "./Project99/SBA23";
import SBA24 from "./Project99/SBA24";
import SBA25 from "./Project99/SBA25";
import SBA26 from "./Project99/SBA26";
import SBA27 from "./Project99/SBA27";
import SBA3 from "./Project99/SBA3";
import SBA4 from "./Project99/SBA4";
import SBA5 from "./Project99/SBA5";
import SBA6 from "./Project99/SBA6";
import SBA7 from "./Project99/SBA7";
import SBA8 from "./Project99/SBA8";
import SBA9 from "./Project99/SBA9";
import SoftPull from "./Project99/SoftPull";
const forms = {
  Project99: [
    "GetToKnowYou",
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
    "SBA2",
    "SBA4",
    "SBA5",
    "SBA6",
    "SBA7",
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
    "SBA26",
    "SoftPull",
    "BusinessUpload",
    "SBA2",
    "SBA4",
    "SBA5",
    "SBA6",
    "SBA7",
  ],
};

const Project99 = () => {
  const theme = useTheme();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable
  const [selectedValue, setSelectedValue] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});

  const handleOptionChange = (value) => {
    const option = value;
    setSelectedOption(option);

    setFormData({});
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

  const validateStep = (stepName) => {
    const errors = {};

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
        errors.daysDelenquet = "Please Enter Your  USCIS Registration Number";
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
      if (!formData.ProjectAddressZip) {
        errors.ProjectAddressZip = "Please enter a valid zip";
      }
      if (!formData.PrimaryBusinessPhone) {
        errors.PrimaryBusinessPhone = "Please enter a valid phone number";
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
    return errors;
  };
  const handleSubmit = () => {
    const email = Cookies.get("email");
    // Add email to formData
    formData.userEmail = email;
    const apiUrl = "https://52.165.80.134:4000/api/project99/addproject99"; // Replace with your actual API endpoint URL
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

  const renderFormStep = (stepName) => {
    switch (stepName) {
      case "SBA1":
        return <SBA1 formData={formData} setFormData={setFormData} />;
      case "SBA2":
        return (
          <SBA2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );

      case "SBA3":
        return <SBA3 formData={formData} setFormData={setFormData} />;
      case "SBA4":
        return <SBA4 formData={formData} setFormData={setFormData} />;
      case "SBA5":
        return (
          <SBA5
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA6":
        return (
          <SBA6
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA7":
        return (
          <SBA7
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case "SBA8":
        return <SBA8 formData={formData} setFormData={setFormData} />;
      case "SBA9":
        return (
          <SBA9
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
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
      case "SBA27":
        return <SBA27 formData={formData} setFormData={setFormData} />;
      case "CreditScore":
        return (
          <CreditScore
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      default:
        return <SBA26 formData={formData} setFormData={setFormData} />;
    }
  };
  const renderForm = () => {
    if (selectedOption === "") {
      return (
        <div style={{ backgroundColor: "#c0dced" }}>
          <div style={{ backgroundColor: "#c0dced" }}>
            <Container style={{ backgroundColor: "#c0dced" }}>
              <Typography variant="h4" color="black" gutterBottom>
                Apply for Project Epic 99
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={4}>
                  <Button
                    style={{
                      marginBottom: "10px",
                      width: "300px",
                      color: "grey",
                      border: "1px solid grey",
                      height: "100px",
                      borderRadius: "8px",
                    }}
                    onClick={() => handleOptionChange("Project99")}
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
                    <div style={{ fontWeight: "bold" }}>Project Epic99</div>
                  </Button>
                </Grid>

                <Grid item sm={4}>
                  <Box
                    component={"img"}
                    src={greenLeaf}
                    width={1}
                    height={1}
                    sx={{
                      filter:
                        theme.palette.mode === "dark"
                          ? "brightness(0.8)"
                          : "none",
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
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
      {/* Render the content of your page */}
      {isFormSubmitted ? (
        // Render congratulatory message if form is submitted
        <Container>
          <Confetti
            width={800}
            height={600}
            numberOfPieces={30}
            tweenDuration={2}
          />
          <Typography variant="h4" color="black" gutterBottom>
            Congratulations! Your application has been processed.
          </Typography>
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
      ) : (
        // Render the form if form is not yet submitted
        renderForm()
      )}

      {/* Render the footer only once */}
      {/* <Footer2 /> */}
      <ToastContainer />
    </div>
  );
};

export default Project99;
