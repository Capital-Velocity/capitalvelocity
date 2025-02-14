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
        <Typography variant="subtitle1" color="black" gutterBottom>
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
          Is this an arm’s length transaction, where the buyer and seller act
          independently and in their own best interests, negotiating for the
          most favorable terms without any special relationship influencing the
          deal?
        </label>

        <FormControl
          fullWidth
          error={!!fieldErrors.bestTerms}
          style={{ display: "flex", alignItems: "center" }}
        >
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
              <Grid item xs={12} sm={6}>
                <Typography type="p" color="black">
                  Please describe:
                </Typography>
                <TextField
                  style={{
                    width: "100%", // Use 100% width for responsiveness
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
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}
        </div>
      </Container>
    </div>
  );
}

export default BorrowerStep4;
