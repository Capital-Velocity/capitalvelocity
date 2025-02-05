import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const FixandFlipCalc = () => {
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
                  </Typography>{" "}
                  <TextField fullWidth value={interestRate} disabled />
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
                    type="number"
                    fullWidth
                    value={loanAmount}
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
                    ${calculateMonthlyInterest()}
                  </Typography>
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

export default FixandFlipCalc;
