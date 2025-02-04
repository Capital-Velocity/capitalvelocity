import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Container from "../screens/Container";
import { useState, useEffect, useRef } from "react";

const stepStyle = {
  "& .Mui-active": {
    "&.MuiStepIcon-root": {
      color: "#498dd6",
      fontSize: "3rem",
    },
  },
};
const steps = [
  {
    label: "Fill out a simple application ",
    description: `Answer just a few questions about your business to see which lending products you qualify for. We’ve partnered with over 100 lenders, allowing us to find the best option for your business/project.`,
  },
  {
    label: "Connect with a funding specialist.",
    description:
      "One of our funding specialists will reach out to you to get to know your business better. Since every business is unique, we want to make sure we find the loan type that’s perfect for your needs.",
  },
  {
    label: "Compare loan offers.",
    description: `Compare different offers curated for your business/project. Select the capital amount and rate that will help take your business/project to the next level.`,
  },
  {
    label: "Get funded.",
    description: `We work with lenders that can fund you fast. Once you’re approved, you’ll be able to access your capital in as little as 24 hours.`,
  },
];
function LoanMatching() {
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
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        position={"relative"}
      >
        <Box
          width={1}
          order={{ xs: 2, md: 1 }}
          display={"flex"}
          alignItems={"center"}
        >
          <Container>
            <Box>
              <p
                ref={headingRef}
                className={`text-center text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-5xl fade-in ${
                  isHeadingVisible ? "fade-in-show" : "fade-in-hide"
                }`}
              >
                How Our Loan Matching Process Works.
              </p>
            </Box>
          </Container>
        </Box>
      </Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Box
              component={"img"}
              src={
                "https://img.freepik.com/free-vector/banknote-concept-illustration_114360-5640.jpg?w=740&t=st=1701711352~exp=1701711952~hmac=18e2f7abe2ae89fffac9b9fdaf9d585238d2e2f0bd2bc2d5413fbcc1d12089fb"
              }
              width={1}
              height={1}
              sx={{
                filter:
                  theme.palette.mode === "dark" ? "brightness(0.8)" : "none",
              }}
            />
          </Grid>
          <Grid item sm={6} style={{ marginTop: "" }}>
            <Stepper orientation="vertical" sx={stepStyle}>
              {steps.map((step, index) => (
                <Step active={true} key={step.label}>
                  <StepLabel>
                    <Typography
                      sx={{ fontWeight: 700, color: "black" }}
                      variant="h5"
                    >
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography style={{ color: "black" }}>
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoanMatching;
