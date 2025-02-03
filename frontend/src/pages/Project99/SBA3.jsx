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

function SBA3({ formData, setFormData }) {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [openModal, setOpenModal] = useState(false);
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
  const [propertyType, setPropertyType] = useState("");
  const [numProperties, setNumProperties] = useState(0);
  const [estimatedValue, setEstimatedValue] = useState(0);
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
      <CheckoutSteps step1 step2></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Section I: Business Information(if applicable)
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "30%", marginTop: 10, backgroundColor: "green" }}
              startIcon={<AddIcon />}
              onClick={() => setOpenModal(true)}
            >
              Add Loan Reason
            </Button>
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 10 }}>
            <Paper style={{ padding: 10 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Loan Amount</TableCell>
                      <TableCell>Reasoning</TableCell>
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
                variant="outlined"
                InputProps={{
                  startAdornment: "$",
                }}
                onChange={(e) => setEstimatedValue(e.target.value)}
                fullWidth
                label="Estimated As Is Value "
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                fullWidth
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) => setNumProperties(e.target.value)}
                label="Reasoning"
                variant="outlined"
              />
            </Grid>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
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

export default SBA3;
