import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider } from "@mui/material";

function PropertyInformation({ formData, setFormData, fieldErrors }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {" "}
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
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Home Address
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.homeAddress || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homeAddress: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.homeAddress}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.homeAddress}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                City
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressCity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressCity: e.target.value,
                    })
                  }
                  error={fieldErrors.addressCity}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.addressCity}</span>}
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
                Zip Code
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressZip || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressZip: e.target.value.slice(0, 5),
                    })
                  }
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.addressZip}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.addressZip}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                State
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressState || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressState: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.addressState}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.addressState}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Select the Property Type{" "}
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                InputLabelProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: 100,
                    backgroundColor: "white",
                  },
                }}
                value={formData.propertyType || ""}
                error={fieldErrors.propertyType}
                helperText={<span>{fieldErrors.propertyType}</span>}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyType: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Single Family"}>Single Family</MenuItem>
                <MenuItem value={"Duplex"}>Duplex</MenuItem>
                <MenuItem value={"Triplex"}>Triplex</MenuItem>
                <MenuItem value={"Quadruplex"}>Quadruplex</MenuItem>
                <MenuItem value={"Warrantable Condominium"}>
                  Warrantable Condominium
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyInformation;
