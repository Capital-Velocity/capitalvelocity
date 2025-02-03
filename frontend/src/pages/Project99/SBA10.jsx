import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SBA10({ formData, setFormData, fieldErrors }) {
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
      <CheckoutSteps step1></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Demographic Information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Veteran/Gender/Race/Ethnicity data is collected for program reporting
          purposes only.Disclosure is voluntary and has no bearing on the credit
          decision.
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Veteran?
            </label>
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
                style={{ width: 500, backgroundColor: "white" }}
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
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Gender
            </label>
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
                style={{ width: 500, backgroundColor: "white" }}
                helperText={<span>{fieldErrors.gender}</span>}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Not Disclosed"}>Not Disclosed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Race
            </label>
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
                style={{ width: 500, backgroundColor: "white" }}
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
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Ethnicity
            </label>
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
                style={{ width: 500, backgroundColor: "white" }}
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
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA10;
