import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider, FormHelperText, Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import TableComponent from "../Loan Form/TableComponent";
import CustomAccordion from "../Loan Form/CustomAccordion";

function PropertyInformationSinglePropertyRental({
  formData,
  setFormData,
  fieldErrors,
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const top100Films = [
    { title: "Light and Cosmetic" },
    { title: "Gut Rehab" },
    { title: "Horizontal Enlargement" },
    { title: "Vertical Enlargement (adding a floor)" },
    { title: "Moderate Rehab" },
    { title: "New Construction" },
    { title: "Condo Conversion" },
    { title: "No Renovation planned" },
  ];
  const fixedOptions = [top100Films[7]];
  const [value, setValue] = React.useState([...fixedOptions, top100Films[7]]);

  const top100Films2 = [
    { title: "Cleanout" },
    { title: "Light and Cosmetic" },
    { title: "Gut Rehab" },
    { title: "Moderate Rehab" },
    { title: "New Construction" },
    { title: "No Renovation planned" },
  ];
  const fixedOptions2 = [top100Films2[5]];
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [investedCapital, setInvestedCapital] = useState("");
  const [completedCapex, setCompletedCapex] = useState("");

  const totalBudget = parseFloat(investedCapital) + parseFloat(completedCapex);

  const handleInvestedCapitalChange = (event) => {
    setInvestedCapital(event.target.value);
    setFormData({ ...formData, investedCapital: investedCapital });
  };

  const handleCompletedCapexChange = (event) => {
    setCompletedCapex(event.target.value);
    setFormData({ ...formData, completedCapex: completedCapex });
  };

  const [sliderValue, setSliderValue] = React.useState(1);
  const handleSliderChange = (event, newValue) => {
    setSliderValue(event.target.value);
    setFormData({
      ...formData,
      ficoScore: event.target.value,
    });
  };

  const marks = [
    { value: 600, label: "600" },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 800, label: "800" },
  ];

  const handleOptionChangeLoanPricer = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };

  const menuItems = [];
  for (let i = 0; i <= 0.4; i += 0.01) {
    menuItems.push(
      <MenuItem key={i} value={i}>
        {`${(i * 100).toFixed(2)}%`}
      </MenuItem>
    );
  }
  const [sliderValueLoanPricerSummary, setSliderValueLoanPricerSummary] =
    React.useState(1);
  const [sliderValueLoanPricerSummary2, setSliderValueLoanPricerSummary2] =
    React.useState(0);
  const handleSliderChangeLoanPricerSummary = (event, newValue) => {
    setSliderValueLoanPricerSummary(event.target.value);
    setFormData({
      ...formData,
      loanToValue: event.target.value,
    });
  };
  const handleSliderChangeLoanPricerSummary2 = (event, newValue) => {
    setSliderValueLoanPricerSummary2(event.target.value);
    setFormData({
      ...formData,
      oneTimeYield: event.target.value,
    });
  };

  const marksLoanToValue = [
    { value: 20, label: "20%" },
    { value: 65, label: "65%" },
  ];
  const marksOneTimeYieldSpreadPremium = [
    { value: 0, label: "0%" },
    { value: 1.275, label: "1.275%" },
  ];

  return (
    <div style={{ width: "100%" }}>
      {" "}
      {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Property Information
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Please add a property and tell us how the property was sourced and how
          the loan will be repaid. Remember we do NOT lend on borrower occupied
          properties.
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Property Address
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.propertyAddress || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      propertyAddress: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.propertyAddress}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.propertyAddress}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                City
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressCity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressCity: e.target.value,
                    })
                  }
                  error={fieldErrors.addressCity}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.addressCity}</span>}
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
                Zip Code
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressZip || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressZip: e.target.value.slice(0, 5),
                    })
                  }
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.addressZip}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.addressZip}</span>}
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

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                State
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.addressState || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressState: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.addressState}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.addressState}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Select the Property Type{" "}
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                InputLabelProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: 100,
                    backgroundColor: "white",
                  },
                }}
                value={formData.propertyType || ""}
                error={fieldErrors.propertyType}
                helperText={<span>{fieldErrors.propertyType}</span>}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyType: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Single Family"}>Single Family</MenuItem>
                <MenuItem value={"Duplex"}>Duplex</MenuItem>
                <MenuItem value={"Triplex"}>Triplex</MenuItem>
                <MenuItem value={"Quadruplex"}>Quadruplex</MenuItem>
                <MenuItem value={"Warrantable Condominium"}>
                  Warrantable Condominium
                </MenuItem>
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.propertyType && (
                <FormHelperText error>
                  {fieldErrors.propertyType}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            <Typography type="p" color="black">
              Is the borrower authorized signatory?
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                name="authorizedSignatory"
                value={formData.authorizedSignatory || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignatory: e.target.value, // Properly updating state
                  })
                }
                style={{ justifyContent: "center" }} // Centers radio buttons horizontally
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {fieldErrors.authorizedSignatory && (
                <FormHelperText error style={{ textAlign: "center" }}>
                  {fieldErrors.authorizedSignatory}
                </FormHelperText>
              )}
            </FormControl>
          </Grid> */}

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth style={{ minWidth: "", padding: "" }}>
              <Typography type="p" color="black">
                Purchase or Refinance
              </Typography>
              <Select
                style={{
                  backgroundColor: "white",
                }}
                value={formData.purchaseorRefinance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseorRefinance: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Purchase"}>Purchase</MenuItem>
                <MenuItem value={"Refinance"}>Refinance</MenuItem>
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.purchaseorRefinance && (
                <FormHelperText error>
                  {fieldErrors.purchaseorRefinance}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Property Purchase Price
              </Typography>
              <TextField
                value={formData.propertyPurchasePrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyPurchasePrice: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
                type="number"
                error={fieldErrors.propertyPurchasePrice}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.propertyPurchasePrice}</span>}
                // Add more props as needed
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                How is the property being sourced?
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                error={fieldErrors.propertySource}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                helperText={<span>{fieldErrors.propertySource}</span>}
                value={formData.propertySource || ""}
                onChange={(e) =>
                  setFormData({ ...formData, propertySource: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Short Sale"}>Short Sale</MenuItem>
                <MenuItem value={"REO"}>REO</MenuItem>
                <MenuItem value={"Wholesaler"}>Wholesaler</MenuItem>
                <MenuItem value={"Foreclosure Auction"}>
                  Foreclosure Auction
                </MenuItem>
                <MenuItem value={"Sheriff's Sale"}>Sheriff's Sale</MenuItem>
                <MenuItem value={"Estate Sale"}>Estate Sale</MenuItem>
                <MenuItem value={"Online Auction"}>Online Auction</MenuItem>
                <MenuItem value={"Bankruptcy Sale"}>Bankruptcy Sale</MenuItem>
                <MenuItem value={"MLS"}>MLS</MenuItem>
                <MenuItem value={"Pre-Foreclosure"}>Pre-Foreclosure</MenuItem>
                <MenuItem value={"Entity to Entity"}>Entity to Entity</MenuItem>
                <MenuItem value={"Inheritance"}>Inheritance</MenuItem>
                <MenuItem value={"Private Sale"}>Private Sale</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.propertySource && (
                <FormHelperText error>
                  {fieldErrors.propertySource}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What is the renovation budget?
              </Typography>
              <TextField
                error={fieldErrors.renovationBudget}
                helperText={<span>{fieldErrors.renovationBudget}</span>}
                style={{
                  width: "100%", // Use 100% width for responsiveness
                  marginTop: 8,
                  backgroundColor: "white",
                }}
                value={formData.renovationBudget || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, renovationBudget: e.target.value })
                }
                type="number"
                variant="outlined"
              />
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <Typography type="p" color="black">
              Is the property being converted to Condominiums?
            </Typography>
            <FormControl
              component="fieldset"
              fullWidth
              error={!!fieldErrors.isCondominium}
            >
              <RadioGroup
                row
                name="isCondominium"
                value={formData.isCondominium || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isCondominium: e.target.value, // Correctly updates state
                  })
                }
                style={{ justifyContent: "center" }} // Centers radio buttons horizontally
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              {fieldErrors.isCondominium && (
                <FormHelperText style={{ textAlign: "center" }}>
                  {fieldErrors.isCondominium}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography type="p" color="black">
              Please describe the renovation
            </Typography>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={top100Films}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              style={{
                width: "100%", // Make sure the component takes full width
                backgroundColor: "white",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  multiline // Allows TextField to expand with more content
                  error={!!fieldErrors.renovationDescript}
                  helperText={fieldErrors.renovationDescript}
                  value={formData.renovationDescript || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      renovationDescript: e.target.value,
                    })
                  }
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      minHeight: "56px",
                      maxHeight: "150px", // Limit height to avoid excessive expansion
                      overflowY: "auto", // Allows scrolling when height is exceeded
                      backgroundColor: "white",
                    },
                  }}
                />
              )}
              sx={{
                "& .MuiAutocomplete-tag": {
                  marginBottom: "5px", // Prevents tag overflow issues
                },
              }}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What is the After repair value?
              </Typography>
              <TextField
                style={{ marginTop: 8, backgroundColor: "white" }}
                error={fieldErrors.afterRepairValue}
                helperText={<span>{fieldErrors.afterRepairValue}</span>}
                value={formData.afterRepairValue || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, afterRepairValue: e.target.value })
                }
                type="number"
                variant="outlined"
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(fieldErrors?.exitStrat)}>
              <Typography type="p" color="black">
                Exit Strategy
              </Typography>
              <Select
                style={{ backgroundColor: "white" }}
                error={Boolean(fieldErrors?.exitStrat)}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.exitStrat || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    exitStrat: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Refinance"}>Refinance</MenuItem>
                <MenuItem value={"Sale"}>Sale</MenuItem>
              </Select>
              {fieldErrors?.exitStrat && (
                <FormHelperText sx={{ textAlign: "center" }}>
                  {fieldErrors.exitStrat}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item sm={12} xs={12} sx={{ textAlign: "center" }}>
            <FormControl
              component="fieldset"
              error={Boolean(fieldErrors?.cashOut)}
            >
              <Typography type="p" color="black">
                Are you looking for cash-out?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="cashOut"
                  value={formData.cashOut || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cashOut: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Box>
              {fieldErrors?.cashOut && (
                <FormHelperText sx={{ textAlign: "center" }}>
                  {fieldErrors.cashOut}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item sm={12} xs={12} sx={{ textAlign: "center" }}>
            <FormControl
              component="fieldset"
              error={Boolean(fieldErrors?.debt)}
            >
              <Typography type="p" color="black">
                Is there any debt?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="debt"
                  value={formData.debt || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      debt: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Box>
              {fieldErrors?.debt && (
                <FormHelperText sx={{ textAlign: "center" }}>
                  {fieldErrors.debt}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {formData.debt === "Yes" && (
            <>
              <Grid item sm={6} xs={12} style={{}}>
                <Typography type="p" color="black">
                  How much Debt is there?
                </Typography>
                <TextField
                  style={{ backgroundColor: "white" }}
                  value={formData.debtValue || ""}
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) =>
                    setFormData({ ...formData, debtValue: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              {[
                { label: "Gross Monthly Rent", key: "grossMonthlyRent" },
                { label: "Annual Taxes", key: "annualTaxes" },
                { label: "Annual Insurance", key: "annualInsurance" },
                { label: "Annual HOA Dues", key: "annualHOADues" },
                {
                  label: "Annual Utilities Expenses",
                  key: "annualUtilitiesExpenses",
                },
                {
                  label: "Annual Repairs & Maintenance Expenses",
                  key: "annualRepairsMaintenanceExpenses",
                },
                {
                  label: "Annual Property Management Fees",
                  key: "annualPropertyManagementFees",
                },
                {
                  label: "Annual Administrative Management Fees",
                  key: "annualAdministrativeManagementFees",
                },
                {
                  label: "Annual Payroll Expense",
                  key: "annualPayrollExpense",
                },
                {
                  label: "Annual Marketing Expense",
                  key: "annualMarketingExpense",
                },
                {
                  label: "Annual Replacement Reserve",
                  key: "annualReplacementReserve",
                },
              ].map((field) => (
                <Grid item sm={6} xs={12} key={field.key} sx={{ paddingX: 1 }}>
                  <FormControl fullWidth>
                    <Typography type="p" color="black">
                      {field.label}
                    </Typography>
                    <TextField
                      style={{ backgroundColor: "white" }}
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              ))}
            </>
          )}

          <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
            <FormControl fullWidth error={Boolean(fieldErrors?.purchaseDate)}>
              <Typography variant="body1" color="black">
                Purchase Date
              </Typography>
              <TextField
                value={formData.purchaseDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseDate: e.target.value,
                  })
                }
                style={{ backgroundColor: "white" }}
                type="date"
                variant="outlined"
                error={Boolean(fieldErrors?.purchaseDate)}
                helperText={fieldErrors?.purchaseDate || ""}
                fullWidth
                FormHelperTextProps={{
                  sx: { textAlign: "center" }, // Centers the helper text
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl
              fullWidth
              error={Boolean(fieldErrors?.investedCapital)}
            >
              <Typography type="p" color="black">
                What is the renovation budget including renovation capital that
                has already been invested plus the amount required to complete
                the project?{" "}
              </Typography>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                style={{ backgroundColor: "white" }}
                value={formData.investedCapital || ""}
                error={Boolean(fieldErrors?.investedCapital)}
                helperText={fieldErrors?.investedCapital || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    investedCapital: e.target.value,
                  })
                }
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth error={Boolean(fieldErrors?.completedCapex)}>
              <Typography type="p" color="black">
                How much has been invested in completed capex to date?
              </Typography>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                style={{ backgroundColor: "white" }}
                value={formData.completedCapex || ""}
                error={Boolean(fieldErrors?.completedCapex)}
                helperText={fieldErrors?.completedCapex || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    completedCapex: e.target.value,
                  })
                }
                fullWidth
              />
            </FormControl>
          </Grid>

          {/* <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle1" style={{ color: "black" }}>
                Total Budget: $
                {isNaN(totalBudget) ? "0.00" : totalBudget.toFixed(2)}
              </Typography>
            </Box>
          </Grid> */}
          <Grid item xs={12}>
            <Typography type="p" color="black">
              Please describe the renovation
            </Typography>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={top100Films2}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{
                      marginRight: 8,
                    }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              style={{
                width: "100%", // Make sure the component takes full width
                backgroundColor: "white",
              }}
              renderInput={(params) => (
                <TextField
                  multiline
                  style={{ backgroundColor: "white" }}
                  value={formData.renovationDescript || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      renovationDescript: e.target.value,
                    })
                  }
                  {...params}
                  error={fieldErrors.renovationDescript}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      minHeight: "56px",
                      maxHeight: "150px", // Limit height to avoid excessive expansion
                      overflowY: "auto", // Allows scrolling when height is exceeded
                      backgroundColor: "white",
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth error={Boolean(fieldErrors?.asIsValue)}>
              <Typography type="p" color="black">
                What is the As-Is Value?
              </Typography>
              <Grid item sm={12}>
                <TextField
                  value={formData.asIsValue || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      asIsValue: e.target.value,
                    })
                  }
                  required
                  error={Boolean(fieldErrors?.asIsValue)}
                  style={{ backgroundColor: "white" }}
                  helperText={
                    fieldErrors?.asIsValue && (
                      <span style={{ display: "block", textAlign: "center" }}>
                        {fieldErrors.asIsValue}
                      </span>
                    )
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </FormControl>
          </Grid>
          {/* <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What is the After repair value?
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.afterRepairValue || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      afterRepairValue: e.target.value,
                    })
                  }
                  required
                  error={fieldErrors.afterRepairValue}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.afterRepairValue}</span>}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(fieldErrors?.exitStrat)}>
              <Typography type="p" color="black">
                Exit Strategy
              </Typography>
              <Select
                style={{ backgroundColor: "white" }}
                error={Boolean(fieldErrors?.exitStrat)}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.exitStrat || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    exitStrat: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Refinance"}>Refinance</MenuItem>
                <MenuItem value={"Sale"}>Sale</MenuItem>
              </Select>
              {fieldErrors?.exitStrat && (
                <FormHelperText sx={{ textAlign: "center" }}>
                  {fieldErrors.exitStrat}
                </FormHelperText>
              )}
            </FormControl>
          </Grid> */}
          <Grid item sm={12}>
            <FormControl fullWidth error={Boolean(fieldErrors?.background)}>
              <Typography type="p" color="black">
                Please outline the background / story for this opportunity (what
                is it about this deal that you like){" "}
              </Typography>
              <TextField
                style={{ backgroundColor: "white" }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    background: e.target.value,
                  })
                }
                error={Boolean(fieldErrors?.background)}
                helperText={
                  fieldErrors?.background && (
                    <span style={{ display: "block", textAlign: "center" }}>
                      {fieldErrors.background}
                    </span>
                  )
                }
                value={formData.background || ""}
                variant="outlined"
                fullWidth
                multiline
              />
            </FormControl>
          </Grid>

          <Grid item sm={12}>
            <FormControl fullWidth error={Boolean(fieldErrors?.redFlags)}>
              <Typography type="p" color="black">
                Can you outline all of the red flags or concerns that we should
                be aware of? (What should we know at the beginning of this
                process that may have an impact on how we look at the deal?)
              </Typography>
              <TextField
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    redFlags: e.target.value,
                  })
                }
                style={{ backgroundColor: "white" }}
                error={Boolean(fieldErrors?.redFlags)}
                helperText={
                  fieldErrors?.redFlags && (
                    <span style={{ display: "block", textAlign: "center" }}>
                      {fieldErrors.redFlags}
                    </span>
                  )
                }
                value={formData.redFlags || ""}
                variant="outlined"
                fullWidth
                multiline
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Select the Property Type{" "}
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.propertyType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyType: e.target.value,
                  })
                }
                error={fieldErrors.propertyType}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Single Family"}>Single Family</MenuItem>
                <MenuItem value={"Duplex"}>Duplex</MenuItem>
                <MenuItem value={"Triplex"}>Triplex</MenuItem>
                <MenuItem value={"Quadruplex"}>Quadruplex</MenuItem>
                <MenuItem value={"Warrantable Condominium"}>
                  Warrantable Condominium
                </MenuItem>
                <MenuItem value={"Townhome"}>Townhome</MenuItem>
                <MenuItem value={"Warrantable Condominium"}>
                  Warrantable Condominium
                </MenuItem>
                <MenuItem value={"Planned Unit Development"}>
                  Planned Unit Development
                </MenuItem>
                <MenuItem value={" 5+ Unit Multifamily"}>
                  5+ Unit Multifamily
                </MenuItem>
                <MenuItem value={"Mixed Use"}>Mixed Use</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Loan Purpose
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                error={fieldErrors.loanPurpose}
                value={formData.loanPurpose || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanPurpose: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Entity Type"
              >
                <MenuItem value={"Purchase"}>Purchase</MenuItem>
                <MenuItem value={"Refinance"}>Refinance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Purchase Price
              </Typography>
              <TextField
                error={fieldErrors.purchasePriceProperty}
                style={{ backgroundColor: "white" }}
                value={formData.purchasePriceProperty || ""}
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
                variant="outlined"
              />
            </FormControl>
          </Grid>

          <>
            {[
              {
                label: "Estimated As Is Value",
                key: "estimatedAsIsValue",
                startAdornment: "$",
              },
              {
                label: "Gross Monthly Rent",
                key: "grossMonthlyRent",
                startAdornment: "$",
              },
              {
                label: "Annual Taxes",
                key: "annualTaxes",
                startAdornment: "$",
              },
              {
                label: "Annual Insurance",
                key: "annualInsurance",
                startAdornment: "$",
              },
              { label: "Annual HOA Dues", key: "hoa", startAdornment: "$" },
              {
                label: "Annual Utility Expenses",
                key: "annualUtilityExpenses",
                startAdornment: "$",
              },
              {
                label: "Annual Repair/Maintenance Expenses",
                key: "annualRepair",
                startAdornment: "$",
              },
              {
                label: "Annual Property Management Fees",
                key: "propertyFees",
                startAdornment: "$",
              },
              {
                label: "Total Annual Income",
                key: "totalAnnualIncome",
                startAdornment: "$",
              },
              {
                label: "Annual Expenses",
                key: "annualExpenses",
                startAdornment: "$",
              },
              { label: "Annual NOI", key: "annualNOI", startAdornment: "$" },
              {
                label: "Target Ltv",
                key: "targetLTV",
                endAdornment: "%",
              },
            ].map((field) => (
              <Grid
                item
                sm={4}
                xs={12}
                key={field.key}
                sx={{ marginBottom: 2, paddingX: 1 }}
              >
                <FormControl fullWidth>
                  <Typography type="p" color="black">
                    {field.label}
                  </Typography>
                  <TextField
                    style={{ backgroundColor: "white" }}
                    error={fieldErrors[field.key]}
                    value={formData[field.key] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.key]: e.target.value,
                      })
                    }
                    InputProps={{
                      startAdornment: field.startAdornment ? (
                        <InputAdornment position="start">
                          {field.startAdornment}
                        </InputAdornment>
                      ) : null,
                      endAdornment: field.endAdornment ? (
                        <InputAdornment position="end">
                          {field.endAdornment}
                        </InputAdornment>
                      ) : null,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
              </Grid>
            ))}
          </>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Borrower’s Experience Level
              </Typography>

              <Select
                error={fieldErrors.borrowExperience}
                style={{ backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.borrowExperience || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowExperience: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1-2</MenuItem>
                <MenuItem value={2}>3-4</MenuItem>
                <MenuItem value={3}>5-9</MenuItem>
                <MenuItem value={3}>10-49</MenuItem>
                <MenuItem value={4}>50+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Borrower's Citizenship Status{" "}
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.borrowerCitizenship || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerCitizenship: e.target.value,
                  })
                }
                error={fieldErrors.borrowerCitizenship}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"US Citizen"}>US Citizen</MenuItem>
                <MenuItem value={"US Permanent Resident (Green Card Holder)"}>
                  US Permanent Resident (Green Card Holder)
                </MenuItem>
                <MenuItem value={"US Permanent with Valid Visa"}>
                  US Permanent with Valid Visa
                </MenuItem>
                <MenuItem value={"Foreign National"}>Foreign National</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Social Security
              </Typography>
              <TextField
                style={{ backgroundColor: "white" }}
                value={formData.socialSecurity || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                error={fieldErrors.socialSecurity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialSecurity: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography type="p" color="black">
              Qualifying FICO Score
            </Typography>
            <div style={{ width: "100%" }}>
              <Slider
                value={formData.ficoScore || "0"}
                onChange={(event) => handleSliderChange(event)}
                min={600}
                max={800}
                step={20}
                marks={marks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "80%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>

          <Grid item sm={12} xs={12} sx={{ textAlign: "center" }}>
            <FormControl
              component="fieldset"
              error={Boolean(fieldErrors?.previosulyBankrupt)}
            >
              <Typography type="p" color="black">
                Has the borrowser previously filed for Bankruptcy?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="Yes" // Set the value to "Yes" when selected
                    checked={formData.previosulyBankrupt === "Yes"} // Check if it's "Yes" in formData
                    onChange={() =>
                      handleOptionChangeLoanPricer("previosulyBankrupt", "Yes")
                    }
                    error={fieldErrors.previosulyBankrupt}
                    helperText={<span>{fieldErrors.previosulyBankrupt}</span>}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="No" // Set the value to "Yes" when selected
                    checked={formData.previosulyBankrupt === "No"} // Check if it's "Yes" in formData
                    onChange={() =>
                      handleOptionChangeLoanPricer("previosulyBankrupt", "No")
                    }
                    error={fieldErrors.previosulyBankrupt}
                    helperText={<span>{fieldErrors.previosulyBankrupt}</span>}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Box>
              {fieldErrors?.previosulyBankrupt && (
                <FormHelperText sx={{ textAlign: "center" }}>
                  {fieldErrors.previosulyBankrupt}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item sm={12} xs={12} sx={{ textAlign: "center" }}>
            <FormControl
              component="fieldset"
              error={Boolean(fieldErrors?.shortForSale)}
            >
              <Typography type="p" color="black">
                Has The Borrower Previously Had A Foreclosure, Deed-in Lieu or
                Short Sale?{" "}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="Yes" // Set the value to "Yes" when selected
                    checked={formData.shortForSale === "Yes"} // Check if it's "Yes" in formData
                    onChange={() =>
                      handleOptionChangeLoanPricer("shortForSale", "Yes")
                    }
                    error={fieldErrors.shortForSale}
                    helperText={<span>{fieldErrors.shortForSale}</span>}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="No" // Set the value to "Yes" when selected
                    checked={formData.shortForSale === "No"} // Check if it's "Yes" in formData
                    onChange={() =>
                      handleOptionChangeLoanPricer("shortForSale", "No")
                    }
                    error={fieldErrors.shortForSale}
                    helperText={<span>{fieldErrors.shortForSale}</span>}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Box>
              {fieldErrors?.shortForSale && (
                <FormHelperText sx={{ textAlign: "center" }}>
                  {fieldErrors.shortForSale}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* <Grid item sm={12} xs={12}>
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ color: "#498dd6", fontSize: 24 }}
            >
              LOAN TERMS
            </Typography>
          </Grid> */}

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Amortization Type
              </Typography>

              <Select
                error={fieldErrors.amortizationType}
                style={{ backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.amortizationType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amortizationType: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Fully Amortizing"}>Fully Amortizing</MenuItem>
                <MenuItem value={"Partial Interest Only"}>
                  Partial Interest Only
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography type="p" color="black">
              Loan To Value Percentage
            </Typography>
            <div style={{ width: "100%" }}>
              <Slider
                value={formData.loanToValue}
                onChange={(event) => handleSliderChangeLoanPricerSummary(event)}
                min={20}
                max={65}
                marks={marksLoanToValue}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "80%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Pre-Payment Penalty
              </Typography>

              <Select
                error={fieldErrors.prePayPen}
                style={{ backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.prePayPen || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prePayPen: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"3 year"}>3 year (3-2-1)</MenuItem>
                <MenuItem value={"4 year"}>4 year (4-3-2-1)</MenuItem>
                <MenuItem value={"5 year"}>5 year (5-4-3-2-1)</MenuItem>
                <MenuItem value={"Yield Maintenance"}>
                  Yield Maintenance
                </MenuItem>
                <MenuItem value={"3 year (3-0-0)"}>3 year (3-0-0)</MenuItem>
                <MenuItem value={"1 year (1-0-0)"}>1 year (1-0-0)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography type="p" color="black">
              One Time Yield Spread Premium
            </Typography>
            <div style={{ width: "100%" }}>
              <Slider
                value={formData.oneTimeYield}
                onChange={(event) =>
                  handleSliderChangeLoanPricerSummary2(event)
                }
                min={0}
                max={1.275}
                marks={marksOneTimeYieldSpreadPremium}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6", width: "80%" }} // Ensure slider takes full width
              />
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Rate Buydown
              </Typography>

              <Select
                error={fieldErrors.rateBuyDown}
                style={{ backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.rateBuyDown || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rateBuyDown: e.target.value,
                  })
                }
                defaultValue={0}
                label="Rate Buydown"
              >
                {menuItems}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Social Security
              </Typography>
              <TextField
                style={{ backgroundColor: "white" }}
                error={fieldErrors.socialSecurity}
                value={formData.socialSecurity || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialSecurity: e.target.value,
                  })
                }
                variant="outlined"
              />
            </FormControl>
          </Grid> */}
          {/* <Grid item sm={12}>
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ color: "#498dd6", fontSize: 24 }}
            >
              PROGRAM OPTIONS
            </Typography>
            <Box sx={{ width: "auto", overflowX: "auto" }}>
              <Paper>
                <TableComponent />
              </Paper>
            </Box>
          </Grid>
          <Grid item sm={12}>
            <CustomAccordion />
          </Grid> */}
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Rate Type
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                error={fieldErrors.rateType}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.rateType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rateType: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"5/6 ARM"}>5/6 ARM</MenuItem>
                <MenuItem value={"7/6 ARM"}>7/6 ARM</MenuItem>
                <MenuItem value={"10/6 ARM"}>10/6 ARM</MenuItem>
                <MenuItem value={"30 Yr FRM"}>30 Yr FRM</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Program Type
              </Typography>

              <Select
                error={fieldErrors.programType}
                style={{ backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.programType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    programType: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"DSCR Expanded"}>DSCR Expanded</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyInformationSinglePropertyRental;
