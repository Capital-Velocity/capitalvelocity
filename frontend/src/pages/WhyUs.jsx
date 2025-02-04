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
import { useState, useEffect, useRef } from "react";

function WhyUs() {
  const theme = useTheme();
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
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
  }, []);
  return (
    <div>
      <div className="bg-blue-100" style={{}}>
        <Container style={{}}>
          <Box style={{}}>
            {/* <h2
            ref={headingRef}
            className={`text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-6xl fade-in ${
              isHeadingVisible ? "fade-in-show" : "fade-in-hide"
            }`}
          > */}

            <p
              ref={headingRef}
              className={`text-center text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-5xl fade-in ${
                isHeadingVisible ? "fade-in-show" : "fade-in-hide"
              }`}
            >
              Why Capital Velocity?
            </p>

            <Grid container spacing={2} style={{ marginTop: "30px" }}>
              <Grid item sm={6} style={{ marginTop: "50px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    ref={paragraphRef}
                    className={`text-xl/8 text-gray-600 fade-in ${
                      isParagraphVisible
                        ? "fade-in-show paragraph-fade-in-show"
                        : "fade-in-hide"
                    }`}
                    style={{ display: "flex", alignItems: "center" }} // Flexbox to align items on the same line
                  >
                    <ChecklistRtlIcon
                      style={{
                        fontSize: "70px",
                        color: "#498dd6",
                        marginRight: "10px",
                      }} // Added margin to space out icon and text
                    />

                    <Typography
                      variant="h5"
                      align={"left"} // Align text to the left to make it consistent with the icon
                      gutterBottom
                      sx={{
                        color: "black",
                        fontWeight: 600,
                        marginTop: theme.spacing(1),
                      }}
                    >
                      A Short Application Process
                    </Typography>
                  </div>

                  <Typography
                    ref={paragraphRef}
                    className={`fade-in ${
                      isParagraphVisible
                        ? "fade-in-show paragraph-fade-in-show"
                        : "fade-in-hide"
                    }`}
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
                  <div
                    ref={paragraphRef}
                    className={`text-xl/8 text-gray-600 fade-in ${
                      isParagraphVisible
                        ? "fade-in-show paragraph-fade-in-show-extra"
                        : "fade-in-hide"
                    }`}
                    style={{ display: "flex", alignItems: "center" }} // Flexbox to align items on the same line
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
                  </div>
                  <Typography
                    ref={paragraphRef}
                    className={` fade-in ${
                      isParagraphVisible
                        ? "fade-in-show paragraph-fade-in-show-extra"
                        : "fade-in-hide"
                    }`}
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
                  <div
                    ref={paragraphRef}
                    className={`text-xl/8 text-gray-600 fade-in ${
                      isParagraphVisible
                        ? "fade-in-show paragraph-fade-in-show-extra-large"
                        : "fade-in-hide"
                    }`}
                    style={{ display: "flex", alignItems: "center" }} // Flexbox to align items on the same line
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
                  </div>
                  <Typography
                    ref={paragraphRef}
                    className={` fade-in ${
                      isParagraphVisible
                        ? "fade-in-show paragraph-fade-in-show-extra-large"
                        : "fade-in-hide"
                    }`}
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

      {/* <Divider style={{ color: "grey" }} /> */}
      {/* <Footer2 /> */}
    </div>
  );
}

export default WhyUs;
