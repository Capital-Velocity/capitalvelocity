import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";

function RentalLoanPrice2({ formData, setFormData, fieldErrors }) {
  const [selectedState, setSelectedState] = useState("");
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const propertyTypes = [
    "Single Family",
    "Duplex",
    "Triplex",
    "Quadruplex",
    "Warrantable Condominium",
    "Townhome",
    "Planned unit Development",
    "5+ Unit Multifamily",
    "Mixed Use",
  ];
  const [selectedCounty, setSelectedCounty] = useState("");
  const [counties, setCounties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [numProperties, setNumProperties] = useState(0);
  const [estimatedValue, setEstimatedValue] = useState(0);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCounty("");
  };

  const handleCountyChange = (event) => {
    setSelectedCounty(event.target.value);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleDeleteRow = (index) => {
    const updatedProperties = selectedProperties.filter(
      (property, i) => i !== index
    );
    setSelectedProperties(updatedProperties);
  };
  const getTotalProperties = () => {
    return selectedProperties.reduce(
      (total, property) => total + Number(property.numProperties),
      0
    );
  };
  const handleAddProperty = () => {
    setSelectedProperties([
      ...selectedProperties,
      { propertyType, numProperties, estimatedValue },
    ]);
    setPropertyType("");
    setNumProperties(0);
    setEstimatedValue(0);
    setOpenModal(false);
  };

  return (
    <div>
      <Container style={{ marginTop: -10 }}>
        <Typography variant="h4" color="black" gutterBottom>
          Loan Pricer
        </Typography>
        <Typography variant="h6" color="black" gutterBottom>
          Portfolio's Properties
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="grey">
              Target Ltv
            </Typography>
            <TextField
              error={fieldErrors.ltv}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.ltv || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ltv: e.target.value,
                })
              }
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="grey">
              Minimum As Is Value
            </Typography>
            <TextField
              error={fieldErrors.minAsValue}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.minAsValue || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minAsValue: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="grey">
              Maximum As Is Value
            </Typography>
            <TextField
              error={fieldErrors.maxAsValue}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.maxAsValue || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxAsValue: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Property Management
              </Typography>

              <Select
                error={fieldErrors.propertyMan}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.propertyMan || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyMan: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Self Managed"}>Self Managed</MenuItem>
                <MenuItem value={"Third Party Managment"}>
                  Third Party Managment
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default RentalLoanPrice2;
