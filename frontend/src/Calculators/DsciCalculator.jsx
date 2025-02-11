import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Chart } from "react-google-charts";
import InputAdornment from "@mui/material/InputAdornment";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import {
  Typography,
  Grid,
  TextField,
  Container,
  Select,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  Button,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

// Register ChartJS components
// ChartJS.register(ArcElement, Tooltip, Legend);

const DsciCalculator = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // Sample
  const [displayMonthlyIncomePayment, setdisplayMonthlyIncomePayment] =
    useState(0);
  const [totalProfitAnually, setTotalProfitAnnually] = useState(0);
  const [displayMonthly, setDisplayMonthly] = useState(0);
  const [displayTotalInterest, setDisplayTotalInterest] = useState(0);
  const [displayTotalPayment, setDisplayTotalPayment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [principalInterestData, setPrincipalInterestData] = useState([]);
  const [loanSubtype, setLoanSubtype] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [ltv, setLtv] = useState("");
  const [totalOperatingYearly, setTotalOepratingYearly] = useState(0);
  const [totalOperating2Digits, setTotalOperating2Digits] = useState(0);
  const [monthlyMortagePayment, setMonthlyMortagePayment] = useState("");
  const [selectedCreditScore, setSelectedCreditScore] = useState("");
  const [interestRate] = useState(7);
  const [amortizingPeriod] = useState(30);
  const [grossAnualincome, setGrossAnualincome] = useState(0);
  const [totalOperatingExpenses, setTotalOperatingExpenses] = useState(0);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState("");
  const [formDone, setformDone] = useState("");
  const [dscrValue, setDscrValue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [monthlyMarketRent, setMonthlyMarketRent] = useState("");
  // This is for the graph
  const [monthlyPayment, setmonthlyPayment] = useState("");
  const [totalPayment, settotalPayment] = useState("");
  const [interest, settotalInterest] = useState("");

  const [annualGrossRent, setAnnualGrossRent] = useState("");
  const [monthlyTaxes, setmonthlyTaxes] = useState("");
  const [monthlyInsurances, setmonthlyInsurances] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [monthlyHOAFee, setmonthlyHOAFee] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [monthlyOtherExpenses, setMonthlyOtherExpenses] = useState("");
  const [monthlyInterestPaymentDisplay, setMonthlyInterestPaymentDisplay] =
    useState("");

  useEffect(() => {
    calculateLoanAmount();
  }, [ltv, estimatedValue]);

  useEffect(() => {
    if (selectedCreditScore > 740) {
      setLtv("80");
    } else if (selectedCreditScore >= 720 && selectedCreditScore <= 739) {
      setLtv("75");
    } else if (selectedCreditScore >= 700 && selectedCreditScore <= 719) {
      setLtv("75");
    } else if (selectedCreditScore >= 680 && selectedCreditScore <= 699) {
      setLtv("70");
    } else if (selectedCreditScore >= 660 && selectedCreditScore <= 679) {
      setLtv("65");
    } else {
      setLtv("");
    }
  }, [selectedCreditScore]);

  useEffect(() => {
    setAnnualGrossRent((parseFloat(monthlyRent) || 0) * 12);
  }, [monthlyRent]);

  // Trigger live calculation when inputs change
  useEffect(() => {
    calculateLoan(); // Recalculate when any of the relevant values change
    setMonthlyInterestPaymentDisplay(calculateMonthlyPayment());
  }, [
    loanAmount,
    monthlyRent,
    monthlyTaxes,
    monthlyInsurances,
    monthlyHOAFee,
    monthlyOtherExpenses,
    selectedCreditScore,
    loanSubtype,
    estimatedValue,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example Axios POST request
    axios
      .post(
        "https://52.165.80.134:4000/api/calculatorContact/contact",
        formData
      )
      .then((response) => {
        toast.success("Thank you we have received your details");
        setShowModal(false);
        // Optionally close modal or show success message
      })
      .catch((error) => {
        toast.error("There was an error in submitting please try again later.");
        setShowModal(false);
      });
  };

  const calculateLoanAmount = () => {
    const ltvPercentage = parseFloat(ltv) / 100;
    const estimatedValueFloat = parseFloat(estimatedValue);
    if (!isNaN(ltvPercentage) && !isNaN(estimatedValueFloat)) {
      setLoanAmount((ltvPercentage * estimatedValueFloat).toFixed(2));
    } else {
      setLoanAmount("");
    }
  };

  const handleCreditScoreChange = (e) => {
    setSelectedCreditScore(e.target.value);
  };

  const calculateGrossAnnualIncome = () => {
    return (parseFloat(monthlyRent) || 0) * 12;
  };

  const calculateAnnualMarketIncome = () => {
    return (parseFloat(monthlyMarketRent) || 0) * 12;
  };

  const calculateTotalOperatingExpenses = () => {
    return (
      (parseFloat(monthlyInsurances * 12) || 0) +
      (parseFloat(monthlyHOAFee * 12) || 0) +
      (parseFloat(monthlyOtherExpenses * 12) || 0) +
      (parseFloat(monthlyTaxes * 12) || 0).toFixed(2)
    );
  };

  const calculateIOPeriodDebtService = () => {
    const rate = parseFloat(interestRate) / 100 / 12; // Convert interest rate to decimal and monthly rate
    return parseFloat(loanAmount) * rate || 0;
  };

  const calculateDSCR = () => {
    const income = calculateGrossAnnualIncome();
    const debt = calculateTotalOperatingExpenses();

    return income / debt;
  };
  const calculateAmortizingDebtService = () => {
    const rate = parseFloat(interestRate) / 100 / 12; // Convert interest rate to decimal and monthly rate
    const n = parseFloat(amortizingPeriod) * 12; // Convert years to months
    if (rate === 0) {
      return parseFloat(loanAmount) / n || 0; // Handling case where interest rate is zero
    }
    return (parseFloat(loanAmount) * rate) / (1 - Math.pow(1 + rate, -n)) || 0;
  };

  const calculateIOPITIA = () => {
    const ioDebtService = calculateIOPeriodDebtService();
    const operatingExpenses = calculateTotalOperatingExpenses();
    const grossIncome = calculateGrossAnnualIncome();
    return grossIncome > 0
      ? (ioDebtService + operatingExpenses) / grossIncome
      : 0;
  };

  const formatNumber = (num) => {
    if (isNaN(num)) return "0";

    // 1. Round the number to two decimal places
    let roundedNumber = Math.round(num * 100) / 100;

    // 2. Convert the number to a string
    let parts = roundedNumber.toString().split(".");

    // 3. Add commas to the integer part (thousands separator)
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 4. Ensure there are always two decimal places
    if (parts[1]) {
      parts[1] = parts[1].padEnd(2, "0"); // If decimal part exists, pad it to 2 digits
    } else {
      parts[1] = "00"; // If no decimal part, add ".00"
    }

    return parts.join(".");
  };

  const calculateLoan = () => {
    const fields = {
      loanAmount,
      monthlyRent,
      monthlyTaxes,
      monthlyInsurances,
      monthlyHOAFee,
      monthlyOtherExpenses,
      estimatedValue,
    };

    // Check if any fields are empty or zero
    const emptyFields = Object.keys(fields).filter(
      (key) => !fields[key] || fields[key] === 0
    );

    if (emptyFields.length > 0) {
      // Show a toast error message if any fields are empty or zero
      // toast.error(
      //   `Please fill in all required fields: ${emptyFields.join(", ")}`
      // );
      // Optional: Set border color to red for empty fields (if needed)
      emptyFields.forEach((field) => {
        // Example: Assuming you have a way to get the input field by its name or id
        // document.getElementById(field).style.borderColor = 'red';
      });
      return; // Exit the function to prevent further execution
    }
    // console.log(loanAmount);
    // console.log(interestRate);
    // console.log(loanTerm);
    setdisplayMonthlyIncomePayment(formatNumber(monthlyRent));
    const loanAmountFloat = loanAmount;
    const interestRateFloat = interestRate / 100;
    const termMonths = loanTerm * 12;

    const monthlyInterestRate = interestRateFloat / 12;
    // console.log("This is the monthly interest" + monthlyInterestRate);
    // console.log("This is the terms Months" + termMonths);
    // Calculate monthly payment
    const monthlyPayment =
      (loanAmountFloat *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths))) /
      (Math.pow(1 + monthlyInterestRate, termMonths) - 1);
    setDisplayMonthly(formatNumber(monthlyPayment));

    const totalPayment = monthlyPayment * termMonths;
    // console.log("This is the total payment" + totalPayment);

    const totalInterest = totalPayment - loanAmountFloat;
    // console.log("This is the total interest" + totalInterest);

    // Prepare data for the pie chart
    const data = [
      ["Category", "Amount"],
      ["Principal", totalPayment], // Fixed: Use loanAmountFloat for Principal
      ["Interest", totalInterest],
    ];

    // console.log(data);
    setChartData(data);
    setmonthlyPayment(monthlyPayment);
    settotalInterest(totalInterest);
    setDisplayTotalInterest(formatNumber(totalInterest));
    settotalPayment(totalPayment);
    setDisplayTotalPayment(formatNumber(totalPayment));
    // console.log(chartData);

    // Now we need to calculate the PITTA.
    ///// if converted to monthlyTaxes, take away the / 12.
    const monthlyTax = monthlyTaxes;
    const monthlyInsurance = monthlyInsurances;
    const monthlyHOA = monthlyHOAFee;
    const monthlyExpenses = monthlyOtherExpenses;

    const paymentIntrestTaxesInsurance =
      parseFloat(monthlyPayment) +
      parseFloat(monthlyTax) +
      parseFloat(monthlyInsurance) +
      parseFloat(monthlyExpenses) +
      parseFloat(monthlyHOA);

    // if converted to monthlyTaxes, multiply by 12.
    const yearlyCost =
      parseFloat(monthlyPayment * 12) +
      parseFloat(monthlyTaxes * 12) +
      parseFloat(monthlyInsurances * 12) +
      parseFloat(monthlyExpenses * 12) +
      parseFloat(monthlyHOAFee * 12);

    const dscr = monthlyRent / paymentIntrestTaxesInsurance;

    setDscrValue(dscr.toFixed(2));
    setTotalOperatingExpenses(formatNumber(paymentIntrestTaxesInsurance));
    setTotalOepratingYearly(formatNumber(yearlyCost));
    const monthlyPaymentValue = monthlyRent * 12;
    // set the gross annual
    setGrossAnualincome(formatNumber(monthlyPaymentValue));
    const totalProfit = monthlyRent - paymentIntrestTaxesInsurance;
    setTotalProfit(formatNumber(totalProfit));
    const convertYearly = totalProfit * 12;
    setTotalProfitAnnually(formatNumber(convertYearly));
  };

  const calculateMonthlyPayment = () => {
    if (!loanAmount || loanAmount <= 0) return 0; // Ensure a valid loan amount

    const principal = parseFloat(loanAmount.toString().replace(/,/g, "")) || 0; // Remove commas if present
    const monthlyRate = interestRate / 100 / 12; // Convert annual rate to monthly decimal
    const numPayments = loanTerm * 12; // Convert years to months

    if (monthlyRate === 0) return (principal / numPayments).toFixed(2); // Handle zero-interest cases

    // Mortgage formula: P * (r / (1 - (1 + r) ^ -n))
    const monthlyPayment =
      principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments)));

    return monthlyPayment.toFixed(2);
  };

  // // Example usage:
  // const loanAmount = 500000; // Example: $500,000 loan
  // const interestRate = 8; // Example: 8% annual interest rate
  // const loanTerm = 30; // Example: 30-year loan

  // console.log("Monthly Payment: $", calculateMonthlyPayment(loanAmount, interestRate, loanTerm));

  return (
    <div className="pt-12" style={{ marginBottom: 30 }}>
      <ToastContainer />
      <Container>
        <Typography
          variant="button"
          display="block"
          gutterBottom
          style={{ color: "#498dd6", fontSize: 24 }}
        >
          Rental DSCR Calculator
        </Typography>

        <Typography
          variant="body1"
          display="block"
          gutterBottom
          style={{ color: "grey", fontSize: 14 }}
        >
          Maximize Your Investment Potential with Our Rental DSCR Calculator{" "}
          <br />
          <br /> At Capital Velocity, we empower real estate investors with the
          financial tools needed to scale their portfolios. Our Rental DSCR
          (Debt Service Coverage Ratio) Calculator helps you assess whether your
          property generates enough income to cover its loan payments—giving you
          the confidence to secure financing and maximize returns. <br />
          <br /> Lenders prioritize DSCR when approving real estate investment
          loans. A higher DSCR means better loan terms, more purchasing power,
          and increased profitability. Use our DSCR Calculator to evaluate your
          next rental investment and take the next step toward financial growth.
          Invest smarter. Grow faster. Try our Rental DSCR Calculator today!
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ color: "grey", fontSize: 16 }}
            >
              Loan Values
            </Typography>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Loan Subtype ($){" "}
                    <Tooltip
                      title="The type of loan you're applying for (e.g., Single Property, 2 to 4 Units). This helps define the repayment structure and the interest rate over time."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <Select
                    value={loanSubtype}
                    onChange={(e) => setLoanSubtype(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value={"Single Property"}>
                      Single Property
                    </MenuItem>
                    <MenuItem value={"2 to 4 Units"}>2 to 4 Units</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <Typography
                  color="grey"
                  component="div"
                  sx={{ display: "inline-flex", alignItems: "center" }}
                >
                  Estimated As-Is Value ($){" "}
                  <Tooltip
                    title="The current market value of the property in its existing condition, before any renovations or improvements are made."
                    arrow
                    placement="top"
                  >
                    <InfoIcon
                      className="cursor-pointer"
                      sx={{
                        fontSize: 18,
                        color: "gray",
                        marginLeft: 1,
                        verticalAlign: "middle",
                      }} // Align icon vertically
                    />
                  </Tooltip>
                </Typography>{" "}
                <FormControl fullWidth>
                  <TextField
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Credit Score{" "}
                    <Tooltip
                      title="A numerical representation of your creditworthiness based on your credit history. It affects the interest rate and terms of your loan."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <Select
                    value={selectedCreditScore}
                    onChange={handleCreditScoreChange}
                    variant="outlined"
                  >
                    <MenuItem value={750}> 740 and Above </MenuItem>
                    <MenuItem value={730}> 720 - 739 </MenuItem>
                    <MenuItem value={710}> 700 - 719 </MenuItem>
                    <MenuItem value={690}> 680 - 699 </MenuItem>
                    <MenuItem value={670}> 660 - 679 </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    LTV Percentage (%){" "}
                    <Tooltip
                      title="The ratio of the loan amount to the appraised value of the property, expressed as a percentage. A higher LTV percentage indicates higher risk for lenders."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={ltv}
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Interest Rate (%){" "}
                    <Tooltip
                      title="The percentage of the loan amount charged by the lender for borrowing money, typically expressed as an annual percentage rate (APR). This rate impacts monthly payments and the total loan cost."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={7}
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Fully Amortizing Period (Years){" "}
                    <Tooltip
                      title="The time period over which the loan is fully paid off, including both principal and interest, with equal payments made throughout the term."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    disabled
                    value={30}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Loan Amount ($){" "}
                    <Tooltip
                      title="The total amount of money borrowed for the property purchase, which is typically based on the LTV and the estimated property value."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    onChange={(e) => setLoanAmount(e.target.value)}
                    value={loanAmount}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{
                      display: "flex", // Use flexbox to align the content
                      alignItems: "center", // Vertically align text and icon
                      justifyContent: "center", // Center both horizontally
                    }}
                  >
                    Monthly Interest Payment
                    <Tooltip
                      title="The portion of the annual or semi-annual property taxes that accrue each month."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  </Typography>

                  <Typography
                    className="text-center"
                    gutterBottom
                    style={{ color: "black", fontSize: 20, marginTop: 5 }}
                  >
                    ${monthlyInterestPaymentDisplay}
                  </Typography>
                </FormControl>
              </Grid>

              {/* <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">Monthly Mortage Payment</Typography>
                  <TextField
                    onChange={(e) => setMonthlyMortagePayment(e.target.value)}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>*/}

              <Grid item sm={12}>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ color: "grey", fontSize: 16, marginTop: 10 }}
                >
                  Income
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Rent ($){" "}
                    <Tooltip
                      title="The amount of rent received from tenants on a monthly basis. This is used to calculate your property's income for the purpose of evaluating debt service coverage."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              {/* <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Annual Gross Rent ($){" "}
                    <Tooltip
                      title="The total rental income generated by the property in a year, calculated as the sum of the monthly rent multiplied by 12."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    disabled
                    value={annualGrossRent}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid> */}
              <Grid item sm={12}>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ color: "grey", fontSize: 16, marginTop: 10 }}
                >
                  Expenses
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Taxes ($){" "}
                    <Tooltip
                      title="The total amount of property taxes owed on the property for the year. Property taxes are a recurring expense for property owners."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={monthlyTaxes}
                    onChange={(e) => setmonthlyTaxes(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Insurance ($){" "}
                    <Tooltip
                      title="The yearly cost of insurance coverage for the property, protecting against risks like fire, theft, or natural disasters."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={monthlyInsurances}
                    onChange={(e) => setmonthlyInsurances(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly HOA Fees ($){" "}
                    <Tooltip
                      title="The fees paid to a Homeowners Association (HOA) for property management and maintenance of shared community areas. This is typically applicable in properties within an HOA-governed community."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={monthlyHOAFee}
                    onChange={(e) => setmonthlyHOAFee(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Other Expenses ($){" "}
                    <Tooltip
                      title="The fees paid for various other expenses required."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={monthlyOtherExpenses}
                    onChange={(e) => setMonthlyOtherExpenses(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              {/* <Grid item sm={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={calculateLoan}
                  style={{
                    fontSize: "18px",
                    width: "100%",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                >
                  Calculate DSCR
                </Button>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Item>
              <Accordion expanded>
                <AccordionSummary>
                  <Typography variant="h6">Income</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Monthly Income: $ {displayMonthlyIncomePayment}
                  </Typography>

                  <Typography>
                    Gross Annual Income: $ {grossAnualincome}
                  </Typography>

                  {/*}
                  <Typography>
                    Annual Market Income: $
                    {calculateAnnualMarketIncome().toFixed(2)}
                  </Typography>
                  */}
                  {/* 
                  <Typography>
                    Annual Gross Rent: ${parseFloat(annualGrossRent).toFixed(2)}
                  </Typography>
                  */}
                </AccordionDetails>
              </Accordion>
              <Accordion expanded>
                <AccordionSummary>
                  <Typography variant="h6">Total Operating Expenses</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Total Operating Expenses Monthly: ${totalOperatingExpenses}
                  </Typography>
                  <Typography>
                    Total Operating Expenses Annual: ${totalOperatingYearly}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded>
                <AccordionSummary>
                  <Typography variant="h6">Total Profit Monthly</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Total Profit Monthly: ${totalProfit}</Typography>
                  <Typography>
                    Total Profit Annual: ${totalProfitAnually}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Paper
                variant="outlined"
                square
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: dscrValue > 1.1 ? "green" : "#f44336", // Corrected line
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">DSCR: {dscrValue}</Typography>
                <Typography>
                  {dscrValue >= 1.25 ? "It's go time!" : "DSCR is too low."}
                </Typography>
              </Paper>
            </Item>
          </Grid>
        </Grid>
        <Container></Container>
      </Container>
    </div>
  );
};

export default DsciCalculator;
