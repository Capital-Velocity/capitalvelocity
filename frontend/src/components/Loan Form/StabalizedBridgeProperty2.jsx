import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function StabalizedBridgeProperty2({ formData, setFormData, fieldErrors }) {
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
          Property information
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            {/* This is for the textFields*/}
            <Grid container spacing={5}>
              <Grid item sm={12} style={{ marginTop: 32 }}>
                <FormControl fullWidth>
                  <Typography type="p" color="grey">
                    Loan Purpose
                  </Typography>
                  <Select
                    style={{ width: "500px", backgroundColor: "white" }}
                    error={fieldErrors.loanPurpose}
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    value={formData.loanPurpose || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        loanPurpose: e.target.value,
                      })
                    }
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Entity Type"
                  >
                    <MenuItem value={"Purchase"}>Purchase</MenuItem>
                    <MenuItem value={"Refinance"}>Refinance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Grid item sm={12}>
                    {" "}
                    <Typography type="p" color="grey">
                      Purchase Price
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
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} style={{ marginTop: 30 }}>
            <Grid item sm={12}>
              <Typography type="p" color="grey">
                Purchase Date
              </Typography>

              <TextField
                error={fieldErrors.purchaseDate}
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.purchaseDate || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseDate: e.target.value,
                  })
                }
                type="date"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={12} style={{ marginTop: 37 }}>
              {" "}
              <Typography type="p" color="grey">
                Completed Capex *
              </Typography>
              <TextField
                error={fieldErrors.completedCapex}
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.completedCapex || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    completedCapex: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default StabalizedBridgeProperty2;
