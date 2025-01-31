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
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

function SBA21({ formData, setFormData }) {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [ownersName, setOwnersName] = useState(0);
  const [balance, setBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [frequencey, setFrequencey] = useState(0);
  const [howSecured, setHowSecured] = useState(0);
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

  const handleAddProperty = () => {
    setSelectedProperties([
      ...selectedProperties,
      {
        ownersName,
        balance,
        currentBalance,
        paymentAmount,
        frequencey,
        howSecured,
      },
    ]);

    const newProperty = {
      ownersName,
      balance,
      currentBalance,
      paymentAmount,
      frequencey,
      howSecured,
    };

    const updatedFormData = {
      ...formData,
      notesPayable: [...(formData.notesPayable || []), newProperty],
    };

    setFormData(updatedFormData);
    setOwnersName(0);
    setBalance(0);
    setCurrentBalance(0);
    setPaymentAmount(0);
    setFrequencey(0);
    setHowSecured(0);
    setOpenModal(false);
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - Notes Payable
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
              Add Notes Payable
            </Button>
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 10 }}>
            <Paper style={{ padding: 10 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Names and Addresses of Noteholder(s)
                      </TableCell>
                      <TableCell>Original Balance</TableCell>
                      <TableCell>Current Balance</TableCell>
                      <TableCell>Payment Amount</TableCell>
                      <TableCell>Frequency (monthly, etc.)</TableCell>
                      <TableCell>
                        How Secured or Endorsed Type of Collateral
                      </TableCell>
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
                          <TableCell>{property.balance}</TableCell>
                          <TableCell>{property.currentBalance}</TableCell>
                          <TableCell>{property.paymentAmount}</TableCell>
                          <TableCell>{property.frequencey}</TableCell>
                          <TableCell>{property.howSecured}</TableCell>
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
                label="Names and Addresses of Noteholder(s)"
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
                onChange={(e) => setBalance(e.target.value)}
                label="Original Balance"
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
                onChange={(e) => setCurrentBalance(e.target.value)}
                label="Current Balance"
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
                onChange={(e) => setPaymentAmount(e.target.value)}
                label="Payment Amount"
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
                onChange={(e) => setFrequencey(e.target.value)}
                label="Frequency (monthly, etc.)"
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
                onChange={(e) => setHowSecured(e.target.value)}
                label="How Secured or Endorsed Type of Collateral"
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

export default SBA21;
