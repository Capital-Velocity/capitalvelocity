import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps2 from "../CheckoutSteps2";

function LoanPricer({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <CheckoutSteps2 step1></CheckoutSteps2>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Pricer
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Typography type="p" color="grey">
              Enter property address
            </Typography>

            <TextField
              error={fieldErrors.propertyAddress}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.propertyAddress || ""}
              size="large"
              InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
              onChange={(e) =>
                setFormData({ ...formData, propertyAddress: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Select the Property Type{" "}
              </Typography>

              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.propertyType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyType: e.target.value,
                  })
                }
                error={fieldErrors.propertyType}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Single Family"}>Single Family</MenuItem>
                <MenuItem value={"Duplex"}>Duplex</MenuItem>
                <MenuItem value={"Triplex"}>Triplex</MenuItem>
                <MenuItem value={"Quadruplex"}>Quadruplex</MenuItem>
                <MenuItem value={"Warrantable Condominium"}>
                  Warrantable Condominium
                </MenuItem>
                <MenuItem value={"Townhome"}>Townhome</MenuItem>
                <MenuItem value={"Warrantable Condominium"}>
                  Warrantable Condominium
                </MenuItem>
                <MenuItem value={"Planned Unit Development"}>
                  Planned Unit Development
                </MenuItem>
                <MenuItem value={" 5+ Unit Multifamily"}>
                  5+ Unit Multifamily
                </MenuItem>
                <MenuItem value={"Mixed Use"}>Mixed Use</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Loan Purpose *
              </Typography>

              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                error={fieldErrors.loanPurpose}
                value={formData.loanPurpose || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanPurpose: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Entity Type"
              >
                <MenuItem value={"Purchase"}>Purchase</MenuItem>
                <MenuItem value={"Refinance"}>Refinance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Grid item sm={12}>
                {" "}
                <Typography type="p" color="grey">
                  Purchase Price
                </Typography>
                <TextField
                  error={fieldErrors.purchasePriceProperty}
                  style={{ width: "500px", backgroundColor: "white" }}
                  value={formData.purchasePriceProperty || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      purchasePriceProperty: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanPricer;
