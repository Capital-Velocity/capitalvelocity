import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Slider,
  TextField,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const FixandFlipCalc = () => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [rehabCost, setRehabCost] = useState(0);
  const [interestRate, setInterestRate] = useState(12);
  const [projectLength, setProjectLength] = useState(12); // 30 years in months
  const [loanAmount, setLoanAmount] = useState(0);
  const [afterRepairValue, setAfterRepairValue] = useState(0);
  const [monthlyInterestPayment, setMonthlyInterestPayment] = useState(0);
  const [monthlyPropertyTaxes, setMonthlyPropertyTaxes] = useState(50);
  const [monthlyInsurance, setMonthlyInsurance] = useState(20);
  const [monthlyUtilityBills, setMonthlyUtilityBills] = useState(50);
  const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState(0);
  const [costOfSales, setCostOfSales] = useState(1);
  const [downPaymentListed, setDownPaymentListed] = useState(0);

  const [closingCost, setClosingCost] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [experienceLevel, setExperienceLevel] = useState(90);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [prevIsDeal, setPrevIsDeal] = useState(false); // Track previous state
  const { width, height } = useWindowSize();

  const [closingCosts, setClosingCosts] = useState(0);
  const [carryingCosts, setCarryingCosts] = useState(0);
  const [borrowerEquityNeeded, setBorrowerEquityNeeded] = useState(0);
  const [totalCashInDeal, setTotalCashInDeal] = useState(0);

  useEffect(() => {
    setClosingCosts(calculateClosingCosts());
    setCarryingCosts(calculateCarryingCosts());
    setBorrowerEquityNeeded(calculateBorrowerEquityNeeded());
    setTotalCashInDeal(calculateTotalCashInDeal());
  }, [
    loanAmount,
    closingCost,
    downPaymentListed,
    projectLength,
    interestRate,
    monthlyPropertyTaxes,
    monthlyInsurance,
    monthlyUtilityBills,
    otherMonthlyExpenses,
    costOfSales,
  ]);

  useEffect(() => {
    setLoanAmount(calculateLoanAmount());
  }, [purchasePrice, rehabCost, experienceLevel]);

  useEffect(() => {
    setMonthlyInterestPayment(calculateMonthlyInterestPayment());
  }, [loanAmount, experienceLevel, interestRate]);

  useEffect(() => {
    setDownPaymentListed(calculateDownPayment());
  }, [purchasePrice, rehabCost, experienceLevel]);

  const calculateCarryingCosts = () => {
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12; // Convert annual interest rate to monthly
    const interestCost =
      (monthlyInterestRate * parseFloat(loanAmount) || 0) *
      parseFloat(projectLength);

    return (
      interestCost +
      (parseFloat(monthlyPropertyTaxes) || 0) * parseFloat(projectLength) +
      (parseFloat(monthlyInsurance) || 0) * parseFloat(projectLength) +
      (parseFloat(monthlyUtilityBills) || 0) * parseFloat(projectLength) +
      (parseFloat(otherMonthlyExpenses) || 0) * parseFloat(projectLength)
    ).toFixed(2);
  };

  const calculateClosingCosts = () => {
    return (
      parseFloat(loanAmount) * 0.02 +
      parseFloat(loanAmount) * parseFloat(closingCost || 0)
    ).toFixed(2);
  };

  const calculateBorrowerEquityNeeded = () => {
    return (
      parseFloat(downPaymentListed || 0) + parseFloat(calculateClosingCosts())
    ).toFixed(2);
  };

  const calculateTotalCashInDeal = () => {
    return (
      parseFloat(calculateCarryingCosts()) +
      parseFloat(calculateClosingCosts()) * 2 +
      parseFloat(costOfSales || 0)
    ).toFixed(2);
  };

  const marks = [
    { value: 70, label: "New" },
    { value: 75, label: "Beginner" },
    { value: 80, label: "Intermediate" },
    { value: 85, label: "Advanced" },
    { value: 90, label: "Experienced" },
  ];

  // const [values, setValues] = useState({
  //   purchasePrice: "",
  //   rehabCost: "",
  //   interestRate: "",
  //   projectLength: "",
  //   afterRepairValue: "",
  //   monthlyTaxes: "",
  //   monthlyInsurance: "",
  //   monthlyUtilities: "",
  //   otherMonthlyExpenses: "",
  //   realtorFee: "",
  //   closingCost: "",
  //   ltv: "",
  // });

  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const calculateLoanAmount = () => {
    return (
      (parseFloat(purchasePrice) || 0) + (parseFloat(rehabCost) || 0)
    ).toFixed(2);
  };

  const calculateDownPayment = () => {
    return (
      (parseFloat(purchasePrice) || 0) -
      (parseFloat(purchasePrice) || 0) *
        ((parseFloat(experienceLevel) || 0) / 100)
    ).toFixed(2);
  };

  const calculateCostsAndProfit = () => {
    const totalMonthlyCosts =
      (parseFloat(monthlyPropertyTaxes) || 0) +
      (parseFloat(monthlyInsurance) || 0) +
      (parseFloat(monthlyUtilityBills) || 0) +
      (parseFloat(otherMonthlyExpenses) || 0);

    const totalHoldingCost =
      totalMonthlyCosts * (parseFloat(projectLength) || 0);
    const totalInvestment =
      (parseFloat(purchasePrice) || 0) +
      (parseFloat(rehabCost) || 0) +
      totalHoldingCost;

    const sellingCosts =
      ((parseFloat(costOfSales) || 0) / 100) *
        (parseFloat(afterRepairValue) || 0) +
      ((parseFloat(closingCost) || 0) / 100) *
        (parseFloat(afterRepairValue) || 0);

    const totalCost = totalInvestment + sellingCosts;
    const anticipatedProfit = (parseFloat(afterRepairValue) || 0) - totalCost;
    const profitPercentage = ((anticipatedProfit / totalCost) * 100).toFixed(2);

    return {
      totalCost: totalCost.toFixed(2),
      anticipatedProfit: anticipatedProfit.toFixed(2),
      profitPercentage,
    };
  };

  const calculateMonthlyInterestPayment = () => {
    const loanAmountValue = parseFloat(calculateLoanAmount()) || 0;
    const interestRatePercentage = (parseFloat(interestRate) || 0) / 100;
    return ((loanAmount * interestRatePercentage) / 12).toFixed(2);
  };

  const { totalCost, anticipatedProfit, profitPercentage } =
    calculateCostsAndProfit();
  // setLoanAmount(calculateLoanAmount());
  const downPayment = calculateDownPayment();
  // setMonthlyInterestPayment(calculateMonthlyInterestPayment());

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

  const isDeal = profitPercentage >= 10;

  useEffect(() => {
    if (!prevIsDeal && isDeal) {
      // Trigger confetti when switching from "Not a deal" to "It's a deal!"
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 3 seconds
    }
    setPrevIsDeal(isDeal);
  }, [isDeal]);

  const [showConfetti, setShowConfetti] = useState(false);

  const profitBoxStyle = {
    backgroundColor: isDeal ? "green" : "#f44336",
    marginTop: 10,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
          Fix and Flip Calculator
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Purchase Price ($){" "}
                    <Tooltip
                      title="How much you pay for a property. For single family and multi-family homes, the purchase price includes the property itself and the land the property is on."
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
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    style={{ backgroundColor: "white" }}
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input[type='number']": {
                        "-webkit-appearance": "none",
                        "-moz-appearance": "textfield",
                        appearance: "none",
                      },
                      "& input::-webkit-outer-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                      "& input::-webkit-inner-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <Typography
                  color="grey"
                  component="div"
                  sx={{ display: "inline-flex", alignItems: "center" }}
                >
                  Rehab Cost ($){" "}
                  <Tooltip
                    title="Costs associated with renovating the property. Rehab costs should include both cost of materials and labor."
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
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    fullWidth
                    value={rehabCost}
                    onChange={(e) => setRehabCost(parseInt(e.target.value))}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input[type='number']": {
                        "-webkit-appearance": "none",
                        "-moz-appearance": "textfield",
                        appearance: "none",
                      },
                      "& input::-webkit-outer-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                      "& input::-webkit-inner-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                    }}
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
                    Interest Rate* (%){" "}
                    <Tooltip
                      title={
                        <span>
                          * Subject to change daily
                          <br />
                          <br />
                          The interest rate associated with borrowing money to
                          fix and flip a property.
                        </span>
                      }
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
                  </Typography>
                  <Select
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    displayEmpty
                    aria-labelledby="interest-rate-dropdown"
                  >
                    <MenuItem value={6}>6%</MenuItem>
                    <MenuItem value={7}>7%</MenuItem>
                    <MenuItem value={8}>8%</MenuItem>
                    <MenuItem value={9}>9%</MenuItem>
                    <MenuItem value={10}>10%</MenuItem>
                    <MenuItem value={11}>11%</MenuItem>
                    <MenuItem value={12}>12%</MenuItem>
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
                    Estimated Length of Project (mo.){" "}
                    <Tooltip
                      title="The number of months you anticipate your house flip to take until complete."
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
                  </Typography>
                  <Select
                    value={projectLength}
                    onChange={(e) => setProjectLength(e.target.value)}
                    displayEmpty
                    aria-labelledby="project-length-dropdown"
                  >
                    <MenuItem value={12}>12 Months</MenuItem>
                    <MenuItem value={18}>18 Months</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Typography className="text-center" color="grey">
                    Buyer Experience
                  </Typography>
                  <Select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    displayEmpty
                    aria-labelledby="experience-dropdown"
                  >
                    <MenuItem value={70}>New - 70%</MenuItem>
                    <MenuItem value={75}>Beginner - 75%</MenuItem>
                    <MenuItem value={80}>Intermediate - 80%</MenuItem>
                    <MenuItem value={85}>Advanced - 85%</MenuItem>
                    <MenuItem value={90}>Experienced - 90%</MenuItem>
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
                    Loan Amount ($){" "}
                    <Tooltip
                      title="The amount of money you need to borrow from a lender to renovate the property."
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
                  </Typography>
                  <TextField
                    type="text" // Change type to "text" to allow formatted string
                    fullWidth
                    value={`${Number(loanAmount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    disabled
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
                    Down Payment ($){" "}
                    <Tooltip
                      title="The amount of money you need to borrow from a lender to renovate the property."
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
                  </Typography>
                  <TextField
                    type="text" // Change type to "text" to allow formatted string
                    fullWidth
                    value={`${Number(downPaymentListed).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    disabled
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
                    After Repair Value ($)
                    <Tooltip
                      title="The estimated value of the property after repair."
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
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={afterRepairValue}
                    onChange={(e) =>
                      setAfterRepairValue(parseInt(e.target.value))
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input[type='number']": {
                        "-webkit-appearance": "none",
                        "-moz-appearance": "textfield",
                        appearance: "none",
                      },
                      "& input::-webkit-outer-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                      "& input::-webkit-inner-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
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
                    ${monthlyInterestPayment}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="grey"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Monthly Property Taxes
                    <Tooltip
                      title="The amount of property insurance due monthly. Note: House flippers typically need an unoccupied property insurance policy, which is different than a homeowner’s policy."
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
                    fullWidth
                    type="number"
                    value={monthlyPropertyTaxes}
                    onChange={(e) => setMonthlyPropertyTaxes(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input[type='number']": {
                        "-webkit-appearance": "none",
                        "-moz-appearance": "textfield",
                        appearance: "none",
                      },
                      "& input::-webkit-outer-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                      "& input::-webkit-inner-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
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
                    Monthly Insurance
                    <Tooltip
                      title={
                        <span>
                          The amount of property insurance due monthly. <br />
                          <br />
                          <strong>Note:</strong> House flippers typically need
                          an unoccupied property insurance policy, which is
                          different than a homeowner’s policy.
                        </span>
                      }
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
                    fullWidth
                    type="number"
                    value={monthlyInsurance}
                    onChange={(e) => setMonthlyInsurance(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input[type='number']": {
                        "-webkit-appearance": "none",
                        "-moz-appearance": "textfield",
                        appearance: "none",
                      },
                      "& input::-webkit-outer-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                      "& input::-webkit-inner-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
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
                    Monthly Utility Bills
                    <Tooltip
                      title="Utility expenses like water, electric, gas, and oil, due monthly."
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
                    fullWidth
                    type="number"
                    value={monthlyUtilityBills}
                    onChange={(e) => setMonthlyUtilityBills(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input[type='number']": {
                        "-webkit-appearance": "none",
                        "-moz-appearance": "textfield",
                        appearance: "none",
                      },
                      "& input::-webkit-outer-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                      "& input::-webkit-inner-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
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
                    Other Monthly Expenses
                    <Tooltip
                      title="Any other recurring monthly expenses you expect to incur throughout the project."
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
                    fullWidth
                    type="number"
                    value={otherMonthlyExpenses}
                    onChange={(e) => setOtherMonthlyExpenses(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input[type='number']": {
                        "-webkit-appearance": "none",
                        "-moz-appearance": "textfield",
                        appearance: "none",
                      },
                      "& input::-webkit-outer-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                      "& input::-webkit-inner-spin-button": {
                        appearance: "none",
                        margin: 0,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
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
                    Realtor Fee
                    <Tooltip
                      title="All of the fees associated with the realtor."
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
                  <Select
                    value={costOfSales}
                    onChange={(e) => setCostOfSales(e.target.value)}
                    displayEmpty
                    aria-labelledby="realtor-fee-dropdown"
                  >
                    <MenuItem value={0}>0%</MenuItem>
                    <MenuItem value={0.5}>0.5%</MenuItem>
                    <MenuItem value={1.0}>1.0%</MenuItem>
                    <MenuItem value={1.5}>1.5%</MenuItem>
                    <MenuItem value={2.0}>2.0%</MenuItem>
                    <MenuItem value={2.5}>2.5%</MenuItem>
                    <MenuItem value={3.0}>3.0%</MenuItem>
                    <MenuItem value={3.5}>3.5%</MenuItem>
                    <MenuItem value={4.0}>4.0%</MenuItem>
                    <MenuItem value={4.5}>4.5%</MenuItem>
                    <MenuItem value={5.0}>5.0%</MenuItem>
                    <MenuItem value={5.5}>5.5%</MenuItem>
                    <MenuItem value={6.0}>6.0%</MenuItem>
                  </Select>

                  {/* <Typography className="text-center" color="grey">
                    Selected: <strong>{costOfSales}%</strong>
                  </Typography> */}
                </FormControl>
              </Grid>
              <Grid item sm={6}>
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
                    Closing Cost
                    <Tooltip
                      title="All of the fees associated with the closing."
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
                  <Select
                    value={closingCost}
                    onChange={(e) => setClosingCost(e.target.value)}
                    displayEmpty
                    aria-labelledby="closing-cost-dropdown"
                  >
                    <MenuItem value={0.25}>0.25%</MenuItem>
                    <MenuItem value={0.5}>0.5%</MenuItem>
                    <MenuItem value={0.75}>0.75%</MenuItem>
                    <MenuItem value={1.0}>1.0%</MenuItem>
                  </Select>

                  {/* <Typography className="text-center" color="grey">
                    Selected: <strong>{closingCost}%</strong>
                  </Typography> */}
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
                      <Typography variant="body1" color="white" gutterBottom>
                        Closing Costs
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        ${closingCosts}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Carrying Costs
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        ${carryingCosts}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Borrower Equity Needed
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        ${borrowerEquityNeeded}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Total Cash in Deal When Exit
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        ${totalCashInDeal}
                      </Typography>
                    </Grid>
                  </Grid>

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

export default FixandFlipCalc;
