import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Review({ addressData, paymentData }) {
  const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
  }));

  const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
  const contact = [
    { name: "First Name:", detail: addressData.firstName || "Not Provided" },
    { name: "Last Name:", detail: addressData.lastName || "Not Provided" },
    {
      name: "Business Name:",
      detail: addressData.businessName || "Not Provided",
    },
    { name: "Email:", detail: addressData.email || "Not Provided" },
    {
      name: "Business Phone:",
      detail: addressData.businessPhone || "Not Provided",
    },
    {
      name: "Mobile Phone:",
      detail: addressData.mobilePhone || "Not Provided",
    },
  ];

  const financials = [
    {
      name: "Credit Score:",
      detail: paymentData.creditScore || "Not Provided",
    },
    { name: "Industry:", detail: paymentData.industry || "Not Provided" },
    {
      name: "Time in Business:",
      detail: paymentData.timeInBusiness || "Not Provided",
    },
    {
      name: "Annual Sales:",
      detail: paymentData.annualSales || "Not Provided",
    },
    {
      name: "Product:",
      detail: paymentData.product || "Not Provided",
    },
  ];

  return (
    <Stack spacing={2}>
      {/* <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary="4 selected" />
          <Typography variant="body2">$134.98</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">$9.99</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $144.97
          </Typography>
        </ListItem>
      </List> */}
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Contact Information
          </Typography>
          <Grid container>
            {contact.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Details & Financials
          </Typography>
          <Grid container>
            {financials.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
        <FormGrid size={{ xs: 12 }}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="By checking this checkbox I agree to the terms of use, privacy policy as well as receiving SMS, email and phone communication."
          />
        </FormGrid>
      </Stack>
    </Stack>
  );
}
