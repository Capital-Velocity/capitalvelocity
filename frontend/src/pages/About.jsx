import Box from "@mui/material/Box";
import React from "react";
import { Divider } from "../../node_modules/@mui/material/index";
import Categories from "../components/Categories";
import Footer2 from "../components/Footer2";
import PromoNumbers from "../components/PromoNumbers";
import Story from "../components/Story";
import Container from "../screens/Container";
function About() {
  return (
    <div>
      <Box
        style={{ backgroundColor: "#F6F5F3" }}
        position={"relative"}
        zIndex={3}
      >
        <PromoNumbers />
      </Box>
      <Container>
        <Story style={{ marginTop: "10px" }} />
      </Container>
      <Box style={{ backgroundColor: "#F6F5F3" }}>
        <Container>{/* <Categories /> */}</Container>
      </Box>

      <Divider style={{ color: "grey" }} />
      {/* <Footer2 /> */}
    </div>
  );
}

export default About;
