import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function StabalizedBridgeProperty3({ formData, setFormData, fieldErrors }) {
  const [interestRate, setInterestRate] = useState(10.74);
  const [selectedOption, setSelectedOption] = useState("percentage");

  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };

  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const renderMenuItems = () => {
    const months = Array.from({ length: 18 }, (_, index) => index + 1);

    return months.map((month) => (
      <MenuItem key={month} value={month}>
        {month} {month === 1 ? "Month" : "Months"}
      </MenuItem>
    ));
  };

  const getInputAdornment = () => {
    return selectedOption === "percentage" ? "%" : "$";
  };

  const handleInterestRateChange = (event) => {
    setInterestRate(parseFloat(event.target.value));
  };

  const interestRates = [];
  for (let rate = 10.74; rate <= 16; rate += 0.5) {
    interestRates.push(rate.toFixed(2));
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Property information
        </Typography>

        <Grid container spacing={-20}>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Current Debt on the property *
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.guranteeLoan === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("guranteeLoan", "Yes")}
                error={fieldErrors.guranteeLoan}
                helperText={<span>{fieldErrors.guranteeLoan}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "Yes" when selected
                checked={formData.guranteeLoan === "No"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("guranteeLoan", "No")}
                error={fieldErrors.guranteeLoan}
                helperText={<span>{fieldErrors.guranteeLoan}</span>}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6} style={{ marginTop: 20 }}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="grey">
                Purchase Price *
              </Typography>
              <TextField
                error={fieldErrors.purchasePriceProperty}
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.purchasePriceProperty || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchasePriceProperty: e.target.value,
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
        </Grid>
      </Container>
    </div>
  );
}

export default StabalizedBridgeProperty3;
