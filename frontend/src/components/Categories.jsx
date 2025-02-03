/* eslint-disable react/no-unescaped-entities */
import {
  faBuildingColumns,
  faCashRegister,
  faClockRotateLeft,
  faFolderMinus,
  faMoneyBill,
  faRocket,
  faScrewdriverWrench,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultifamilyBridgeIcon from "@mui/icons-material/ApartmentOutlined";
import FixAndFlipIcon from "@mui/icons-material/BuildOutlined";
import GroundUpIcon from "@mui/icons-material/ConstructionOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import SinglePropertyIcon from "@mui/icons-material/HouseOutlined";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import StabilizedBridgeIcon from "@mui/icons-material/ViewComfyOutlined";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import Container from "../screens/Container";

const mock = [
  { title: "Fix and Flip", icon: <FixAndFlipIcon />, value: "FixFlip" },

  {
    title: "Multifamily Bridge",
    icon: <MultifamilyBridgeIcon />,
    value: "MultifamilyBridge",
  },

  {
    title: "Rental Portfolios",
    icon: <HouseSidingIcon />,
    value: "RentalPortfolios",
  },
  { title: "Ground Up", icon: <GroundUpIcon />, value: "GroundUp" },

  {
    title: "Stabilized Bridge",
    icon: <StabilizedBridgeIcon />,
    value: "StabilizedBridge",
  },
  {
    title: "Single Property",
    icon: <SinglePropertyIcon />,
    value: "SingleProperty",
  },
  {
    title: "Small Business Loan",
    icon: <CreditScoreIcon />,
    value: "SingleProperty",
  },
  {
    title: "Business Line of Credit",
    icon: <FontAwesomeIcon icon={faMoneyBill} />,
  },
  {
    title: "Short Term Loan",
    icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
  },
  {
    title: "Cash Advance",
    icon: <FontAwesomeIcon icon={faCashRegister} />,
  },
  {
    title: "Equipment Financing",
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
  },
  {
    title: "SBA Loan",
    icon: <FontAwesomeIcon icon={faBuildingColumns} />,
  },
  {
    title: "Startup Business Loans",
    icon: <FontAwesomeIcon icon={faRocket} />,
  },
  {
    title: "Accounts Receivable Financing",
    icon: <FontAwesomeIcon icon={faFolderMinus} />,
  },
  {
    title: "Business Acquisition Loan",
    icon: <FontAwesomeIcon icon={faTag} />,
  },
];

const Categories = () => {
  const theme = useTheme();
  return (
    <Box style={{ backgroundColor: "#F6F5F3" }}>
      <Box marginBottom={4}>
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
          Our loan marketplace products
        </Typography>
        <Typography
          align={"center"}
          color={"text.secondary"}
          data-aos={"fade-up"}
        >
          Find the financing solution that fits your real estate and business
          needs and your wallet. Secure your loan today.
        </Typography>
      </Box>
      <Box>
        <Container style={{ marginTop: "-50px" }}>
          <Grid container spacing={2}>
            {mock.map((item, i) => (
              <Grid item xs={4} md={4} key={i}>
                <Link href="/" style={{ textDecoration: "none" }}>
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
                      bgcolor={"alternate.main"}
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
                            color: "#498dd6",

                            bottom: 0,
                          }}
                        >
                          {item.icon}
                        </Box>
                      </Box>
                      <Typography
                        variant={"subtitle1"}
                        align={"center"}
                        style={{ textDecoration: "none" }}
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
    </Box>
  );
};

export default Categories;
