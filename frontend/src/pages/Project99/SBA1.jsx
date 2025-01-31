import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "./CheckoutSteps3";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

function SBA1({ formData, setFormData }) {
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
          SBA 7a Borrower Information Form
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: "bold" }}
          color="black"
        >
          Purpose of this form:
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          The purpose of this form is to collect information about the Small
          Business Applicant ("Applicant") and its owners, the loan request,
          existing indebtedness, information about current or previous
          government financing, and certain other topics. The information also
          facilitates background checks as authorized by section 7(a)(1)(B) of
          the Small Business Act, 15 U.S.C. 636(a)(1)(B). Submission of the
          requested information is required for SBA or the Lender to determine
          eligibility for financial assistance. Failure to submit the
          information would affect that determination.
        </Typography>

        <Typography variant="subtitle1" color="grey" gutterBottom>
          Instructions for completing this form: This form is to be completed by
          the Applicant and all individuals identified below and submitted to an
          SBA Participating Lender. This form is divided into three sections:
          Section I requests information about the Small Business Applicant and
          must be completed in its entirety, signed and dated by an authorized
          representative of the Small Business Applicant that is requesting a
          business loan. A separate Section I is required to be completed and
          signed for each co-applicant (e.g. "Eligible Passive Company (EPC)" or
          "Operating Company (OC)"). Sections II and III of this form requests
          information about each of the Applicant's owners - Section II for
          individuals, Section III for each entity owning an equity interest in
          the Applicant (e.g. Employee Stock Ownership Plan ("ESOP"), 401(k)
          plan, Limited Liability Company, or other entity owner entities and
          trusts. A separate Section II and/or Section III is required to be
          completed and signed by:
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          <div>
            <h2>Ownership Requirements</h2>
            <ul>
              <li>For a sole proprietorship, the sole proprietor;</li>
              <li>
                For a partnership, all general partners, and all limited
                partners owning 20% or more of the equity of the firm; or any
                partner that is involved in management of the applicant
                business;
              </li>
              <li>
                For a corporation, all owners of 20% or more of the corporation,
                and each officer and director;
              </li>
              <li>
                For limited liability companies, all members owning 20% or more
                of the company, each officer, director, and managing member;
              </li>
              <li>
                Any person hired by the Applicant to manage day-to-day
                operations of the Applicant business ("key employee");
              </li>
              <li>Any Trustor (if the Applicant is owned by a trust).</li>
              <li>Each entity owning an equity interest in the Applicant.</li>
            </ul>
          </div>
        </Typography>

        <div style={{ marginTop: 20 }}>
          {selectedOption === "yes" && (
            <Grid container spacing={2}>
              <TextField
                style={{ width: "500px", marginTop: 10 }}
                value={formData.armsLengthDescription || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    armsLengthDescription: e.target.value,
                  })
                }
                label="Please describe"
                variant="outlined"
              />
            </Grid>
          )}
        </div>
      </Container>
    </div>
  );
}

export default SBA1;
