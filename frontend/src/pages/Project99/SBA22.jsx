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
  const [numbShares, setNumbShares] = useState(0);
  const [numbofSecurities, setNumbofSecurities] = useState(0);
  const [cost, setCost] = useState(0);
  const [marketValue, setMarketValue] = useState(0);
  const [dateofQuoatation, setDateofQuoatation] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

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
    const newProperty = {
      numbShares,
      numbofSecurities,
      cost,
      marketValue,
      dateofQuoatation,
      totalValue,
    };

    setSelectedProperties([...selectedProperties, newProperty]);

    const updatedFormData = {
      ...formData,
      stocksAndBonds: [...(formData.stocksAndBonds || []), newProperty],
    };

    setFormData(updatedFormData);
    setNumbShares(0);
    setNumbofSecurities(0);
    setCost(0);
    setMarketValue(0);
    setDateofQuoatation("");
    setTotalValue(0);
    setOpenModal(false);
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - Stocks and Bonds.
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
              Add Stocks and Bonds
            </Button>
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 10 }}>
            <Paper style={{ padding: 10 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Number of Shares</TableCell>
                      <TableCell>Name of Securities</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Market Value Quotation/Exchange</TableCell>
                      <TableCell>Date of Quotation/Exchange</TableCell>
                      <TableCell>Total Value</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedProperties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No Rows to Show
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedProperties.map((property, index) => (
                        <TableRow key={index}>
                          <TableCell>{property.numbShares}</TableCell>
                          <TableCell>{property.numbofSecurities}</TableCell>
                          <TableCell>{property.cost}</TableCell>
                          <TableCell>{property.marketValue}</TableCell>
                          <TableCell>{property.dateofQuoatation}</TableCell>
                          <TableCell>{property.totalValue}</TableCell>
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
                onChange={(e) => setNumbShares(e.target.value)}
                label="Number of Shares"
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
                onChange={(e) => setNumbofSecurities(e.target.value)}
                label="Name of Securities"
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
                onChange={(e) => setMarketValue(e.target.value)}
                label="Market Value Quotation/Exchange"
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
                onChange={(e) => setDateofQuoatation(e.target.value)}
                label="Date of Quotation/Exchange"
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
                onChange={(e) => setTotalValue(e.target.value)}
                label="Total Value"
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
