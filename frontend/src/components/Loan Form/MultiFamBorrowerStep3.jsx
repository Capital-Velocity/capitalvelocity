import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "../CheckoutSteps";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function MultiFamBorrowerStep3({ formData, setFormData, fieldErrors }) {
  const requirements = [
    "•ID",
    "•Personal Financial Statement",
    "•Tri Merge Verifiable Credit Report (all 3 credit bureaus)",
    "•Background Report from TLO, LexisNexis, Clear, or Checkr",
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
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
            value="No" // Set the value to "Yes" when selected
            checked={formData.collectCredit === "No"} // Check if it's "Yes" in formData
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
      </Container>
    </div>
  );
}

export default MultiFamBorrowerStep3;
