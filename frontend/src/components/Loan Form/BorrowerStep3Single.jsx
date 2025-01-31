import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps2 from "../CheckoutSteps2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";

function BorrowerStep3Single({ formData, setFormData }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const percentageMarks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <CheckoutSteps2 step1 step2 step3></CheckoutSteps2>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Borrower information
        </Typography>
        <Typography variant="subtitle1" color="grey" gutterBottom>
          Please review the borrowers of this loan
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Will this borrower be personally guaranteeing this loan?
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.guranteeLoan || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    guranteeLoan: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.guranteeLoanNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    guranteeLoanNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              Is the borrower authorized signatory?
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
          <Grid item sm={12}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              What percentage of the borrowing entity does this borrower own?
            </label>
            <div style={{ width: 550 }}>
              <Slider
                value={formData.borrowingEntityOwned || "0"}
                onChange={(event) => handleOptionChange(event)}
                min={0}
                max={100}
                step={1}
                marks={percentageMarks}
                valueLabelDisplay="auto"
                style={{ color: "#498dd6" }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BorrowerStep3Single;
