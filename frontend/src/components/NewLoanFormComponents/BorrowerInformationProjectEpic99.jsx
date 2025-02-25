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

function BorrowerInformationProjectEpic99({
  formData,
  setFormData,
  fieldErrors,
}) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValue, setSliderValue] = useState(1);
  const [sliderValue2, setSliderValue2] = useState(1);

  const marks = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5+" },
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

  const handleOptionChange = (fieldName) => (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {" "}
      {/* <CheckoutSteps step1></CheckoutSteps> */}
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Partner Information
        </Typography>
        {/* <Typography variant="subtitle1" color="black" gutterBottom>
          Please review the borrowers of this loan
        </Typography> */}
        <Divider style={{ color: "black", marginBottom: 10 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
                sx={{
                  "& input[type='number']": {
                    "-webkit-appearance": "none",
                    "-moz-appearance": "textfield",
                    appearance: "none",
                  },
                  "& input::-webkit-outer-spin-button": {
                    appearance: "none",
                    margin: 0,
                  },
                  "& input::-webkit-inner-spin-button": {
                    appearance: "none",
                    margin: 0,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth error={!!fieldErrors.borrowerCitizenship}>
              <Typography type="p" color="black">
                Partner's Citizenship Status
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

          <Grid
            item
            xs={12}
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography type="p" color="black">
              How many businesses has this partner owned?
            </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                min={1}
                max={5}
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "80%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography type="p" color="black">
              How many businesses has this partner managed with a hands-on
              approach?
            </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Slider
                value={sliderValue2}
                onChange={handleSliderChange2}
                min={1}
                max={5}
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "80%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography type="p" color="black">
              Are you a Veteran?{" "}
            </Typography>
            <FormControl fullWidth>
              <Select
                InputLabelProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: 100,
                    backgroundColor: "white",
                  },
                }}
                value={formData.veteran || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    veteran: e.target.value,
                  })
                }
                error={fieldErrors.veteran}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.veteran}</span>}
              >
                <MenuItem value={"Non-Veteran"}>Non-Veteran</MenuItem>
                <MenuItem value={"Veteran"}>Veteran</MenuItem>
                <MenuItem value={"Service-Disabled Veteran"}>
                  Service-Disabled Veteran
                </MenuItem>
                <MenuItem value={"Spouse of Veteran"}>
                  Spouse of Veteran;
                </MenuItem>
                <MenuItem value={"Not"}>Not</MenuItem>
              </Select>
              {fieldErrors.veteran && (
                <FormHelperText error>{fieldErrors.veteran}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography type="p" color="black">
              Gender{" "}
            </Typography>
            <FormControl fullWidth>
              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.gender || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  })
                }
                error={fieldErrors.gender}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.gender}</span>}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Not Disclosed"}>Not Disclosed</MenuItem>
              </Select>
              {fieldErrors.gender && (
                <FormHelperText error>{fieldErrors.gender}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography type="p" color="black">
              Race
            </Typography>
            <FormControl fullWidth>
              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.race || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    race: e.target.value,
                  })
                }
                error={fieldErrors.race}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.race}</span>}
              >
                <MenuItem value={"American Indian or Alaska Native"}>
                  American Indian or Alaska Native
                </MenuItem>
                <MenuItem value={"Asian"}>Asian</MenuItem>
                <MenuItem value={"White"}>White</MenuItem>
                <MenuItem value={"Not Disclosed"}>Not Disclosed</MenuItem>
                <MenuItem value={"Asian"}>
                  Native Hawaiian or Pacific Islander
                </MenuItem>
                <MenuItem value={"Black or African-American"}>
                  Black or African-American
                </MenuItem>
              </Select>
              {fieldErrors.race && (
                <FormHelperText error>{fieldErrors.race}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography type="p" color="black">
              Ethnicity{" "}
            </Typography>
            <FormControl fullWidth>
              <Select
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.ethinicity || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ethinicity: e.target.value,
                  })
                }
                error={fieldErrors.ethinicity}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.ethinicity}</span>}
              >
                <MenuItem value={"Hispanic or Latino"}>
                  Hispanic or Latino
                </MenuItem>
                <MenuItem value={"Not Hispanic or Latino"}>
                  Not Hispanic or Latino
                </MenuItem>
                <MenuItem value={"Not Disclosed"}>Not Disclosed</MenuItem>
              </Select>
              {fieldErrors.ethinicity && (
                <FormHelperText error>{fieldErrors.ethinicity}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Typography type="p" color="black">
              Citizenship
            </Typography>
            <FormControl fullWidth>
              <Select
                error={fieldErrors.citizenshipStatus}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.citizenshipStatus}</span>}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.citizenshipStatus || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    citizenshipStatus: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"I am a U.S. Citizen "}>
                  I am a U.S. Citizen{" "}
                </MenuItem>
                <MenuItem
                  value={"I have Lawful Permanent Resident (LPR) status."}
                >
                  I have Lawful Permanent Resident (LPR) status.
                </MenuItem>
                <MenuItem
                  value={
                    "I am not a U.S. Citizen or Lawful Permanent Resident.*"
                  }
                >
                  I am not a U.S. Citizen or Lawful Permanent Resident.*
                </MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                USCIS Registration Number
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  type="number"
                  error={fieldErrors.uscisRegNum}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.uscisRegNum}</span>}
                  value={formData.uscisRegNum || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      uscisRegNum: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& input[type='number']": {
                      "-webkit-appearance": "none",
                      "-moz-appearance": "textfield",
                      appearance: "none",
                    },
                    "& input::-webkit-outer-spin-button": {
                      appearance: "none",
                      margin: 0,
                    },
                    "& input::-webkit-inner-spin-button": {
                      appearance: "none",
                      margin: 0,
                    },
                  }}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Country of Citizenship
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.countryofCitizenship || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      countryofCitizenship: e.target.value,
                    })
                  }
                  error={fieldErrors.countryofCitizenship}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.countryofCitizenship}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid> */}
          <Grid item sm={6}>
            <Typography type="p" color="black">
              Are you presently subject to an indictment, criminal information,
              arraignment, or other means by which formal criminal charges are
              brought in any jurisdiction? (If "YES," the loan request is not
              eligible for SBA assistance.)
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes"
                checked={formData.isIndictment === "Yes"}
                onChange={handleOptionChange("isIndictment")}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No"
                checked={formData.isIndictment === "No"}
                onChange={handleOptionChange("isIndictment")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.isIndictment && (
              <FormHelperText error>{fieldErrors.isIndictment}</FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              Have you been arrested in the last 6 months for any criminal
              offense?
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.isArrested === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("isArrested")}
                error={fieldErrors.isArrested}
                helperText={<span>{fieldErrors.isArrested}</span>}
                control={<Radio />}
                label="Yes"
              />

              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.isArrested === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("isArrested", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.isArrested && (
              <FormHelperText error>{fieldErrors.isArrested}</FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              For any criminal offense - other than a minor vehicle violation -
              have you ever: 1) been convicted; 2) pleaded guilty; 3) pleaded
              nolo contendere; 4) been placed on pretrial diversion; or 5) been
              placed on any form of parole or probation (including probation
              before judgment)?
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.isCriminalOffense === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("isCriminalOffense", "Yes")}
                error={fieldErrors.isCriminalOffense}
                helperText={<span>{fieldErrors.isCriminalOffense}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.isCriminalOffense === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("isCriminalOffense", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.isCriminalOffense && (
              <FormHelperText error>
                {fieldErrors.isCriminalOffense}
              </FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              Are you presently suspended, debarred, proposed for debarment,
              declared ineligible, or voluntarily excluded from participation in
              this transaction by any Federal department or agency?
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.suspendedFederal === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("suspendedFederal", "Yes")}
                error={fieldErrors.suspendedFederal}
                helperText={<span>{fieldErrors.suspendedFederal}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.suspendedFederal}
                checked={formData.suspendedFederal === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("suspendedFederal", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.suspendedFederal && (
              <FormHelperText error>
                {fieldErrors.suspendedFederal}
              </FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              Are you more than 60 days delinquent on any obligation to pay
              child support arising under an administrative order, court order,
              repayment agreement between the holder and a custodial parent, or
              repayment agreement between the holder and a state agency
              providing child support enforcement services.
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.daysDelenquet === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("daysDelenquet", "Yes")}
                error={fieldErrors.daysDelenquet}
                helperText={<span>{fieldErrors.daysDelenquet}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.daysDelenquet}
                checked={formData.daysDelenquet === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("daysDelenquet", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.daysDelenquet && (
              <FormHelperText error>{fieldErrors.daysDelenquet}</FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              Do you have any ownership in other businesses that have small
              businesses loans?
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.smallBusiness === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("smallBusiness", "Yes")}
                error={fieldErrors.smallBusiness}
                helperText={<span>{fieldErrors.smallBusiness}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.smallBusiness}
                checked={formData.smallBusiness === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("smallBusiness", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.smallBusiness && (
              <FormHelperText error>{fieldErrors.smallBusiness}</FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              Have you, or any business you controlled, ever filed for
              bankruptcy protection?
            </Typography>
            {/* <div style={{}}>
              {formData.bankruptDetail === "Yes" && (
                <TextField
                  style={{
                    width: "500px",
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  size="large"
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  label="Please describe"
                  variant="outlined"
                  value={formData.bankruptDetail || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankruptDetail: e.target.value,
                    })
                  }
                  multiline
                  rows={4}
                />
              )}
            </div> */}
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.bankruptcyProtection === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("bankruptcyProtection", "Yes")}
                error={fieldErrors.bankruptcyProtection}
                helperText={<span>{fieldErrors.bankruptcyProtection}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.bankruptcyProtection}
                checked={formData.bankruptcyProtection === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("bankruptcyProtection", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.bankruptcyProtection && (
              <FormHelperText error>
                {fieldErrors.bankruptcyProtection}
              </FormHelperText>
            )}
          </Grid>

          <Grid item sm={6}>
            <Typography type="p" color="black">
              Are you, or any business you control, presently involved in any
              legal action (including divorce)?
            </Typography>
            {/* <div style={{}}>
              {formData.legalAction === "Yes" && (
                <TextField
                  style={{
                    width: "500px",
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  value={formData.legalActionDetails || ""}
                  size="large"
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      legalActionDetails: e.target.value,
                    })
                  }
                  label="Please describe"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              )}
            </div> */}
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.legalAction === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("legalAction", "Yes")}
                error={fieldErrors.legalAction}
                helperText={<span>{fieldErrors.legalAction}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.legalAction}
                checked={formData.legalAction === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("legalAction", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.legalAction && (
              <FormHelperText error>{fieldErrors.legalAction}</FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              Have you or any business owned or controlled by you ever obtained
              a direct or guaranteed loan from SBA or any other Federal agency
              or been a guarantor on such a loan? (This includes, but is not
              limited to USDA, FHA, EDA, and student loans.)
            </Typography>
            {/* <div style={{}}>
              {formData.loanGuarantor === "Yes" && (
                <TextField
                  style={{
                    width: "500px",
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  value={formData.loanDetails || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loanDetails: e.target.value,
                    })
                  }
                  size="large"
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  label="Please describe"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              )}
            </div> */}
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.loanGuarantor === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("loanGuarantor", "Yes")}
                error={fieldErrors.loanGuarantor}
                helperText={<span>{fieldErrors.loanGuarantor}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.loanGuarantor}
                checked={formData.loanGuarantor === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("loanGuarantor", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.loanGuarantor && (
              <FormHelperText error>{fieldErrors.loanGuarantor}</FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              If you answered "Yes" to above question, is any of the financing
              presently considered delinquent?
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.financingDelinquent === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("financingDelinquent", "Yes")}
                error={fieldErrors.financingDelinquent}
                helperText={<span>{fieldErrors.financingDelinquent}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.financingDelinquent}
                checked={formData.financingDelinquent === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("financingDelinquent", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.financingDelinquent && (
              <FormHelperText error>
                {fieldErrors.financingDelinquent}
              </FormHelperText>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography type="p" color="black">
              If you answered "Yes" to the above, did any loan that was made for
              business purposes ever default and cause a loss to the Government,
              including a compromise, resolution or settlement of a loan's
              principal balance for less than the full amount due?
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.businessDefault === "Yes"} // Check if it's "Yes" in formData
                onChange={handleOptionChange("businessDefault", "Yes")}
                error={fieldErrors.businessDefault}
                helperText={<span>{fieldErrors.businessDefault}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                error={fieldErrors.businessDefault}
                checked={formData.businessDefault === "No"} // Check if it's "No" in formData
                onChange={handleOptionChange("businessDefault", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
            {fieldErrors.businessDefault && (
              <FormHelperText error>
                {fieldErrors.businessDefault}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BorrowerInformationProjectEpic99;
