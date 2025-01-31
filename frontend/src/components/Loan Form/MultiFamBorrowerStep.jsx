import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function MultiFamBorrowerStep({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <CheckoutSteps step1></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                First Name
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                    })
                  }
                  required
                  error={fieldErrors.firstName}
                  style={{ width: 500, backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.firstName}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Last Name
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                  error={fieldErrors.lastName}
                  style={{ width: 500, backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.lastName}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Email Address
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.borrowerEmail || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      borrowerEmail: e.target.value,
                    })
                  }
                  type="email"
                  error={fieldErrors.borrowerEmail}
                  style={{ width: 500, backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.borrowerEmail}</span>}
                  variant="outlined"
                  fullWidth
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Phone
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.phoneNumber || ""}
                  onChange={(e) => {
                    const phoneNumber = e.target.value.slice(0, 10); // Limit input to 10 characters
                    setFormData({
                      ...formData,
                      phoneNumber: phoneNumber,
                    });
                  }}
                  type="number"
                  error={fieldErrors.phoneNumber}
                  style={{ width: 500, backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.phoneNumber}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Borrower's Citizenship Status{" "}
              </Typography>

              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.borrowerCitizenshipStatus || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerCitizenshipStatus: e.target.value,
                  })
                }
                error={fieldErrors.borrowerCitizenshipStatus}
                helperText={
                  <span>{fieldErrors.borrowerCitizenshipStatus}</span>
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
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Liquidity
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.liquidity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      liquidity: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.liquidity}
                  style={{ width: 500, backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.liquidity}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Social Security
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.socialSecurity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialSecurity: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.socialSecurity}
                  style={{ width: 500, backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.socialSecurity}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamBorrowerStep;
