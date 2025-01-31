import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "./CheckoutSteps3";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";

function SBA20({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - Source of Income and Contingent
          Liabilities
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Source of Income.
        </Typography>
        <Grid container spacing={2} style={{ marginLeft: 2, marginBottom: 5 }}>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Salary
            </Typography>
            <TextField
              value={formData.salary || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.salary}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.salary}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Net Investment Income
            </Typography>
            <TextField
              value={formData.netInvestmentIncome || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  netInvestmentIncome: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.netInvestmentIncome}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.netInvestmentIncome}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Real Estate Income
            </Typography>
            <TextField
              value={formData.realEstateIncomeSource || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  realEstateIncomeSource: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.realEstateIncomeSource}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.realEstateIncomeSource}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Other Income (Describe below)
            </Typography>
            <TextField
              value={formData.otherIncome || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otherIncome: e.target.value,
                })
              }
              multiline
              rows={6}
              error={fieldErrors.otherIncome}
              style={{ backgroundColor: "white", width: 500 }}
              helperText={<span>{fieldErrors.otherIncome}</span>}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" color="grey" gutterBottom>
          Contingent Liabilities
        </Typography>
        <Grid container spacing={2} style={{ marginLeft: 2, marginBottom: 5 }}>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              As Endorser or Co-Maker
            </Typography>
            <TextField
              value={formData.coMaker || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coMaker: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.coMaker}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.coMaker}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Net Investment Income
            </Typography>
            <TextField
              value={formData.netInvestmentIncomeLiab || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  netInvestmentIncomeLiab: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.netInvestmentIncomeLiab}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.netInvestmentIncomeLiab}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Legal Claims & Judgments
            </Typography>
            <TextField
              value={formData.legalClaims || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  legalClaims: e.target.value,
                })
              }
              variant="outlined"
              error={fieldErrors.legalClaims}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.legalClaims}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Provision for Federal Income Tax
            </Typography>
            <TextField
              value={formData.provisionFederalIncomeTax || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  provisionFederalIncomeTax: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.provisionFederalIncomeTax}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.provisionFederalIncomeTax}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Other Special Debt
            </Typography>
            <TextField
              value={formData.otherSpecialDebt || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otherSpecialDebt: e.target.value,
                })
              }
              multiline
              rows={6}
              error={fieldErrors.otherSpecialDebt}
              style={{ backgroundColor: "white", width: 500 }}
              helperText={<span>{fieldErrors.otherSpecialDebt}</span>}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA20;
