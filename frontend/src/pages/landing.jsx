import React, { useState, useEffect } from "react";
import Categories2 from "../components/Categories2";
import Footer2 from "../components/Footer2";
import lendio1 from "../Images/tree.png";
import Lendio from "./Lendio";
import HomeIcon from "@mui/icons-material/Home";
import { Card } from "@mui/material";
import FixAndFlipIcon from "@mui/icons-material/BuildOutlined";
import MultifamilyBridgeIcon from "@mui/icons-material/ApartmentOutlined";
import GroundUpIcon from "@mui/icons-material/ConstructionOutlined";
import StabilizedBridgeIcon from "@mui/icons-material/ViewComfyOutlined";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import SinglePropertyIcon from "@mui/icons-material/HouseOutlined";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { Link } from "@mui/material";
import Cookies from "js-cookie";
import { Grid, Box, Typography } from "@mui/material";
import Container from "../screens/Container";
import PromoNumbers from "../components/PromoNumbers";
import WhyUs from "./WhyUs";
import Hero from "../components/Hero";
import CalculatorHero from "../components/CalculatorHero";
import LoanMatching from "../components/LoanMatching";
import BusinessCategories from "../components/BusinessCategories";

const mock = [
  {
    title: "Fix and Flip",
    icon: <FixAndFlipIcon />,
    value: "FixFlip",
    link: "/loan-form-realestate?type=FixFlip",
  },

  {
    title: "Ground Up",
    icon: <GroundUpIcon />,
    value: "GroundUp",
    link: "/loan-form-realestate?type=GroundUp",
  },

  {
    title: "Multifamily Bridge",
    icon: <MultifamilyBridgeIcon />,
    value: "MultifamilyBridge",
    link: "/loan-form-realestate?type=MultifamilyBridge",
  },

  {
    title: "Stabilized Bridge",
    icon: <StabilizedBridgeIcon />,
    value: "StabilizedBridge",
    link: "/loan-form-realestate?type=StabilizedBridge",
  },

  {
    title: "Rental Portfolios",
    icon: <HouseSidingIcon />,
    value: "RentalPortfolios",
    link: "/loan-form-realestate?type=RentalPortfolios",
  },

  {
    title: "Single Property",
    icon: <SinglePropertyIcon />,
    value: "SingleProperty",
    link: "/loan-form-realestate?type=SingleProperty",
  },
];

const mockUnauthentic = [
  {
    title: "Fix and Flip",
    icon: <FixAndFlipIcon />,
    value: "FixFlip",
    link: "/register",
  },

  {
    title: "Ground Up",
    icon: <GroundUpIcon />,
    value: "GroundUp",
    link: "/register",
  },

  {
    title: "Multifamily Bridge",
    icon: <MultifamilyBridgeIcon />,
    value: "MultifamilyBridge",
    link: "/register",
  },

  {
    title: "Stabilized Bridge",
    icon: <StabilizedBridgeIcon />,
    value: "StabilizedBridge",
    link: "/register",
  },

  {
    title: "Rental Portfolios",
    icon: <HouseSidingIcon />,
    value: "RentalPortfolios",
    link: "/register",
  },

  {
    title: "Single Property",
    icon: <SinglePropertyIcon />,
    value: "SingleProperty",
    link: "/register",
  },
];
function Landing() {
  const [isMobile, setIsMobile] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const firstnameCookie = Cookies.get("firstName");
  useEffect(() => {
    const emailCookie = Cookies.get("email");
    if (emailCookie) {
      setAuthenticated(true);
    }
    // Check the window width when the component mounts and on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960); // Adjust the threshold as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check when the component mounts
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {!isMobile && ( // Render HomeHero3 only on non-mobile screens
        <div>
          <div>
            <Hero />
            <PromoNumbers />
            <LoanMatching />
            <WhyUs />
            <CalculatorHero />
            <Categories2 />
            <BusinessCategories />
          </div>
        </div>
      )}
      {isMobile && ( // Render Categories2 only on mobile screens
        <div style={{ marginBottom: 2, marginTop: 10 }}>
          <Lendio />
          {authenticated ? ( // Conditional rendering based on authentication
            // Render your routes here
            <Box style={{ marginTop: 10 }}>
              <Typography
                variant="h4"
                align={"center"}
                data-aos={"fade-up"}
                gutterBottom
                sx={{
                  fontWeight: 300,
                  color: "black",
                  marginTop: 10,
                }}
              >
                Choose what's right for you
              </Typography>
              <Typography
                align={"center"}
                color={"text.secondary"}
                data-aos={"fade-up"}
                style={{ marginBottom: 22 }}
              >
                Find the financing solution that fits your real estate and
                business needs and your wallet. Secure your loan today.
              </Typography>
              <Container style={{ marginTop: "-50px" }}>
                <Grid container spacing={2}>
                  {mock.map((item, i) => (
                    <Grid item xs={6} md={6} key={i}>
                      <Link href={item.link} style={{ textDecoration: "none" }}>
                        <Box
                          display={"block"}
                          width={1}
                          height={1}
                          sx={{
                            backgroundColor: "#498dd6",
                            textDecoration: "none",
                            transition: "all .2s ease-in-out",
                            "&:hover": {
                              transform: "translateY(-4px)",
                            },
                          }}
                        >
                          <Box
                            component={Card}
                            padding={2}
                            width={1}
                            height={1}
                            borderRadius={2}
                            bgcolor={"#498dd6"}
                            data-aos={"fade-up"}
                            data-aos-delay={i * 100}
                            data-aos-offset={100}
                            data-aos-duration={600}
                          >
                            <Box
                              position={"relative"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <Box
                                sx={{
                                  color: "white",
                                  bottom: 0,
                                }}
                              >
                                {item.icon}
                              </Box>
                            </Box>
                            <Typography
                              variant={"subtitle1"}
                              align={"center"}
                              style={{ textDecoration: "none", color: "white" }}
                              sx={{
                                fontWeight: 500,
                                marginTop: 2,
                                textDecoration: "none",
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Box>
                        </Box>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          ) : (
            // Render login screen or redirect here
            <div>
              <Box>
                <Container>
                  <Typography
                    variant="h4"
                    align={"center"}
                    data-aos={"fade-up"}
                    gutterBottom
                    sx={{
                      marginTop: 10,
                      fontWeight: 300,
                      color: "black",
                    }}
                  >
                    Choose what's right for you
                  </Typography>
                  <Typography
                    align={"center"}
                    color={"text.secondary"}
                    data-aos={"fade-up"}
                    style={{ marginBottom: 22 }}
                  >
                    Find the financing solution that fits your real estate and
                    business needs and your wallet. Secure your loan today.
                  </Typography>
                  <Grid container spacing={2}>
                    {mockUnauthentic.map((item, i) => (
                      <Grid item xs={6} md={6} key={i}>
                        <Link
                          href={item.link}
                          style={{ textDecoration: "none" }}
                        >
                          <Box
                            display={"block"}
                            width={1}
                            height={1}
                            sx={{
                              textDecoration: "none",
                              transition: "all .2s ease-in-out",
                              "&:hover": {
                                transform: "translateY(-4px)",
                              },
                            }}
                          >
                            <Box
                              component={Card}
                              padding={2}
                              width={1}
                              height={1}
                              borderRadius={2}
                              bgcolor={"#498dd6"}
                              data-aos={"fade-up"}
                              data-aos-delay={i * 100}
                              data-aos-offset={100}
                              data-aos-duration={600}
                            >
                              <Box
                                position={"relative"}
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                <Box
                                  sx={{
                                    color: "white",
                                    bottom: 0,
                                  }}
                                >
                                  {item.icon}
                                </Box>
                              </Box>
                              <Typography
                                variant={"subtitle1"}
                                align={"center"}
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                sx={{
                                  fontWeight: 500,
                                  marginTop: 2,
                                  textDecoration: "none",
                                }}
                              >
                                {item.title}
                              </Typography>
                            </Box>
                          </Box>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                  {/* Render login form or redirection */}
                </Container>
              </Box>
            </div>
          )}
        </div>
      )}
      {/* <Footer2 /> */}
    </div>
  );
}

export default Landing;
