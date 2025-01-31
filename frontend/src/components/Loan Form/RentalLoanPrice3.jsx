import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Container from "../../screens/Container";

function RentalLoanPrice3({ formData, setFormData, fieldErrors }) {
  return (
    <div>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Pricer
        </Typography>
        <Typography variant="h6" color="black" gutterBottom>
          Cash Flow Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="grey">
              Gross Monthly Rent
            </Typography>
            <TextField
              error={fieldErrors.grossmontly}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.grossmontly || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  grossmontly: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="grey">
              Minimum As Is Value
            </Typography>
            <TextField
              error={fieldErrors.cashFlowminAsValue}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.cashFlowminAsValue || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cashFlowminAsValue: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="grey">
              Maximum As Is Value
            </Typography>
            <TextField
              error={fieldErrors.cashFlowmaxAsValue}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.cashFlowmaxAsValue || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cashFlowmaxAsValue: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Property Management
              </Typography>

              <Select
                error={fieldErrors.cashFlowpropertyMan}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.cashFlowpropertyMan || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cashFlowpropertyMan: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Self Managed"}>Self Managed</MenuItem>
                <MenuItem value={"Third Party Managment"}>
                  Third Party Managment
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default RentalLoanPrice3;
