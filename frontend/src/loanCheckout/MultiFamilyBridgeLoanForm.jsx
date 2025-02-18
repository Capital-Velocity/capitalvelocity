import * as React from "react";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./components/AddressForm";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import SitemarkIcon from "./components/SitemarkIcon";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { green } from "@mui/material/colors";
import trustPilotPic from "../assets/trustpilot.png";
import { useState } from "react";
import BorrowerStep from "../components/Loan Form/BorrowerStep";
import BorrowerStep2 from "../components/Loan Form/BorrowerStep2";
import BorrowerStep3 from "../components/Loan Form/BorrowerStep3";
import BorrowerStep4 from "../components/Loan Form/BorrowerStep4";
import EntityInformation from "../components/Loan Form/EntityInformation";
import PropertyInformation from "../components/Loan Form/PropertyInformation";
import PropertyInformation2 from "../components/Loan Form/PropertyInformation2";
import PropertyInformation3 from "../components/Loan Form/PropertyInformation3";
import PropertyInformation4 from "../components/Loan Form/PropertyInformation4";
import PropertyInformation5 from "../components/Loan Form/PropertyInformation5";
import LoanTerms from "../components/Loan Form/LoanTerms";
import LoanTerms2 from "../components/Loan Form/LoanTerms2";
import LoanTerms3 from "../components/Loan Form/LoanTerms3";
import CreditScore from "../pages/Project99/CreditScore";
import SoftPull from "../pages/Project99/SoftPull";
import SBA26 from "../pages/Project99/SBA26";
import SBA27 from "../pages/Project99/SBA27";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useMediaQuery } from "@mui/material";
import StepButton from "@mui/material/StepButton";
import FixandFlipCalcLoan from "../components/Loan Form/FixAndFlipCalcLoan";
import MultiFamBorrowerStep from "../components/Loan Form/MultiFamBorrowerStep";
import MultiFamBorrowerStep2 from "../components/Loan Form/MultiFamBorrowerStep2";
import MultiFamBorrowerStep3 from "../components/Loan Form/MultiFamBorrowerStep3";
import MultiFamProperty from "../components/Loan Form/MultiFamProperty";
import MultiFamProperty2 from "../components/Loan Form/MultiFamProperty2";
import RenovationDetails from "../components/Loan Form/RenovationDetails";
import MultiFamDetails from "../components/Loan Form/MultiFamDetails";
import MultiFamilyPricing from "../components/Loan Form/MultiFamilyPricing";
import PropertyInformationMultiFamilyBridge from "../components/NewLoanFormComponents/PropertyInformationMultifamilyBridge";

export default function MultiFamilyBridgeLoanForm(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // State to store form data
  const [addressData, setAddressData] = React.useState({});
  const [paymentData, setPaymentData] = React.useState({});
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Stepper labels
  const steps = [
    "Borrower Information",
    "Entity Information",
    "Property Information",
    "Add New Property",
    "Renovation Details",
    "Other Details",
    "Fix and Flip Calculator",
    "Vendor and Closing Options",
    "Soft Credit Pull",
    "Upload & Submit",
  ];
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <MultiFamBorrowerStep
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      //   case 1:
      //     return (
      //       <BorrowerStep2
      //         formData={formData}
      //         setFormData={setFormData}
      //         fieldErrors={fieldErrors}
      //       />
      //     );
      //   case 2:
      //     return (
      //       <MultiFamBorrowerStep2
      //         formData={formData}
      //         setFormData={setFormData}
      //         fieldErrors={fieldErrors}
      //       />
      //     );
      //   case 3:
      //     return (
      //       <MultiFamBorrowerStep3
      //         formData={formData}
      //         setFormData={setFormData}
      //         fieldErrors={fieldErrors}
      //       />
      //     );
      case 1:
        return (
          <EntityInformation
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 2:
        return (
          <PropertyInformationMultiFamilyBridge
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      //   case 3:
      //     return (
      //       <MultiFamProperty
      //         formData={formData}
      //         setFormData={setFormData}
      //         fieldErrors={fieldErrors}
      //       />
      //     );
      case 3:
        return (
          <MultiFamProperty2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 4:
        return (
          <RenovationDetails
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 5:
        return (
          <MultiFamDetails
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 6:
        return (
          <FixandFlipCalcLoan
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      //   case 7:
      //     return (
      //       <LoanTerms2
      //         formData={formData}
      //         setFormData={setFormData}
      //         fieldErrors={fieldErrors}
      //       />
      //     );
      case 7:
        return (
          <LoanTerms3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      //   case 13:
      //     return (
      //       <CreditScore
      //         formData={formData}
      //         setFormData={setFormData}
      //         fieldErrors={fieldErrors}
      //       />
      //     );
      case 8:
        return (
          <SoftPull
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 9:
        return (
          <SBA26
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    console.log(formData);

    // Validate current step
    if (validateStep(activeStep)) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } else {
      toast.error("Please fill out the required fields before proceeding.");
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleApplyNow = async () => {
    setIsSubmitting(true); // Disable button while submitting
    const userEmail = Cookies.get("email");
    formData.userEmail = userEmail;
    try {
      const emailData = {
        formData,
      };

      // Send email data to backend via Axios (replace the URL with your backend URL)
      const response = await axios.post(
        "https://52.165.80.134:4000/api/multifam/addMultiFam",
        formData
      );

      if (response.status === 200) {
        toast.success("Thank you, we have received your application.");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 3 seconds
        console.log("Response from server:", response.data);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
      setIsSubmitting(false); // Disable button while submitting
    }
  };

  const validateStep = (step) => {
    const errors = {};

    // Step 0: BorrowerStep validation example
    if (step === 0) {
      if (!formData.firstName) {
        errors.firstName = "First Name is required";
      }
      if (!formData.lastName) {
        errors.lastName = "Last Name is required";
      }
      if (!formData.borrowerEmail) {
        errors.borrowerEmail = "Email is required";
      }
      if (!formData.phoneNumber) {
        errors.phoneNumber = "Phone Number is required";
      }
      if (!formData.borrowerCitizenshipStatus) {
        errors.borrowerCitizenshipStatus = "Citizenship status is required";
      }
      if (!formData.liquidity) {
        errors.liquidity = "Liquidity amount is required";
      }
      // if (!formData.guranteeLoan) {
      //   errors.guranteeLoan = "Required";
      // }
      // if (!formData.authorizedSignatory) {
      //   errors.authorizedSignatory = "Required";
      // }
    }

    // Step 0: BorrowerStep validation example
    if (step === 1) {
      if (!formData.authorizedSignatory) {
        errors.authorizedSignatory = "Required ";
      }
      if (!formData.borrowingEntityInformation) {
        errors.borrowingEntityInformation = "Required ";
      }
    }

    if (step === 2) {
      if (!formData.homeAddress) {
        errors.homeAddress = "Address is required";
      }
      if (!formData.addressCity) {
        errors.addressCity = "City is required";
      }
      if (!formData.addressZip) {
        errors.addressZip = "Zipcode is required";
      }
      if (!formData.addressState) {
        errors.addressState = "State is required";
      }
      if (!formData.propertyType) {
        errors.propertyType = "Property type is required";
      }
      // if (!formData.authorizedSignatory) {
      //   errors.authorizedSignatory = "Authorized signatory is required";
      // }
      if (!formData.purchaseorRefinance) {
        errors.purchaseorRefinance = "Purchase or Refinance is required";
      }
      // if (!formData.propertyPurchasePrice) {
      //   errors.propertyPurchasePrice = "Property purchase price is required";
      // }
      if (!formData.propertySource) {
        errors.propertySource = "Property source is required";
      }
      // if (!formData.renovationBudget) {
      //   errors.renovationBudget = "Renovation budget is required";
      // }
      if (!formData.isCondominium) {
        errors.isCondominium = "Condominium option is required";
      }
      // if (!formData.afterRepairValue) {
      //   errors.afterRepairValue = "After repair value is required";
      // }
      if (!formData.exitStrat) {
        errors.exitStrat = "Exit strategy is required";
      }
    }

    if (step === 3) {
      if (!formData.cashOut) {
        errors.cashOut = "Required";
      }
      if (!formData.debt) {
        errors.debt = "Required";
      }
      if (!formData.purchaseDate) {
        errors.purchaseDate = "Required";
      }
    }

    if (step === 4) {
      if (!formData.investedCapital) {
        errors.investedCapital = "Required";
      }
      if (!formData.completedCapex) {
        errors.completedCapex = "Required";
      }
    }

    if (step === 5) {
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

    if (step === 6) {
      if (!formData.propertyPurchasePrice) {
        errors.propertyPurchasePrice = "Purchase price is required";
      }
      if (!formData.afterRepairValue) {
        errors.afterRepairValue = "After repair value is required";
      }
      if (!formData.propertyRehabCost) {
        errors.propertyRehabCost = "Rehab cost is required";
      }
      if (!formData.propertyMonthlyPropertyTaxes) {
        errors.propertyMonthlyPropertyTaxes =
          "Monthly property taxes are required";
      }
      if (!formData.propertyMonthlyInsurance) {
        errors.propertyMonthlyInsurance = "Monthly insurance is required";
      }
      if (!formData.propertyMonthlyUtilityBills) {
        errors.propertyMonthlyUtilityBills =
          "Monthly utility bills are required";
      }
      if (!formData.propertyOtherMonthlyExpenses) {
        errors.propertyOtherMonthlyExpenses =
          "Other monthly expenses are required";
      }
    }

    if (step === 7) {
      if (!formData.preferredClosingAttorney) {
        errors.preferredClosingAttorney = "Closing attorney is required";
      }
      if (!formData.closingDate) {
        errors.closingDate = "Closing date is required";
      }
      if (!formData.insuranceCompany) {
        errors.insuranceCompany = "Insurance company is required";
      }
      if (!formData.titleCompany) {
        errors.titleCompany = "Title company is required";
      }
    }

    if (step === 8) {
      if (!formData.birthMonth) {
        errors.birthMonth = "Birth month is required";
      }
      if (!formData.birthDate) {
        errors.birthDate = "Birth date is required";
      }
      if (!formData.birthYear) {
        errors.birthYear = "Birth year is required";
      }
      if (!formData.socialSecurity) {
        errors.socialSecurity = "SSN number is required";
      }
    }

    // Add more validations for other steps as needed

    // Update the fieldErrors state
    setFieldErrors(errors);

    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  // Step navigation when clicking a step label
  const handleStepClick = (index) => {
    if (index > activeStep && !validateStep(activeStep)) {
      toast.error("Please fill out the required fields before proceeding.");
      return;
    }
    setActiveStep(index);
  };

  // // Trigger for the "Apply Now" button
  // const handleApplyNow = async () => {
  //   try {
  //     const emailData = {
  //       formData,
  //     };

  //     // Send email data to backend via Axios (replace the URL with your backend URL)
  //     const response = await axios.post(
  //       "https://test:4000/api/emailRouter/send-confirm",
  //       emailData
  //     );

  //     if (response.status === 200) {
  //       alert("Email sent successfully!");
  //     }
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     alert("Failed to send email. Please try again.");
  //   }
  // };
  return (
    <AppTheme {...props}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250} // Decent amount of confetti
          tweenDuration={5} // Smooth fall animation
          decay={0.9} // Ensures confetti falls off-screen
          run={showConfetti} // Ensures confetti doesn't regenerate
          recycle={false} // Stops confetti from looping
        />
      )}

      <ToastContainer />

      {/* <CssBaseline enableColorScheme />
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <ColorModeIconDropdown />
      </Box> */}

      <Box>
        <Grid
          container
          sx={{
            height: {
              xs: "100%",
              sm: "calc(100dvh - var(--template-frame-height, 0px))",
            },
            mt: {
              xs: 4,
              sm: 0,
            },
          }}
        >
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 16,
              px: 10,
              gap: 4,
            }}
          >
            {/* <SitemarkIcon /> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              {/* <Info totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"} /> */}
              <Typography
                variant="h1" // Larger heading for "Small Business Loan"
                style={{ color: "black", fontWeight: "bold" }}
                gutterBottom
              >
                Multifamily Bridge Loan
              </Typography>
              <Typography variant="h6" style={{ color: "black" }}>
                Acquiring a multifamily property often requires quick and
                flexible financing solutions to secure the deal before long-term
                funding is arranged. Our interim financing options provide fast
                access to capital, allowing investors to close on properties
                efficiently while structuring their long-term financial
                strategy.
              </Typography>
              <Typography
                variant="h7"
                style={{ color: "black", marginTop: "10px" }}
              >
                <Checkbox
                  defaultChecked
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
                  checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
                  sx={{
                    transform: "scale(1.0)", // Keep checkbox size
                  }}
                />
                Flexible Terms <br />
                <Checkbox
                  defaultChecked
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
                  checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
                  sx={{
                    transform: "scale(1.0)", // Keep checkbox size
                  }}
                />
                Low Interest Rates <br />{" "}
                <Checkbox
                  defaultChecked
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
                  checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
                  sx={{
                    transform: "scale(1.0)", // Keep checkbox size
                  }}
                />
                Fast Funding
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={trustPilotPic}
                  alt="TrustPilot"
                  style={{ width: "262px", height: "43px" }}
                />
              </div>
            </Box>
          </Grid>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "center",
              pt: { xs: 0, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <React.Fragment>
              {/* <Stepper
                activeStep={activeStep}
                orientation={isSmallScreen ? "vertical" : "horizontal"}
                sx={{
                  flexDirection: isSmallScreen ? "column" : "row",
                  alignItems: "center",
                  gap: isSmallScreen ? "4px" : "8px", // Reduce gap for compactness
                }}
              >
                {steps.map((label, index) => (
                  <Step key={label} onClick={() => handleStepClick(index)}>
                    <StepLabel
                      sx={{
                        cursor: "pointer",
                        pointerEvents: "auto",
                        "& .MuiStepLabel-label": {
                          cursor: "pointer",
                          fontSize: "0.8rem", // Reduce font size for compactness
                          margin: "0px", // Reduce default margin
                        },
                        "& .MuiStepIcon-root": {
                          cursor: "pointer",
                          fontSize: "1.5rem", // Adjust icon size
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper> */}
              {/* <Box
                sx={{ overflowX: "auto", whiteSpace: "nowrap", width: "100%" }}
              >
                <Stepper
                  activeStep={activeStep}
                  orientation={"horizontal"}
                  sx={{
                    flexWrap: "nowrap",
                    width: "max-content", // Ensures content doesn’t shrink
                    justifyContent: "center",
                  }}
                >
                  {steps.map((label, index) => (
                    <Step key={label} onClick={() => handleStepClick(index)}>
                      <StepLabel
                        sx={{
                          cursor: "pointer",
                          "& .MuiStepLabel-label": {
                            fontSize: "0.8rem",
                          },
                          "& .MuiStepIcon-root": {
                            fontSize: "1.5rem",
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box> */}

              <Stepper
                activeStep={activeStep}
                orientation="horizontal" // Always horizontal
                sx={{
                  flexWrap: "wrap",
                  justifyContent: "center", // Centered alignment
                  rowGap: "8px", // Space between rows
                }}
              >
                {steps.map((label, index) => (
                  <Step
                    key={label}
                    onClick={() => handleStepClick(index)}
                    sx={{
                      flex: "2 1 30%", // Ensures equal width (adjust 25% as needed)
                      minWidth: "120px", // Prevents steps from getting too small
                      textAlign: "center", // Ensures labels stay centered
                    }}
                  >
                    <StepLabel
                      sx={{
                        cursor: "pointer",
                        "& .MuiStepLabel-label": {
                          fontSize: "0.8rem",
                          textAlign: "center", // Ensures text alignment
                          display: "block", // Keeps text from shifting
                        },
                        "& .MuiStepIcon-root": {
                          fontSize: "1.5rem",
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {getStepContent(activeStep)}
              <Box
                sx={[
                  {
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: "60px",
                  },
                  activeStep !== 0
                    ? { justifyContent: "space-between" }
                    : { justifyContent: "flex-end" },
                ]}
              >
                {activeStep !== 0 && (
                  <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={handleBack}
                    variant="text"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    Previous
                  </Button>
                )}
                {activeStep !== 0 && (
                  <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={handleBack}
                    variant="outlined"
                    fullWidth
                    sx={{ display: { xs: "flex", sm: "none" } }}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  variant="contained"
                  endIcon={<ChevronRightRoundedIcon />}
                  onClick={
                    activeStep === steps.length - 1
                      ? handleApplyNow
                      : handleNext
                  }
                  sx={{ width: { xs: "100%", sm: "fit-content" } }}
                  disabled={isSubmitting} // Disable button when submitting
                >
                  {isSubmitting
                    ? "Submitting..."
                    : activeStep === steps.length - 1
                    ? "Apply Now"
                    : "Next"}
                </Button>
              </Box>
            </React.Fragment>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{ width: "100%", height: 40 }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-child": { pl: 0 },
                        ":last-child": { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box> */}
            <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Fix and Flip Loan
                  </Typography>
                </div> */}
                <InfoMobile
                  totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
                />
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              {/* <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                      "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{
                        ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper> */}
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">
                    Thank you for your order!
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Your order number is
                    <strong>&nbsp;#140396</strong>. We have emailed your order
                    confirmation and will update you once its shipped.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Go to my orders
                  </Button>
                </Stack>
              ) : (
                <React.Fragment>
                  {/* {getStepContent(activeStep)}
                  <Box
                    sx={[
                      {
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: "end",
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: "60px",
                      },
                      activeStep !== 0
                        ? { justifyContent: "space-between" }
                        : { justifyContent: "flex-end" },
                    ]}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        Previous
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: "flex", sm: "none" } }}
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={
                        activeStep === steps.length - 1
                          ? handleApplyNow
                          : handleNext
                      }
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                    >
                      {activeStep === steps.length - 1 ? "Apply Now" : "Next"}
                    </Button>
                  </Box> */}
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AppTheme>
  );
}
