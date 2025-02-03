import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SBA11({ formData, setFormData, fieldErrors }) {
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
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.isIndictment ? "red" : "grey",
              }}
            >
              <strong></strong>Are you presently subject to an indictment,
              criminal information, arraignment, or other means by which formal
              criminal charges are brought in any jurisdiction? (If "YES," the
              loan request is not eligible for SBA assistance.)
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.isIndictment === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("isIndictment", "Yes")}
                error={fieldErrors.isIndictment}
                helperText={<span>{fieldErrors.isIndictment}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.isIndictment === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("isIndictment", "No")}
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
                color: fieldErrors.isArrested ? "red" : "grey",
              }}
            >
              <strong></strong> Have you been arrested in the last 6 months for
              any criminal offense?
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.isArrested === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("isArrested", "Yes")}
                error={fieldErrors.isArrested}
                helperText={<span>{fieldErrors.isArrested}</span>}
                control={<Radio />}
                label="Yes"
              />

              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.isArrested === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("isArrested", "No")}
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
                color: fieldErrors.isCriminalOffense ? "red" : "grey",
              }}
            >
              <strong></strong> For any criminal offense - other than a minor
              vehicle violation - have you ever: 1) been convicted; 2) pleaded
              guilty; 3) pleaded nolo contendere; 4) been placed on pretrial
              diversion; or 5) been placed on any form of parole or probation
              (including probation before judgment)?
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.isCriminalOffense === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("isCriminalOffense", "Yes")}
                error={fieldErrors.isCriminalOffense}
                helperText={<span>{fieldErrors.isCriminalOffense}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.isCriminalOffense === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("isCriminalOffense", "No")}
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

export default SBA11;
