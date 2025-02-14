import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
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

  return (
    <div style={{ width: "100%" }}>
      {" "}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Property Information
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Please add a property and tell us how the property was sourced and how
          the loan will be repaid. Remember we do NOT lend on borrower occupied
          properties.
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                What is the After repair value?
              </Typography>
              <TextField
                style={{ marginTop: 8, backgroundColor: "white" }}
                error={fieldErrors.afterRepairValue}
                helperText={<span>{fieldErrors.afterRepairValue}</span>}
                value={formData.afterRepairValue || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, afterRepairValue: e.target.value })
                }
                type="number"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Exit Strategy
              </Typography>
              <TextField
                style={{ marginTop: 8, backgroundColor: "white" }}
                value={formData.exitStrategry || ""}
                size="large"
                error={fieldErrors.exitStrategry}
                helperText={<span>{fieldErrors.exitStrategry}</span>}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, exitStrategry: e.target.value })
                }
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Additional Comments
              </Typography>
              <TextField
                style={{ marginTop: 8, backgroundColor: "white" }}
                value={formData.additonalPropertyInfo || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    additonalPropertyInfo: e.target.value,
                  })
                }
                multiline
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyInformation4;
