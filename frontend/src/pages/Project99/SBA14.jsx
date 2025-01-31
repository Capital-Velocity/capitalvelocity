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

function SBA14({ formData, setFormData }) {
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
          Section III: Entity Owner Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="grey">
                Applicant Legal Name
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
                Entity Owner Legal Name
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
                Tax ID
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
                Phone
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
                Address of Entity Owner
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
                Primary Contact Name
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
                Email Address
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
              Identify in what capacity you are Completing this Section?
            </label>
            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 15, fontWeight: 100 }}
                id="demo-simple-select-label"
              ></InputLabel>
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
                <MenuItem value={"401(k) Plan "}>401(k) Plan</MenuItem>
                <MenuItem value={"ESOP"}>ESOP</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA14;
