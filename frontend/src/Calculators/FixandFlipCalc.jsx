import React, { useState, useEffect } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import {
  TextField,
  Grid,
  Typography,
  Slider,
  Box,
  Container,
  Modal,
  Button,
} from "@mui/material";
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
    backgroundColor: isDeal ? "green" : "red",
    marginTop: 10,
  };

  return (
    <div>
      <Box style={{ backgroundColor: "#498dd6" }}>
        <ToastContainer />
        <Grid container spacing={0}>
          <Grid item sm={6}>
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ color: "white", fontSize: 30, marginLeft: 10 }}
            >
              Flip Calculator
            </Typography>
          </Grid>

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
        </Grid>
      </Box>
      <Container>
        <Typography gutterBottom style={{ color: "black", fontSize: 20 }}>
          How much does it cost to flip a house? How much money do I need to
          start flipping houses? How much profit can I make on a fix-and-flip?
          <br />
          Do you know the answers to these questions? The best thing you can do
          to prepare for your next project is to understand your house flipping
          cost breakdown. You need to account for all of the costs during the
          project, not just the purchase and rehab costs. With a full
          understanding of the costs, you can use our house flipping calculator
          to compute your ARV (after repair value) and anticipated profit, have
          a clear picture of the terms of your hard money loan, and identify
          challenges before they come up. <br />
          <strong>
            Use our free house flipping profit calculator below to calculate a
            cost breakdown for your next fix and flip project.
          </strong>
        </Typography>
      </Container>

      <Box
        style={{ backgroundColor: "#c5dfee", marginTop: 75, paddingBottom: 20 }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" color="#498dd6" gutterBottom>
                <strong>Purchase Price</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                How much you pay for a property. For single family and
                multi-family homes, the purchase price includes the property
                itself and the land the property is on.
              </Typography>
              <TextField
                fullWidth
                type="number"
                style={{ backgroundColor: "white" }}
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" color="#498dd6" gutterBottom>
                <strong>Rehab Cost</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                Costs associated with renovating the property. Rehab costs
                should include both cost of materials and labor.
              </Typography>
              <TextField
                type="number"
                fullWidth
                style={{ backgroundColor: "white", marginTop: 25 }}
                value={rehabCost}
                onChange={(e) => setRehabCost(parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" color="#498dd6" gutterBottom>
                <strong>Interest Rate</strong>
              </Typography>
              <p>Subject to change daily</p>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                The interest rate associated with borrowing money to fix and
                flip a property.
              </Typography>
              <TextField
                fullWidth
                style={{ backgroundColor: "white", marginTop: 25 }}
                value={interestRate}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" color="#498dd6" gutterBottom>
                <strong>Anticipated Length of Project (months)</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                The number of years you anticipate your house flip to take until
                complete.
              </Typography>
              <TextField
                disabled
                style={{ backgroundColor: "white", marginTop: 86 }}
                fullWidth
                value={projectLength} // Displaying in years
                onChange={(e) => setProjectLength(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" color="#498dd6" gutterBottom>
                <strong>Loan Amount</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                The amount of money you need to borrow from a lender to renovate
                the property.
              </Typography>
              <TextField
                type="number"
                style={{ backgroundColor: "white", marginTop: 25 }}
                fullWidth
                value={loanAmount}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" color="#498dd6" gutterBottom>
                <strong>After Repair Value</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                The Estimated Value of the property after repair
              </Typography>
              <TextField
                fullWidth
                type="number"
                style={{ backgroundColor: "white", marginTop: 48 }}
                value={afterRepairValue}
                onChange={(e) => setAfterRepairValue(parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" color="#498dd6" gutterBottom>
                <strong>Monthly Interest Payment</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                The portion of the annual or semi-annual property taxes that
                accrue each month.
              </Typography>
              <Typography
                gutterBottom
                style={{ color: "black", fontSize: 20, marginTop: 30 }}
              >
                ${calculateMonthlyInterest()}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography
                id="monthly-property-taxes-slider"
                variant="h5"
                color="#498dd6"
                gutterBottom
              >
                <strong>Monthly Property Taxes: ${monthlyPropertyTaxes}</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                The amount of property insurance due monthly. Note: House
                flippers typically need an unoccupied property insurance policy,
                which is different than a homeowner’s policy.
              </Typography>

              <Slider
                value={monthlyPropertyTaxes}
                min={50}
                max={1000}
                step={1}
                onChange={(e, value) => setMonthlyPropertyTaxes(value)}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography
                id="monthly-insurance-slider"
                variant="h5"
                color="#498dd6"
                gutterBottom
              >
                <strong> Monthly Insurance: ${monthlyInsurance}</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                The amount of property insurance due monthly. Note: House
                flippers typically need an unoccupied property insurance policy,
                which is different than a homeowner’s policy.
              </Typography>
              <Slider
                value={monthlyInsurance}
                min={20}
                max={250}
                step={1}
                onChange={(e, value) => setMonthlyInsurance(value)}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography
                id="monthly-utility-bills-slider"
                variant="h5"
                color="#498dd6"
                gutterBottom
              >
                <strong>Monthly Utility Bills: ${monthlyUtilityBills}</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                Utility expenses like water, electric, gas, and oil, due
                monthly.
              </Typography>
              <Slider
                style={{ marginTop: 49 }}
                value={monthlyUtilityBills}
                min={50}
                max={500}
                step={1}
                onChange={(e, value) => setMonthlyUtilityBills(value)}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography
                id="other-monthly-expenses-slider"
                variant="h5"
                color="#498dd6"
                gutterBottom
              >
                <strong>Other Monthly Expenses: ${otherMonthlyExpenses}</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                Any other recurring monthly expenses you expect to incur
                throughout the project.
              </Typography>
              <Slider
                value={otherMonthlyExpenses}
                min={0}
                max={2000}
                step={1}
                onChange={(e, value) => setOtherMonthlyExpenses(value)}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography
                id="cost-of-sales-slider"
                variant="h5"
                color="#498dd6"
                gutterBottom
              >
                <strong>Realtor fee: {costOfSales} %</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                All of the fees associated with the realtor.
              </Typography>

              <Slider
                style={{ marginTop: 25 }}
                value={costOfSales}
                min={0}
                max={20}
                step={1}
                onChange={(e, value) => setCostOfSales(value)}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography
                id="cost-of-sales-slider"
                variant="h5"
                color="#498dd6"
                gutterBottom
              >
                <strong>Closing Cost: {closingCost} %</strong>
              </Typography>
              <Typography gutterBottom style={{ color: "black", fontSize: 17 }}>
                All of the fees associated with the closing.
              </Typography>

              <Slider
                value={closingCost}
                min={0}
                max={10}
                step={1}
                onChange={(e, value) => setClosingCost(value)}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography
                id="cost-of-sales-slider"
                variant="h5"
                color="#498dd6"
                gutterBottom
              >
                <strong>Buyer Experience </strong>
              </Typography>

              <Slider
                style={{ marginTop: 30 }}
                value={experienceLevel}
                min={0}
                max={4}
                step={1}
                marks={marks}
                onChange={(e, value) => setExperienceLevel(value)}
                valueLabelDisplay="auto"
                aria-labelledby="experience-slider"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
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
            <Grid item xs={6}>
              <Typography variant="h6" color="white" gutterBottom>
                Profit Percentage:{" "}
                {isNaN(profitPercentage) ? 0 : profitPercentage}%
              </Typography>
            </Grid>

            <Grid item xs={6} style={{ marginBottom: 10 }}>
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default FixandFlipCalc;
