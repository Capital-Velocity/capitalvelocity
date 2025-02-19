import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps2 from "../CheckoutSteps2";
import CustomAccordion from "./CustomAccordion";
import TableComponent from "./TableComponent";
function LoanPricerSummary({ formData, setFormData, fieldErrors }) {
  const menuItems = [];
  for (let i = 0; i <= 0.4; i += 0.01) {
    menuItems.push(
      <MenuItem key={i} value={i}>
        {`${(i * 100).toFixed(2)}%`}
      </MenuItem>
    );
  }
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValueLoanPricerSummary, setSliderValueLoanPricerSummary] =
    React.useState(1);
  const [sliderValueLoanPricerSummary2, setSliderValueLoanPricerSummary2] =
    React.useState(0);
  const handleSliderChangeLoanPricerSummary = (event, newValue) => {
    setSliderValueLoanPricerSummary(event.target.value);
    setFormData({
      ...formData,
      loanToValue: event.target.value,
    });
  };
  const handleSliderChangeLoanPricerSummary2 = (event, newValue) => {
    setSliderValueLoanPricerSummary2(event.target.value);
    setFormData({
      ...formData,
      oneTimeYield: event.target.value,
    });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const marksLoanToValue = [
    { value: 20, label: "20%" },
    { value: 65, label: "65%" },
  ];
  const marksOneTimeYieldSpreadPremium = [
    { value: 0, label: "0%" },
    { value: 1.275, label: "1.275%" },
  ];
  return (
    <div>
      {/* <CheckoutSteps2 step1 step2></CheckoutSteps2> */}

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Pricer Summary
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please choose the loan terms. They will affect the loan rates below
        </Typography>
        <Typography
          variant="button"
          display="block"
          gutterBottom
          style={{ color: "#498dd6", fontSize: 24 }}
        >
          LOAN TERMS
        </Typography>
        <Grid container spacing={2} style={{ marginLeft: 2, marginBottom: 5 }}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Amortization Type
              </Typography>

              <Select
                error={fieldErrors.amortizationType}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.amortizationType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amortizationType: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Fully Amortizing"}>Fully Amortizing</MenuItem>
                <MenuItem value={"Partial Interest Only"}>
                  Partial Interest Only
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Loan To Value
            </label>
            <div style={{ width: 500 }}>
              <Slider
                value={formData.loanToValue}
                onChange={(event) => handleSliderChangeLoanPricerSummary(event)}
                min={20}
                max={65}
                marks={marksLoanToValue}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6" }}
              />
            </div>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Pre-Payment Penalty
              </Typography>

              <Select
                error={fieldErrors.prePayPen}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.prePayPen || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prePayPen: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"3 year"}>3 year (3-2-1)</MenuItem>
                <MenuItem value={"4 year"}>4 year (4-3-2-1)</MenuItem>
                <MenuItem value={"5 year"}>5 year (5-4-3-2-1)</MenuItem>
                <MenuItem value={"Yield Maintenance"}>
                  Yield Maintenance
                </MenuItem>
                <MenuItem value={"3 year (3-0-0)"}>3 year (3-0-0)</MenuItem>
                <MenuItem value={"1 year (1-0-0)"}>1 year (1-0-0)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              One Time Yield Spread Premium
            </label>
            <div style={{ width: 500 }}>
              <Slider
                value={formData.oneTimeYield}
                onChange={(event) =>
                  handleSliderChangeLoanPricerSummary2(event)
                }
                min={0}
                max={1.275}
                marks={marksOneTimeYieldSpreadPremium}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6" }}
              />
            </div>
          </Grid>

          <Grid item sm={6}>
            <FormControl>
              <Typography type="p" color="grey">
                Rate Buydown
              </Typography>

              <Select
                error={fieldErrors.rateBuyDown}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.rateBuyDown || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rateBuyDown: e.target.value,
                  })
                }
                defaultValue={0}
                label="Rate Buydown

                "
              >
                {menuItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="grey">
              Social Security
            </Typography>
            <TextField
              style={{ width: "500px", backgroundColor: "white" }}
              error={fieldErrors.socialSecurity}
              value={formData.socialSecurity || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialSecurity: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item sm={12}>
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ color: "#498dd6", fontSize: 24 }}
            >
              PROGRAM OPTIONS
            </Typography>
            <Paper>
              <TableComponent />
            </Paper>
          </Grid>
          <Grid item sm={12}>
            <CustomAccordion />
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Rate Type
              </Typography>

              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                error={fieldErrors.rateType}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.rateType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rateType: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"5/6 ARM"}>5/6 ARM</MenuItem>
                <MenuItem value={"7/6 ARM"}>7/6 ARM</MenuItem>
                <MenuItem value={"10/6 ARM"}>10/6 ARM</MenuItem>
                <MenuItem value={"30 Yr FRM"}>30 Yr FRM</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Program Type
              </Typography>

              <Select
                error={fieldErrors.programType}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.programType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    programType: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"DSCR Expanded"}>DSCR Expanded</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanPricerSummary;
