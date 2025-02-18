import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider, FormHelperText } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";

function PropertyInformationMultiFamilyBridge({
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
    { title: "Light and cosmetic" },
    { title: "Gut Rehab" },
    { title: "Horizontal Enlargment" },
    { title: "Vertical Enlargment (adding a floor)" },
    { title: "Moderate rehab" },
    { title: "New Construction" },
    { title: "Condo conversion" },
    { title: "No Renovation planned" },
  ];
  const fixedOptions = [top100Films[7]];
  const [value, setValue] = React.useState([...fixedOptions, top100Films[7]]);

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
                  value={formData.homeAddress || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homeAddress: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.homeAddress}
                  style={{ backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.homeAddress}</span>}
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
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
              }}
            >
              Is the property being converted to Condominiums? *
            </label>

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
            <label style={{ fontWeight: 300 }}>
              Please describe the renovation
            </label>
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
                  fullWidth // Ensure TextField takes the full width
                  multiline // Allows dynamic height adjustment
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
                      minHeight: "56px", // Ensures consistent input height
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
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyInformationMultiFamilyBridge;
