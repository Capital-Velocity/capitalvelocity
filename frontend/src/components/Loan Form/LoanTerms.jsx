import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider } from "@mui/material";
import FixandFlipCalc from "../../Calculators/FixandFlipCalc";

function LoanTerms({ formData, setFormData, fieldErrors }) {
  const [sliderValue, setSliderValue] = React.useState(1);
  const [sliderValue1, setSliderValue1] = React.useState(1);
  const [value, setValue] = React.useState(1);
  const percentageMarks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
  ];
  const percentageMarks2 = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];
  const setLoanPercentage = (event, newValue) => {
    setSliderValue(event.target.value);
    setFormData({
      ...formData,
      purchaseAmount: sliderValue,
    });
  };
  const setConstruction = (event, newValue) => {
    setSliderValue1(event.target.value);
    setFormData({
      ...formData,
      constructionBudgetPercentage: sliderValue1,
    });
  };

  const handleChangeLoan = (event, newValue) => {
    setInitialLoanAmount(parseFloat(event.target.value));
    setFormData({
      ...formData,
      initialLoanAmount: event.target.value,
    });
  };

  const handleChangeLoanConstructionHoldback = (event, newValue) => {
    setConstructionHoldback(parseFloat(event.target.value));
    setFormData({
      ...formData,
      constructionHoldback: event.target.value,
    });
  };

  const [initialLoanAmount, setInitialLoanAmount] = useState(0);

  const [constructionHoldback, setConstructionHoldback] = useState(0);

  const calculateTotal = () => initialLoanAmount + constructionHoldback;
  return (
    <div style={{ width: "100%" }}>
      {" "}
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Container>
        {/* <Typography variant="h4" color="black" gutterBottom>
          Loan Terms
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Let's do some math here with the loan terms and pricing
        </Typography> */}
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={12}>
            {/* This is for the textFields*/}
            <FixandFlipCalc />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanTerms;
