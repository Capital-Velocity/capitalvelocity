import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SBA7({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Business Information (if applicable)
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is any sole proprietor, partner, officer, director, stockholder,
              with a 10 percent or more interest in the Business of federal
              government employee or a Household Member of an federal government
              employee?
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
                checked={formData.federalGovernmentEmployee === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("federalGovernmentEmployee", "Yes")
                }
                error={fieldErrors.federalGovernmentEmployee}
                helperText={
                  <span>{fieldErrors.federalGovernmentEmployee}</span>
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.federalGovernmentEmployee === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("federalGovernmentEmployee", "No")
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is any employee, owner, partner, attorney, agent, owner of stock,
              officer, director, creditor or debtor of the Business of former
              government employee who has been separated from federal government
              for less than one year prior to the request for financial
              assistance?
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
                checked={formData.SeperatefederalGovernmentEmployee === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("SeperatefederalGovernmentEmployee", "Yes")
                }
                error={fieldErrors.SeperatefederalGovernmentEmployee}
                helperText={
                  <span>{fieldErrors.SeperatefederalGovernmentEmployee}</span>
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.SeperatefederalGovernmentEmployee === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("SeperatefederalGovernmentEmployee", "No")
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is any sole proprietor, general partner, officer, director, or
              stockholder with a 10 percent or more interest in the Business, or
              a household member of such individual, a member of Congress, or an
              appointed official or employee of the legislative or judicial
              branch of the Federal Government?
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
                checked={formData.tenPercentageFederal === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("tenPercentageFederal", "Yes")
                }
                error={fieldErrors.tenPercentageFederal}
                helperText={<span>{fieldErrors.tenPercentageFederal}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.tenPercentageFederal === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("tenPercentageFederal", "No")
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is any sole proprietor, general partner, officer, director, or
              stockholder with a 10 percent or more interest in the Business, or
              a household member of such individual, a Federal Government
              employee or Member of the Military having a grade of at least
              GS-13 or higher (or Military equivalent)?
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
                checked={formData.tenPercentageGS13 === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("tenPercentageGS13", "Yes")}
                error={fieldErrors.tenPercentageGS13}
                helperText={<span>{fieldErrors.tenPercentageGS13}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.tenPercentageGS13 === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("tenPercentageGS13", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>

          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is any sole proprietor, general partner, officer, director, or
              stockholder with a 10 percent or more interest in the Business, or
              a household member of such individual, a member or employee of a
              Small Business Advisory Council or a SCORE volunteer?
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
                checked={formData.score === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("score", "Yes")}
                error={fieldErrors.score}
                helperText={<span>{fieldErrors.score}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.score === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("score", "No")}
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

export default SBA7;
