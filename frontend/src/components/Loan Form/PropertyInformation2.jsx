import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function PropertyInformation2({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Property Information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please add a property and tell us how the property was sourced and how
          the loan will be repaid. Remember we do NOT lend on borrower occupied
          properties.
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Purchase or Refinance{" "}
              </InputLabel>
              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: 100,
                  },
                }}
                value={formData.purchaseorRefinance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseorRefinance: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Purchase"}>Purchase</MenuItem>
                <MenuItem value={"Refinance"}>Refinance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 100,
                color: fieldErrors.authorizedSignatory ? "red" : "grey",
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
                checked={formData.authorizedSignatory === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("authorizedSignatory", "Yes")
                }
                error={fieldErrors.authorizedSignatory}
                helperText={<span>{fieldErrors.authorizedSignatory}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.authorizedSignatory === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("authorizedSignatory", "No")}
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

export default PropertyInformation2;
