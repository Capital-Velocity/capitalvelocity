import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider, FormHelperText } from "@mui/material";
import Slider from "@mui/material/Slider";
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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function EntityInformationProjectEpic99({
  formData,
  setFormData,
  fieldErrors,
}) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValue, setSliderValue] = useState(1);

  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue); // Use newValue directly
    setFormData((prevData) => ({
      ...prevData,
      borrowingEntityOwned: newValue, // Update formData properly
    }));
  };

  const percentageMarks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];

  const top100Films = [
    { title: "7(a) loan / 504 loan / Surety Bonds" },
    {
      title:
        "Disaster Business Loan Application (Excluding Sole Proprietorships)",
    },
    { title: "Women Owned Small Business (WOSB) Federal Contracting Program" },
  ];
  const fixedOptions = [top100Films[5]];

  const [selectedProperties, setSelectedProperties] = useState(
    formData.ownershipOfApplicant || []
  );
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
    width: "90vw", // Responsive width
    maxWidth: 1000, // Max width for larger screens
    height: "auto", // Allow height to adjust based on content
    maxHeight: "90vh", // Prevent modal from overflowing on smaller screens
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto", // Allows scrolling inside modal if content overflows
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

    // Ensure ownershipOfApplicant is an array before spreading
    const updatedFormData = {
      ...formData,
      ownershipOfApplicant: [
        ...(Array.isArray(formData.ownershipOfApplicant)
          ? formData.ownershipOfApplicant
          : []),
        newProperty,
      ],
    };

    setFormData(updatedFormData);
    setSelectedProperties([...selectedProperties, newProperty]);

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
    <div style={{ width: "100%" }}>
      {" "}
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Entity Information
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Please choose one existing entity or enter the information about the
          new borrowing entity.<br></br>
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography type="p" color="black">
            Do you have the Borrowing Entity Information?
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{ justifyContent: "center" }}
          >
            <FormControlLabel
              style={{ color: "black" }}
              value="Yes" // Set the value to "Yes" when selected
              checked={formData.borrowingEntityInformation === "Yes"} // Check if it's "Yes" in formData
              onChange={() =>
                handleOptionChange("borrowingEntityInformation", "Yes")
              }
              error={fieldErrors.borrowingEntityInformation}
              helperText={<span>{fieldErrors.borrowingEntityInformation}</span>}
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              style={{ color: "black" }}
              value="No" // Set the value to "Yes" when selected
              checked={formData.borrowingEntityInformation === "No"} // Check if it's "Yes" in formData
              onChange={() =>
                handleOptionChange("borrowingEntityInformation", "No")
              }
              error={fieldErrors.borrowingEntityInformation}
              helperText={<span>{fieldErrors.borrowingEntityInformation}</span>}
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
          {fieldErrors.borrowingEntityInformation && (
            <FormHelperText error style={{ textAlign: "center" }}>
              {fieldErrors.borrowingEntityInformation}
            </FormHelperText>
          )}

          {formData.borrowingEntityInformation === "Yes" && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Operating Business Legal Name
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.operatingBusinessLegalName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          operatingBusinessLegalName: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    DBA or Trade name, if applicable:
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.dBATradename || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dBATradename: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography type="p" color="black">
                  Is the Applicant:
                </Typography>
                <FormControl fullWidth>
                  <Select
                    style={{ backgroundColor: "white" }}
                    InputLabelProps={{
                      style: { fontSize: 15, fontWeight: 100 },
                    }}
                    value={formData.aplicantA || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aplicantA: e.target.value,
                      })
                    }
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    <MenuItem value={"Cooperative"}>Cooperative</MenuItem>
                    <MenuItem value={"ESOP"}>ESOP</MenuItem>
                    <MenuItem value={"401(k) Plan"}>401(k) Plan</MenuItem>
                    <MenuItem value={"Other:"}>Other</MenuItem>
                    <MenuItem value={"N/A:"}>N/A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Business Tax ID
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.businessTaxID || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessTaxID: e.target.value.slice(0, 9),
                        })
                      }
                      type="number"
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth
                      error={fieldErrors.businessTaxID}
                      helperText={<span>{fieldErrors.businessTaxID}</span>}
                      sx={{
                        "& input[type='number']": {
                          "-webkit-appearance": "none",
                          "-moz-appearance": "textfield",
                          appearance: "none",
                        },
                        "& input::-webkit-outer-spin-button": {
                          appearance: "none",
                          margin: 0,
                        },
                        "& input::-webkit-inner-spin-button": {
                          appearance: "none",
                          margin: 0,
                        },
                      }}
                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Primary Business Address
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.PrimaryBusinessAddress || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          PrimaryBusinessAddress: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Primary Business Address <strong>(Zip)</strong>
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.PrimaryBusinessAddressZip || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          PrimaryBusinessAddressZip: e.target.value.slice(0, 5),
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      type="number"
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& input[type='number']": {
                          "-webkit-appearance": "none",
                          "-moz-appearance": "textfield",
                          appearance: "none",
                        },
                        "& input::-webkit-outer-spin-button": {
                          appearance: "none",
                          margin: 0,
                        },
                        "& input::-webkit-inner-spin-button": {
                          appearance: "none",
                          margin: 0,
                        },
                      }}
                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Primary Business Address<strong> (State)</strong>
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.PrimaryBusinessAddressState || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          PrimaryBusinessAddressState: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Primary Business Address<strong> (County)</strong>
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.PrimaryBusinessAddressCounty || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          PrimaryBusinessAddressCounty: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Project Address (if other than primary business address)
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.ProjectAddress || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ProjectAddress: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Project Address <strong>Zip</strong> (if other than primary
                    business address)
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.ProjectAddressZip || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ProjectAddressZip: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth
                      error={fieldErrors.ProjectAddressZip}
                      helperText={<span>{fieldErrors.ProjectAddressZip}</span>}
                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Project Address <strong>State</strong> (if other than
                    primary business address)
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.ProjectAddressState || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ProjectAddressState: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Project Address <strong>County</strong> (if other than
                    primary business address)
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.ProjectAddressCounty || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ProjectAddressCounty: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Primary Business Phone
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.PrimaryBusinessPhone || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          PrimaryBusinessPhone: e.target.value.slice(0, 10),
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth
                      error={fieldErrors.PrimaryBusinessPhone}
                      helperText={
                        <span>{fieldErrors.PrimaryBusinessPhone}</span>
                      }
                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Email Address
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.businessEmail || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessEmail: e.target.value,
                        })
                      }
                      style={{ backgroundColor: "white" }}
                      variant="outlined"
                      fullWidth
                      error={fieldErrors.businessEmail}
                      helperText={<span>{fieldErrors.businessEmail}</span>}
                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography type="p" color="black">
                  Do you have or plan to use a 401(K) Plan?
                </Typography>
                <FormControl
                  fullWidth
                  error={!!fieldErrors.plantoUse}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      style={{ color: "black" }}
                      value="Yes" // Set the value to "Yes" when selected
                      checked={formData.plantoUse === "Yes"} // Check if it's "Yes" in formData
                      onChange={() => handleOptionChange("plantoUse", "Yes")}
                      error={fieldErrors.plantoUse}
                      helperText={<span>{fieldErrors.plantoUse}</span>}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      style={{ color: "black" }}
                      value="No" // Set the value to "No" when selected
                      checked={formData.plantoUse === "No"} // Check if it's "No" in formData
                      onChange={() => handleOptionChange("plantoUse", "No")}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography type="p" color="black">
                  Do you have or plan to use a Management Company to manage the
                  day-to-day operations?
                </Typography>
                <FormControl
                  fullWidth
                  error={!!fieldErrors.managmentCompany}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      style={{ color: "black" }}
                      value="Yes" // Set the value to "Yes" when selected
                      checked={formData.managmentCompany === "Yes"} // Check if it's "Yes" in formData
                      onChange={() =>
                        handleOptionChange("managmentCompany", "Yes")
                      }
                      error={fieldErrors.managmentCompany}
                      helperText={<span>{fieldErrors.managmentCompany}</span>}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      style={{ color: "black" }}
                      value="No" // Set the value to "No" when selected
                      checked={formData.managmentCompany === "No"} // Check if it's "No" in formData
                      onChange={() =>
                        handleOptionChange("managmentCompany", "No")
                      }
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    Number of existing employees employed by business?
                  </Typography>
                  <Grid item sm={12}>
                    {" "}
                    <TextField
                      value={formData.numbEmployees || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numbEmployees: e.target.value,
                        })
                      }
                      style={{
                        backgroundColor: "white",
                      }}
                      variant="outlined"
                      fullWidth

                      // Add more props as needed
                    />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default EntityInformationProjectEpic99;
