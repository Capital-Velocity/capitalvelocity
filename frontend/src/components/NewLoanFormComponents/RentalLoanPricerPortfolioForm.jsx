import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Modal,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  InputAdornment,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "../../screens/Container";

function RentalLoanPricerPortfolioForm({ formData, setFormData, fieldErrors }) {
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

  const [ownersName, setOwnersName] = useState("");
  const [title, setTitle] = useState("");
  const [estimateasvalue, setEstimateasvalue] = useState("");
  const [address, setAddress] = useState("");
  const [programType, setProgramType] = useState("");

  const [selectedCounty, setSelectedCounty] = useState("");
  const [counties, setCounties] = useState([]);
  const selectedProperties = formData.portfolioProperties || [];
  const [openModal, setOpenModal] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [numProperties, setNumProperties] = useState(0);
  const [estimatedValue, setEstimatedValue] = useState(0);

  const handleStateChange = (event) => {
    setFormData({
      ...formData,
      state: event.target.value,
    });
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
    const updatedProperties = selectedProperties.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      portfolioProperties: updatedProperties, // Persist updated properties
    });
  };

  const getTotalProperties = () => {
    return selectedProperties.reduce(
      (total, property) => total + Number(property.numProperties),
      0
    );
  };

  const handleAddProperty = () => {
    const newProperty = {
      propertyType,
      numProperties,
      estimatedValue,
    };

    const updatedProperties = [...selectedProperties, newProperty];

    setFormData({
      ...formData,
      portfolioProperties: updatedProperties, // Store properties in formData
    });

    setPropertyType("");
    setNumProperties(0);
    setEstimatedValue(0);
    setOpenModal(false);
  };

  return (
    <div>
      <Container style={{ marginTop: 10 }}>
        <Typography variant="h4" color="black" gutterBottom>
          Property Information
        </Typography>
        {/* <Typography variant="h6" color="black" gutterBottom>
          Portfolio's Properties
        </Typography> */}
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FormControl style={{ width: "500px" }}>
              <Typography type="p" color="black">
                Select State
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                value={formData.state || selectedState}
                onChange={handleStateChange}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
                error={fieldErrors.state}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "30%",
                marginTop: 10,
                backgroundColor: "#498dd6",
              }}
              startIcon={<AddIcon />}
              onClick={() => setOpenModal(true)}
            >
              Add Property
            </Button>
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 10 }}>
            <Paper style={{ padding: 10 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Property Type</TableCell>
                      <TableCell>Number of Properties</TableCell>
                      <TableCell>Estimated As Is Value</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedProperties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No Rows to Show
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedProperties.map((property, index) => (
                        <TableRow key={index}>
                          <TableCell>{property.propertyType}</TableCell>
                          <TableCell>{property.numProperties}</TableCell>
                          <TableCell>{property.estimatedValue}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleDeleteRow(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell>{getTotalProperties()}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Loan Purpose
              </Typography>

              <Select
                error={fieldErrors.loanPurpose}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.loanPurpose || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanPurpose: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Purchase"}>Purchase</MenuItem>
                <MenuItem value={"Finance"}>Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="black">
              Purchase Price
            </Typography>
            <TextField
              error={fieldErrors.purchasePriceProperty}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.purchasePriceProperty || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  purchasePriceProperty: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Loan Recourse
              </Typography>

              <Select
                error={fieldErrors.loanRecourse}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.loanRecourse || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanRecourse: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Full Recourse"}>Full Recourse</MenuItem>
                <MenuItem value={"Non Recourse"}>Non Recourse</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          {/* <Grid item sm={6}>
            {" "}
            <Typography type="p" color="black">
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
          </Grid> */}
          {/* <Grid item sm={6}>
            {" "}
            <Typography type="p" color="black">
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
          </Grid> */}
          {/* <Grid item sm={6}>
            {" "}
            <Typography type="p" color="black">
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
          </Grid> */}

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
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
          <Grid item sm={6}>
            {" "}
            <Typography type="p" color="black">
              Gross Monthly Rent
            </Typography>
            <TextField
              error={fieldErrors.grossmontly}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.grossmontly || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  grossmontly: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* <Grid item sm={6}>
            {" "}
            <Typography type="p" color="black">
              Minimum As Is Value (Cash Flow)
            </Typography>
            <TextField
              error={fieldErrors.cashFlowminAsValue}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.cashFlowminAsValue || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cashFlowminAsValue: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid> */}
          {/* <Grid item sm={6}>
            {" "}
            <Typography type="p" color="black">
              Maximum As Is Value (Cash Flow)
            </Typography>
            <TextField
              error={fieldErrors.cashFlowmaxAsValue}
              style={{ width: "500px", backgroundColor: "white" }}
              value={formData.cashFlowmaxAsValue || ""}
              size="large"
              InputLabelProps={{
                style: { fontSize: 15, fontWeight: 100 },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cashFlowmaxAsValue: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid> */}

          {/* <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Property Management (Cash Flow)
              </Typography>

              <Select
                error={fieldErrors.cashFlowpropertyMan}
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.cashFlowpropertyMan || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cashFlowpropertyMan: e.target.value,
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
          </Grid> */}
        </Grid>
      </Container>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <FormControl fullWidth>
                <InputLabel
                  style={{ fontSize: 15, fontWeight: 100 }}
                  id="demo-simple-select-label"
                >
                  Program Type
                </InputLabel>
                <Select
                  style={{ width: "200px" }}
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setPropertyType(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  {propertyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <TextField
                style={{ width: "200px" }}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setNumProperties(e.target.value)}
                label="Number of Properties"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: "$",
                }}
                onChange={(e) => setEstimatedValue(e.target.value)}
                fullWidth
                label="Estimated As Is Value"
              />
            </Grid>

            <Button
              variant="contained"
              style={{ backgroundColor: "#498dd6", marginTop: 10 }}
              onClick={handleAddProperty}
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default RentalLoanPricerPortfolioForm;
