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
import { Divider } from "../../../node_modules/@mui/material/index";

function SBA8({ formData, setFormData }) {
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
      <CheckoutSteps step1 step2></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Section I: Business Information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          By Signing Below, You Make the Following Representations,
          Acknowledgement, Authorization, and Certification
        </Typography>
        <label
          style={{
            fontSize: 15,
            fontWeight: 100,
            color: "grey",
            textDecoration: "underline",
          }}
        >
          REPRESENTATIONS, ACKNOWLEDGEMENT AND AUTHORIZATION
        </label>
        <div style={{ color: "grey" }}>
          <h3>Authorization and Acknowledgement:</h3>
          <ul>
            <li>
              • I have read the Statements Required by Law and Executive Order
              and I understand them.
            </li>
            <li>
              • I will comply, whenever applicable, with the hazard insurance,
              lead-based paint, civil rights or other limitations in this form.
            </li>
            <li>
              • All SBA loan proceeds will be used only for business-related
              purposes as specified in the loan application.
            </li>
            <li>
              • The Applicant is not knowingly engaged and will not knowingly
              engage in any activity that is illegal under federal, state, or
              local law or that can reasonably be determined to support or
              facilitate any activity that is illegal under federal, state, or
              local law.
            </li>
            <li>
              • I understand, acknowledge, agree, and consent that the Lender
              can use and share any tax information that I have provided and/or
              that the Lender has obtained from the Internal Revenue Service
              with SBA's authorized representatives, including authorized
              representatives of the SBA Office of Inspector General, for the
              purpose of compliance with SBA Loan Program Requirements and all
              SBA reviews.
            </li>
          </ul>
          <p>Acknowledgment:</p>
          <ul>
            <li>
              • SBA encourages the purchase, to the extent feasible, of
              American-made equipment and supplies.
            </li>
          </ul>
          <p>
            I authorize the SBA to request criminal record information about me
            from criminal justice agencies for the purpose of determining my
            eligibility for programs authorized by the Small Business Act, as
            amended.
          </p>
        </div>
        <Divider style={{ color: "grey" }} />
        <label
          style={{
            fontSize: 15,
            fontWeight: 100,
            color: "grey",
            textDecoration: "underline",
          }}
        >
          ACCURACY CERTIFICATION
        </label>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          I certify that the information provided in this application and the
          information that I have provided in all supporting documents and forms
          is true and accurate. I realize that the penalty for knowingly making
          a false statement to obtain a guaranteed loan from SBA is that I may
          be fined up to $250,000 and/or be put in jail for up to 5 years under
          18 USC § 1001; under 15 USC 645 by imprisonment of not more than two
          years and/or a fine of not more than $5,000; and, if false statements
          are submitted to a Federally insured institution, I may be fined up to
          $1,000,000 and/or be put in jail for up to 30 years under 18 USC §
          1014.
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={4}>
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
          <Grid item sm={4}>
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
        </Grid>
      </Container>
    </div>
  );
}

export default SBA8;
