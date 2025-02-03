import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Divider } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
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
import CheckoutSteps from "./CheckoutSteps3";

function SBA17({ formData, setFormData }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const top100Films = [
    { title: "7(a) loan / 504 loan / Surety Bonds" },
    {
      title:
        "Disaster Business Loan Application (Excluding Sole Proprietorships)",
    },
    { title: "Women Owned Small Business (WOSB) Federal Contracting Program" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      armsLength: event.target.value,
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - ASSETS88
        </Typography>
        <Divider style={{ color: "grey" }} />
        <Grid container spacing={2}>
          <Grid item sm={6} style={{ marginTop: 25 }}>
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
                  value={formData.renovationDescript || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      renovationDescript: e.target.value,
                    })
                  }
                  {...params}
                  label="Which Programs Apply to you?*"
                  placeholder="Which Programs Apply to you? *"
                />
              )}
            />
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Name
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.closingDate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      closingDate: e.target.value,
                    })
                  }
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Home Address
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.closingDate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      closingDate: e.target.value,
                    })
                  }
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Business Phone
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.closingDate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      closingDate: e.target.value,
                    })
                  }
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                City, State, & Zip Code
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.closingDate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      closingDate: e.target.value,
                    })
                  }
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Business Name of Applicant/Borrower
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.closingDate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      closingDate: e.target.value,
                    })
                  }
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Business Name of Applicant/Borrower
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.closingDate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      closingDate: e.target.value,
                    })
                  }
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Business Type
            </label>
            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Business Type
              </InputLabel>
              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.borrowerCitizenship || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    borrowerCitizenship: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Corporation"}>Corporation</MenuItem>
                <MenuItem value={"S-Corp"}>S-Corp</MenuItem>
                <MenuItem value={"LLC"}>LLC</MenuItem>
                <MenuItem value={"Partnership"}>Partnership</MenuItem>
                <MenuItem value={"N/A:"}>Sole Proprietor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              WOSB applicant only, Married
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSign || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSign: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSignNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                This information is current as of [month/day/year]
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.closingDate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      closingDate: e.target.value,
                    })
                  }
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  type="date"

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA17;
