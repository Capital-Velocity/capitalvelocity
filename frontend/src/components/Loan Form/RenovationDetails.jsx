import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider } from "@mui/material";
import FormControl from "@mui/material/FormControl";

function RenovationDetails({ formData, setFormData, fieldErrors }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const top100Films2 = [
    { title: "Cleanout" },
    { title: "Light and cosmetic" },
    { title: "Gut Rehab" },
    { title: "Moderate rehab" },
    { title: "New Construction" },
    { title: "No Renovation planned" },
  ];
  const fixedOptions2 = [top100Films2[5]];
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [investedCapital, setInvestedCapital] = useState("");
  const [completedCapex, setCompletedCapex] = useState("");

  const totalBudget = parseFloat(investedCapital) + parseFloat(completedCapex);

  const handleInvestedCapitalChange = (event) => {
    setInvestedCapital(event.target.value);
    setFormData({ ...formData, investedCapital: investedCapital });
  };

  const handleCompletedCapexChange = (event) => {
    setCompletedCapex(event.target.value);
    setFormData({ ...formData, completedCapex: completedCapex });
  };
  return (
    <div style={{ width: "100%" }}>
      {/* <CheckoutSteps step1 step2 step3 step4></CheckoutSteps> */}

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Renovation Details
        </Typography>
        {/* 
        <Typography variant="subtitle1" color="black" gutterBottom>
          Purchase information
        </Typography>
        */}
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl
              fullWidth
              error={Boolean(fieldErrors?.investedCapital)}
            >
              <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
                What is the renovation budget including renovation capital that
                has already been invested plus the amount required to complete
                the project?
              </label>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: "$",
                }}
                style={{ backgroundColor: "white" }}
                value={formData.investedCapital || ""}
                error={Boolean(fieldErrors?.investedCapital)}
                helperText={fieldErrors?.investedCapital || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    investedCapital: e.target.value,
                  })
                }
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth error={Boolean(fieldErrors?.completedCapex)}>
              <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
                How much has been invested in completed capex to date?
              </label>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: "$",
                }}
                style={{ marginTop: 22, backgroundColor: "white" }}
                value={formData.completedCapex || ""}
                error={Boolean(fieldErrors?.completedCapex)}
                helperText={fieldErrors?.completedCapex || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    completedCapex: e.target.value,
                  })
                }
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle1" style={{ color: "black" }}>
                Total Budget: $
                {isNaN(totalBudget) ? "0.00" : totalBudget.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <label style={{ fontWeight: 300 }}>
              Please describe the renovation
            </label>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={top100Films2}
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
              style={{
                width: "100%", // Make sure the component takes full width
                backgroundColor: "white",
              }}
              renderInput={(params) => (
                <TextField
                  multiline
                  style={{ backgroundColor: "white" }}
                  value={formData.renovationDescript || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      renovationDescript: e.target.value,
                    })
                  }
                  {...params}
                  error={fieldErrors.renovationDescript}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      minHeight: "56px", // Ensures consistent input height
                      backgroundColor: "white",
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default RenovationDetails;
