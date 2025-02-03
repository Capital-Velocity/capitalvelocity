import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SBA13({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Individual Owner Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.suspendedFederal ? "red" : "grey",
              }}
            >
              <strong></strong> Are you presently suspended, debarred, proposed
              for debarment, declared ineligible, or voluntarily excluded from
              participation in this transaction by any Federal department or
              agency?
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
                checked={formData.suspendedFederal === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("suspendedFederal", "Yes")}
                error={fieldErrors.suspendedFederal}
                helperText={<span>{fieldErrors.suspendedFederal}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.suspendedFederal}
                checked={formData.suspendedFederal === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("suspendedFederal", "No")}
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
                color: fieldErrors.daysDelenquet ? "red" : "grey",
              }}
            >
              <strong></strong>
              Are you more than 60 days delinquent on any obligation to pay
              child support arising under an administrative order, court order,
              repayment agreement between the holder and a custodial parent, or
              repayment agreement between the holder and a state agency
              providing child support enforcement services.
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
                checked={formData.daysDelenquet === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("daysDelenquet", "Yes")}
                error={fieldErrors.daysDelenquet}
                helperText={<span>{fieldErrors.daysDelenquet}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.daysDelenquet}
                checked={formData.daysDelenquet === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("daysDelenquet", "No")}
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
                color: fieldErrors.smallBusiness ? "red" : "grey",
              }}
            >
              Do you have any ownership in other businesses that have small
              businesses loans?
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
                checked={formData.smallBusiness === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("smallBusiness", "Yes")}
                error={fieldErrors.smallBusiness}
                helperText={<span>{fieldErrors.smallBusiness}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.smallBusiness}
                checked={formData.smallBusiness === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("smallBusiness", "No")}
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
                color: fieldErrors.bankruptcyProtection ? "red" : "grey",
              }}
            >
              Have you, or any business you controlled, ever filed for
              bankruptcy protection? If yes, provide details.
            </label>
            <div style={{ marginTop: 20 }}>
              {formData.bankruptDetail === "Yes" && (
                <TextField
                  style={{
                    width: "500px",
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  size="large"
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  label="Please describe"
                  variant="outlined"
                  value={formData.bankruptDetail || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankruptDetail: e.target.value,
                    })
                  }
                  multiline
                  rows={4}
                />
              )}
            </div>
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
                checked={formData.bankruptcyProtection === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("bankruptcyProtection", "Yes")
                }
                error={fieldErrors.bankruptcyProtection}
                helperText={<span>{fieldErrors.bankruptcyProtection}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.bankruptcyProtection}
                checked={formData.bankruptcyProtection === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("bankruptcyProtection", "No")
                }
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
                color: fieldErrors.legalAction ? "red" : "grey",
              }}
            >
              Are you, or any business you control, presently involved in any
              legal action (including divorce)? If yes, provide details.
            </label>
            <div style={{ marginTop: 20 }}>
              {formData.legalAction === "Yes" && (
                <TextField
                  style={{
                    width: "500px",
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  value={formData.legalActionDetails || ""}
                  size="large"
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      legalActionDetails: e.target.value,
                    })
                  }
                  label="Please describe"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              )}
            </div>
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
                checked={formData.legalAction === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("legalAction", "Yes")}
                error={fieldErrors.legalAction}
                helperText={<span>{fieldErrors.legalAction}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.legalAction}
                checked={formData.legalAction === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("legalAction", "No")}
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
                color: fieldErrors.loanGuarantor ? "red" : "grey",
              }}
            >
              Have you or any business owned or controlled by you ever obtained
              a direct or guaranteed loan from SBA or any other Federal agency
              or been a guarantor on such a loan? (This includes, but is not
              limited to USDA, FHA, EDA, and student loans.)
            </label>
            <div style={{ marginTop: 20 }}>
              {formData.loanGuarantor === "Yes" && (
                <TextField
                  style={{
                    width: "500px",
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  value={formData.loanDetails || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loanDetails: e.target.value,
                    })
                  }
                  size="large"
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  label="Please describe"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              )}
            </div>
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
                checked={formData.loanGuarantor === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("loanGuarantor", "Yes")}
                error={fieldErrors.loanGuarantor}
                helperText={<span>{fieldErrors.loanGuarantor}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.loanGuarantor}
                checked={formData.loanGuarantor === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("loanGuarantor", "No")}
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
                color: fieldErrors.financingDelinquent ? "red" : "grey",
              }}
            >
              If you answered "Yes" to above question, is any of the financing
              presently considered delinquent?
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
                checked={formData.financingDelinquent === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("financingDelinquent", "Yes")
                }
                error={fieldErrors.financingDelinquent}
                helperText={<span>{fieldErrors.financingDelinquent}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.financingDelinquent}
                checked={formData.financingDelinquent === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("financingDelinquent", "No")}
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
                color: fieldErrors.businessDefault ? "red" : "grey",
              }}
            >
              If you answered "Yes" to the above, did any loan that was made for
              business purposes ever default and cause a loss to the Government,
              including a compromise, resolution or settlement of a loan's
              principal balance for less than the full amount due?
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
                checked={formData.businessDefault === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("businessDefault", "Yes")}
                error={fieldErrors.businessDefault}
                helperText={<span>{fieldErrors.businessDefault}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.businessDefault}
                checked={formData.businessDefault === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("businessDefault", "No")}
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

export default SBA13;
