import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps2 from "../CheckoutSteps2";
import InputAdornment from "@mui/material/InputAdornment";

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
          Provide Property Information
        </Typography>
        <Grid container spacing={2} style={{ marginLeft: 2, marginBottom: 5 }}>
          <Grid item sm={4}>
            <TextField
              style={{ width: "300px", backgroundColor: "white" }}
              error={fieldErrors.estimatedAsIsValue}
              value={formData.estimatedAsIsValue || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimatedAsIsValue: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Estimated As Is Value"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              style={{ width: "300px", backgroundColor: "white" }}
              error={fieldErrors.grossMonthlyRent}
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
              label="Gross Monthly Rent"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              style={{ width: "300px", backgroundColor: "white" }}
              error={fieldErrors.annualTaxes}
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
              error={fieldErrors.annualInsurance}
              value={formData.annualInsurance || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({ ...formData, annualInsurance: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Annual Insurance"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              error={fieldErrors.hoa}
              style={{ width: "300px", backgroundColor: "white" }}
              value={formData.hoa || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hoa: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Annual HOA Dues"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              error={fieldErrors.annualUtilityExpenses}
              style={{ width: "300px", backgroundColor: "white" }}
              value={formData.annualUtilityExpenses || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  annualUtilityExpenses: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Annual Utility Expenses"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              error={fieldErrors.annualRepair}
              style={{ width: "300px", backgroundColor: "white" }}
              value={formData.annualRepair || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  annualRepair: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Annual Repair/Maintenance Expenses"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              error={fieldErrors.propertyFees}
              style={{ width: "300px", backgroundColor: "white" }}
              value={formData.propertyFees || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  propertyFees: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Annual Property Management Fees"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              error={fieldErrors.totalAnnualIncome}
              style={{ width: "300px", backgroundColor: "white" }}
              value={formData.totalAnnualIncome || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalAnnualIncome: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Total Annual Income *"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              error={fieldErrors.annualExpenses}
              style={{ width: "300px", backgroundColor: "white" }}
              value={formData.annualExpenses || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  annualExpenses: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Annual Expenses"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              error={fieldErrors.annualNOI}
              style={{ width: "300px", backgroundColor: "white" }}
              value={formData.annualNOI || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  annualNOI: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Annual NOI "
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              style={{ width: "300px", backgroundColor: "white" }}
              error={fieldErrors.targetLTV}
              value={formData.targetLTV || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetLTV: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
              label="Target Ltv"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanPricer;
