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

function SBA19({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - LIABILITIES
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom></Typography>
        <Grid container spacing={2} style={{ marginLeft: 2, marginBottom: 5 }}>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Accounts Payable
            </Typography>
            <TextField
              value={formData.accountsPayable || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  accountsPayable: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.accountsPayable}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.accountsPayable}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Notes Payable to Banks and Others
            </Typography>
            <TextField
              value={formData.notesPayable || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notesPayable: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.notesPayable}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.notesPayable}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Installment Account
            </Typography>
            <TextField
              value={formData.installmentAccount || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  installmentAccount: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.installmentAccount}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.installmentAccount}</span>}
            />
          </Grid>

          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Loan(s) Against Life Insurance
            </Typography>
            <TextField
              value={formData.loanInsurance || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  loanInsurance: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.loanInsurance}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.loanInsurance}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Mortgages on Real Estate
            </Typography>
            <TextField
              value={formData.mortgagesRealEstate || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mortgagesRealEstate: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.mortgagesRealEstate}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.mortgagesRealEstate}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Unpaid Taxes
            </Typography>
            <TextField
              value={formData.unpaidTaxes || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  unpaidTaxes: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.unpaidTaxes}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.unpaidTaxes}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Other Liabilities
            </Typography>
            <TextField
              value={formData.otherLiabilities || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otherLiabilities: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.otherLiabilities}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.otherLiabilities}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Total Liabilities
            </Typography>
            <TextField
              value={formData.totalLiabilities || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalLiabilities: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.totalLiabilities}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.totalLiabilities}</span>}
            />
          </Grid>
          {/* 
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Net Liabilities
            </Typography>
            <TextField
              style={{ width: "300px", backgroundColor: "transparent" }}
              value={formData.netLiabilities || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  netLiabilities: e.target.value,
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
          */}
        </Grid>
      </Container>
    </div>
  );
}

export default SBA19;
