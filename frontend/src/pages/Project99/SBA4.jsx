import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "./CheckoutSteps3";
import Radio from "@mui/material/Radio";
import {
  Table,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  Button,
  TableBody,
  Box,
  Modal,
  IconButton,
  TableHead,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import AddIcon from "@mui/icons-material/Add";

function SBA4() {
  const [formData, setFormData] = useState({
    ownershipOfApplicant: [], // Ensure this is initialized as an array
  });

  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [ownersName, setOwnersName] = useState("");
  const [title, setTitle] = useState("");
  const [estimateasvalue, setEstimateasvalue] = useState("");
  const [address, setAddress] = useState("");
  const [tin, setTin] = useState("");
  const [programType, setProgramType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const propertyTypes = ["ESOP", "401K", "COOP"];
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
    const newProperty = {
      ownersName,
      title,
      estimateasvalue,
      address,
      programType,
      tin,
    };

    const updatedFormData = {
      ...formData,
      ownershipOfApplicant: [...formData.ownershipOfApplicant, newProperty],
    };

    setFormData(updatedFormData);
    setSelectedProperties([
      ...selectedProperties,
      { ownersName, title, estimateasvalue, address, programType, tin },
    ]);

    setPropertyType("");
    setOwnersName("");
    setTitle("");
    setEstimateasvalue("");
    setAddress("");
    setTin("");
    setProgramType("");
    setNumProperties(0);
    setEstimatedValue(0);
    setOpenModal(false);
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Business Information (if applicable)
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: "bold" }}
          color="black"
        >
          Ownership of the Applicant
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Ownership of the Applicant List all proprietors, partners, officers,
          directors, members, and holders of outstanding stock.
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
              Add Partner
            </Button>
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 10 }}>
            <Paper style={{ padding: 10 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Owner's Legal Name</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>% Owned</TableCell>
                      <TableCell>TIN (SSN/EIN)</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Stock Ownership Plan</TableCell>
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
                          <TableCell>{property.ownersName}</TableCell>
                          <TableCell>{property.title}</TableCell>
                          <TableCell>{property.estimateasvalue}</TableCell>
                          <TableCell>{property.tin}</TableCell>
                          <TableCell>{property.address}</TableCell>
                          <TableCell>{property.programType}</TableCell>
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
                onChange={(e) => setOwnersName(e.target.value)}
                label="Owner's Legal Name"
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
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: "%",
                }}
                onChange={(e) => setEstimateasvalue(e.target.value)}
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
                onChange={(e) => setTin(e.target.value)}
                label="TIN (SSN/EIN)"
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
              <FormControl fullWidth>
                <InputLabel
                  style={{ fontSize: 15, fontWeight: 100 }}
                  id="demo-simple-select-label"
                >
                  Program Type
                </InputLabel>
                <Select
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setProgramType(e.target.value)}
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

export default SBA4;
