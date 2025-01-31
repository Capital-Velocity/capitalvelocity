import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "../CheckoutSteps";
const BrokerStep = ({ formData, setFormData }) => (
  <div>
    <CheckoutSteps step1></CheckoutSteps>

    <Container>
      <Typography variant="h4" color="black" gutterBottom>
        Broker information
      </Typography>
      <Typography variant="subtitle1" color="grey" gutterBottom>
        Please choose an existing broker or enter the new broker's information.
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <TextField
            style={{ width: "500px" }}
            value={formData.companyName || ""}
            size="large"
            InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            label="Company Name"
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            style={{ width: "500px" }}
            value={formData.ein || ""}
            InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
            onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
            id="outlined-basic"
            label="Company Ein Number"
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            style={{ width: "500px" }}
            value={formData.firstName || ""}
            InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            id="outlined-basic"
            label="Contact First Name "
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            style={{ width: "500px" }}
            value={formData.lastName || ""}
            InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            id="outlined-basic"
            label="Contact Last Name"
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            style={{ width: "500px" }}
            InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            id="outlined-basic"
            label="Contact Email"
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            style={{ width: "500px" }}
            value={formData.phone || ""}
            InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            id="outlined-basic"
            label="Contact Phone Number"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Container>
  </div>
);

export default BrokerStep;
