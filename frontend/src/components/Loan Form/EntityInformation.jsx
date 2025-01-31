import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function EntityInformation({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
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
          Entity Information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please choose one existing entity or enter the information about the
          new borrowing entity.<br></br>
        </Typography>
        <label
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: fieldErrors.borrowingEntityInformation ? "red" : "grey",
          }}
        >
          Do You Have The Borrowing Entity Information?
        </label>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            style={{ color: "black" }}
            value="Yes" // Set the value to "Yes" when selected
            checked={formData.borrowingEntityInformation === "Yes"} // Check if it's "Yes" in formData
            onChange={() =>
              handleOptionChange("borrowingEntityInformation", "Yes")
            }
            error={fieldErrors.borrowingEntityInformation}
            helperText={<span>{fieldErrors.borrowingEntityInformation}</span>}
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            style={{ color: "black" }}
            value="No" // Set the value to "Yes" when selected
            checked={formData.borrowingEntityInformation === "No"} // Check if it's "Yes" in formData
            onChange={() =>
              handleOptionChange("borrowingEntityInformation", "No")
            }
            error={fieldErrors.borrowingEntityInformation}
            helperText={<span>{fieldErrors.borrowingEntityInformation}</span>}
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
        {formData.borrowingEntityInformation === "Yes" && (
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.entityName || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, entityName: e.target.value })
                }
                label="Entity Name"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  style={{
                    fontSize: 15,
                    fontWeight: 100,
                    backgroundColor: "white",
                  }}
                  id="demo-simple-select-label"
                >
                  Entity Type{" "}
                </InputLabel>
                <Select
                  style={{ width: "500px", backgroundColor: "white" }}
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  value={formData.entityType || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, entityType: e.target.value })
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Entity Type"
                >
                  <MenuItem value={"Corperation"}>Corperation</MenuItem>
                  <MenuItem value={"Limited Liability Company"}>
                    Limited Liability Company
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
                Date of Incorporation
              </label>
              <TextField
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.dateofIncorp || ""}
                InputLabelProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: 100,
                    backgroundColor: "white",
                  },
                }}
                onChange={(e) =>
                  setFormData({ ...formData, dateofIncorp: e.target.value })
                }
                type="date"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.contactLastName || ""}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, contactLastName: e.target.value })
                }
                id="outlined-basic"
                label="Contact Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.entityAddress || ""}
                onChange={(e) =>
                  setFormData({ ...formData, entityAddress: e.target.value })
                }
                id="outlined-basic"
                label="Entity Address"
                variant="outlined"
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default EntityInformation;
