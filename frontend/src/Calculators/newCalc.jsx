import React, { useState, useEffect } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import {
  TextField,
  Grid,
  Typography,
  Slider,
  Select,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
  Modal,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

// OLD CALC VARIABLES

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

//

const FixandFlipCalc2 = () => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [rehabCost, setRehabCost] = useState(0);
  const [closingCost, setClosingCost] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [interestRate, setInterestRate] = useState(12);
  const [projectLength, setProjectLength] = useState(12); // 30 years in months
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyInterestPayment, setMonthlyInterestPayment] = useState(0);
  const [monthlyPropertyTaxes, setMonthlyPropertyTaxes] = useState(50);
  const [monthlyInsurance, setMonthlyInsurance] = useState(20);
  const [monthlyUtilityBills, setMonthlyUtilityBills] = useState(50);
  const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState(0);
  const [costOfSales, setCostOfSales] = useState(1);
  const [experienceLevel, setExperienceLevel] = useState(2);
  const [afterRepairValue, setAfterRepairValue] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setLoanAmount(purchasePrice + rehabCost);
  }, [purchasePrice, rehabCost]);

  const calculateMonthlyInterest = () => {
    if (
      purchasePrice <= 0 ||
      rehabCost <= 0 ||
      purchasePrice + rehabCost <= 0
    ) {
      return 0; // Return 0 if any input is invalid
    }
    const loanAmount = purchasePrice + rehabCost; // Total loan amount
    const monthlyInterestRate = interestRate / 100 / 12; // Monthly interest rate
    const totalPayments = projectLength * 12; // Total number of monthly payments (years * 12)

    console.log(monthlyInterestRate);
    // Monthly payment formula
    const monthlyPayment = loanAmount * monthlyInterestRate;

    return monthlyPayment.toFixed(2); // Return the result rounded to 2 decimal places
  };
  const marks = [
    { value: 0, label: "New" },
    { value: 1, label: "Beginner" },
    { value: 2, label: "Intermediate" },
    { value: 3, label: "Advanced" },
    { value: 4, label: "Experienced" },
  ];
  const calculateAnticipatedProfit = () => {
    const totalCost = calculateTotalCost();
    const anticipatedProfit = afterRepairValue - totalCost;
    return anticipatedProfit;
  };

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

  const calculateTotalCost = () => {
    const closingCostTotal = loanAmount * (closingCost / 100);
    const realtorFee = loanAmount * (costOfSales / 100);
    const monthsToYears = projectLength;
    const intrestAtRate = (interestRate / 100) * loanAmount;
    const intrestOverYears = intrestAtRate * projectLength;
    console.log(intrestOverYears);

    const totalCost =
      closingCostTotal +
      intrestOverYears +
      realtorFee +
      purchasePrice +
      rehabCost;
    //monthlyPropertyTaxes * monthsToYears +
    //monthlyInsurance * monthsToYears +
    //monthlyUtilityBills * monthsToYears +
    return totalCost.toFixed(2);
  };

  const totalCost = calculateTotalCost();
  const anticipatedProfit = calculateAnticipatedProfit();
  const profitPercentage = ((anticipatedProfit / totalCost) * 100).toFixed(2);
  const isDeal = profitPercentage >= 10;
  const profitBoxStyle = {
    backgroundColor: isDeal ? "green" : "#f44336",
    marginTop: 10,
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// OLD CALC VARIABLES

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
  const [amortizingPeriod] = useState(30);
  const [grossAnualincome, setGrossAnualincome] = useState(0);
  const [totalOperatingExpenses, setTotalOperatingExpenses] = useState(0);
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
  const [annualHoa, setAnnualHoa] = useState("");

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

  //////////

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
          Fix and Flip Calculator
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">Purchase Price</Typography>
                  <TextField
                    fullWidth
                    type="number"
                    style={{ backgroundColor: "white" }}
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <Typography color="grey">Rehab Cost</Typography>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    fullWidth
                    value={rehabCost}
                    onChange={(e) => setRehabCost(parseInt(e.target.value))}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">Interest Rate</Typography>
                  <TextField fullWidth value={interestRate} disabled />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">
                    Anticipated Length of Project
                  </Typography>
                  <TextField
                    disabled
                    fullWidth
                    value={projectLength} // Displaying in years
                    onChange={(e) => setProjectLength(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">Loan Amount</Typography>
                  <TextField
                    type="number"
                    fullWidth
                    value={loanAmount}
                    disabled
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography color="grey">After Repair Value</Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={afterRepairValue}
                    onChange={(e) =>
                      setAfterRepairValue(parseInt(e.target.value))
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Monthly Interest Payment
                  </Typography>
                  <Typography
                    className="text-center"
                    gutterBottom
                    style={{ color: "black", fontSize: 20, marginTop: 5 }}
                  >
                    ${calculateMonthlyInterest()}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Monthly Property Taxes
                  </Typography>

                  <Slider
                    value={monthlyPropertyTaxes}
                    min={50}
                    max={1000}
                    step={1}
                    onChange={(e, value) => setMonthlyPropertyTaxes(value)}
                    valueLabelDisplay="auto"
                  />

                  <Typography className="text-center" color="grey">
                    Selected: <strong>${monthlyPropertyTaxes}</strong>
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Monthly Insurance
                  </Typography>
                  <Slider
                    value={monthlyInsurance}
                    min={20}
                    max={250}
                    step={1}
                    onChange={(e, value) => setMonthlyInsurance(value)}
                    valueLabelDisplay="auto"
                  />

                  <Typography className="text-center" color="grey">
                    Selected: <strong>${monthlyInsurance}</strong>
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Monthly Utility Bills
                  </Typography>
                  <Slider
                    value={monthlyUtilityBills}
                    min={50}
                    max={500}
                    step={1}
                    onChange={(e, value) => setMonthlyUtilityBills(value)}
                    valueLabelDisplay="auto"
                  />

                  <Typography className="text-center" color="grey">
                    Selected: <strong>${monthlyUtilityBills}</strong>
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Other Monthly Expenses
                  </Typography>
                  <Slider
                    value={otherMonthlyExpenses}
                    min={0}
                    max={2000}
                    step={1}
                    onChange={(e, value) => setOtherMonthlyExpenses(value)}
                    valueLabelDisplay="auto"
                  />

                  <Typography className="text-center" color="grey">
                    Selected: <strong>${otherMonthlyExpenses}</strong>
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Realtor Fee
                  </Typography>
                  <Slider
                    value={costOfSales}
                    min={0}
                    max={20}
                    step={1}
                    onChange={(e, value) => setCostOfSales(value)}
                    valueLabelDisplay="auto"
                  />

                  <Typography className="text-center" color="grey">
                    Selected: <strong>{costOfSales}%</strong>
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Closing Cost
                  </Typography>
                  <Slider
                    value={closingCost}
                    min={0}
                    max={10}
                    step={1}
                    onChange={(e, value) => setClosingCost(value)}
                    valueLabelDisplay="auto"
                  />

                  <Typography className="text-center" color="grey">
                    Selected: <strong>{closingCost}%</strong>
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item sm={11}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Buyer Experience
                  </Typography>
                  <Slider
                    value={experienceLevel}
                    min={0}
                    max={4}
                    step={1}
                    marks={marks}
                    onChange={(e, value) => setExperienceLevel(value)}
                    valueLabelDisplay="auto"
                    aria-labelledby="experience-slider"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Item>
              <Box style={{ backgroundColor: "#498dd6", marginTop: 10 }}>
                <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="h5" color="white" gutterBottom>
                        Total Cost
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="h5" color="white" gutterBottom>
                        ${totalCost}
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
              <Box style={profitBoxStyle}>
                <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="h5" color="white" gutterBottom>
                        Anticipated Profit
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="h5" color="white" gutterBottom>
                        ${anticipatedProfit}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="white" gutterBottom>
                        {isDeal ? "It's a deal!" : "It's not a deal."}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="white" gutterBottom>
                        Profit Percentage:{" "}
                        {isNaN(profitPercentage) ? 0 : profitPercentage}%
                      </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ marginBottom: 10 }}>
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
                    </Grid>

                    {/* <Grid item xs={6} style={{ marginBottom: 10 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowModal(true)}
                        style={{
                          width: "56%",
                          height: "80%",
                          marginTop: "10px",
                        }}
                      >
                        Contact Us
                      </Button>
                    </Grid> */}
                  </Grid>
                </Container>
              </Box>
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

export default FixandFlipCalc2;
