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
import { Divider, FormHelperText } from "@mui/material";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";

function EntityInformation({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValue, setSliderValue] = useState(1);

  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue); // Use newValue directly
    setFormData((prevData) => ({
      ...prevData,
      borrowingEntityOwned: newValue, // Update formData properly
    }));
  };

  const percentageMarks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];
  return (
    <div style={{ width: "100%" }}>
      {" "}
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Entity Information
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Please choose one existing entity or enter the information about the
          new borrowing entity.<br></br>
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <FormControl
            component="fieldset"
            error={Boolean(fieldErrors?.guranteeLoan)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography type="p" color="black">
              Is the Borrower an Authorized Signatory?{" "}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="authorizedSignatory" // Name should match the key in formData
                value={formData.authorizedSignatory || ""} // Ensure the selected value is controlled
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignatory: e.target.value, // Correctly update formData
                  })
                }
              >
                <FormControlLabel
                  style={{ color: "black" }}
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  style={{ color: "black" }}
                  value="No"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </Box>
            {fieldErrors?.authorizedSignatory && (
              <FormHelperText error>
                {fieldErrors.authorizedSignatory}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography type="p" color="black">
            Do you have the Borrowing Entity Information?
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{ justifyContent: "center" }}
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
          {fieldErrors.borrowingEntityInformation && (
            <FormHelperText error style={{ textAlign: "center" }}>
              {fieldErrors.borrowingEntityInformation}
            </FormHelperText>
          )}

          {formData.borrowingEntityInformation === "Yes" && (
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Typography type="p" color="black">
                  Entity Name
                </Typography>
                <TextField
                  style={{ width: "100%", backgroundColor: "white" }}
                  value={formData.entityName || ""}
                  size="large"
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  onChange={(e) =>
                    setFormData({ ...formData, entityName: e.target.value })
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Entity Type
                  </Typography>
                  <Select
                    style={{ backgroundColor: "white" }}
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    value={formData.entityType || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, entityType: e.target.value })
                    }
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Entity Type"
                  >
                    <MenuItem value={"Corporation"}>Corporation</MenuItem>
                    <MenuItem value={"Limited Liability Company"}>
                      Limited Liability Company
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography type="p" color="black">
                  Date of Incorporation
                </Typography>
                <TextField
                  style={{ width: "100%", backgroundColor: "white" }}
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
              <Grid item sm={6} xs={12}>
                <Typography type="p" color="black">
                  Contact Last Name
                </Typography>
                <TextField
                  style={{ width: "100%", backgroundColor: "white" }}
                  value={formData.contactLastName || ""}
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactLastName: e.target.value,
                    })
                  }
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography type="p" color="black">
                  Entity Address
                </Typography>
                <TextField
                  style={{ width: "100%", backgroundColor: "white" }}
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  value={formData.entityAddress || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, entityAddress: e.target.value })
                  }
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography component="p" color="black">
                  What percentage of the borrowing entity does this borrower
                  own?
                </Typography>
                <div style={{ width: "100%" }}>
                  <Slider
                    value={Number(formData.borrowingEntityOwned) || 0} // Ensure numeric value
                    onChange={handleSliderChange} // Pass function reference directly
                    min={0}
                    max={100}
                    step={1}
                    marks={percentageMarks}
                    valueLabelDisplay="auto"
                    style={{ color: "#498dd6", width: "80%" }} // Ensure slider takes full width
                  />
                </div>
              </Grid>

              {/* <Grid item xs={12} sx={{}}>
                <Typography type="p" color="black">
                  What percentage of the borrowing entity does this borrower
                  own?{" "}
                </Typography>
                <div style={{ width: "100%" }}>
                  <Slider
                    value={formData.borrowingEntityOwned || "0"}
                    onChange={(event) => handleChange2(event)}
                    min={0}
                    max={100}
                    step={1}
                    marks={percentageMarks}
                    valueLabelDisplay="auto"
                    style={{ color: "#498dd6", width: "100%" }} // Ensure slider takes full width
                  />
                </div>
              </Grid> */}
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default EntityInformation;
