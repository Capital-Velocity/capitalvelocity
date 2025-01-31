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
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";

function SBA2({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  const top100Films = [
    { title: "7(a) loan / 504 loan / Surety Bonds" },
    {
      title:
        "Disaster Business Loan Application (Excluding Sole Proprietorships)",
    },
    { title: "Women Owned Small Business (WOSB) Federal Contracting Program" },
  ];
  const fixedOptions = [top100Films[5]];

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Business Information (if applicable)
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Is the Applicant a?
            </label>
            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              >
                Is the Applicant a?:{" "}
              </InputLabel>
              <Select
                style={{ width: "500px", backgroundColor: "white" }}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
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
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.businessTaxID}
                  helperText={<span>{fieldErrors.businessTaxID}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item sm={3}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
          <Grid item sm={3}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Primary Business Address<strong>(State)</strong>
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
          <Grid item sm={3}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Primary Business Address<strong>(County)</strong>
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
          <Grid item sm={3}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
          <Grid item sm={3}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Project Address <strong>Zip</strong>(if other than primary
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
          <Grid item sm={3}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Project Address <strong>State</strong>(if other than primary
                business address)
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
          <Grid item sm={3}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Project Address <strong>County</strong>(if other than primary
                business address)
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
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.PrimaryBusinessPhone}
                  helperText={<span>{fieldErrors.PrimaryBusinessPhone}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
                  style={{ width: 500, backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  error={fieldErrors.businessEmail}
                  helperText={<span>{fieldErrors.businessEmail}</span>}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Do you have or plan to use a 401(K) Plan?
            </label>
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
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 300, color: "grey" }}>
              Do you have or plan to use a Management Company to manage the
              day-to-day operations?
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.managmentCompany === "Yes"} // Check if it's "Yes" in formData
                onChange={() => handleOptionChange("managmentCompany", "Yes")}
                error={fieldErrors.managmentCompany}
                helperText={<span>{fieldErrors.managmentCompany}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.managmentCompany === "No"} // Check if it's "No" in formData
                onChange={() => handleOptionChange("managmentCompany", "No")}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
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
                    width: 500,
                    backgroundColor: "white",
                    marginTop: 25,
                  }}
                  variant="outlined"
                  fullWidth

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

export default SBA2;
