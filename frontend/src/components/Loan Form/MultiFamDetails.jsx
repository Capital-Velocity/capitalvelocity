import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider } from "@mui/material";

function MultiFamDetails({ formData, setFormData, fieldErrors }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const top100Films = [
    { title: "Cleanout" },
    { title: "Light and cosmetic" },
    { title: "Gut Rehab" },
    { title: "Moderate rehab" },
    { title: "New Construction" },
    { title: "No Renovation planned" },
  ];
  const fixedOptions = [top100Films[5]];
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
      {/* <CheckoutSteps step1 step2 step3 step4 step5></CheckoutSteps> */}

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Other Details
        </Typography>
        {/* 
        <Typography variant="subtitle1" color="black" gutterBottom>
          Purchase information
        </Typography>
        */}
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What is the As-Is Value?
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.asIsValue || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      asIsValue: e.target.value,
                    })
                  }
                  required
                  error={fieldErrors.asIsValue}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.asIsValue}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          {/* <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What is the After repair value?
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.afterRepairValue || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      afterRepairValue: e.target.value,
                    })
                  }
                  required
                  error={fieldErrors.afterRepairValue}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.afterRepairValue}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Exit Strategy
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                error={fieldErrors.exitStrat}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.exitStrat || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    exitStrat: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Refinance"}>Refinance</MenuItem>
                <MenuItem value={"Sale"}>Sale</MenuItem>
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.propertyType && (
                <FormHelperText error>
                  {fieldErrors.propertyType}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
              Please outline the background / story for this opportunity (what
              is it about this deal that you like)
            </label>
            <TextField
              style={{ backgroundColor: "white" }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  background: e.target.value,
                })
              }
              error={fieldErrors.background}
              value={formData.background || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm={12}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
              Can you outline all of the red flags or concerns that we should be
              aware of? (What should we know at the beginning of this process
              that may have an impact on how we look at the deal?)
            </label>
            <TextField
              onChange={(e) =>
                setFormData({
                  ...formData,
                  redFlags: e.target.value,
                })
              }
              style={{ backgroundColor: "white" }}
              error={fieldErrors.redFlags}
              value={formData.redFlags || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamDetails;
