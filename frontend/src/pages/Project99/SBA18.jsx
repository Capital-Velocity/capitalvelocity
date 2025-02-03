import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SBA18({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sum, setSum] = useState(0); // Step 1: Initialize state for the sum

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // Step 2: Create a function to calculate the sum
  const calculateSum = () => {
    const fields = [
      formData.cashonHand,
      formData.savingsAccounts,
      formData.retirementAccount,
      formData.notesReceivable,
      formData.lifeInsurance,
      formData.stocksBonds,
      formData.realEstate,
      formData.automobiles,
      formData.otherPersonalProperty,
      formData.otherAssets,
    ];

    const validFields = fields.filter((value) => !isNaN(parseFloat(value)));
    const total = validFields.reduce(
      (acc, currentValue) => acc + parseFloat(currentValue),
      0
    );

    setSum(total.toFixed(2));
  };
  useEffect(() => {
    calculateSum();
  }, [
    formData.cashonHand,
    formData.savingsAccounts,
    formData.retirementAccount,
    formData.notesReceivable,
    formData.lifeInsurance,
    formData.stocksBonds,
    formData.realEstate,
    formData.automobiles,
    formData.otherPersonalProperty,
    formData.otherAssets,
  ]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - ASSETS
        </Typography>

        <Grid container spacing={2} style={{ marginLeft: 2, marginBottom: 5 }}>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Cash on Hand & in banks
            </Typography>
            <TextField
              value={formData.cashonHand || ""}
              size="large"
              type="number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cashonHand: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={fieldErrors.cashonHand}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.cashonHand}</span>}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Savings Accounts
            </Typography>
            <TextField
              value={formData.savingsAccounts || ""}
              size="large"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  savingsAccounts: e.target.value,
                })
              }
              err
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              error={fieldErrors.savingsAccounts}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.savingsAccounts}</span>}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              IRA or Other Retirement Account
            </Typography>
            <TextField
              value={formData.retirementAccount || ""}
              size="large"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  retirementAccount: e.target.value,
                })
              }
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={fieldErrors.retirementAccount}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.retirementAccount}</span>}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Accounts & Notes Receivable
            </Typography>
            <TextField
              value={formData.notesReceivable || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notesReceivable: e.target.value,
                })
              }
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.notesReceivable}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.notesReceivable}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Cash Surrender Value Only
            </Typography>
            <TextField
              value={formData.lifeInsurance || ""}
              size="large"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lifeInsurance: e.target.value,
                })
              }
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.lifeInsurance}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.lifeInsurance}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Stocks and Bonds
            </Typography>
            <TextField
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stocksBonds: e.target.value,
                })
              }
              value={formData.stocksBonds || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.stocksBonds}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.stocksBonds}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Real Estate
            </Typography>
            <TextField
              onChange={(e) =>
                setFormData({
                  ...formData,
                  realEstate: e.target.value,
                })
              }
              value={formData.realEstate || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.realEstate}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.realEstate}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Automobiles
            </Typography>
            <TextField
              onChange={(e) =>
                setFormData({
                  ...formData,
                  automobiles: e.target.value,
                })
              }
              value={formData.automobiles || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              error={fieldErrors.automobiles}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.automobiles}</span>}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Other Personal Property
            </Typography>
            <TextField
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otherPersonalProperty: e.target.value,
                })
              }
              value={formData.otherPersonalProperty || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              error={fieldErrors.otherPersonalProperty}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.otherPersonalProperty}</span>}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Other Assets
            </Typography>
            <TextField
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otherAssets: e.target.value,
                })
              }
              value={formData.otherAssets || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
              error={fieldErrors.otherAssets}
              style={{ backgroundColor: "white" }}
              helperText={<span>{fieldErrors.otherAssets}</span>}
            />
          </Grid>
          <Grid item sm={4}>
            <Typography type="p" color="grey">
              Total Assets
            </Typography>
            <TextField
              value={`$${sum}`} // Display the calculated sum
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              style={{ backgroundColor: "white" }}
              variant="outlined"
              disabled // Disable editing
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA18;
