import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import * as React from "react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import { useWindowSize } from "react-use";
import trustPilotPic from "../assets/trustpilot.png";
import EntityInformation from "../components/Loan Form/EntityInformation";
import FixandFlipCalcLoan from "../components/Loan Form/FixAndFlipCalcLoan";
import LoanTerms3 from "../components/Loan Form/LoanTerms3";
import MultiFamBorrowerStep from "../components/Loan Form/MultiFamBorrowerStep";
import MultiFamDetails from "../components/Loan Form/MultiFamDetails";
import MultiFamProperty2 from "../components/Loan Form/MultiFamProperty2";
import PropertyInformation from "../components/Loan Form/PropertyInformation";
import RenovationDetails from "../components/Loan Form/RenovationDetails";
import SBA26 from "../pages/Project99/SBA26";
import SoftPull from "../pages/Project99/SoftPull";
import AppTheme from "../shared-theme/AppTheme";
import InfoMobile from "./components/InfoMobile";
import RentalLoanPrice from "../components/Loan Form/RentalLoanPrice";
import RentalLoanPrice2 from "../components/Loan Form/RentalLoanPrice2";
import RentalLoanPrice3 from "../components/Loan Form/RentalLoanPrice3";
import LoanPricerSummary from "../components/Loan Form/LoanPricerSummary";
import BorrowerStep from "../components/Loan Form/BorrowerStep";
import BorrowerStep3 from "../components/Loan Form/BorrowerStep3";
import LoanTerms2 from "../components/Loan Form/LoanTerms2";
import RentalLoanPricerPortfolioForm from "../components/NewLoanFormComponents/RentalLoanPricerPortfolioForm";
import GetToKnowYou from "../pages/Project99/GetToKnowYou";
import SBA10 from "../pages/Project99/SBA10";
import SBA11 from "../pages/Project99/SBA11";
import SBA12 from "../pages/Project99/SBA12";
import SBA13 from "../pages/Project99/SBA13";
import SBA18 from "../pages/Project99/SBA18";
import SBA19 from "../pages/Project99/SBA19";
import SBA20 from "../pages/Project99/SBA20";
import SBA21 from "../pages/Project99/SBA21";
import SBA22 from "../pages/Project99/SBA22";
import SBA23 from "../pages/Project99/SBA23";
import SBA24 from "../pages/Project99/SBA24";
import BusinessUpload from "../pages/Project99/BusinessUpload";
import SBA2 from "../pages/Project99/SBA2";
import SBA4 from "../pages/Project99/SBA4";
import MobileHeaderTitle from "../components/MobileHeaderTitle";
import BackgroundInformationProjectEpic99 from "../components/NewLoanFormComponents/BackgroundInformationProjectEpic99";
import BorrowerInformationProjectEpic99 from "../components/NewLoanFormComponents/BorrowerInformationProjectEpic99";
import EntityInformationProjectEpic99 from "../components/NewLoanFormComponents/EntityInformationProjectEpic99";
import FinanceProjectEpic99 from "../components/NewLoanFormComponents/FinanceProjectEpic99";
import { Helmet } from "react-helmet";
export default function ProjectEpic99LoanForm(props) {
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
    "Background Information",
    "Partner Information",
    "Entity Information",
    "Finance Information",
    "Soft Credit Pull",
    "Upload & Submit",
  ];
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <BackgroundInformationProjectEpic99
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 1:
        return (
          <BorrowerInformationProjectEpic99
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 2:
        return (
          <EntityInformationProjectEpic99
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 3:
        return (
          <FinanceProjectEpic99
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      // case 4:
      //   return (
      //     <SBA18
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );
      // case 5:
      //   return (
      //     <SBA19
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );
      // case 6:
      //   return (
      //     <SBA20
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );
      // case 7:
      //   return (
      //     <SBA21
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );
      // case 8:
      //   return (
      //     <SBA22
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );
      // case 9:
      //   return (
      //     <SBA23
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );
      // case 10:
      //   return (
      //     <SBA24
      //       formData={formData}
      //       setFormData={setFormData}
      //       fieldErrors={fieldErrors}
      //     />
      //   );
      case 4:
        return (
          <SoftPull
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 5:
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
        "https://52.165.80.134:4000/api/project99/addproject99",
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

    // Add more validations for other steps as needed
    // Step 0: BorrowerStep validation example
    if (step === 0) {
      if (!formData.motivation) {
        errors.motivation = "Required";
      }
      if (!formData.moneyperYear) {
        errors.moneyperYear = "Required";
      }
      if (!formData.industryExperience) {
        errors.industryExperience = "Required";
      }
      if (!formData.runningCompany) {
        errors.runningCompany = "Required";
      }
      if (!formData.stateBusiness) {
        errors.stateBusiness = "Required";
      }
      if (!formData.monthlySalesExpected) {
        errors.monthlySalesExpected = "Required";
      }
      if (!formData.businessPercentage) {
        errors.businessPercentage = "Required";
      }
      if (!formData.whichImportant) {
        errors.whichImportant = "Required";
      }
    }

    if (step === 1) {
      if (!formData.firstName) {
        errors.firstName = "Required";
      }
      if (!formData.borrowerLast) {
        errors.borrowerLast = "Required";
      }
      if (!formData.borrowerEmail) {
        errors.borrowerEmail = "Required";
      }
      if (!formData.borrowerCell) {
        errors.borrowerCell = "Required";
      }
      if (!formData.borrowerCitizenship) {
        errors.borrowerCitizenship = "Required";
      }
      if (!formData.veteran) {
        errors.veteran = "Required";
      }
      if (!formData.gender) {
        errors.gender = "Required";
      }
      if (!formData.race) {
        errors.race = "Required";
      }
      if (!formData.ethinicity) {
        errors.ethinicity = "Required";
      }

      // USCIS Registration Number is required only if borrowerCitizenship is "US Permanent Resident (Green Card Holder)"
      if (
        formData.borrowerCitizenship ===
          "US Permanent Resident (Green Card Holder)" &&
        !formData.uscisRegNum
      ) {
        errors.uscisRegNum = "Required";
      }

      if (!formData.isIndictment) {
        errors.isIndictment = "Required";
      }
      if (!formData.isArrested) {
        errors.isArrested = "Required";
      }
      if (!formData.isCriminalOffense) {
        errors.isCriminalOffense = "Required";
      }
      if (!formData.suspendedFederal) {
        errors.suspendedFederal = "Required";
      }
      if (!formData.daysDelenquet) {
        errors.daysDelenquet = "Required";
      }
      if (!formData.smallBusiness) {
        errors.smallBusiness = "Required";
      }
      if (!formData.bankruptcyProtection) {
        errors.bankruptcyProtection = "Required";
      }
      if (!formData.legalAction) {
        errors.legalAction = "Required";
      }
      if (!formData.loanGuarantor) {
        errors.loanGuarantor = "Required";
      }
      if (!formData.financingDelinquent) {
        errors.financingDelinquent = "Required";
      }
      if (!formData.businessDefault) {
        errors.businessDefault = "Required";
      }
    }

    if (step === 2) {
      if (!formData.borrowingEntityInformation) {
        errors.borrowingEntityInformation = "Required";
      }
    }

    if (step === 4) {
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
      if (!formData.ficoScore) {
        errors.ficoScore = "FICO score is required";
      }
    }

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
    <>
      <Helmet>
        <title>Epic 99 Loan Program | Capital Velocity</title>
        <meta
          name="description"
          content="Apply for the Epic 99 small business funding program at Capital Velocity. Receive up to $5 million in growth capital without immediate repayment obligations."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/project99"
        />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Epic 99 Loan Program",
      "url": "https://www.capitalvelocity.com/project99",
      "description": "Epic 99 is Capital Velocity's premier small business funding program offering up to $5 million to support business ownership and growth, with no immediate repayment requirements.",
      "publisher": {
        "@type": "Organization",
        "name": "Capital Velocity",
        "url": "https://www.capitalvelocity.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.capitalvelocity.com/assets/cvlogo-BWrm997-.png"
        }
      }
    }
    `}
        </script>
      </Helmet>

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
          {isSmallScreen && <MobileHeaderTitle title="Project Epic 99" />}
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
                  align="center"
                  gutterBottom
                >
                  Project Epic 99
                </Typography>
                <Typography
                  align="center"
                  variant="h6"
                  style={{ color: "black" }}
                >
                  Epic 99 – Unlock Business Growth with Up to $5 Million in
                  Funding
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  At <strong>Capital Velocity</strong>, we believe in empowering
                  entrepreneurs, key employees, and aspiring business owners
                  with the financial support they need to succeed.{" "}
                  <strong>Epic 99</strong> is our exclusive funding program,
                  designed to provide businesses with{" "}
                  <strong>$100,000 to $5 million</strong> in capital—without
                  immediate repayment obligations.
                </Typography>

                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  Who Can Benefit from Epic 99?
                </Typography>

                <Typography
                  variant="h7"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  Epic 99 is tailored for: <br />•{" "}
                  <strong>Existing Business Owners</strong> looking to expand,
                  scale, or improve operations. <br /> •{" "}
                  <strong>
                    Key Employees Aspiring to Become Business Owners
                  </strong>
                  , giving them the opportunity to take ownership in their
                  industry.
                  <br /> •{" "}
                  <strong>
                    Entrepreneurs and Individuals Seeking to Own a Business
                  </strong>
                  , whether starting from scratch or acquiring an existing
                  company.
                </Typography>

                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  Why Choose Epic 99?
                </Typography>

                <Typography
                  variant="h7"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  • <strong>Flexible Funding Options</strong> – Receive the
                  capital you need to invest in growth, inventory, equipment,
                  staffing, marketing, and more.
                  <br /> • <strong>No Immediate Repayment</strong> – Unlike
                  traditional loans, Epic 99 allows you to focus on building
                  your business before repaying the funding.
                  <br /> • <strong>Seamless Application Process</strong> –
                  Getting started is simple. Create a free account on our
                  platform to explore your funding opportunities.
                  <br /> • <strong>Strategic Partnerships</strong> – We work
                  closely with business owners and future entrepreneurs to
                  ensure they have the resources, guidance, and financial
                  support needed to succeed.
                </Typography>

                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  How to Apply
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  Accessing Epic 99 funding is easy. Simply: <br />
                  1. <strong>Sign up for a free account</strong> on the{" "}
                  <strong>Capital Velocity</strong> platform. <br />
                  2. <strong>Complete a simple application</strong> to share
                  your business goals and funding needs. <br />
                  3. <strong>Get matched with funding</strong> that aligns with
                  your vision for success.
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  At <strong>Capital Velocity</strong>, we are committed to
                  fueling innovation, growth, and success. Whether you’re an
                  established business owner, a key employee ready to take the
                  leap, or someone with a dream of business ownership—
                  <strong>Epic 99</strong> is here to help you make it happen.
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: "black", marginTop: "10px" }}
                >
                  Get started today and unlock your business potential with Epic
                  99!
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
                backgroundColor: {
                  xs: "transparent",
                  sm: "background.default",
                },
                alignItems: "center",
                pt: { xs: 0, sm: 16 },
                px: { xs: 2, sm: 10 },
                gap: { xs: 4, md: 8 },
              }}
            >
              <React.Fragment>
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
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
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
    </>
  );
}
