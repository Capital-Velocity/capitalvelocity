import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

import Slider from "@mui/material/Slider";

function StabalizedBridgeBorrower({ formData, setFormData, fieldErrors }) {
  const requirements = [
    "•ID",
    "•Personal Financial Statement",
    "•Tri Merge Verifiable Credit Report (all 3 credit bureaus)",
    "•Background Report from TLO, LexisNexis, Clear, or Checkr",
  ];
  const [sliderValue, setSliderValue] = useState(1);
  const handleSliderChange = (event, newValue) => {
    setSliderValue(event.target.value);
    setFormData({
      ...formData,
      ficoScore: event.target.value,
    });
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
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
      <CheckoutSteps step1></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          We will need to collect the borrower's credit. Would you like us to
          get it for you (free)?
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            style={{ color: "black" }}
            value="Yes" // Set the value to "Yes" when selected
            checked={formData.collectCredit === "Yes"} // Check if it's "Yes" in formData
            onChange={() => handleOptionChange("collectCredit", "Yes")}
            error={fieldErrors.collectCredit}
            helperText={<span>{fieldErrors.collectCredit}</span>}
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            style={{ color: "black" }}
            value="No" // Set the value to "No" when selected
            checked={formData.collectCredit === "No"} // Check if it's "No" in formData
            onChange={() => handleOptionChange("collectCredit", "No")}
            error={fieldErrors.collectCredit}
            helperText={<span>{fieldErrors.collectCredit}</span>}
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
        <div style={{ marginTop: 20 }}>
          {formData.collectCredit === "Yes" && (
            <Grid container spacing={2}>
              <Typography variant="subtitle1" color="grey" gutterBottom>
                If you do not use the capital provider's free credit and
                background checking service you will need to provide the capital
                provider with the borrower's:
              </Typography>
              <Typography variant="subtitle1" color="grey" gutterBottom>
                <ul>
                  {requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </Typography>
            </Grid>
          )}
        </div>
        <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
          Qualifying FICO Score
        </label>
        <div style={{ width: 550 }}>
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
      </Container>
    </div>
  );
}

export default StabalizedBridgeBorrower;
