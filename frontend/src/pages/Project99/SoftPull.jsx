import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import {
  Divider,
  FormHelperText,
} from "../../../node_modules/@mui/material/index";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SoftPull({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("");
  const dateOptions = Array.from({ length: 31 }, (_, index) => index + 1); // Generate an array from 1 to 31
  const startYear = 1930;
  const endYear = 2023;

  const yearOptions = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );
  const dateOptions2 = Array.from({ length: 12 }, (_, index) => index + 1); // Generate an array from 1 to 31
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
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Soft Pull Credit Check
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Don't worry, this is a soft credit pull and won't impact your credit.
          The soft pull is required to participate in the program.
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Date of Birth (Month)
              </Typography>

              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.birthMonth || ""}
                error={fieldErrors.birthMonth}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.birthMonth}</span>}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    birthMonth: e.target.value,
                  })
                }
              >
                {dateOptions2.map((date) => (
                  <MenuItem key={date} value={date.toString()}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.birthMonth && (
                <FormHelperText error>{fieldErrors.birthMonth}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={4}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Date of Birth (Date)
              </Typography>
              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={fieldErrors.birthDate}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.birthDate}</span>}
                value={formData.birthDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    birthDate: e.target.value,
                  })
                }
              >
                {dateOptions.map((date) => (
                  <MenuItem key={date} value={date.toString()}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.birthDate && (
                <FormHelperText error>{fieldErrors.birthDate}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={4}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Date of Birth (Year)
              </Typography>
              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={fieldErrors.birthYear}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.birthYear}</span>}
                value={formData.birthYear || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    birthYear: e.target.value,
                  })
                }
              >
                {yearOptions.map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.birthYear && (
                <FormHelperText error>{fieldErrors.birthYear}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Social Security
              </Typography>
              <TextField
                value={formData.socialSecurity || ""}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  value = value.slice(0, 9); // Ensure max 9 digits

                  // Apply formatting (XXX-XX-XXXX)
                  if (value.length > 5) {
                    value = `${value.slice(0, 3)}-${value.slice(
                      3,
                      5
                    )}-${value.slice(5)}`;
                  } else if (value.length > 3) {
                    value = `${value.slice(0, 3)}-${value.slice(3)}`;
                  }

                  setFormData({
                    ...formData,
                    socialSecurity: value,
                  });
                }}
                inputProps={{
                  maxLength: 11, // Prevents entering extra characters due to dashes
                }}
                error={fieldErrors.socialSecurity}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.socialSecurity}</span>}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item sm={6} style={{ marginTop: 20 }}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                This is for verifying credit. Your personal information will be
                protected with bank-level security.
              </Typography>
            </FormControl>
          </Grid>

          <Grid item sm={12} style={{ marginTop: 20 }}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 100,
                color: "grey",
                textDecoration: "underline",
              }}
            >
              USER CERTIFICATION
            </label>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                By clicking the ‘Next’ button below, you acknowledge that you
                have read and agree to the Credit Gathering Authorization as
                either the individual whose credit will be pulled, or as an
                authorized representative of that individual, and that the
                credit report can be shared with Recipients as further defined
                in the Credit Gathering Authorization.
              </Typography>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SoftPull;
