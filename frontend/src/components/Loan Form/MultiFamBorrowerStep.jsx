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
    { value: 5, label: "Seasoned Investor" },
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
    <div>
      {/* <CheckoutSteps step1></CheckoutSteps> */}

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
          <Grid item sm={6} style={{ visibility: "hidden" }}>
            {" "}
            <FormControl fullWidth>
              <Grid item sm={12}>
                <TextField fullWidth />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6} style={{ visibility: "hidden" }}>
            {" "}
            <FormControl fullWidth>
              <Grid item sm={12}>
                <TextField fullWidth />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.guranteeLoan ? "red" : "grey",
                width: "100%",
              }}
            >
              Will this borrower be personally guaranteeing this loan?
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.guranteeLoan === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("guranteeLoan", "Yes")}
                error={fieldErrors.guranteeLoan}
                helperText={<span>{fieldErrors.guranteeLoan}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.guranteeLoan === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("guranteeLoan", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.authorizedSign ? "red" : "grey",
              }}
            >
              Is the borrower authorized signatory?
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.authorizedSign === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("authorizedSign", "Yes")}
                error={fieldErrors.authorizedSign}
                helperText={<span>{fieldErrors.authorizedSign}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.authorizedSign === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("authorizedSign", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={12}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Please rank the borrower's experience with 5+ unit multifamily
              and/or mixed-use properties
            </label>
            <div style={{ width: 550 }}>
              <Slider
                value={formData.personallyGuranteeing || "0"}
                onChange={(event) => handleSliderChange(event)}
                min={1}
                max={5}
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6" }}
              />
            </div>
          </Grid>
          <Grid item sm={12}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Borrower Credit Score
            </label>
            <div style={{ width: 550 }}>
              <Slider
                value={formData.borrowingCreditScore || "0"}
                onChange={(event) => handleChange(event)}
                min={600}
                max={800}
                step={10}
                marks={creditScore}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6" }}
              />
            </div>
          </Grid>
          <Grid item sm={12}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              What percentage of the borrowing entity does this borrower own?
            </label>
            <div style={{ width: 550 }}>
              <Slider
                value={formData.borrowingEntityOwned || "0"}
                onChange={(event) => handleChange2(event)}
                min={0}
                max={100}
                step={1}
                marks={percentageMarks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6" }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamBorrowerStep;
