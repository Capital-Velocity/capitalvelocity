import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function MultiFamProperty({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Property Information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please add a property and tell us how the property was sourced and how
          the loan will be repaid. Remember we do NOT lend on borrower occupied
          properties.
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Purchase or Refinance{" "}
              </InputLabel>
              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: 100,
                  },
                }}
                value={formData.purchaseorRefinance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseorRefinance: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Purchase"}>Purchase</MenuItem>
                <MenuItem value={"Refinance"}>Refinance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamProperty;
