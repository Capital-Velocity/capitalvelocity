import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps2 from "../CheckoutSteps2";

function BorrowerStepNew({ formData, setFormData }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <CheckoutSteps2 step1 step2 step3></CheckoutSteps2>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.borrowerFirst || ""}
              size="large"
              InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
              onChange={(e) =>
                setFormData({ ...formData, borrowerFirst: e.target.value })
              }
              label="First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              style={{ width: "500px" }}
              value={formData.borrowerLast || ""}
              InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
              onChange={(e) =>
                setFormData({ ...formData, borrowerLast: e.target.value })
              }
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              style={{ width: "500px" }}
              value={formData.borrowerEmail || ""}
              InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
              onChange={(e) =>
                setFormData({ ...formData, borrowerEmail: e.target.value })
              }
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              style={{ width: "500px" }}
              value={formData.borrowerCell || ""}
              InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
              onChange={(e) =>
                setFormData({ ...formData, borrowerCell: e.target.value })
              }
              id="outlined-basic"
              label="Cell Phone"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Borrower's Citizenship Status{" "}
              </InputLabel>
              <Select
                style={{ width: "500px" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.borrowerCitizenship || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerCitizenship: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"US Citizen"}>US Citizen</MenuItem>
                <MenuItem value={"US Permanent Resident (Green Card Holder)"}>
                  US Permanent Resident (Green Card Holder)
                </MenuItem>
                <MenuItem value={"US Permanent with Valid Visa"}>
                  US Permanent with Valid Visa
                </MenuItem>
                <MenuItem value={"Foreign National"}>Foreign National</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <TextField
              style={{ width: "500px" }}
              value={formData.socialSecurity || ""}
              size="large"
              InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
              onChange={(e) =>
                setFormData({ ...formData, socialSecurity: e.target.value })
              }
              label="Social Security"
              type="number"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BorrowerStepNew;
