import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Container,
  Grid,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { ToastContainer } from "react-toastify";
import { useWindowSize } from "react-use";

const OptimizerCalculator = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // Sample
  const [ltv, setLtv] = useState(0);
  const [selectedCreditScore, setSelectedCreditScore] = useState("");
  const [interestRate] = useState(7);
  const [amortizingPeriod] = useState(30);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState(30);
  const [dscrValue, setDscrValue] = useState(0);
  const [prevIsDeal, setPrevIsDeal] = useState(false); // Track previous state

  const isDeal = dscrValue >= 1.25;

  useEffect(() => {
    if (!prevIsDeal && isDeal) {
      // Trigger confetti when switching from "Not a deal" to "It's a deal!"
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 3 seconds
    }
    setPrevIsDeal(isDeal);
  }, [isDeal]);

  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

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

  const handleCreditScoreChange = (e) => {
    setSelectedCreditScore(e.target.value);
  };

  const profitBoxStyle = {
    backgroundColor: isDeal ? "green" : "#f44336",
    marginTop: 10,
  };

  ////////////////////////////////////////////////////////////////////////////////

  // User inputs: down payment and monthly operating expenses
  const [downPayment, setDownPayment] = useState("");
  const [monthlyTaxesCalc, setMonthlyTaxesCalc] = useState("");
  const [monthlyInsurance, setMonthlyInsurance] = useState("");
  const [monthlyHOAFees, setMonthlyHOAFees] = useState("");
  const [monthlyOtherExpensesCalc, setMonthlyOtherExpensesCalc] = useState("");

  const [operatingExpenses, setOperatingExpenses] = useState(0);
  const [results, setResults] = useState([]);

  const mortgagePayment = (principal, rate, years) => {
    let monthlyRate = rate / 100 / 12;
    let numPayments = years * 12;
    if (rate === 0) return principal / numPayments;
    return (
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
    );
  };

  const calculateDSCR = () => {
    // console.log("Calculating DSCR...");

    // Ensure numeric values
    const cleanDownPayment = parseFloat(downPayment.replace(/,/g, "")) || 0;
    const cleanMonthlyTaxesCalc =
      parseFloat(monthlyTaxesCalc.replace(/,/g, "")) || 0;
    const cleanMonthlyInsurance =
      parseFloat(monthlyInsurance.replace(/,/g, "")) || 0;
    const cleanMonthlyHOAFees =
      parseFloat(monthlyHOAFees.replace(/,/g, "")) || 0;
    const cleanMonthlyOtherExpensesCalc =
      parseFloat(monthlyOtherExpensesCalc.replace(/,/g, "")) || 0;

    // Calculate total operating expenses
    const totalOperatingExpenses =
      cleanMonthlyTaxesCalc +
      cleanMonthlyInsurance +
      cleanMonthlyHOAFees +
      cleanMonthlyOtherExpensesCalc;

    setOperatingExpenses(totalOperatingExpenses);

    // console.log("cleanDownPayment: ", cleanDownPayment);
    // console.log("cleanMonthlyTaxesCalc: ", cleanMonthlyTaxesCalc);
    // console.log("cleanMonthlyInsurance: ", cleanMonthlyInsurance);
    // console.log("cleanMonthlyHOAFees: ", cleanMonthlyHOAFees);
    // console.log(
    //   "cleanMonthlyOtherExpensesCalc: ",
    //   cleanMonthlyOtherExpensesCalc
    // );

    // // LTV-based calculations
    // const ltvValues = {
    //   800: 0.85,
    //   780: 0.8,
    //   750: 0.78,
    //   720: 0.75,
    //   700: 0.73,
    //   680: 0.7,
    //   660: 0.68,
    //   640: 0.65,
    // };

    // console.log("ltv: ", Number(ltv));

    const numericLtv = Number(ltv) / 100; // Convert LTV from a percentage string to a decimal

    // let ltvPercentage = ltvValues[selectedCreditScore] || 0.75;

    // console.log("ltvpercentage: ", ltvPercentage);

    let maxLoanAmount = cleanDownPayment / (1 - numericLtv);
    let loanAmount = maxLoanAmount * numericLtv;
    let purchasePrice = maxLoanAmount;

    // Calculate mortgage payment
    let monthlyMortgage = mortgagePayment(loanAmount, interestRate, loanTerm);

    // Minimum required rent to meet DSCR
    let minRequiredRent = (monthlyMortgage + totalOperatingExpenses) * 1.1;

    // DSCR calculation
    let dscr = minRequiredRent / (monthlyMortgage + totalOperatingExpenses);

    // Set results
    setResults({
      purchasePrice,
      loanAmount,
      monthlyMortgage,
      minRequiredRent,
      totalOperatingExpenses,
      dscr,
    });

    // console.log("results: ", results);

    setDscrValue(dscr);
  };

  // Trigger DSCR calculation when inputs change
  useEffect(() => {
    calculateDSCR();
  }, [
    downPayment,
    monthlyTaxesCalc,
    monthlyInsurance,
    monthlyHOAFees,
    monthlyOtherExpensesCalc,
    selectedCreditScore,
    ltv,
  ]);

  //////////////////////////////////////////////////////////////////////////////// New

  return (
    <div className="pt-12" style={{ marginBottom: 30 }}>
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
      <Container>
        <Typography
          variant="button"
          display="block"
          gutterBottom
          style={{ color: "#498dd6", fontSize: 24 }}
        >
          Rental DSCR Optimizer
        </Typography>

        <Typography
          variant="body1"
          display="block"
          gutterBottom
          style={{ color: "black", fontSize: 14 }}
        >
          Rental DSCR Optimizer – Maximize Your Loan Eligibility <br /> <br />{" "}
          The Rental DSCR Optimizer is designed to help investors fine-tune
          estimated as-is value and rental income to achieve an acceptable Debt
          Service Coverage Ratio (DSCR) while maintaining an affordable down
          payment. This powerful tool enables investors to determine the maximum
          property value and minimum required rent needed to secure loan
          approval based on available cash for the down payment. <br />
          <br />
          Key Features:
          <br />
          ✅ Target DSCR Optimization – Identify the ideal estimated as-is value
          and rental income required to meet lender DSCR thresholds. <br />
          ✅ Expense & Loan Customization – Adjust operating expenses, loan
          terms, and financing structures to optimize DSCR and improve loan
          eligibility. <br />
          ✅ What-If Scenarios – Explore different property valuations, rental
          pricing models, and down payment strategies to assess their impact on
          DSCR. <br />
          <br /> Ensure your investment strategy aligns with lender requirements
          and maximize your financing potential. Try the Rental DSCR Optimizer
          today! 🚀
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid container spacing={2}>
          {/* <div>
            <h2>DSCR Calculator</h2>
            <h3>DSCR = 1.1 | Interest Rate = 7% | 30-year Loan</h3>

            <div>
              <label>
                Down Payment: $
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Monthly Taxes: $
                <input
                  type="number"
                  value={monthlyTaxesCalc}
                  onChange={(e) => setMonthlyTaxesCalc(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Monthly Insurance: $
                <input
                  type="number"
                  value={monthlyInsurance}
                  onChange={(e) => setMonthlyInsurance(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Monthly HOA Fees: $
                <input
                  type="number"
                  value={monthlyHOAFees}
                  onChange={(e) => setMonthlyHOAFees(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Monthly Other Expenses: $
                <input
                  type="number"
                  value={monthlyOtherExpensesCalc}
                  onChange={(e) => setMonthlyOtherExpensesCalc(e.target.value)}
                />
              </label>
            </div>

            {results && !results.error && (
              <div>
                <p>
                  <strong>Maximum Purchase Price:</strong> $
                  {results.purchasePrice.toFixed(2)}
                </p>
                <p>
                  <strong>Monthly Rent Income Needed for DSCR ≥ 1.1:</strong> $
                  {results.monthlyRentNeeded.toFixed(2)}
                </p>
              </div>
            )}
            {results && results.error && (
              <p style={{ color: "red" }}>{results.error}</p>
            )}
          </div> */}

          <Grid item xs={12} sm={6}>
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ color: "black", fontSize: 16 }}
            >
              Loan Values
            </Typography>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
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
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Down Payment ($){" "}
                    <Tooltip
                      title="The down payment required to make this deal."
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
                    type="text" // Change to "text" because we will handle the number formatting ourselves
                    fullWidth
                    value={downPayment}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                      if (value) {
                        // Format the number with commas
                        value = new Intl.NumberFormat().format(value);
                      }
                      setDownPayment(value); // Set the formatted value with commas
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Typography
                  color="black"
                  component="div"
                  sx={{ display: "inline-flex", alignItems: "center" }}
                >
                  Purchase Price ($){" "}
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
                    type="text"
                    fullWidth
                    value={
                      results && !results.error
                        ? results.purchasePrice.toFixed(2)
                        : "0.00"
                    }
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Amortizing Period (Years){" "}
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

              {/* <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
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
                    type="text" // Change type to "text" to allow formatted string
                    fullWidth
                    value={`${Number(loanAmount).toLocaleString("en-US", {})}`}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    disabled
                  />
                </FormControl>
              </Grid> */}

              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
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
              </Grid> */}
              {/* Income Column */}
              {/* <Grid item xs={12} sm={6}>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ color: "black", fontSize: 16, marginTop: 10 }}
                >
                  Income
                </Typography>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Rent ($)
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
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={
                      results && !results.error
                        ? results.monthlyRentNeeded.toFixed(2)
                        : "0.00"
                    }
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid> */}

              {/* Expenses Column */}
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ color: "black", fontSize: 16, marginTop: 10 }}
                >
                  Expenses
                </Typography>
                {/* Monthly Taxes */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Taxes ($)
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
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={monthlyTaxesCalc}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value) {
                        value = new Intl.NumberFormat().format(value);
                      }
                      setMonthlyTaxesCalc(value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                {/* Monthly Insurance */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Insurance ($)
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
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={monthlyInsurance}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value) {
                        value = new Intl.NumberFormat().format(value);
                      }
                      setMonthlyInsurance(value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                {/* Monthly HOA Fees */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly HOA Fees ($)
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
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={monthlyHOAFees}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value) {
                        value = new Intl.NumberFormat().format(value);
                      }
                      setMonthlyHOAFees(value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                {/* Monthly Other Expenses */}
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Other Expenses ($)
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
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={monthlyOtherExpensesCalc}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value) {
                        value = new Intl.NumberFormat().format(value);
                      }
                      setMonthlyOtherExpensesCalc(value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              <Box style={{ backgroundColor: "#498dd6", marginTop: 10 }}>
                <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Maximum Purchase Price:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {results.purchasePrice
                          ? results.purchasePrice.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })
                          : "0.00"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Loan Amount:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {results.loanAmount
                          ? results.loanAmount.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })
                          : "0.00"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Monthly Mortgage:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {results.monthlyMortgage
                          ? results.monthlyMortgage.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })
                          : "0.00"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Operating Expenses:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {results.totalOperatingExpenses
                          ? results.totalOperatingExpenses.toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            )
                          : "0.00"}{" "}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="h5" color="white" gutterBottom>
                        Minimum Required Rent for DSCR ≥ 1.1:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="h5" color="white" gutterBottom>
                        $
                        {results.minRequiredRent
                          ? results.minRequiredRent.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })
                          : "0.00"}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Monthly Rent Income Needed for DSCR ≥ 1.1:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {results.minRequiredRent
                          ? results.minRequiredRent.toFixed(2)
                          : "0.00"}
                      </Typography>
                    </Grid>
                  </Grid> */}

                  {/* <Grid container spacing={2}>
                    {results && results.hasCalculated && results.error && (
                      <Grid item xs={12}>
                        <Typography variant="body1" style={{ color: "red" }}>
                          {results.error}
                        </Typography>
                      </Grid>
                    )}
                  </Grid> */}

                  {/* <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Net Operating Income
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {Number(netOperatingIncome).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Grid>
                  </Grid> */}
                </Container>
              </Box>
              {/* <Box style={profitBoxStyle}>
                <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="white">
                        DSCR: {dscrValue}{" "}
                      </Typography>

                      <Typography variant="h2" color="white" gutterBottom>
                        {dscrValue >= 1.1
                          ? "It's go time!"
                          : "DSCR is too low."}{" "}
                        <Tooltip
                          title="A DSCR score below 1.1 is considered very weak and suggests that a company owes more money to creditors (per year) than it generates in cash per year. Most commercial banks and equipment finance firms want to see a minimum of 1.25x but strongly prefer something closer to 2x or more."
                          arrow
                          placement="top"
                        >
                          <InfoIcon
                            className="cursor-pointer"
                            sx={{
                              fontSize: 18,
                              color: "",
                              marginBottom: 0.5,
                              verticalAlign: "middle",
                            }} // Align icon vertically
                          />
                        </Tooltip>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (firstnameCookie) {
                            window.location.href =
                              "/loan-form-realestate?type=RentalPortfolios";
                          } else {
                            window.location.href = "/register";
                          }
                        }}
                        style={{
                          backgroundColor: "#498dd6",
                          borderRadius: "30px",
                          marginTop: "10px",
                        }}
                      >
                        Apply Now
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </Box> */}
            </Item>
          </Grid>
        </Grid>
        <Container></Container>
      </Container>
    </div>
  );
};

export default OptimizerCalculator;
