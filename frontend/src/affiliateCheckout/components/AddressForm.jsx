import * as React from "react";
import Grid from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ addressData, setAddressData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="firstName"
          type="text"
          placeholder="John"
          value={addressData.firstName || ""}
          onChange={handleChange}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="lastName"
          type="text"
          placeholder="Snow"
          value={addressData.lastName || ""}
          onChange={handleChange}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="mobilePhone" required>
          Mobile Phone
        </FormLabel>
        <OutlinedInput
          id="mobilePhone"
          name="mobilePhone"
          type="tel"
          placeholder="(123) 456-7890"
          value={addressData.mobilePhone || ""}
          onChange={handleChange}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="emailAddress2">Email Address</FormLabel>
        <OutlinedInput
          id="emailAddress2"
          name="email"
          type="email"
          placeholder="example@domain.com"
          value={addressData.email || ""}
          onChange={handleChange}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="businessName1" required>
          Business Name
        </FormLabel>
        <OutlinedInput
          id="businessName1"
          name="businessName"
          type="text"
          placeholder="ACME Corporation"
          value={addressData.businessName || ""}
          onChange={handleChange}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="jobTitle" required>
          Job Title
        </FormLabel>
        <OutlinedInput
          id="jobTitle"
          name="jobTitle"
          type="text" // Changed to 'text' for Job Title
          placeholder="Enter your job title"
          value={addressData.jobTitle || ""}
          onChange={handleChange}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="website" required>
          Website
        </FormLabel>
        <OutlinedInput
          id="website"
          name="website"
          type="url" // Changed to 'url' for Website
          placeholder="https://www.example.com"
          value={addressData.website || ""}
          onChange={handleChange}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="businessPhone" required>
          Business Phone
        </FormLabel>
        <OutlinedInput
          id="businessPhone"
          name="businessPhone"
          type="tel"
          placeholder="(123) 456-7890"
          value={addressData.businessPhone || ""}
          onChange={handleChange}
          required
          size="small"
        />
      </FormGrid>
    </Grid>
  );
}
