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
import Slider from "@mui/material/Slider";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

function BorrowerStep({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValue, setSliderValue] = useState(1);
  const [sliderValue2, setSliderValue2] = useState(1);

  const marks = [
    { value: 1, label: "Newbie" },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5, label: "Seasoned" },
  ];

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setFormData({
      ...formData,
      personallyGuranteeing: newValue,
    });
  };

  const handleSliderChange2 = (event, newValue) => {
    setSliderValue2(newValue);
    setFormData({
      ...formData,
      experienceWithRealEstate: newValue,
    });
  };

  const percentageMarks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFormData({
      ...formData,
      borrowingEntityOwned: newValue,
    });
  };

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
    setFormData({
      ...formData,
      borrowingEntityOwned: newValue,
    });
  };

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
      {/* <CheckoutSteps step1></CheckoutSteps> */}
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
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
              <Typography type="p" color="black">
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
              <Typography type="p" color="black">
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
              <Typography type="p" color="black">
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
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth error={!!fieldErrors.borrowerCitizenship}>
              <Typography type="p" color="black">
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
              {fieldErrors.borrowerCitizenship && (
                <FormHelperText>
                  {fieldErrors.borrowerCitizenship}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
              How experienced with investing is the borrower?
            </label>
            <div style={{ width: "100%" }}>
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                min={1}
                max={5}
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "100%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
              Please rank the borrower's experience as a real estate investor
            </label>
            <div style={{ width: "100%" }}>
              <Slider
                value={sliderValue2}
                onChange={handleSliderChange2}
                min={0}
                max={100}
                step={1}
                marks={percentageMarks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "100%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
              }}
            >
              Is this an arm’s length transaction, where the buyer and seller
              act independently and in their own best interests, negotiating for
              the most favorable terms without any special relationship
              influencing the deal?
            </label>

            <FormControl
              fullWidth
              error={!!fieldErrors.bestTerms}
              style={{ display: "flex", alignItems: "center" }}
            >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="bestTerms" // Name should match the key in formData
                value={formData.bestTerms || ""} // Ensure the selected value is controlled
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bestTerms: e.target.value, // Correctly update formData
                  })
                }
              >
                <FormControlLabel
                  style={{ color: "black" }}
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  style={{ color: "black" }}
                  value="No"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
              <div style={{ marginTop: 20, width: "100%" }}>
                {formData.bestTerms === "No" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {" "}
                      {/* Change sm={6} to xs={12} */}
                      <Typography type="p" color="black">
                        Please describe:
                      </Typography>
                      <TextField
                        fullWidth
                        style={{
                          marginTop: 10,
                          backgroundColor: "white",
                        }}
                        value={formData.armsLengthDescription || ""}
                        size="large"
                        InputLabelProps={{
                          style: { fontSize: 15, fontWeight: 100 },
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            armsLengthDescription: e.target.value,
                          })
                        }
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                )}
              </div>
              {fieldErrors.bestTerms && (
                <FormHelperText>{fieldErrors.bestTerms}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Social Security Number
              </Typography>
              <TextField
                value={formData.borrowerSocialSecurity || ""}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  value = value.slice(0, 9); // Restrict to 9 digits

                  // Apply formatting
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
                    borrowerSocialSecurity: value,
                  });
                }}
                required
                error={fieldErrors.borrowerSocialSecurity}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.borrowerSocialSecurity}</span>}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
}

export default BorrowerStep;
