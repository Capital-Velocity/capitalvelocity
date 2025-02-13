import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider } from "@mui/material";

function PropertyInformation4({ formData, setFormData, fieldErrors }) {
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
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div style={{ width: "100%" }}>
      {" "}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Property Information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please add a property and tell us how the property was sourced and how
          the loan will be repaid. Remember we do NOT lend on borrower occupied
          properties.
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                What is the renovation budget?
              </Typography>
              <TextField
                error={fieldErrors.renovationBudget}
                helperText={<span>{fieldErrors.renovationBudget}</span>}
                style={{
                  width: "500px",
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
          </Grid>
          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.isCondominium ? "red" : "grey",
              }}
            >
              Is the property being converted to Condominiums? *
            </label>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.isCondominium === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("isCondominium", "Yes")}
                error={fieldErrors.isCondominium}
                helperText={<span>{fieldErrors.isCondominium}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.isCondominium === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("isCondominium", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.isCondominium ? "red" : "grey",
              }}
            >
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
                    style={{
                      marginRight: 8,
                    }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              style={{ width: 500, backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField
                  error={fieldErrors.renovationDescript}
                  helperText={<span>{fieldErrors.renovationDescript}</span>}
                  value={formData.renovationDescript || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      renovationDescript: e.target.value,
                    })
                  }
                  {...params}
                />
              )}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyInformation4;
