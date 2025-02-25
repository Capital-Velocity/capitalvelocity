import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Divider } from "../../../node_modules/@mui/material/index";
import Container from "../../screens/Container";
// import CheckoutSteps from "./CheckoutSteps3";
import FormHelperText from "@mui/material/FormHelperText";

function BackgroundInformationProjectEpic99({
  formData,
  setFormData,
  fieldErrors,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const dateOptions = Array.from({ length: 31 }, (_, index) => index + 1); // Generate an array from 1 to 31
  const startYear = 1930;
  const endYear = 2023;
  const stateOptions = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const top100Films = [
    { title: "Chief Executive Officer" },
    { title: "Chief Financial Officer" },
    { title: "Chief Operations Officer" },
    { title: "President" },
    { title: "Vice President" },
    { title: "Controller" },
    { title: "Sales Manager" },
    { title: "Area Sales Director" },
    { title: "Manager Retail Sales" },
    { title: "Manager General" },
    { title: "Assistant General Manager" },
    { title: "Team Leader" },
    { title: "Supervisory Manager" },
    { title: "Middle Management" },
    { title: "Coach" },
    { title: "Other" },
    { title: "Want to train to Run Companies." },
  ];
  const top100Films1 = [
    { title: "Have a prior bankruptcy" },
    { title: "Operated a franchise" },
    { title: "Operated a non-profit" },
    { title: "Used Quickbooks" },
    { title: "Used Accounting Software" },
    { title: "Used Sales Force" },
    { title: "Sales Manager" },
  ];
  const yearOptions = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      armsLength: event.target.value,
    });
  };
  return (
    <div>
      {/* <CheckoutSteps step1></CheckoutSteps> */}

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Background Information
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Help us see where you are and where you want to be.
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What motivates you?
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.motivation || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      motivation: e.target.value,
                    })
                  }
                  error={fieldErrors.motivation}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.motivation}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                How much money are you looking to make per year?
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.moneyperYear || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      moneyperYear: e.target.value.slice(0, 9),
                    })
                  }
                  type="number"
                  error={fieldErrors.moneyperYear}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.moneyperYear}</span>}
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& input[type='number']": {
                      "-webkit-appearance": "none",
                      "-moz-appearance": "textfield",
                      appearance: "none",
                    },
                    "& input::-webkit-outer-spin-button": {
                      appearance: "none",
                      margin: 0,
                    },
                    "& input::-webkit-inner-spin-button": {
                      appearance: "none",
                      margin: 0,
                    },
                  }}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Business or Industry you have experience in?
              </Typography>

              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.industryExperience || ""}
                error={fieldErrors.industryExperience}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.industryExperience}</span>}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    industryExperience: e.target.value,
                  })
                }
              >
                <MenuItem value={"Agriculture, Forestry, Fishing and Hunting"}>
                  Agriculture, Forestry, Fishing and Hunting
                </MenuItem>
                <MenuItem value={"Arts, Entertainment, and Recreation"}>
                  Arts, Entertainment, and Recreation
                </MenuItem>
                <MenuItem value={"Adult Entertainment"}>
                  Adult Entertainment
                </MenuItem>
                <MenuItem value={"Gambling"}>Gambling</MenuItem>
                <MenuItem value={"Automobile Dealers & Parts"}>
                  Automobile Dealers & Parts
                </MenuItem>
                <MenuItem value={"Construction"}>Construction</MenuItem>
                <MenuItem value={"Ecommerce"}>Ecommerce</MenuItem>
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Finance and Insurance"}>
                  Finance and Insurance
                </MenuItem>
                <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                <MenuItem value={"Social Assistance"}>
                  Social Assistance
                </MenuItem>
                <MenuItem value={"IT, Media, or Publishing"}>
                  IT, Media, or Publishing
                </MenuItem>
                <MenuItem value={"Legal Services"}>Legal Services</MenuItem>
                <MenuItem value={"Mining (except Oil and Gas)"}>
                  Mining (except Oil and Gas)
                </MenuItem>
                <MenuItem value={"Oil and Gas Extraction"}>
                  Oil and Gas Extraction
                </MenuItem>
                <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                <MenuItem
                  value={"Political, Governmental, or Public Organizations"}
                >
                  Political, Governmental, or Public Organizations
                </MenuItem>
                <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
                <MenuItem value={"Religious Organizations"}>
                  Religious Organizations
                </MenuItem>
                <MenuItem value={"Restaurants and Food Services"}>
                  Retail Stores
                </MenuItem>
                <MenuItem value={"Real Estate"}>Firearm Sales</MenuItem>
                <MenuItem value={"Gas Stations"}>Gas Stations</MenuItem>
                <MenuItem value={"Transportation and Warehousing"}>
                  Transportation and Warehousing
                </MenuItem>
                <MenuItem value={"Freight Trucking"}>Freight Trucking</MenuItem>
                <MenuItem value={"Travel Agencies"}>Travel Agencies</MenuItem>
                <MenuItem value={"Utilities"}>Utilities</MenuItem>
                <MenuItem value={"All Other"}>All Other</MenuItem>
              </Select>
              {fieldErrors.industryExperience && (
                <FormHelperText error>
                  {fieldErrors.industryExperience}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography type="p" color="black">
              Which positions have you held?
            </Typography>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={top100Films}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title} // ✅ No undefined error now
              value={top100Films.filter((option) =>
                formData.positionsHeld?.includes(option.title)
              )} // ✅ Ensures only valid options are shown
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  positionsHeld: newValue.map((option) => option.title), // ✅ Store only titles
                });
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              style={{
                width: "100%",
                backgroundColor: "white",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  multiline
                  error={!!fieldErrors.positionsHeld}
                  helperText={fieldErrors.positionsHeld}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      minHeight: "56px",
                      maxHeight: "150px",
                      overflowY: "auto",
                      backgroundColor: "white",
                    },
                  }}
                />
              )}
              sx={{
                "& .MuiAutocomplete-tag": {
                  marginBottom: "5px",
                },
              }}
            />
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                When are you looking to be running our company?
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.runningCompany || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      runningCompany: e.target.value,
                    })
                  }
                  type="date"
                  error={fieldErrors.runningCompany}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.runningCompany}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What state do you want to do business in?
              </Typography>
              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={fieldErrors.stateBusiness}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.stateBusiness}</span>}
                value={formData.stateBusiness || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stateBusiness: e.target.value,
                  })
                }
              >
                {stateOptions.map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
              {fieldErrors.stateBusiness && (
                <FormHelperText error>
                  {fieldErrors.stateBusiness}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Average Monthly Sales you've managed to achieve?
              </Typography>
              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={fieldErrors.monthlySalesExpected}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.monthlySalesExpected}</span>}
                value={formData.monthlySalesExpected || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    monthlySalesExpected: e.target.value,
                  })
                }
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={"$0"}>$0</MenuItem>
                <MenuItem value={"$1-4k"}>$1-4k</MenuItem>
                <MenuItem value={"$5-7k"}>$5-7k</MenuItem>
                <MenuItem value={"$8-14k"}>$8-14k</MenuItem>
                <MenuItem value={"$15-19k"}>$15-19k</MenuItem>
                <MenuItem value={"$20-49k"}>$20-49k</MenuItem>
                <MenuItem value={"$50-79k"}>$50-79k</MenuItem>
                <MenuItem value={"$80-199k"}>$80-199k</MenuItem>
                <MenuItem value={"$200k+"}>$200k+</MenuItem>
              </Select>
              {fieldErrors.monthlySalesExpected && (
                <FormHelperText error>
                  {fieldErrors.monthlySalesExpected}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Business Ownership Percentage you are looking for?
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.businessPercentage || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessPercentage: e.target.value.slice(0, 9),
                    })
                  }
                  type="number"
                  error={fieldErrors.businessPercentage}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.businessPercentage}</span>}
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& input[type='number']": {
                      "-webkit-appearance": "none",
                      "-moz-appearance": "textfield",
                      appearance: "none",
                    },
                    "& input::-webkit-outer-spin-button": {
                      appearance: "none",
                      margin: 0,
                    },
                    "& input::-webkit-inner-spin-button": {
                      appearance: "none",
                      margin: 0,
                    },
                  }}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography type="p" color="black">
              Which of the following apply to you?
            </Typography>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={top100Films1}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{
                      marginRight: 8,
                    }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  multiline
                  error={!!fieldErrors.whichApply}
                  helperText={fieldErrors.whichApply}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      minHeight: "56px",
                      maxHeight: "150px",
                      overflowY: "auto",
                      backgroundColor: "white",
                    },
                  }}
                />
              )}
              sx={{
                "& .MuiAutocomplete-tag": {
                  marginBottom: "5px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Which is most important to you?
              </Typography>
              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={fieldErrors.whichImportant}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.whichImportant}</span>}
                value={formData.whichImportant || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whichImportant: e.target.value,
                  })
                }
              >
                <MenuItem value={"Quality of Company"}>
                  Quality of Company
                </MenuItem>
                <MenuItem value={"Speed of purchase"}>
                  Speed of Purchase
                </MenuItem>
                <MenuItem value={"$5-7k"}>
                  Purchasing a Business you are Passionate About
                </MenuItem>
              </Select>
              {fieldErrors.whichImportant && (
                <FormHelperText error>
                  {fieldErrors.whichImportant}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BackgroundInformationProjectEpic99;
