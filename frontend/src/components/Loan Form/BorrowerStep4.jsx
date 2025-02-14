import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import FormControl from "@mui/material/FormControl";
import { Divider, FormHelperText } from "@mui/material"; // Import FormHelperText

function BorrowerStep4({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <CheckoutSteps step1 />
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={6} style={{ visibility: "hidden" }}>
            <FormControl fullWidth>
              <Grid item sm={12}>
                <TextField fullWidth />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6} style={{ visibility: "hidden" }}>
            <FormControl fullWidth>
              <Grid item sm={12}>
                <TextField fullWidth />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>

        <label
          style={{
            fontSize: 15,
            fontWeight: 300,
          }}
        >
          Is the transaction arm’s length where buyer and seller are trying to
          get the best terms for their respective sides? *
        </label>

        <FormControl fullWidth error={!!fieldErrors.bestTerms}>
          {" "}
          {/* Error prop here */}
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              style={{ color: "black" }}
              value="Yes" // Set the value to "Yes" when selected
              checked={formData.bestTerms === "Yes"} // Check if it's "Yes" in formData
              onChange={() => handleOptionChange("bestTerms", "Yes")}
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              style={{ color: "black" }}
              value="No" // Set the value to "No" when selected
              checked={formData.bestTerms === "No"} // Check if it's "No" in formData
              onChange={() => handleOptionChange("bestTerms", "No")}
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
          {/* Display FormHelperText for error messages */}
          {fieldErrors.bestTerms && (
            <FormHelperText>{fieldErrors.bestTerms}</FormHelperText>
          )}
        </FormControl>

        <div style={{ marginTop: 20 }}>
          {formData.bestTerms === "Yes" && (
            <Grid container spacing={2}>
              <TextField
                style={{
                  width: "500px",
                  marginTop: 10,
                  backgroundColor: "white",
                }}
                value={formData.armsLengthDescription || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    armsLengthDescription: e.target.value,
                  })
                }
                label="Please describe"
                variant="outlined"
              />
            </Grid>
          )}
        </div>
      </Container>
    </div>
  );
}

export default BorrowerStep4;
