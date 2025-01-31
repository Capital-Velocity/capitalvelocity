import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
function LoanTermsMulti({ formData, setFormData, fieldErrors }) {
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
      loantoValue: sliderValue1,
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
        <Grid container spacing={2}>
          <Typography variant="h4" color="black" gutterBottom>
            Loan Details
          </Typography>
          <Grid item sm={12}>
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <Typography type="p" color="grey">
                Loan Purpose *
              </Typography>

              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                error={fieldErrors.loanPurpose}
                value={formData.loanPurpose || ""}
                onChange={(e) =>
                  setFormData({ ...formData, loanPurpose: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Entity Type"
              >
                <MenuItem value={"12 months"}>Rate Term Refinance</MenuItem>
                <MenuItem value={"18 months"}>Cash-Out Refinance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Typography
            variant="h4"
            color="black"
            gutterBottom
            style={{ marginTop: 10 }}
          >
            Loan Economics
          </Typography>

          <Grid item sm={12}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="grey">
                Loan Amount
              </Typography>
              <TextField
                error={fieldErrors.loanAmount}
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.loanAmount || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanAmount: e.target.value,
                  })
                }
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
            <Typography variant="subtitle1" color="grey" gutterBottom>
              Loan to Value
            </Typography>
            <div style={{ width: "500px" }}>
              <Slider
                value={formData.loantoValue || "0"}
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
      </Container>
    </div>
  );
}

export default LoanTermsMulti;
