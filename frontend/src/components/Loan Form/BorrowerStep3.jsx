import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function valuetext(value) {
  return `${value}°C`;
}

function BorrowerStep3({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValue, setSliderValue] = useState(1);
  const [sliderValue2, setSliderValue2] = useState(1);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const marks = [
    { value: 1, label: "Newbie" },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5, label: "Seasoned Investor" },
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
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              How experienced with investing is the borrower?
            </label>
            <div style={{ width: 400 }}>
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                min={1}
                max={5}
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6" }}
              />
            </div>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Please rank the borrower's experience as a real estate investor
            </label>
            <div style={{ width: 400 }}>
              <Slider
                value={sliderValue2}
                onChange={handleSliderChange2}
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

export default BorrowerStep3;
