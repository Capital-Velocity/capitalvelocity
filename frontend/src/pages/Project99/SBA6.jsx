import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "./CheckoutSteps3";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Slider from "@mui/material/Slider";
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
function SBA6({ formData, setFormData, fieldErrors }) {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [numProperties, setNumProperties] = useState(0);
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [namesofAffiliates, setnamesofAffiliates] = useState("");
  const [addressofAffiliates, setaddressofAffiliates] = useState("");
  const [programType, setProgramType] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleDeleteRow = (index) => {
    const updatedProperties = selectedProperties.filter(
      (property, i) => i !== index
    );
    setSelectedProperties(updatedProperties);
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

  const handleAddProperty = () => {
    setSelectedProperties([
      ...selectedProperties,
      {
        namesofAffiliates,
        addressofAffiliates,
      },
    ]);
    const newProperty = {
      namesofAffiliates,
      addressofAffiliates,
    };

    const updatedFormData = {
      ...formData,
      affiliatesInformation: [
        ...(formData.affiliatesInformation || []),
        newProperty,
      ],
    };
    setFormData(updatedFormData);
    setnamesofAffiliates("");
    setaddressofAffiliates("");
  };
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
    setFormData({
      ...formData,
      armsLength: event.target.value,
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Business Information (if applicable)
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Does the Business have any Affiliates ? (If "Yes", attach a
              listing of all Affiliates.)
            </label>
            <div style={{ marginTop: 20 }}>
              {formData.businessHaveAffiliates == "Yes" && (
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
                      Add Affiliates
                    </Button>
                  </Grid>
                  <Grid item sm={12} style={{ marginBottom: 10 }}>
                    <Paper style={{ padding: 10 }}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Names of Affiliates</TableCell>
                              <TableCell>Address of Affiliates</TableCell>

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
                                  <TableCell>
                                    {property.namesofAffiliates}
                                  </TableCell>
                                  <TableCell>
                                    {property.addressofAffiliates}
                                  </TableCell>
                                  <TableCell>
                                    <IconButton
                                      onClick={() => handleDeleteRow(index)}
                                    >
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
              )}
            </div>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.businessHaveAffiliates === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("businessHaveAffiliates", "Yes")
                }
                error={fieldErrors.businessHaveAffiliates}
                helperText={<span>{fieldErrors.businessHaveAffiliates}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.businessHaveAffiliates === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("businessHaveAffiliates", "No")
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Has the Business and/or its Affiliates ever filed for bankruptcy
              protection?
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.affiliatesBankruptcy === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("affiliatesBankruptcy", "Yes")
                }
                error={fieldErrors.affiliatesBankruptcy}
                helperText={<span>{fieldErrors.affiliatesBankruptcy}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.affiliatesBankruptcy === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("affiliatesBankruptcy", "No")
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is the Business and/or its Affiliates presently involved in any
              pending legal action?
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.affiliatesLegalAction === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("affiliatesLegalAction", "Yes")
                }
                error={fieldErrors.affiliatesLegalAction}
                helperText={<span>{fieldErrors.affiliatesLegalAction}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.affiliatesLegalAction === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("affiliatesLegalAction", "No")
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Are any of the Business's products and/or services exported
              (directly or indirectly)?
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.businessProducts === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("businessProducts", "Yes")}
                error={fieldErrors.businessProducts}
                helperText={<span>{fieldErrors.businessProducts}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.businessProducts === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("businessProducts", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>

          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Are any of the Business's revenues derived from gambling, loan
              packaging, or from the sale of products or services, or the
              presentation of any depiction, displays or live performances, of a
              prurient sexual nature? If "Yes," provide details under a separate
              attachment.
            </label>
            <div style={{ marginTop: 20 }}>
              {selectedOption2 === "yes" && (
                <TextField
                  style={{
                    width: "500px",
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  value={formData.businessRevenueDetails || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessRevenueDetails: e.target.value,
                    })
                  }
                  size="large"
                  InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                  label="Please describe"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              )}
            </div>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.revenuesDerived === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("revenuesDerived", "Yes")}
                error={fieldErrors.revenuesDerived}
                helperText={<span>{fieldErrors.revenuesDerived}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.revenuesDerived === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("revenuesDerived", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
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
                onChange={(e) => setnamesofAffiliates(e.target.value)}
                label="Names of Affiliates"
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
                onChange={(e) => setaddressofAffiliates(e.target.value)}
                label="Address of Affiliates"
                variant="outlined"
              />
            </Grid>

            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
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

export default SBA6;
