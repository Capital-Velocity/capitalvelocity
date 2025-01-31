import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function StabalizedBridgeProperty4({ formData, setFormData, fieldErrors }) {
  const [interestRate, setInterestRate] = useState(10.74);
  const [selectedOption, setSelectedOption] = useState("percentage");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
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
          Cash Flow Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6} style={{ marginTop: 20 }}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="grey">
                Gross Monthly Rent *
              </Typography>
              <TextField
                error={fieldErrors.grossMonthlyRent}
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.grossMonthlyRent || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    grossMonthlyRent: e.target.value,
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
          <Grid item sm={6} style={{ marginTop: 20 }}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="grey">
                Total Gross Annual Taxes *
              </Typography>
              <TextField
                error={fieldErrors.grossTaxes}
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.grossTaxes || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    grossTaxes: e.target.value,
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
          <Grid item sm={6} style={{ marginTop: 20 }}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="grey">
                Total Gross Annual Insurance
              </Typography>
              <TextField
                error={fieldErrors.grossAnnual}
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.grossAnnual || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    grossAnnual: e.target.value,
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
          <Grid item sm={6} style={{ marginTop: 20 }}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="grey">
                Total Annual HOA Dues
              </Typography>
              <TextField
                style={{ width: "500px", backgroundColor: "white" }}
                error={fieldErrors.hoa}
                value={formData.hoa || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hoa: e.target.value,
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

export default StabalizedBridgeProperty4;
