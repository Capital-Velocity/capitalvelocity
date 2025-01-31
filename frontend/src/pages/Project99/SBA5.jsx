import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "./CheckoutSteps3";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

function SBA5({ formData, setFormData, fieldErrors }) {
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
              Are there co-owners? (If "Yes," Make sure they are reflected in
              the previous form)
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
                checked={formData.businessCoOwner === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("businessCoOwner", "Yes")}
                error={fieldErrors.businessCoOwner}
                helperText={<span>{fieldErrors.businessCoOwner}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.businessCoOwner === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("businessCoOwner", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>

          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is any of the financing currently delinquent?
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
                checked={formData.Fnancingdelinquent === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("Fnancingdelinquent", "Yes")}
                error={fieldErrors.Fnancingdelinquent}
                helperText={<span>{fieldErrors.Fnancingdelinquent}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.Fnancingdelinquent === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("Fnancingdelinquent", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Did any of this financing ever default and cause a loss to the
              Federal Government?
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
                checked={formData.federalGovLoss === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("federalGovLoss", "Yes")}
                error={fieldErrors.federalGovLoss}
                helperText={<span>{fieldErrors.federalGovLoss}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.federalGovLoss === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("federalGovLoss", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is the Business presently suspended, debarred, proposed for
              debarment, declared ineligible, or voluntarily excluded from
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
                checked={formData.Businesspresentlysuspended === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("Businesspresentlysuspended", "Yes")
                }
                error={fieldErrors.Businesspresentlysuspended}
                helperText={
                  <span>{fieldErrors.Businesspresentlysuspended}</span>
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.Businesspresentlysuspended === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("Businesspresentlysuspended", "No")
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Does the Business operate under a
              Franchise/License/Distributor/Membership/Dealer/ Jobber or other
              type of Agreement?
            </label>
            <div style={{ marginTop: 20 }}>
              {selectedOption === "yes" && (
                <TextField
                  style={{
                    width: "500px",
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  value={formData.financeAgreeementDescription || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      financeAgreeementDescription: e.target.value,
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
                checked={formData.financeAgreeement === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("financeAgreeement", "Yes")}
                error={fieldErrors.financeAgreeement}
                helperText={<span>{fieldErrors.financeAgreeement}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.financeAgreeement === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("financeAgreeement", "No")}
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

export default SBA5;
