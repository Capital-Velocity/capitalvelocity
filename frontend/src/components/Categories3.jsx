import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie"; // Import cookies-js
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../screens/Container";

const firstnameCookie = Cookies.get("firstName");

const selectionData = [
  {
    title: "Small Business Loan",
    icon: <CreditScoreIcon />,
    value: "https://go.mypartner.io/business-financing/?ref=0014x00001SWeI4AAL",
    tooltip: "Financing options for small businesses.",
    checks: [
      "$10,000 - $5 million",
      "6 Months to 10 Year Terms",
      "No Hard Credit Pull",
    ],
    link: "https://go.mypartner.io/business-financing/?ref=0014x00001SWeI4AAL",
  },
  {
    title: "SBA",
    icon: <CreditScoreIcon />,
    value: "SBA",
    tooltip: "Small Business Administration-backed loan programs.",
    checks: [
      "Government Backed",
      "Longer Terms Available",
      "Lower Interest Rates",
    ],
    link: "/loan-form-business-loans-sba",
  },
];

const Categories3 = () => {
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
    // If the item is an external link (starts with http) and is specifically the "Small Business Loan"
    if (item.title === "Small Business Loan") {
      window.open(item.link, "_blank"); // open in a new tab
      return;
    }

    // Otherwise, continue with login check
    if (!firstnameCookie) {
      navigate("/register");
    } else {
      if (item.link.startsWith("http")) {
        window.location.href = item.link;
      } else {
        navigate(item.link);
      }
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
          Business Loans
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
                                variant={"h6"}
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
                                variant="body1"
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
                                    <Typography sx={{ fontSize: "1rem" }}>
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

export default Categories3;
