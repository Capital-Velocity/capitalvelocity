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
import CheckoutSteps from "./CheckoutSteps3";

function GetToKnowYou({ formData, setFormData, fieldErrors }) {
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
      <CheckoutSteps step1></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Let's get to know you better
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Help us see where you are and where you want to be.
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                How much Money you looking make per year?
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

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                What positions have you held?
              </Typography>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={top100Films}
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
                    value={formData.positionsHeld || ""}
                    error={fieldErrors.positionsHeld}
                    style={{ backgroundColor: "white" }}
                    helperText={<span>{fieldErrors.positionsHeld}</span>}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        positionsHeld: e.target.value,
                      })
                    }
                    {...params}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Average Monthly Sales you've managed to achieve?*
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
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Business Ownership Percentage are you looking for?
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

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                What of the following apply to you?
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
                    value={formData.whichApply || ""}
                    error={fieldErrors.whichApply}
                    style={{ backgroundColor: "white" }}
                    helperText={<span>{fieldErrors.whichApply}</span>}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        whichApply: e.target.value,
                      })
                    }
                    {...params}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
                  Speed of purchase
                </MenuItem>
                <MenuItem value={"$5-7k"}>
                  Purchasing Business your passionate about
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default GetToKnowYou;
