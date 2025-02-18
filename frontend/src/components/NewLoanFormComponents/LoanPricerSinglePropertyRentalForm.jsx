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

function LoanPricerSinglePropertyRentalForm({
  formData,
  setFormData,
  fieldErrors,
}) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      {/* <CheckoutSteps2 step1></CheckoutSteps2> */}

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Pricer
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Typography type="p" color="black">
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
              <Typography type="p" color="black">
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
              <Typography type="p" color="black">
                Loan Purpose
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
                <Typography type="p" color="black">
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

          <>
            {[
              {
                label: "Estimated As Is Value",
                key: "estimatedAsIsValue",
                startAdornment: "$",
              },
              {
                label: "Gross Monthly Rent",
                key: "grossMonthlyRent",
                startAdornment: "$",
              },
              {
                label: "Annual Taxes",
                key: "annualTaxes",
                startAdornment: "$",
              },
              {
                label: "Annual Insurance",
                key: "annualInsurance",
                startAdornment: "$",
              },
              { label: "Annual HOA Dues", key: "hoa", startAdornment: "$" },
              {
                label: "Annual Utility Expenses",
                key: "annualUtilityExpenses",
                startAdornment: "$",
              },
              {
                label: "Annual Repair/Maintenance Expenses",
                key: "annualRepair",
                startAdornment: "$",
              },
              {
                label: "Annual Property Management Fees",
                key: "propertyFees",
                startAdornment: "$",
              },
              {
                label: "Total Annual Income",
                key: "totalAnnualIncome",
                startAdornment: "$",
              },
              {
                label: "Annual Expenses",
                key: "annualExpenses",
                startAdornment: "$",
              },
              { label: "Annual NOI", key: "annualNOI", startAdornment: "$" },
              {
                label: "Target Ltv",
                key: "targetLTV",
                endAdornment: "%",
              },
            ].map((field) => (
              <Grid
                item
                sm={4}
                key={field.key}
                sx={{ marginBottom: 2, paddingX: 1 }}
              >
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    {field.label}
                  </Typography>
                  <TextField
                    style={{ backgroundColor: "white", width: "300px" }}
                    error={fieldErrors[field.key]}
                    value={formData[field.key] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.key]: e.target.value,
                      })
                    }
                    InputProps={{
                      startAdornment: field.startAdornment ? (
                        <InputAdornment position="start">
                          {field.startAdornment}
                        </InputAdornment>
                      ) : null,
                      endAdornment: field.endAdornment ? (
                        <InputAdornment position="end">
                          {field.endAdornment}
                        </InputAdornment>
                      ) : null,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
              </Grid>
            ))}
          </>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanPricerSinglePropertyRentalForm;
