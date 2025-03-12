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

  // States for Inputs
  const [inputType, setInputType] = useState("downPayment"); // "downPayment" or "maxPurchasePrice"
  const [maxPurchasePrice, setMaxPurchasePrice] = useState("");

  // Calculate Loan Amount & Down Payment Based on User Input
  const calculateLoanAndPurchasePrice = () => {
    const numericLtv = Number(ltv) / 100;

    let loanAmount = 0;
    let purchasePrice = 0;
    let requiredDownPayment = 0;

    if (inputType === "downPayment") {
      const cleanDownPayment = parseFloat(downPayment.replace(/,/g, "")) || 0;
      purchasePrice = cleanDownPayment / (1 - numericLtv);
      loanAmount = purchasePrice * numericLtv;
    } else {
      const cleanMaxPurchasePrice =
        parseFloat(maxPurchasePrice.replace(/,/g, "")) || 0;
      purchasePrice = cleanMaxPurchasePrice;
      loanAmount = purchasePrice * numericLtv;
      requiredDownPayment = purchasePrice * (1 - numericLtv);
    }

    return { loanAmount, purchasePrice, requiredDownPayment };
  };

  // Mortgage Calculation
  const mortgagePayment = (principal, rate, years) => {
    let monthlyRate = rate / 100 / 12;
    let numPayments = years * 12;
    if (rate === 0) return principal / numPayments;
    return (
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
    );
  };

  // DSCR Calculation
  const calculateDSCR = () => {
    const { loanAmount, purchasePrice, requiredDownPayment } =
      calculateLoanAndPurchasePrice();

    // Convert expense inputs to numbers
    const cleanMonthlyTaxes =
      parseFloat(monthlyTaxesCalc.replace(/,/g, "")) || 0;
    const cleanMonthlyInsurance =
      parseFloat(monthlyInsurance.replace(/,/g, "")) || 0;
    const cleanMonthlyHOAFees =
      parseFloat(monthlyHOAFees.replace(/,/g, "")) || 0;
    const cleanMonthlyOtherExpenses =
      parseFloat(monthlyOtherExpensesCalc.replace(/,/g, "")) || 0;

    const totalOperatingExpenses =
      cleanMonthlyTaxes +
      cleanMonthlyInsurance +
      cleanMonthlyHOAFees +
      cleanMonthlyOtherExpenses;

    setOperatingExpenses(totalOperatingExpenses);

    // Calculate mortgage payment
    let monthlyMortgage = mortgagePayment(loanAmount, interestRate, loanTerm);

    // Minimum required rent for DSCR ≥ 1.1
    let minRequiredRent = (monthlyMortgage + totalOperatingExpenses) * 1.1;

    // DSCR Calculation
    let dscr = minRequiredRent / (monthlyMortgage + totalOperatingExpenses);

    // ✅ Include requiredDownPayment in setResults
    setResults({
      purchasePrice,
      loanAmount,
      monthlyMortgage,
      minRequiredRent,
      totalOperatingExpenses,
      dscr,
      requiredDownPayment, // ✅ Fix: Now stored in results state
    });

    setDscrValue(dscr);
  };

  // Recalculate when inputs change
  useEffect(() => {
    calculateDSCR();
  }, [
    downPayment,
    maxPurchasePrice,
    monthlyTaxesCalc,
    monthlyInsurance,
    monthlyHOAFees,
    monthlyOtherExpensesCalc,
    selectedCreditScore,
    ltv,
    inputType,
  ]);

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
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Typography>Choose Input Type:</Typography>
                  <Select
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    style={{ marginBottom: 10 }}
                  >
                    <MenuItem value="downPayment">Down Payment</MenuItem>
                    <MenuItem value="maxPurchasePrice">
                      Maximum Purchase Price
                    </MenuItem>
                  </Select>
                </FormControl>
                <Divider style={{ color: "black", marginBottom: 10 }} />

                {/* Conditional Input Fields */}
                {inputType === "downPayment" ? (
                  <>
                    <Typography
                      color="black"
                      component="div"
                      sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                      Down Payment{" "}
                      <Tooltip
                        title="The maximum amount you can pay for the property based on loan and down payment constraints."
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
                    </Typography>{" "}
                    <TextField
                      fullWidth
                      value={downPayment}
                      onChange={(e) =>
                        setDownPayment(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Typography
                      color="black"
                      component="div"
                      sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                      Maximum Purchase Price{" "}
                      <Tooltip
                        title="The maximum amount you can pay for the property based on loan and down payment constraints."
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
                    </Typography>{" "}
                    <TextField
                      fullWidth
                      value={maxPurchasePrice}
                      onChange={(e) =>
                        setMaxPurchasePrice(
                          e.target.value.replace(/[^0-9]/g, "")
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}

                {/* <FormControl fullWidth>
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
                </FormControl> */}
              </Grid>
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
                    {/* Dynamically Change Label Based on Input Type */}
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        {inputType === "maxPurchasePrice"
                          ? "Required Down Payment"
                          : "Maximum Purchase Price"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {inputType === "maxPurchasePrice"
                          ? results.requiredDownPayment
                            ? results.requiredDownPayment.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              )
                            : "0.00"
                          : results.purchasePrice
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
                          : "0.00"}
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
                </Container>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Container></Container>
      </Container>
    </div>
  );
};

export default OptimizerCalculator;
