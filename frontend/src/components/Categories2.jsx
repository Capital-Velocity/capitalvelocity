import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import MultifamilyBridgeIcon from "@mui/icons-material/ApartmentOutlined";

import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "../screens/Container";
import { Link } from "../../node_modules/@mui/material/index";
import Cookies from "js-cookie"; // Import cookies-js

const mock = [
  {
    title: "Real Estate Loans",
    icon: <HomeIcon />,
    value: "FixFlip",
    link: "/loan-form-realestate",
  },

  {
    title: "Business Loans",
    icon: <MultifamilyBridgeIcon />,
    value: "MultifamilyBridge",
    link: "https://bit.ly/3zyS4xt",
  },
];

const mockUnauthentic = [
  {
    title: "Real Estate Loans",
    icon: <HomeIcon />,
    value: "FixFlip",
    link: "/register",
  },

  {
    title: "Business Loans",
    icon: <MultifamilyBridgeIcon />,
    value: "MultifamilyBridge",
    link: "https://bit.ly/3zyS4xt",
  },
];

const Categories2 = () => {
  const theme = useTheme();

  // Define a state variable to track authentication
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the "email" cookie exists
    const emailCookie = Cookies.get("email");

    // If the "email" cookie exists, set authenticated to true
    if (emailCookie) {
      setAuthenticated(true);
    } else {
      // Redirect to the login screen or perform any other action
      // You can use your preferred method for redirection here
      // For example, you can use React Router's history.push('/login') to redirect
      // or simply navigate to the login screen.
    }
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div>
      <Box>
        {authenticated ? ( // Conditional rendering based on authentication
          // Render your routes here
          <Box>
            <Typography
              variant="h4"
              align={"center"}
              data-aos={"fade-up"}
              gutterBottom
              sx={{
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
          <Box>
            <Container>
              <Typography
                variant="h4"
                align={"center"}
                data-aos={"fade-up"}
                gutterBottom
                sx={{
                  marginTop: -8,
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
                    <Link href={item.link} style={{ textDecoration: "none" }}>
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
              {/* Render login form or redirection */}
            </Container>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Categories2;
