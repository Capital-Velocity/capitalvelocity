import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";

function BorrowerStep2({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div style={{ width: "100%" }}>
      {" "}
      <CheckoutSteps step1></CheckoutSteps>
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
            {" "}
            <FormControl fullWidth>
              <Grid item sm={12}>
                <TextField fullWidth />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6} style={{ visibility: "hidden" }}>
            {" "}
            <FormControl fullWidth>
              <Grid item sm={12}>
                <TextField fullWidth />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.guranteeLoan ? "red" : "grey",
                width: "100%",
              }}
            >
              Will this borrower be personally guaranteeing this loan?
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.guranteeLoan === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("guranteeLoan", "Yes")}
                error={fieldErrors.guranteeLoan}
                helperText={<span>{fieldErrors.guranteeLoan}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.guranteeLoan === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("guranteeLoan", "No")}
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
                color: fieldErrors.authorizedSign ? "red" : "grey",
              }}
            >
              Is the borrower authorized signatory?
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.authorizedSign === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("authorizedSign", "Yes")}
                error={fieldErrors.authorizedSign}
                helperText={<span>{fieldErrors.authorizedSign}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.authorizedSign === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("authorizedSign", "No")}
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

export default BorrowerStep2;
