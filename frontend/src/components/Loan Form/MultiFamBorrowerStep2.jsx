import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "../CheckoutSteps";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}
function MultiFamBorrowerStep2({ formData, setFormData }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValue, setSliderValue] = useState(1);
  //This is the expert slider
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
      <CheckoutSteps step1></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Grid container spacing={2}>
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

export default MultiFamBorrowerStep2;
