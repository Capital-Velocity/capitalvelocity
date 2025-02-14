import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import CheckoutSteps from "../../pages/Project99/CheckoutSteps3";
import Container from "../../screens/Container";
import { Divider } from "@mui/material";

function LoanTerms3({ formData, setFormData }) {
  const [interestRate, setInterestRate] = useState(10.74);

  return (
    <div style={{ width: "100%" }}>
      <CheckoutSteps step1 step2 step3 step4 />
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Vendor and Closing Options
        </Typography>
        <Divider style={{ color: "grey", marginBottom: 10 }} />

        <Grid container spacing={2}>
          {/* Preferred Closing Attorney */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="closing-attorney-label">
                Preferred Closing Attorney *
              </InputLabel>
              <Select
                labelId="closing-attorney-label"
                value={formData.preferredClosingAttorney || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredClosingAttorney: e.target.value,
                  })
                }
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem value={"Hartmann Doherty Rosa Berman & Bulbulia"}>
                  Hartmann Doherty Rosa Berman & Bulbulia
                </MenuItem>
                <MenuItem value={"REO"}>
                  LaRocca Hornik Rosen & Greenberg LLP
                </MenuItem>
                <MenuItem value={"Geraci Law Firm"}>Geraci Law Firm</MenuItem>
                <MenuItem value={"Foreclosure Auction"}>
                  Geraci Law Firm
                </MenuItem>
                <MenuItem value={"Law Office of Lawrence Andelsman"}>
                  Law Office of Lawrence Andelsman
                </MenuItem>
                <MenuItem value={"Deutsch & Schneider LLP"}>
                  Deutsch & Schneider LLP
                </MenuItem>
                <MenuItem value={"Kaplan Kaplan & Ditrapani, LLP"}>
                  Kaplan Kaplan & Ditrapani, LLP
                </MenuItem>
                <MenuItem value={"Mangelli & Bilotti PLLC"}>
                  Mangelli & Bilotti PLLC
                </MenuItem>
                <MenuItem value={"MLS"}>Michele R. Messian P.C.</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Preferred Closing Date */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography color="grey">Preferred Closing Date</Typography>
              <TextField
                value={formData.closingDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, closingDate: e.target.value })
                }
                type="date"
                variant="outlined"
                fullWidth
                sx={{ backgroundColor: "white" }}
              />
            </FormControl>
          </Grid>

          {/* Preferred Insurance Company */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="insurance-company-label">
                Preferred Insurance Company *
              </InputLabel>
              <Select
                labelId="insurance-company-label"
                value={formData.insuranceCompany || ""}
                onChange={(e) =>
                  setFormData({ ...formData, insuranceCompany: e.target.value })
                }
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem value={"Elmsure"}>Elmsure</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Preferred Title Company */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mt: { xs: 2, sm: 4 } }}>
              <InputLabel id="title-company-label">
                Preferred Title Company
              </InputLabel>
              <Select
                labelId="title-company-label"
                value={formData.titleCompany || ""}
                onChange={(e) =>
                  setFormData({ ...formData, titleCompany: e.target.value })
                }
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanTerms3;
