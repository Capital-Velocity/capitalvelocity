import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider, FormHelperText } from "@mui/material";

function LoanTerms2({ formData, setFormData, fieldErrors }) {
  const [interestRate, setInterestRate] = useState(10.74);
  const [selectedOption, setSelectedOption] = useState("percentage");
  const [selectedOption2, setSelectedOption2] = useState("percentage");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      percentageOrAmount: event.target.value,
    });
  };

  const handleRadioChange2 = (event) => {
    setSelectedOption2(event.target.value);
    setFormData({
      ...formData,
      percentageOrAmount2: event.target.value,
    });
  };

  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setFormData({
      ...formData,
      interestTerm: event.target.value,
    });
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
  const getInputAdornment2 = () => {
    return selectedOption2 === "percentage" ? "%" : "$";
  };
  const handleInterestRateChange = (event) => {
    setInterestRate(parseFloat(event.target.value));
    setFormData({
      ...formData,
      interestRate: event.target.value,
    });
  };

  const interestRates = [];
  for (let rate = 10.74; rate <= 16; rate += 0.5) {
    interestRates.push(rate.toFixed(2));
  }

  return (
    <div style={{ width: "100%" }}>
      {" "}
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Terms
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Let's do some math here with the loan terms and pricing
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" color="black" gutterBottom>
              Pricing
            </Typography>
            {/* This is for the textFields*/}
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
                <FormControl style={{ minWidth: "100%" }}>
                  <Typography variant="subtitle1" color="grey" gutterBottom>
                    Interest Rates
                  </Typography>

                  <Select
                    style={{ backgroundColor: "white" }}
                    error={fieldErrors.interestRate}
                    helperText={<span>{fieldErrors.interestRate}</span>}
                    value={formData.interestRate || ""}
                    onChange={(event) => handleInterestRateChange(event)}
                  >
                    {interestRates.map((rate) => (
                      <MenuItem key={rate} value={rate}>
                        {rate}%
                      </MenuItem>
                    ))}
                  </Select>
                  {/* FormHelperText to display the error message */}
                  {fieldErrors.interestRate && (
                    <FormHelperText error>
                      {fieldErrors.interestRate}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1" color="grey" gutterBottom>
                  Points*
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    style={{ fontSize: 15, fontWeight: 100, color: "grey" }}
                    aria-label="radio-selection"
                    name="radio-selection"
                    value={formData.percentageOrAmount || selectedOption}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="percentage"
                      control={<Radio />}
                      label="Percentage"
                    />
                    <FormControlLabel
                      value="amount"
                      control={<Radio />}
                      label="Amount"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                {" "}
                <TextField
                  error={fieldErrors.points}
                  helperText={<span>{fieldErrors.points}</span>}
                  value={formData.points || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      points: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  type="number"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getInputAdornment()}
                      </InputAdornment>
                    ),
                  }}
                  // Add more props as needed
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1" color="grey" gutterBottom>
                  Broker Points *
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    style={{ fontSize: 15, fontWeight: 100, color: "grey" }}
                    aria-label="radio-selection"
                    name="radio-selection"
                    value={formData.percentageOrAmount2 || selectedOption2}
                    onChange={handleRadioChange2}
                  >
                    <FormControlLabel
                      value="percentage"
                      control={<Radio />}
                      label="Percentage"
                    />
                    <FormControlLabel
                      value="amount"
                      control={<Radio />}
                      label="Amount"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                {" "}
                <TextField
                  error={fieldErrors.brokerPoints}
                  helperText={<span>{fieldErrors.brokerPoints}</span>}
                  value={formData.brokerPoints || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brokerPoints: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  type="number"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getInputAdornment2()}
                      </InputAdornment>
                    ),
                  }}
                  // Add more props as needed
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h5" color="black" gutterBottom>
              Interest Mechanics
            </Typography>
            <FormControl fullWidth style={{ marginTop: 32 }}>
              <Typography type="p" color="grey">
                Term (Duration) *
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                error={fieldErrors.termMonths}
                helperText={<span>{fieldErrors.termMonths}</span>}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.termMonths || ""}
                onChange={(e) =>
                  setFormData({ ...formData, termMonths: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"12 months"}>12 months</MenuItem>
                <MenuItem value={"18 months"}>18 months</MenuItem>
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.termMonths && (
                <FormHelperText error>{fieldErrors.termMonths}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 32 }}>
              <Typography type="p" color="grey">
                Interest Accrual Method *
              </Typography>
              <Select
                style={{ backgroundColor: "white" }}
                error={fieldErrors.intrestMethod}
                helperText={<span>{fieldErrors.intrestMethod}</span>}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.intrestMethod || ""}
                onChange={(e) =>
                  setFormData({ ...formData, intrestMethod: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"As disbursed"}>As disbursed</MenuItem>
                <MenuItem value={"Full Boat"}>Full Boat</MenuItem>
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.intrestMethod && (
                <FormHelperText error>
                  {fieldErrors.intrestMethod}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 32 }}>
              <Typography type="p" color="grey">
                Interest Accrual Term *
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                error={fieldErrors.interestTerm}
                helperText={<span>{fieldErrors.interestTerm}</span>}
                value={formData.interestTerm || ""}
                onChange={handleMonthChange}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {renderMenuItems()}
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.intrestMethod && (
                <FormHelperText error>
                  {fieldErrors.intrestMethod}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanTerms2;
