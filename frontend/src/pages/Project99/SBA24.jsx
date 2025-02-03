import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SBA24({ formData, setFormData }) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      armsLength: event.target.value,
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - Other Infromation
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Other Personal Property and Other Assets.
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.otherAssets || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherAssets: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Unpaid Taxes
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.unpaidTaxes || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unpaidTaxes: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Other Liabilities
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.otherLiabilities || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherLiabilities: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Life Insurance Held.
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.lifeInsuranceHeld || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lifeInsuranceHeld: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA24;
