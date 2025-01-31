import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps2 from "../CheckoutSteps2";

function LoanPricer3({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValue, setSliderValue] = React.useState(1);
  const handleSliderChange = (event, newValue) => {
    setSliderValue(event.target.value);
    setFormData({
      ...formData,
      ficoScore: event.target.value,
    });
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const marks = [
    { value: 600, label: "600" },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 800, label: "800" },
  ];
  return (
    <div>
      <CheckoutSteps2 step1></CheckoutSteps2>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Pricer
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Provide Property Information
        </Typography>
        <Grid container spacing={2} style={{ marginLeft: 2, marginBottom: 5 }}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Borrower’s Experience Level
              </Typography>

              <Select
                error={fieldErrors.borrowExperience}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.borrowExperience || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowExperience: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1-2</MenuItem>
                <MenuItem value={2}>3-4</MenuItem>
                <MenuItem value={3}>5-9</MenuItem>
                <MenuItem value={3}>10-49</MenuItem>
                <MenuItem value={4}>50+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Borrower's Citizenship Status{" "}
              </Typography>

              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.borrowerCitizenship || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerCitizenship: e.target.value,
                  })
                }
                error={fieldErrors.borrowerCitizenship}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"US Citizen"}>US Citizen</MenuItem>
                <MenuItem value={"US Permanent Resident (Green Card Holder)"}>
                  US Permanent Resident (Green Card Holder)
                </MenuItem>
                <MenuItem value={"US Permanent with Valid Visa"}>
                  US Permanent with Valid Visa
                </MenuItem>
                <MenuItem value={"Foreign National"}>Foreign National</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="grey">
              Social Security
            </Typography>
            <TextField
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.socialSecurity || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              error={fieldErrors.socialSecurity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialSecurity: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Qualifying FICO Score
            </label>
            <div style={{ width: 500 }}>
              <Slider
                value={formData.ficoScore || "0"}
                onChange={(event) => handleSliderChange(event)}
                min={600}
                max={800}
                step={20}
                marks={marks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6" }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanPricer3;
