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
import Slider from "@mui/material/Slider";

function SBA12({ formData, setFormData, fieldErrors }) {
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
      <CheckoutSteps step1></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Citizenship Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Typography type="p" color="grey">
              Citizenship
            </Typography>
            <FormControl fullWidth>
              <Select
                error={fieldErrors.citizenshipStatus}
                style={{ width: 500, backgroundColor: "white" }}
                helperText={<span>{fieldErrors.citizenshipStatus}</span>}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.citizenshipStatus || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    citizenshipStatus: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"I am a U.S. Citizen "}>
                  I am a U.S. Citizen{" "}
                </MenuItem>
                <MenuItem
                  value={"I have Lawful Permanent Resident (LPR) status."}
                >
                  I have Lawful Permanent Resident (LPR) status.
                </MenuItem>
                <MenuItem
                  value={
                    "I am not a U.S. Citizen or Lawful Permanent Resident.*"
                  }
                >
                  I am not a U.S. Citizen or Lawful Permanent Resident.*
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                USCIS Registration Number
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  type="number"
                  error={fieldErrors.uscisRegNum}
                  style={{ width: 500, backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.uscisRegNum}</span>}
                  value={formData.uscisRegNum || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      uscisRegNum: e.target.value,
                    })
                  }
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
                Country of Citizenship
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.countryofCitizenship || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      countryofCitizenship: e.target.value,
                    })
                  }
                  error={fieldErrors.countryofCitizenship}
                  style={{ width: 500, backgroundColor: "white" }}
                  helperText={<span>{fieldErrors.countryofCitizenship}</span>}
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

export default SBA12;
