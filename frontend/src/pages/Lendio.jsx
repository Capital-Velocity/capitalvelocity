import React from "react";
import Container from "../screens/Container";
import Footer2 from "../components/Footer2";
import { Typography, Box } from "../../node_modules/@mui/material/index";

function Lendio() {
  return (
    <div>
      <Container sx={{ textAlign: "center" }}>
        <Box marginBottom={2}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
            See if your business is eligible for financing.
          </Typography>
        </Box>
        <lendio-start affiliate="481790727" primary-color="#498dd6" />
      </Container>
    </div>
  );
}

export default Lendio;
