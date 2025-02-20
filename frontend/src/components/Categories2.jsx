import { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "../screens/Container";
import { Link } from "../../node_modules/@mui/material/index";
import Cookies from "js-cookie"; // Import cookies-js
import FixAndFlipIcon from "@mui/icons-material/BuildOutlined";
import MultifamilyBridgeIcon from "@mui/icons-material/ApartmentOutlined";
import GroundUpIcon from "@mui/icons-material/ConstructionOutlined";
import StabilizedBridgeIcon from "@mui/icons-material/ViewComfyOutlined";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import SinglePropertyIcon from "@mui/icons-material/HouseOutlined";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";

const firstnameCookie = Cookies.get("firstName");

const selectionData = [
  {
    title: "Fix and Flip",
    icon: <FixAndFlipIcon />,
    value: "FixFlip",
    tooltip: "Short-term financing for purchasing and renovating properties.",
    checks: ["Fast Approval", "Short-Term Loan", "No Prepayment Penalties"],
    link: "/loan-form-realestate-fixandflip",
  },
  {
    title: "Multifamily Bridge",
    icon: <MultifamilyBridgeIcon />,
    value: "MultifamilyBridge",
    tooltip: "Interim financing for multifamily property acquisitions.",
    checks: ["Flexible Terms", "Low Interest Rates", "Fast Funding"],
    link: "/loan-form-realestate-multifamily",
  },
  {
    title: "Single Property Rental",
    icon: <SinglePropertyIcon />,
    value: "SingleProperty",
    tooltip: "Loans for individual real estate investments.",
    checks: ["Individual Financing", "No Portfolio Required", "Quick Approval"],
    // link: "/loan-form-realestate?type=SingleProperty",
    link: "/loan-form-realestate-singlepropertyrental",
  },
  {
    title: "Ground Up",
    icon: <GroundUpIcon />,
    value: "GroundUp",
    tooltip: "Financing for new construction projects from the ground up.",
    checks: [
      "Construction Loans",
      "Phased Disbursement",
      "Flexible Repayment Options",
    ],
    link: "/loan-form-realestate-groundup",
  },
  {
    title: "Cashed Out Refinance",
    icon: <StabilizedBridgeIcon />,
    value: "StabilizedBridge",
    tooltip: "Refinancing to pull out cash from existing properties.",
    checks: ["Cash-Out Options", "Equity-Based Loans", "Debt Consolidation"],
    link: "/loan-form-realestate-cashedoutrefinance",
  },
  {
    title: "Rental Portfolios",
    icon: <HouseSidingIcon />,
    value: "RentalPortfolios",
    tooltip: "Long-term loans for multiple rental properties.",
    checks: [
      "Portfolio Financing",
      "Fixed or Adjustable Rates",
      "Tax-Deductible Interest",
    ],
    // link: "/loan-form-realestate-rentalportfolio",
    link: "/loan-form-realestate?type=RentalPortfolio",
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

  // {
  //   title: "Real Estate Loans",
  //   icon: <HomeIcon />,
  //   value: "FixFlip",
  //   link: "/register",
  // },

  // {
  //   title: "Business Loans",
  //   icon: <MultifamilyBridgeIcon />,
  //   value: "MultifamilyBridge",
  //   link: "https://bit.ly/3zyS4xt",
  // },
];

const Categories2 = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // useNavigate hook for React Router v6

  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const featuresRef = useRef(null); // New ref for features

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

    const handleIntersection = (entries, observer, setVisibility) => {
      const entry = entries[0];
      setVisibility(entry.isIntersecting);
    };

    const headingObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, headingObserver, setIsHeadingVisible),
      { threshold: 0.2 } // Trigger when 50% of the element is visible
    );

    const paragraphObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, paragraphObserver, setIsParagraphVisible),
      { threshold: 0.2 }
    );

    const featuresObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, featuresObserver, setIsFeaturesVisible),
      { threshold: 0.1 } // Trigger when 50% of the element is visible
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);
    if (paragraphRef.current) paragraphObserver.observe(paragraphRef.current);
    if (featuresRef.current) featuresObserver.observe(featuresRef.current);

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      if (paragraphRef.current)
        paragraphObserver.unobserve(paragraphRef.current);
      if (featuresRef.current) featuresObserver.unobserve(featuresRef.current);
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleOptionChange = (item) => {
    // console.log(item.value);

    if (!firstnameCookie) {
      // If the user is not logged in, redirect to the /register page
      navigate("/register");
    } else {
      // If logged in, proceed with the option selection
      navigate(item.link);
    }
  };

  return (
    <div className="" style={{ backgroundColor: "#c0dced" }}>
      <Container style={{ backgroundColor: "#c0dced" }}>
        <Typography
          ref={headingRef}
          className={`text-center fade-in ${
            isHeadingVisible ? "fade-in-show" : "fade-in-hide"
          }`}
          variant="h4"
          color="black"
          gutterBottom
        >
          Real Estate Loans
        </Typography>

        <Divider style={{ marginBottom: "10px" }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Box marginBottom={4}>
                <Typography
                  align={"center"}
                  color={"text.secondary"}
                  data-aos={"fade-up"}
                  ref={paragraphRef}
                  className={`${
                    isParagraphVisible
                      ? "fade-in-show paragraph-fade-in-show"
                      : "fade-in-hide"
                  }`}
                >
                  Find the financing solution that fits your real estate needs
                  and your wallet. Secure your loan today.
                </Typography>
              </Box>
              <Box>
                <Container style={{ marginTop: "-50px" }}>
                  <Grid
                    ref={featuresRef}
                    className={`${
                      isFeaturesVisible
                        ? "fade-in-show paragraph-fade-in-show-extra"
                        : "fade-in-hide"
                    }`}
                    container
                    spacing={2}
                  >
                    {selectionData.map((item, i) => (
                      <Grid item xs={12} md={4} key={i}>
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
                          onClick={() => handleOptionChange(item)}
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
                              <Box sx={{ color: "#498dd6", bottom: 0 }}>
                                {item.icon}
                              </Box>
                            </Box>

                            {/* Title and Description with Divider */}
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              mt={2}
                            >
                              <Typography
                                variant={"subtitle1"}
                                sx={{
                                  fontWeight: 500,
                                  textDecoration: "none",
                                }}
                              >
                                {item.title}
                              </Typography>

                              {/* Divider between title and tooltip */}
                              <Divider sx={{ width: "100%", my: 1 }} />

                              <Typography
                                variant="body2"
                                sx={{ textAlign: "center" }}
                              >
                                {item.tooltip}
                              </Typography>

                              {/* Render Checkmarks */}
                              <Box sx={{ mt: 1 }}>
                                {item.checks.map((check, index) => (
                                  <Box
                                    key={index}
                                    display="flex"
                                    alignItems="center"
                                    mb={1}
                                  >
                                    <Checkbox
                                      defaultChecked
                                      sx={{
                                        color: green[400],
                                        "&.Mui-checked": {
                                          color: green[400],
                                        },
                                        transform: "scale(0.9)",
                                      }}
                                    />
                                    <Typography sx={{ fontSize: "0.875rem" }}>
                                      {check}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Categories2;
