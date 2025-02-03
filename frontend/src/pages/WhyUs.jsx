import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Divider } from "../../node_modules/@mui/material/index";
import Footer2 from "../components/Footer2";
import LoanMatching from "../components/LoanMatching";
import phone33 from "../Images/phone33.png";
import Container from "../screens/Container";
function WhyUs() {
  const theme = useTheme();
  return (
    <div>
      <div style={{ backgroundColor: "#c0dced" }}>
        <Container style={{ backgroundColor: "#c0dced" }}>
          <Box style={{ backgroundColor: "#c0dced" }}>
            <Typography
              variant="h4"
              align={"center"}
              gutterBottom
              sx={{
                color: "black",
                fontWeight: 300,
                marginTop: theme.spacing(1),
              }}
            >
              Why Capital Velocity?
            </Typography>

            <Grid container spacing={2} style={{ marginTop: "30px" }}>
              <Grid item sm={6} style={{ marginTop: "50px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <ChecklistRtlIcon
                    style={{ fontSize: "70px", color: "#498dd6" }}
                  />
                  <Typography
                    variant="h5"
                    align={"center"}
                    gutterBottom
                    sx={{
                      color: "black",
                      fontWeight: 600,
                      marginTop: theme.spacing(1),
                    }}
                  >
                    A Short Application Process
                  </Typography>
                  <Typography
                    variant="p"
                    gutterBottom
                    sx={{
                      color: "black",
                      fontWeight: 100,
                      marginLeft: "60px",
                    }}
                  >
                    Complete your Capital Velocity application in just 15
                    minutes. Funding times are also fast, once approved, with
                    many borrowers receiving money in the bank within 24 hours
                    of approval."
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <HandshakeIcon
                    style={{ fontSize: "70px", color: "#498dd6" }}
                  />
                  <Typography
                    variant="h5"
                    align={"center"}
                    gutterBottom
                    sx={{
                      color: "black",
                      fontWeight: 600,
                      marginTop: theme.spacing(1),
                    }}
                  >
                    Ongoing Support
                  </Typography>
                  <Typography
                    variant="p"
                    gutterBottom
                    sx={{
                      color: "black",
                      fontWeight: 100,
                      marginLeft: "60px",
                    }}
                  >
                    Enjoy personalized support with a dedicated funding manager
                    who understands your business.
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <CheckCircleOutlineIcon
                    style={{ fontSize: "70px", color: "#498dd6" }}
                  />
                  <Typography
                    variant="h5"
                    align={"center"}
                    gutterBottom
                    sx={{
                      color: "black",
                      fontWeight: 600,
                      marginTop: theme.spacing(1),
                    }}
                  >
                    A Robust Lender Network
                  </Typography>
                  <Typography
                    variant="p"
                    gutterBottom
                    sx={{
                      color: "black",
                      fontWeight: 100,
                      marginLeft: "60px",
                    }}
                  >
                    With over 100 lenders in the Capital Velocity network,
                    you’ll find the right financing option for your loan with
                    just a single application.
                  </Typography>
                </div>
              </Grid>
              <Grid item sm={6}>
                <img src={phone33} width="100%" />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <LoanMatching />
      <Divider style={{ color: "grey" }} />
      <Footer2 />
    </div>
  );
}

export default WhyUs;
