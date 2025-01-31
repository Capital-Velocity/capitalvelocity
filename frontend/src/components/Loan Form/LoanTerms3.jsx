import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import CheckoutSteps from "../../pages/Project99/CheckoutSteps3";
import Container from "../../screens/Container";

function LoanTerms3({ formData, setFormData }) {
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
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Vendor and Closing Options
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            {/* This is for the textFields*/}
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <InputLabel
                    style={{ fontSize: 15, fontWeight: 100 }}
                    id="demo-simple-select-label"
                  >
                    Preferred Closing Attorney *
                  </InputLabel>
                  <Select
                    style={{ width: "500px", backgroundColor: "white" }}
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    value={formData.preferredClosingAttorney || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredClosingAttorney: e.target.value,
                      })
                    }
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Entity Type"
                  >
                    <MenuItem value={"Hartmann Doherty Rosa Berman & Bulbulia"}>
                      Hartmann Doherty Rosa Berman & Bulbulia
                    </MenuItem>
                    <MenuItem value={"REO"}>
                      LaRocca Hornik Rosen & Greenberg LLP
                    </MenuItem>
                    <MenuItem value={"Geraci Law Firm"}>
                      Geraci Law Firm
                    </MenuItem>
                    <MenuItem value={"Foreclosure Auction"}>
                      Geraci Law Firm
                    </MenuItem>
                    <MenuItem value={"Law Office of Lawrence Andelsman"}>
                      Law Office of Lawrence Andelsman
                    </MenuItem>
                    <MenuItem value={"Deutsch & Schneider LLP"}>
                      Deutsch & Schneider LLP
                    </MenuItem>
                    <MenuItem value={"Kaplan Kaplan & Ditrapani, LLP"}>
                      Kaplan Kaplan & Ditrapani, LLP
                    </MenuItem>
                    <MenuItem value={"Mangelli & Bilotti PLLC"}>
                      Mangelli & Bilotti PLLC
                    </MenuItem>
                    <MenuItem value={"MLS"}>Michele R.Messian P.C.</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Typography type="p" color="grey">
                    Preferred Closing Date
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.closingDate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          closingDate: e.target.value,
                        })
                      }
                      style={{ width: 500, backgroundColor: "white" }}
                      type="date"
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel
                  style={{ fontSize: 15, fontWeight: 100 }}
                  id="demo-simple-select-label"
                >
                  Preferred Insurance Company *
                </InputLabel>
                <Select
                  style={{ width: "500px", backgroundColor: "white" }}
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  value={formData.insuranceCompany || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      insuranceCompany: e.target.value,
                    })
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Entity Type"
                >
                  <MenuItem value={"Elmsure"}>Elmsure</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <FormControl fullWidth style={{ marginTop: 32 }}>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Preferred Title Company
              </InputLabel>
              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.titleCompany || ""}
                onChange={(e) =>
                  setFormData({ ...formData, titleCompany: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Entity Type"
              >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanTerms3;
