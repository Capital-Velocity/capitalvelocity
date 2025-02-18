import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "../CheckoutSteps";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Divider } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

function MultiFamProperty2({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [selectedOption2, setSelectedOption2] = useState("no");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div style={{ width: "100%" }}>
      {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Add New Property
        </Typography>
        {/* <Typography variant="subtitle1" color="black" gutterBottom>
          Purchase Information
        </Typography> */}
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={12} xs={12} sx={{ textAlign: "center" }}>
            <FormControl
              component="fieldset"
              error={Boolean(fieldErrors?.cashOut)}
            >
              <Typography type="p" color="black">
                Are you looking for cash-out?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="cashOut"
                  value={formData.cashOut || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cashOut: e.target.value,
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
              {fieldErrors?.cashOut && (
                <FormHelperText sx={{ textAlign: "center" }}>
                  {fieldErrors.cashOut}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item sm={12} xs={12} sx={{ textAlign: "center" }}>
            <FormControl
              component="fieldset"
              error={Boolean(fieldErrors?.debt)}
            >
              <Typography type="p" color="black">
                Is there any debt?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="debt"
                  value={formData.debt || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      debt: e.target.value,
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
              {fieldErrors?.debt && (
                <FormHelperText sx={{ textAlign: "center" }}>
                  {fieldErrors.debt}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {formData.debt === "Yes" && (
            <>
              <Grid item sm={6} xs={12} style={{ marginBottom: 10 }}>
                <Typography type="p" color="black">
                  How much Debt is there?
                </Typography>
                <TextField
                  style={{ backgroundColor: "white" }}
                  value={formData.debtValue || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({ ...formData, debtValue: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              {[
                { label: "Gross Monthly Rent *", key: "grossMonthlyRent" },
                { label: "Annual Taxes *", key: "annualTaxes" },
                { label: "Annual Insurance *", key: "annualInsurance" },
                { label: "Annual HOA Dues *", key: "annualHOADues" },
                {
                  label: "Annual Utilities Expenses *",
                  key: "annualUtilitiesExpenses",
                },
                {
                  label: "Annual Repairs & Maintenance Expenses *",
                  key: "annualRepairsMaintenanceExpenses",
                },
                {
                  label: "Annual Property Management Fees *",
                  key: "annualPropertyManagementFees",
                },
                {
                  label: "Annual Administrative Management Fees *",
                  key: "annualAdministrativeManagementFees",
                },
                {
                  label: "Annual Payroll Expense *",
                  key: "annualPayrollExpense",
                },
                {
                  label: "Annual Marketing Expense *",
                  key: "annualMarketingExpense",
                },
                {
                  label: "Annual Replacement Reserve *",
                  key: "annualReplacementReserve",
                },
              ].map((field) => (
                <Grid item sm={6} xs={12} key={field.key} sx={{ paddingX: 1 }}>
                  <FormControl fullWidth>
                    <Typography type="p" color="black">
                      {field.label}
                    </Typography>
                    <TextField
                      style={{ backgroundColor: "white" }}
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              ))}
            </>
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
            <FormControl fullWidth error={Boolean(fieldErrors?.purchaseDate)}>
              <Typography type="p" color="black">
                Purchase Date
              </Typography>
              <TextField
                value={formData.purchaseDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseDate: e.target.value,
                  })
                }
                style={{ backgroundColor: "white" }}
                type="date"
                variant="outlined"
                error={Boolean(fieldErrors?.purchaseDate)}
                helperText={fieldErrors?.purchaseDate || ""}
                fullWidth
              />
            </FormControl>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What was the Purchase Price of the Property?
              </Typography>{" "}
              <TextField
                value={formData.propertyPurchasePrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyPurchasePrice: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                style={{ backgroundColor: "white" }}
                error={fieldErrors.propertyPurchasePrice}
                type="number"
                label=" "
                fullWidth

                // Add more props as needed
              />
            </FormControl>
            FormHelperText to display the error message
            {fieldErrors.closingDate && (
              <FormHelperText error>{fieldErrors.closingDate}</FormHelperText>
            )}
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamProperty2;
