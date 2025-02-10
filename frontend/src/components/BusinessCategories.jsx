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
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const mock = [
  {
    title: "Small Business Loan",
    icon: <CreditScoreIcon />,
    value: "FixFlip",
    link: "https://go.mypartner.io/business-financing/?ref=0014x00001SWeI4AAL",
  },

  {
    title: "SBA",
    icon: <CreditScoreIcon />,
    value: "SBA",
    link: "/loan-form-business-loans?type=SBA",
  },
];

const mockUnauthentic = [
  {
    title: "Small Business Loan",
    icon: <CreditScoreIcon />,
    value: "FixFlip",
    link: "/register",
  },

  {
    title: "SBA",
    icon: <CreditScoreIcon />,
    value: "GroundUp",
    link: "/register",
  },
];

const BusinessCategories = () => {
  const theme = useTheme();

  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

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
      { threshold: 0.8 } // Trigger when 20% of the element is visible
    );

    const paragraphObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, paragraphObserver, setIsParagraphVisible),
      { threshold: 0.8 }
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);
    if (paragraphRef.current) paragraphObserver.observe(paragraphRef.current);

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      if (paragraphRef.current)
        paragraphObserver.unobserve(paragraphRef.current);
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="bg-blue-100 pt-6">
      <Box>
        <Box>
          <Container>
            <p
              ref={headingRef}
              className={`text-center text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-5xl fade-in ${
                isHeadingVisible ? "fade-in-show" : "fade-in-hide"
              }`}
            >
              Business Loans <br /> <br />
            </p>
            {/* <p
              ref={paragraphRef}
              className={`text-center mt-6 mb-6 text-lg/8 text-gray-600 fade-in ${
                isParagraphVisible
                  ? "fade-in-show paragraph-fade-in-show"
                  : "fade-in-hide"
              }`}
            >
              Find the financing solution that fits your real estate and
              business needs and your wallet. Secure your loan today.
            </p> */}

            <Grid
              ref={paragraphRef}
              className={` fade-in ${
                isParagraphVisible
                  ? "fade-in-show paragraph-fade-in-show-extra"
                  : "fade-in-hide"
              }`}
              container
              spacing={2}
            >
              {mock.map((item, i) => (
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
      </Box>
    </div>
  );
};

export default BusinessCategories;
