import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps2 from "../CheckoutSteps2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function LoanPricer4({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div>
      <CheckoutSteps2 step1></CheckoutSteps2>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Pricer
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.previosulyBankrupt ? "red" : "grey",
              }}
            >
              Has The Borrower Previously Filed For Bankruptcy?
            </label>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.previosulyBankrupt === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("previosulyBankrupt", "Yes")}
                error={fieldErrors.previosulyBankrupt}
                helperText={<span>{fieldErrors.previosulyBankrupt}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "Yes" when selected
                checked={formData.previosulyBankrupt === "No"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("previosulyBankrupt", "No")}
                error={fieldErrors.previosulyBankrupt}
                helperText={<span>{fieldErrors.previosulyBankrupt}</span>}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.shortForSale ? "red" : "grey",
              }}
            >
              Has The Borrower Previously Had A Foreclosure, Deed-in Lieu or
              short sale
            </label>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.shortForSale === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("shortForSale", "Yes")}
                error={fieldErrors.shortForSale}
                helperText={<span>{fieldErrors.shortForSale}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "Yes" when selected
                checked={formData.shortForSale === "No"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("shortForSale", "No")}
                error={fieldErrors.shortForSale}
                helperText={<span>{fieldErrors.shortForSale}</span>}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanPricer4;
