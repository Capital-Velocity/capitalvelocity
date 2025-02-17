import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Slider from "@mui/material/Slider";
import { Divider } from "@mui/material";
import { Box } from "@mui/material";

function MultiFamBorrowerStep({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [sliderValue, setSliderValue] = useState(1);

  const marks = [
    { value: 1, label: "Newbie" },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5, label: "Seasoned" },
  ];

  const handleSliderChange = (event, newValue) => {
    setSliderValue(event.target.value);
    setFormData({
      ...formData,
      personallyGuranteeing: event.target.value,
    });
  };
  // This is for the percentage slider
  const percentageMarks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];
  const creditScore = [
    { value: 600, label: "600" },
    { value: 650, label: "650" },
    { value: 700, label: "700" },
    { value: 750, label: "750" },
    { value: 800, label: "800" },
  ];
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(event.target.value);
    setFormData({
      ...formData,
      borrowingCreditScore: event.target.value,
    });
  };
  const handleChange2 = (event, newValue) => {
    setValue(event.target.value);
    setFormData({
      ...formData,
      borrowingEntityOwned: event.target.value,
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {/* <CheckoutSteps step1></CheckoutSteps> */}

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />

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
                  required
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
                  style={{ backgroundColor: "white" }}
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
              <Typography type="p" color="black">
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
                  style={{ backgroundColor: "white" }}
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
              <Typography type="p" color="black">
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
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.phoneNumber}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Borrower's Citizenship Status{" "}
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
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
              <Typography type="p" color="black">
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
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.liquidity}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Social Security
              </Typography>{" "}
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
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.socialSecurity}</span>}
                // Add more props as needed
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, textAlign: "center" }}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                display: "block",
              }}
            >
              Will this borrower be personally guaranteeing this loan?
            </label>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  style={{ color: "black" }}
                  value="Yes"
                  checked={formData.guranteeLoan === "Yes"}
                  onChange={() => handleOptionChange("guranteeLoan", "Yes")}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  style={{ color: "black" }}
                  value="No"
                  checked={formData.guranteeLoan === "No"}
                  onChange={() => handleOptionChange("guranteeLoan", "No")}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                display: "block",
              }}
            >
              Is the borrower authorized signatory?
            </label>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  style={{ color: "black" }}
                  value="Yes"
                  checked={formData.authorizedSign === "Yes"}
                  onChange={() => handleOptionChange("authorizedSign", "Yes")}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  style={{ color: "black" }}
                  value="No"
                  checked={formData.authorizedSign === "No"}
                  onChange={() => handleOptionChange("authorizedSign", "No")}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
              Please rank the borrower's experience with 5+ unit multifamily
              and/or mixed-use properties
            </label>
            <div style={{ width: "100%" }}>
              <Slider
                value={formData.personallyGuranteeing || "0"}
                onChange={(event) => handleSliderChange(event)}
                min={1}
                max={5}
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "100%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
              Borrower Credit Score
            </label>
            <div style={{ width: "100%" }}>
              <Slider
                value={formData.borrowingCreditScore || "0"}
                onChange={(event) => handleChange(event)}
                min={600}
                max={800}
                step={10}
                marks={creditScore}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "100%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "black" }}>
              What percentage of the borrowing entity does this borrower own?
            </label>
            <div style={{ width: "100%" }}>
              <Slider
                value={formData.borrowingEntityOwned || "0"}
                onChange={(event) => handleChange2(event)}
                min={0}
                max={100}
                step={1}
                marks={percentageMarks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "100%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamBorrowerStep;
