import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function LoanTerms({ formData, setFormData, fieldErrors }) {
  const [sliderValue, setSliderValue] = React.useState(1);
  const [sliderValue1, setSliderValue1] = React.useState(1);
  const [value, setValue] = React.useState(1);
  const percentageMarks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
  ];
  const percentageMarks2 = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];
  const setLoanPercentage = (event, newValue) => {
    setSliderValue(event.target.value);
    setFormData({
      ...formData,
      purchaseAmount: sliderValue,
    });
  };
  const setConstruction = (event, newValue) => {
    setSliderValue1(event.target.value);
    setFormData({
      ...formData,
      constructionBudgetPercentage: sliderValue1,
    });
  };

  const handleChangeLoan = (event, newValue) => {
    setInitialLoanAmount(parseFloat(event.target.value));
    setFormData({
      ...formData,
      initialLoanAmount: event.target.value,
    });
  };

  const handleChangeLoanConstructionHoldback = (event, newValue) => {
    setConstructionHoldback(parseFloat(event.target.value));
    setFormData({
      ...formData,
      constructionHoldback: event.target.value,
    });
  };

  const [initialLoanAmount, setInitialLoanAmount] = useState(0);

  const [constructionHoldback, setConstructionHoldback] = useState(0);

  const calculateTotal = () => initialLoanAmount + constructionHoldback;
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Terms
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Let's do some math here with the loan terms and pricing
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={8}>
            {/* This is for the textFields*/}
            <Grid container spacing={5}>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography type="p" color="grey">
                    Initial Loan Amount
                  </Typography>
                  <TextField
                    type="number"
                    error={fieldErrors.initialLoanAmount}
                    helperText={<span>{fieldErrors.initialLoanAmount}</span>}
                    value={formData.initialLoanAmount || initialLoanAmount}
                    onChange={(event) => handleChangeLoan(event)}
                    style={{ marginTop: 10, backgroundColor: "white" }}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Typography variant="h6">$</Typography>,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="grey" gutterBottom>
                  Initial Loan Amount/Purchase Price
                </Typography>
                <div style={{ width: "300px" }}>
                  <Slider
                    value={formData.purchaseAmount || ""}
                    onChange={(event) => setLoanPercentage(event)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={75}
                    marks={percentageMarks}
                    color="success"
                    style={{ color: "#498dd6" }}
                    aria-labelledby="loan-percentage-slider"
                  />
                </div>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <Typography type="p" color="grey">
                    Construction Holdback
                  </Typography>
                  <TextField
                    style={{ backgroundColor: "white" }}
                    type="number"
                    value={formData.constructionHoldback || ""}
                    error={fieldErrors.constructionHoldback}
                    helperText={<span>{fieldErrors.constructionHoldback}</span>}
                    onChange={(event) =>
                      handleChangeLoanConstructionHoldback(event)
                    }
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Typography variant="h6">$</Typography>,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="grey" gutterBottom>
                  Construction Holdback/Renovation
                </Typography>
                <div style={{ width: "300px" }}>
                  <Slider
                    value={formData.constructionBudgetPercentage || ""}
                    onChange={(event) => setConstruction(event)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    marks={percentageMarks2}
                    color="success"
                    style={{ color: "#498dd6" }}
                    aria-labelledby="construction-budget-percentage-slider"
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
                borderRadius: 10,
                width: "100%",
                height: 60,
                backgroundColor: "white",
                border: "2px solid #498dd6",
                color: "black",
                fontSize: 24,
              }}
            >
              Total: ${calculateTotal().toFixed(2)}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanTerms;
