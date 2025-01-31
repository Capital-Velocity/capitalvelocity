import RoomIcon from "@mui/icons-material/Room";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";

function MultiFamPropertyPre({ formData, setFormData }) {
  const [inputValue, setInputValue] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [showMixedUseFields, setShowMixedUseFields] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
    setShowMixedUseFields(event.target.value === "Mixed Use");
    setFormData({
      ...formData,
      propertyType: event.target.value,
    });
  };

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);

    if (newValue.trim() === "") {
      setOptions([]);
      return;
    }

    setLoading(true);

    const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${newValue}`;

    axios
      .get(endpoint)
      .then((response) => {
        setOptions(response.data);
      })
      .finally(() => {
        setLoading(false);
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
            <div style={{ marginBottom: 5 }}>
              <Autocomplete
                value={formData.propertyLocation || ""}
                id="location-input"
                options={options}
                getOptionLabel={(option) => option.display_name}
                loading={loading}
                onChange={(e) =>
                  setFormData({ ...formData, propertyLocation: e.target.value })
                }
                onInputChange={handleInputChange}
                renderInput={(params) => (
                  <TextField
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    {...params}
                    label="Location"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              {inputValue && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <RoomIcon color="primary" />
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: 15,
                      fontWeight: 100,
                      color: "grey",
                    }}
                  >
                    {inputValue}
                  </span>
                </div>
              )}
            </div>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Select the Property Type{" "}
              </InputLabel>
              <Select
                style={{ width: "500px" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.propertyType || propertyType}
                onChange={handlePropertyTypeChange}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"5+ Unit Multifamily"}>
                  5+ Unit Multifamily
                </MenuItem>
                <MenuItem value={"Mixed Use"}>Mixed Use</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {propertyType === "Mixed Use" && (
            <Container>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: "500px", marginTop: 10 }}
                    value={formData.residentUnit || ""}
                    size="large"
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        residentUnit: e.target.value,
                      })
                    }
                    label="Residential Units"
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: "500px", marginTop: 10 }}
                    value={formData.commerUnit || ""}
                    size="large"
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commerUnit: e.target.value,
                      })
                    }
                    label="Commercial Units"
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: "500px", marginTop: 10 }}
                    value={formData.residentialUnitsArea || ""}
                    size="large"
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        residentialUnitsArea: e.target.value,
                      })
                    }
                    label="Residential Units Area"
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: "500px", marginTop: 10 }}
                    value={formData.commercialUnitsArea || ""}
                    size="large"
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commercialUnitsArea: e.target.value,
                      })
                    }
                    label="Commercial Units Area"
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: "500px", marginTop: 10 }}
                    value={formData.residentialIncome || ""}
                    size="large"
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        residentialIncome: e.target.value,
                      })
                    }
                    label="Residential Income"
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: "500px", marginTop: 10 }}
                    value={formData.commercialIncome || ""}
                    size="large"
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commercialIncome: e.target.value,
                      })
                    }
                    label="Commercial Income"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Container>
          )}
          {propertyType === "5+ Unit Multifamily" && (
            <Container>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: "500px", marginTop: 10 }}
                    value={formData.unitcount || ""}
                    size="large"
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unitcount: e.target.value,
                      })
                    }
                    label="Unit count"
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: "500px", marginTop: 10 }}
                    value={formData.inPlaceOfOccupancy || ""}
                    size="large"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        inPlaceOfOccupancy: e.target.value,
                      })
                    }
                    label="In place of occupancy"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Container>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default MultiFamPropertyPre;
