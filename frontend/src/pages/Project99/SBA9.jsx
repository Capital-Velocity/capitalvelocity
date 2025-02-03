import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import {
  Checkbox,
  IconButton,
  InputAdornment,
} from "../../../node_modules/@mui/material/index";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SBA9({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("");

  const isFieldError = (fieldName) => {
    return !!fieldErrors[fieldName];
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPasswordVisibility = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      armsLength: event.target.value,
    });
  };
  return (
    <div>
      <CheckoutSteps step1></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Create an Account
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
                  style={{ width: 500, backgroundColor: "transparent" }}
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
                  style={{ width: 500, backgroundColor: "transparent" }}
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
                Home Address
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.homeAddress || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homeAddress: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.homeAddress}
                  style={{ width: 500, backgroundColor: "transparent" }}
                  helperText={<span>{fieldErrors.homeAddress}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                City
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressCity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressCity: e.target.value,
                    })
                  }
                  error={fieldErrors.addressCity}
                  style={{ width: 500, backgroundColor: "transparent" }}
                  helperText={<span>{fieldErrors.addressCity}</span>}
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
                Zip Code
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressZip || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressZip: e.target.value.slice(0, 5),
                    })
                  }
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.addressZip}
                  style={{ width: 500, backgroundColor: "transparent" }}
                  helperText={<span>{fieldErrors.addressZip}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                State
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressState || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressState: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.addressState}
                  style={{ width: 500, backgroundColor: "transparent" }}
                  helperText={<span>{fieldErrors.addressState}</span>}
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
                  style={{ width: 500, backgroundColor: "transparent" }}
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
                Email Address
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  error={fieldErrors.email}
                  style={{ width: 500, backgroundColor: "transparent" }}
                  helperText={<span>{fieldErrors.email}</span>}
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
                Password
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  type={showPassword ? "text" : "password"}
                  value={formData.password || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.password}
                  style={{ width: 500, backgroundColor: "transparent" }}
                  helperText={<span>{fieldErrors.password}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Confirm Password
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.confirmPassword || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleConfirmPasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  error={fieldErrors.confirmPassword}
                  style={{ width: 500, backgroundColor: "transparent" }}
                  helperText={<span>{fieldErrors.confirmPassword}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={10}>
            <Typography type="p" color="grey">
              By checking this box and clicking the "Create an Account" button,
              I consent to receive phone calls and/or text messages, including
              autodialed and pre-recorded calls, for marketing purposes, from
              Lendio and its participating partners at the phone number provided
              above. I acknowledge that consent is not a condition of purchase
              or account creation and that telephone calls to and from Capital
              Velocity or its partners may be recorded. Message and data rates
              may apply. I understand I may opt out at any time. For more
              information, see Terms of Use.
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Checkbox
              checked={formData.createAgreement}
              error={fieldErrors.createAgreement}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  createAgreement: e.target.value,
                })
              }
              style={{
                border: fieldErrors.createAgreementTerms
                  ? "2px solid red"
                  : "none",
                /* Add any additional styling here for emphasis */
              }}
            />
          </Grid>

          <Grid item sm={10}>
            <Typography type="p" color="grey">
              By checking this box and clicking the "Create an Account" button,
              I acknowledge that I have read and agree to the Terms of
              Application, Terms of Use, including an arbitration agreement,
              Credit Gathering Authorization, Information Sharing Agreement,
              Privacy Policy, and E-sign Agreement.
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Checkbox
              error={fieldErrors.createAgreementTerms}
              checked={formData.createAgreementTerms}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  createAgreementTerms: e.target.value,
                })
              }
              style={{
                border: fieldErrors.createAgreementTerms
                  ? "2px solid red"
                  : "none",
                /* Add any additional styling here for emphasis */
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA9;
