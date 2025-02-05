import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Chart } from "react-google-charts";
import InputAdornment from "@mui/material/InputAdornment";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
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

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [annualTaxes, setAnnualTaxes] = useState("");
  const [annualInsurance, setAnnualInsurance] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [annualHoa, setAnnualHoa] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

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
      (parseFloat(annualInsurance) || 0) +
      (parseFloat(annualHoa) || 0) +
      (parseFloat(annualTaxes) || 0).toFixed(2)
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
      annualTaxes,
      annualInsurance,
      annualHoa,
      estimatedValue,
    };

    // Check if any fields are empty or zero
    const emptyFields = Object.keys(fields).filter(
      (key) => !fields[key] || fields[key] === 0
    );

    if (emptyFields.length > 0) {
      // Show a toast error message if any fields are empty or zero
      toast.error(
        `Please fill in all required fields: ${emptyFields.join(", ")}`
      );
      // Optional: Set border color to red for empty fields (if needed)
      emptyFields.forEach((field) => {
        // Example: Assuming you have a way to get the input field by its name or id
        // document.getElementById(field).style.borderColor = 'red';
      });
      return; // Exit the function to prevent further execution
    }
    console.log(loanAmount);
    console.log(interestRate);
    console.log(loanTerm);
    setdisplayMonthlyIncomePayment(formatNumber(monthlyRent));
    const loanAmountFloat = loanAmount;
    const interestRateFloat = interestRate / 100;
    const termMonths = loanTerm * 12;

    const monthlyInterestRate = interestRateFloat / 12;
    console.log("This is the monthly interest" + monthlyInterestRate);
    console.log("This is the terms Months" + termMonths);
    // Calculate monthly payment
    const monthlyPayment =
      (loanAmountFloat *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths))) /
      (Math.pow(1 + monthlyInterestRate, termMonths) - 1);
    setDisplayMonthly(formatNumber(monthlyPayment));

    const totalPayment = monthlyPayment * termMonths;
    console.log("This is the total payment" + totalPayment);

    const totalInterest = totalPayment - loanAmountFloat;
    console.log("This is the total interest" + totalInterest);

    // Prepare data for the pie chart
    const data = [
      ["Category", "Amount"],
      ["Principal", totalPayment], // Fixed: Use loanAmountFloat for Principal
      ["Interest", totalInterest],
    ];

    console.log(data);
    setChartData(data);
    setmonthlyPayment(monthlyPayment);
    settotalInterest(totalInterest);
    setDisplayTotalInterest(formatNumber(totalInterest));
    settotalPayment(totalPayment);
    setDisplayTotalPayment(formatNumber(totalPayment));
    console.log(chartData);

    // Now we need to calculate the PITTA.
    const monthlyTax = annualTaxes / 12;
    const monthlyInsurance = annualInsurance / 12;
    const monthlyHOA = annualHoa / 12;

    const paymentIntrestTaxesInsurance =
      parseFloat(monthlyPayment) +
      parseFloat(monthlyTax) +
      parseFloat(monthlyInsurance) +
      parseFloat(monthlyHOA);
    const yearlyCost =
      parseFloat(monthlyPayment * 12) +
      parseFloat(annualTaxes) +
      parseFloat(annualInsurance) +
      parseFloat(annualHoa);

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

  return (
    <div style={{ marginBottom: 30 }}>
      <ToastContainer />
      <Container>
        <Typography
          variant="button"
          display="block"
          gutterBottom
          style={{ color: "#498dd6", fontSize: 24 }}
        >
          DSCR Calculator
        </Typography>
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
                  <Typography color="grey">Loan Subtype</Typography>
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
                <Typography color="grey">Estimated As-Is Value</Typography>
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
                  <Typography color="grey">Credit Score</Typography>
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
                  <Typography color="grey">LTV Percentage</Typography>
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
                  <Typography color="grey">
                    Note Interest Rate <bold>(rates change daily)</bold>
                  </Typography>
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
                  <Typography color="grey">
                    Fully Amortizing Period (Years)
                  </Typography>
                  <TextField
                    disabled
                    value={30}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">Loan Amount</Typography>
                  <TextField
                    onChange={(e) => setLoanAmount(e.target.value)}
                    value={loanAmount}
                    variant="outlined"
                  />
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
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">Monthly Rent</Typography>
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
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">Annual Gross Rent</Typography>
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
              </Grid>
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
                  <Typography color="grey">Annual Taxes</Typography>
                  <TextField
                    value={annualTaxes}
                    onChange={(e) => setAnnualTaxes(e.target.value)}
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
                  <Typography color="grey">Annual Insurance</Typography>
                  <TextField
                    value={annualInsurance}
                    onChange={(e) => setAnnualInsurance(e.target.value)}
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
                  <Typography color="grey">Annual HOA Fees</Typography>
                  <TextField
                    value={annualHoa}
                    onChange={(e) => setAnnualHoa(e.target.value)}
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
              </Grid>
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
                    Gross Annual Income: $ {grossAnualincome}
                  </Typography>

                  <Typography>
                    Monthly Income: $ {displayMonthlyIncomePayment}
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
                </AccordionDetails>
                <AccordionDetails>
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
                  {dscrValue > 1.1 ? "It's go time!" : "DSCR is too low."}
                </Typography>
              </Paper>
              <Accordion expanded>
                <AccordionSummary>
                  <Typography variant="h6">Loan Debt Service</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* */}
                  {monthlyPayment && (
                    <Typography>Monthly Payment $: {displayMonthly}</Typography>
                  )}
                  {totalPayment && (
                    <Typography>
                      Total Payment $: {displayTotalPayment}
                    </Typography>
                  )}
                  {interest && (
                    <Typography>
                      Total Interest $: {displayTotalInterest}
                    </Typography>
                  )}
                  {/*
                  <Typography>
                    IO Period PITIA DSCR: {calculateIOPITIA().toFixed(2)}
                  </Typography>
                  */}
                  {/* 
                  <Typography>
                    Fully Amortizing Debt Service: $
                    {calculateAmortizingDebtService().toFixed(2)}
                  </Typography>
                  */}
                  {chartData && chartData.length > 0 ? (
                    <Chart
                      chartType="PieChart"
                      width="100%"
                      height="400px"
                      data={chartData}
                      options={{
                        title: "Loan Breakdown",
                        pieHole: 0.4,
                        is3D: false,
                      }}
                    />
                  ) : (
                    <div>Click Calculate Loan to see results...</div> // You can replace this with a spinner or placeholder if you prefer
                  )}
                  {/* <Typography>
                    Fully Amortizing PITIA DSCR:{" "}
                    {calculateAmortizingPITIA().toFixed(2)}
                  </Typography> */}

                  <Button
                    variant="contained"
                    onClick={() => setShowModal(true)}
                    style={{
                      backgroundColor: "#498dd6",
                      borderRadius: "30px",
                      marginTop: "10px",
                    }}
                  >
                    Contact Us
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Item>
          </Grid>
        </Grid>
        <Container></Container>
      </Container>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="contact-us-modal"
        aria-describedby="contact-us-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#498dd6",
                    borderRadius: "30px",
                    color: "white",
                  }}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DsciCalculator;
