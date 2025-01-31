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
import { Divider } from "@mui/material";

function SBA25({ formData, setFormData }) {
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
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          I authorize the SBA/Lender/Surety Company to make inquiries as
          necessary to verify the accuracy of the statements made and to
          determine my creditworthiness.
        </Typography>
        <label
          style={{
            fontSize: 15,
            fontWeight: 100,
            color: "grey",
            textDecoration: "underline",
          }}
        >
          CERTIFICATION
        </label>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          By signing this form, I certify under penalty of criminal prosecution
          that all information on this form and any additional supporting
          information submitted with this form is true and complete to the best
          of my knowledge. I understand that SBA or its participating Lenders or
          Certified Development Companies or Surety Companies will rely on this
          information when making decisions regarding an application for a loan,
          surety bond, or participation in the WOSB or 8(a) BD program. I
          further certify that I have read the attached statements required by
          law and executive order.-
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              fullWidth
              size="large"
              style={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 100,
                },
              }}
              label="Signature"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              size="large"
              style={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 100,
                },
              }}
              type="date"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              size="large"
              style={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 100,
                },
              }}
              label="Print Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              size="large"
              style={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 100,
                },
              }}
              label="Social Security No."
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              size="large"
              style={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 100,
                },
              }}
              label="Signature"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              size="large"
              style={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 100,
                },
              }}
              type="date"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              size="large"
              style={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 100,
                },
              }}
              label="Print Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              size="large"
              style={{ backgroundColor: "white" }}
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  fontWeight: 100,
                },
              }}
              label="Social Security No."
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA25;
