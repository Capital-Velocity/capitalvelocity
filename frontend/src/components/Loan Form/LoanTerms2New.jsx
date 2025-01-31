import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps2 from "../CheckoutSteps2";

function LoanTerms2New({ formData, setFormData }) {
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
      refinance: event.target.value,
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
    <div>
      <CheckoutSteps2 step1 step2 step3 step4></CheckoutSteps2>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Terms
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Let's do some math here with the loan terms and pricing
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Typography variant="h5" color="black" gutterBottom>
              Pricing
            </Typography>
            {/* This is for the textFields*/}
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <FormControl style={{ width: 500, backgroundColor: "white" }}>
                  <Typography variant="subtitle1" color="grey" gutterBottom>
                    Interest Rates
                  </Typography>

                  <Select
                    style={{ backgroundColor: "white" }}
                    value={formData.interestRate || interestRate}
                    onChange={(event) => handleInterestRateChange(event)}
                  >
                    {interestRates.map((rate) => (
                      <MenuItem key={rate} value={rate}>
                        {rate}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="subtitle1" color="grey" gutterBottom>
                  Points*
                </Typography>
                <FormControl style={{ width: 500 }} component="fieldset">
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
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.points || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      points: e.target.value,
                    })
                  }
                  style={{ width: 500 }}
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
              <Grid item sm={12}>
                <Typography variant="subtitle1" color="grey" gutterBottom>
                  Broker Points *
                </Typography>
                <FormControl
                  style={{ width: 500, backgroundColor: "white" }}
                  component="fieldset"
                >
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
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.brokerPoints || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brokerPoints: e.target.value,
                    })
                  }
                  style={{ width: 500 }}
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
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Term (Duration) *
              </InputLabel>
              <Select
                style={{ width: "500px" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.termMonths || ""}
                onChange={(e) =>
                  setFormData({ ...formData, termMonths: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Entity Type"
              >
                <MenuItem value={"12 months"}>12 months</MenuItem>
                <MenuItem value={"18 months"}>18 months</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 32 }}>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Interest Accrual Method *
              </InputLabel>
              <Select
                style={{ width: "500px" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.intrestMethod || ""}
                onChange={(e) =>
                  setFormData({ ...formData, intrestMethod: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Entity Type"
              >
                <MenuItem value={"As disbursed"}>As disbursed</MenuItem>
                <MenuItem value={"Full Boat"}>Full Boat</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 32 }}>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Interest Accrual Term *
              </InputLabel>
              <Select
                style={{ width: "500px" }}
                value={formData.interestTerm || selectedMonth}
                onChange={handleMonthChange}
                label="Months"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {renderMenuItems()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanTerms2New;
