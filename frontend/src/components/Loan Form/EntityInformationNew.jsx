import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps2 from "../CheckoutSteps";

function EntityInformationNew({ formData, setFormData }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <CheckoutSteps2 step1 step2 step3 step4></CheckoutSteps2>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Entity Information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please choose one existing entity or enter the information about the
          new borrowing entity.<br></br>
          Do You Have The Borrowing Entity Information?
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            style={{ color: "black" }}
            value="no"
            checked={selectedOption === "no"}
            onChange={handleOptionChange}
            control={<Radio />}
            label="No"
          />
          <FormControlLabel
            style={{ color: "black" }}
            value="yes"
            checked={selectedOption === "yes"}
            onChange={handleOptionChange}
            control={<Radio />}
            label="Yes"
          />
        </RadioGroup>
        {selectedOption === "yes" && (
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                style={{ width: "500px" }}
                value={formData.entityName || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, entityName: e.target.value })
                }
                label="Entity Name"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  style={{ fontSize: 15, fontWeight: 100 }}
                  id="demo-simple-select-label"
                >
                  Entity Type{" "}
                </InputLabel>
                <Select
                  style={{ width: "500px" }}
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  value={formData.entityType || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, entityType: e.target.value })
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Entity Type"
                >
                  <MenuItem value={"Corperation"}>Corperation</MenuItem>
                  <MenuItem value={"Limited Liability Company"}>
                    Limited Liability Company
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
                Date of Incorporation
              </label>
              <TextField
                style={{ width: "500px" }}
                value={formData.date || ""}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                type="date"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                style={{ width: "500px" }}
                value={formData.lastName || ""}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                id="outlined-basic"
                label="Contact Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                style={{ width: "500px" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.entityAddress || ""}
                onChange={(e) =>
                  setFormData({ ...formData, entityAddress: e.target.value })
                }
                id="outlined-basic"
                label="Entity Address"
                variant="outlined"
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default EntityInformationNew;
