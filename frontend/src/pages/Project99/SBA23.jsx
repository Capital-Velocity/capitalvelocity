import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

function SBA22({ formData, setFormData }) {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [realEstateType, setRealEstateType] = useState(0);
  const [address, setAddress] = useState(0);
  const [cost, setCost] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(0);
  const [originalCost, setOriginalCost] = useState(0);
  const [presentMarketValue, setPresentMarketValue] = useState(0);
  const [nameAddress, setNameAddress] = useState(0);
  const [AmountPayment, setAmountPayment] = useState(0);
  const [statusMortgage, setStatusMortgage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 400,
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
      {
        realEstateType,
        address,
        cost,
        purchaseDate,
        originalCost,
        presentMarketValue,
        nameAddress,
        AmountPayment,
        statusMortgage,
      },
    ]);

    const newProperty = {
      realEstateType,
      address,
      cost,
      purchaseDate,
      originalCost,
      presentMarketValue,
      nameAddress,
      AmountPayment,
      statusMortgage,
    };
    const updatedFormData = {
      ...formData,
      realEstate: [...formData.realEstate, newProperty], // Assuming you have a property named "realEstate" in your formData object for storing real estate data
    };

    // Call setFormData to update the state with the new formData
    setFormData(updatedFormData);
    setRealEstateType(0);
    setAddress(0);
    setCost(0);
    setPurchaseDate(0);
    setOriginalCost(0);
    setPresentMarketValue(0);
    setNameAddress(0);
    setStatusMortgage(0);
    setOpenModal(false);
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT
        </Typography>
        <Grid container spacing={2}>
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
                      <TableCell>
                        Type of Real Estate (e.g. Primary Residence, Other
                        Residence, Rental Property, Land, etc.)
                      </TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Date Purchased</TableCell>
                      <TableCell>Original Cost</TableCell>
                      <TableCell>Present Market Value</TableCell>
                      <TableCell>Name & Address of Mortgage Holder</TableCell>
                      <TableCell>Amount of Payment per Month/Year</TableCell>
                      <TableCell>Status of Mortgage</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedProperties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} align="center">
                          No Rows to Show
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedProperties.map((property, index) => (
                        <TableRow key={index}>
                          <TableCell>{property.realEstateType}</TableCell>
                          <TableCell>{property.address}</TableCell>
                          <TableCell>{property.cost}</TableCell>
                          <TableCell>{property.purchaseDate}</TableCell>
                          <TableCell>{property.originalCost}</TableCell>
                          <TableCell>{property.presentMarketValue}</TableCell>
                          <TableCell>{property.nameAddress}</TableCell>
                          <TableCell>{property.AmountPayment}</TableCell>
                          <TableCell>{property.statusMortgage}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleDeleteRow(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setRealEstateType(e.target.value)}
                label="Type of Real Estate "
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setAddress(e.target.value)}
                label="Address"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setCost(e.target.value)}
                label="Cost"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setPurchaseDate(e.target.value)}
                label="Date Purchased"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setOriginalCost(e.target.value)}
                label="Original Cost"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setPresentMarketValue(e.target.value)}
                label="Present Market Value"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setNameAddress(e.target.value)}
                label="Name & Address of Mortgage Holder"
                variant="outlined"
              />
            </Grid>

            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setAmountPayment(e.target.value)}
                label="Amount of Payment per Month/Year"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setStatusMortgage(e.target.value)}
                label="Status of Mortgage"
                variant="outlined"
              />
            </Grid>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#498dd6",
                paddingBottom: 10,
                marginTop: 10,
                marginLeft: 10,
              }}
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

export default SBA22;
