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
import BasicTable from "./BasicTable";

function MultiFamilyPricing({ formData, setFormData, fieldErrors }) {
  const [interestRate, setInterestRate] = useState(0);
  const [exitFees, setexitFees] = useState(0);
  const [capitalPoints, setCapitalPoints] = useState(0);
  const [capitalPointsExit, setCapitalPointsExit] = useState(0);
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
  const handleExitFees = (event) => {
    setexitFees(parseFloat(event.target.value));
    setFormData({
      ...formData,
      exitFees: event.target.value,
    });
  };

  const handleCapitalPoints = (event) => {
    setCapitalPoints(parseFloat(event.target.value));
    setFormData({
      ...formData,
      capitalPoints: event.target.value,
    });
  };

  const handleCapitalPointsExitFee = (event) => {
    setCapitalPointsExit(parseFloat(event.target.value));
    setFormData({
      ...formData,
      capitalPointsExit: event.target.value,
    });
  };

  const interestRates = [];
  for (let rate = 0; rate <= 6; rate += 0.5) {
    interestRates.push(rate.toFixed(2));
  }

  const exitFeesS = [];
  for (let fee = 0; fee <= 6; fee += 0.25) {
    exitFeesS.push(fee.toFixed(2));
  }

  const capitalPointsArray = [];
  for (let points = 0; points <= 6; points += 0.25) {
    capitalPointsArray.push(points.toFixed(2));
  }

  const capitalPointsExitArray = [];
  for (let pointsExit = 0; pointsExit <= 6; pointsExit += 0.25) {
    capitalPointsExitArray.push(pointsExit.toFixed(2));
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 step5 step6></CheckoutSteps>
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
                <FormControl style={{ width: 500 }}>
                  <Typography variant="subtitle1" color="grey" gutterBottom>
                    Interest Rates
                  </Typography>

                  <Select
                    style={{ backgroundColor: "white" }}
                    error={fieldErrors.interestRate}
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
                  Total Points *
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
                  error={fieldErrors.points}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      points: e.target.value,
                    })
                  }
                  style={{ width: 500, backgroundColor: "white" }}
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
                <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
                  Will this borrower be personally guaranteeing this loan?
                </label>
                <FormControl style={{ width: 500 }}>
                  <Select
                    style={{ backgroundColor: "white" }}
                    value={formData.exitFees || exitFees}
                    error={fieldErrors.exitFees}
                    onChange={(event) => handleExitFees(event)}
                  >
                    {exitFeesS.map((fee) => (
                      <MenuItem key={fee} value={fee}>
                        {fee}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="subtitle1" color="grey" gutterBottom>
                  Broker Points *
                </Typography>
                <FormControl style={{ width: 500 }} component="fieldset">
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
                  error={fieldErrors.brokerPoints}
                  style={{ width: 500, backgroundColor: "white" }}
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
              <Grid item sm={12}>
                <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
                  Capital Provider Points *
                </label>
                <FormControl style={{ width: 500 }}>
                  <Select
                    style={{ backgroundColor: "white" }}
                    value={formData.capitalPoints || capitalPoints}
                    onChange={(event) => handleCapitalPoints(event)}
                    error={fieldErrors.capitalPoints}
                  >
                    {capitalPointsArray.map((points) => (
                      <MenuItem key={points} value={points}>
                        {points}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
                  Capital Provider Exit Fees
                </label>
                <FormControl style={{ width: 500 }}>
                  <Select
                    style={{ backgroundColor: "white" }}
                    error={fieldErrors.capitalPointsExit}
                    value={formData.capitalPointsExit || capitalPointsExit}
                    onChange={(event) => handleCapitalPointsExitFee(event)}
                  >
                    {capitalPointsExitArray.map((pointsExit) => (
                      <MenuItem key={pointsExit} value={pointsExit}>
                        {pointsExit}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <BasicTable />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamilyPricing;
