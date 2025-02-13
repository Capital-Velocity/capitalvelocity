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

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  // State to store form data
  const [addressData, setAddressData] = React.useState({});
  const [paymentData, setPaymentData] = React.useState({});
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  const steps = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "a",
    "b",
    "c",
    "d",
    "e",
    "a",
    "b",
    "c",
    "d",
    "e",
    ,
    "a",
  ];
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <BorrowerStep
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 1:
        return (
          <BorrowerStep2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 2:
        return (
          <BorrowerStep3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 3:
        return (
          <BorrowerStep4
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );

      case 4:
        return (
          <EntityInformation
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 5:
        return (
          <PropertyInformation
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 6:
        return (
          <PropertyInformation2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 7:
        return (
          <PropertyInformation3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 8:
        return (
          <PropertyInformation4
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 9:
        return (
          <PropertyInformation5
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 10:
        return (
          <LoanTerms
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 11:
        return (
          <LoanTerms2
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 12:
        return (
          <LoanTerms3
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 13:
        return (
          <CreditScore
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 14:
        return (
          <SoftPull
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 15:
        return (
          <SBA26
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 16:
        return (
          <SBA27
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
    // console.log(formData);

    // Validate current step
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    } else {
      alert("Please fill out the required fields before proceeding.");
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleApplyNow = async () => {
    const userEmail = Cookies.get("email");
    formData.userEmail = userEmail;
    try {
      const emailData = {
        formData,
      };

      // Send email data to backend via Axios (replace the URL with your backend URL)
      const response = await axios.post(
        "https://52.165.80.134:4000/api/fixandFlip/addFixandFlip",
        formData
      );

      if (response.status === 200) {
        alert("Email sent successfully!");
        console.log("Response from server:", response.data);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  const validateStep = (step) => {
    const errors = {};

    // Step 0: BorrowerStep validation example
    if (step === 0) {
      if (!formData.firstName) {
        errors.firstName = "First Name is required";
      }
      if (!formData.borrowerLast) {
        errors.borrowerLast = "Last Name is required";
      }
      if (!formData.borrowerEmail) {
        errors.borrowerEmail = "Email is required";
      }
      if (!formData.borrowerCell) {
        errors.borrowerCell = "Phone Number is required";
      }
      if (!formData.borrowerCitizenship) {
        errors.borrowerCitizenship = "Citizenship status is required";
      }
    }

    // Add more validations for other steps as needed

    // Update the fieldErrors state
    setFieldErrors(errors);

    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
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
      <CssBaseline enableColorScheme />
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <ColorModeIconDropdown />
      </Box>
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
                variant="h5" // Larger heading for "Small Business Loan"
                style={{ color: "grey", fontWeight: "bold" }}
                gutterBottom
              >
                Fix and Flip Loan
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "grey", fontSize: 14 }}
              >
                Short-term financing for purchasing and renovating properties.
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "grey", fontSize: 14, marginTop: "10px" }}
              >
                <Checkbox
                  defaultChecked
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
                  checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
                  sx={{
                    transform: "scale(1.0)", // Keep checkbox size
                  }}
                />
                Fast Approval <br />
                <Checkbox
                  defaultChecked
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
                  checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
                  sx={{
                    transform: "scale(1.0)", // Keep checkbox size
                  }}
                />
                Short-Term Loan <br />{" "}
                <Checkbox
                  defaultChecked
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
                  checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
                  sx={{
                    transform: "scale(1.0)", // Keep checkbox size
                  }}
                />
                No Prepayment Penalties
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
                >
                  {activeStep === steps.length - 1 ? "Apply Now" : "Next"}
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
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected products
                  </Typography>
                  <Typography variant="body1">
                    {activeStep >= 2 ? "$144.97" : "$134.98"}
                  </Typography>
                </div>
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
              <Stepper
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
              </Stepper>
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
