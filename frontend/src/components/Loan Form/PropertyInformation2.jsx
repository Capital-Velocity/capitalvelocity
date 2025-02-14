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
import { Divider, FormHelperText } from "@mui/material";

function PropertyInformation2({ formData, setFormData, fieldErrors }) {
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
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Typography type="p" color="black">
              Is the borrower authorized signatory?
            </Typography>

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
            {fieldErrors.authorizedSignatory && (
              <FormHelperText error>
                {fieldErrors.authorizedSignatory}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth style={{ minWidth: "", padding: "" }}>
              <Typography type="p" color="black">
                Purchase or Refinance
              </Typography>
              <Select
                style={{
                  backgroundColor: "white",
                  minHeight: "50px", // Increases height for better touch support
                  fontSize: "16px", // Ensures readable text
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
              {/* FormHelperText to display the error message */}
              {fieldErrors.purchaseorRefinance && (
                <FormHelperText error>
                  {fieldErrors.purchaseorRefinance}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyInformation2;
