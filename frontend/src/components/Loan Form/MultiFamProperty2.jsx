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
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Add new property
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Purchase information
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Are you looking for cash-out? *
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.cashOut === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("cashOut", "Yes")}
                error={fieldErrors.cashOut}
                helperText={<span>{fieldErrors.cashOut}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "Yes" when selected
                checked={formData.cashOut === "No"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("cashOut", "No")}
                error={fieldErrors.cashOut}
                helperText={<span>{fieldErrors.cashOut}</span>}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Is there any debt? *
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.debt === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("debt", "Yes")}
                error={fieldErrors.debt}
                helperText={<span>{fieldErrors.debt}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "Yes" when selected
                checked={formData.debt === "No"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("debt", "No")}
                error={fieldErrors.debt}
                helperText={<span>{fieldErrors.debt}</span>}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          {formData.debt === "Yes" && (
            <Grid item sm={6} style={{ marginBottom: 10 }}>
              <Typography type="p" color="grey">
                How much Debt is there?
              </Typography>
              <TextField
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.debtValue || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, debtValue: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
          {formData.debt === "Yes" && (
            <Grid
              container
              spacing={2}
              style={{ marginLeft: 2, marginBottom: 5 }}
            >
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.grossMonthlyRent || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      grossMonthlyRent: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Gross Monthly Rent *"
                  variant="outlined"
                />
              </Grid>

              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualTaxes || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({ ...formData, annualTaxes: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Taxes *"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualInsurance || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualInsurance: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Insurance*"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualHOADues || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualHOADues: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual HOA Dues *"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualUtilitiesExpenses || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualUtilitiesExpenses: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Utilities Expenses *"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualRepairsMaintenanceExpenses || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualRepairsMaintenanceExpenses: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Repairs & Maintenance Expenses*"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualPropertyManagementFees || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualPropertyManagementFees: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Property Management Fees *"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualAdministrativeManagementFees || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualAdministrativeManagementFees: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Administrative Management Fees *"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualPayrollExpense || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualPayrollExpense: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Payroll Expense*"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualMarketingExpense || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualMarketingExpense: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Marketing Expense*"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  style={{ width: "300px", backgroundColor: "white" }}
                  value={formData.annualReplacementReserve || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualReplacementReserve: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Annual Replacement Reserve *"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid container spacing>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="grey">
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
              style={{ width: 500, backgroundColor: "white" }}
              type="date"
              variant="outlined"
              error={fieldErrors.purchaseDate}
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="grey">
              What was the Purchase Price of the Property?
            </Typography>
            <TextField
              value={formData.purchasePrice || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  purchasePrice: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              style={{ width: 500, backgroundColor: "white" }}
              error={fieldErrors.purchasePrice}
              type="number"
              label=" "
              fullWidth

              // Add more props as needed
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamProperty2;
