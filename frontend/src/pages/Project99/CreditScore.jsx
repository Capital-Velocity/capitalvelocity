import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";
import { Divider, FormHelperText } from "@mui/material";

function CreditScore({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("");
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
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Tell Us More About You
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Don't worry, this is a soft credit pull and won't impact your credit.
          The soft pull is required to participate in the program.
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Personal Credit Score
              </Typography>
              <Select
                value={formData.creditScore || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    creditScore: e.target.value,
                  })
                }
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={fieldErrors.creditScore}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.creditScore}</span>}
              >
                <MenuItem value={"499 Below"}>499 Below</MenuItem>
                <MenuItem value={"500-599"}> 500-599</MenuItem>
                <MenuItem value={"600-649"}> 600-649</MenuItem>
                <MenuItem value={"650-689"}> 650-689</MenuItem>
                <MenuItem value={"689-719"}> 689-719</MenuItem>
                <MenuItem value={"720 OR ABOVE"}> 720 OR ABOVE</MenuItem>
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.creditScore && (
                <FormHelperText error>{fieldErrors.creditScore}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CreditScore;
