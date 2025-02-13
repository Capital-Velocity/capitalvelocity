import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

function BorrowerStep({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      armsLength: event.target.value,
    });
  };
  return (
    <div style={{ width: "100%" }}>
      {" "}
      <CheckoutSteps step1></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />
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
                  error={fieldErrors.firstName}
                  style={{ backgroundColor: "white" }}
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
              <TextField
                value={formData.borrowerLast || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerLast: e.target.value,
                  })
                }
                required
                error={fieldErrors.borrowerLast}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.borrowerLast}</span>}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Email
              </Typography>
              <TextField
                value={formData.borrowerEmail || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerEmail: e.target.value,
                  })
                }
                required
                error={fieldErrors.borrowerEmail}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.borrowerEmail}</span>}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Phone
              </Typography>
              <TextField
                value={formData.borrowerCell || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerCell: e.target.value.slice(0, 10),
                  })
                }
                required
                type="number"
                error={fieldErrors.borrowerCell}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.borrowerCell}</span>}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth error={!!fieldErrors.borrowerCitizenship}>
              {" "}
              {/* Pass the error prop here */}
              <Typography type="p" color="grey">
                Borrower's Citizenship Status
              </Typography>
              <Select
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
              {/* FormHelperText to display the error message */}
              {fieldErrors.borrowerCitizenship && (
                <FormHelperText>
                  {fieldErrors.borrowerCitizenship}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Social Security Number
              </Typography>
              <TextField
                value={formData.borrowerSocialSecurity || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerSocialSecurity: e.target.value.slice(0, 9),
                  })
                }
                required
                type="number"
                error={fieldErrors.borrowerSocialSecurity}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.borrowerSocialSecurity}</span>}
                variant="outlined"
                fullWidth
              ></TextField>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BorrowerStep;
