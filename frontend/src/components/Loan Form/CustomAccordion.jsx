import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CustomAccordion = () => {
  const [expanded, setExpanded] = useState(true);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      style={{ backgroundColor: "#E8E8E8" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="Rate and Rate Lock Terms-content"
        id="Rate and Rate Lock Terms"
      >
        <Typography variant="h6">Rate and Rate Lock Terms</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <ul>
                <li>
                  <strong>
                    USD 3M Libor US Treasury Rates as of Sat Aug 12 2023
                  </strong>
                </li>
                <li>
                  5 Yr US Tsry: <strong>4.2330%</strong>
                </li>
                <li>
                  10 Yr US Tsry: <strong>4.1080%</strong>
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <ul style={{ marginLeft: "15px" }}>
                <li>
                  Indicative Gross Rates are calculated as the sum of (1) value
                  of the Index today + (2) Spread over Index.{" "}
                  <strong>
                    They represent today's rates, based on the information
                    submitted at pricing.
                  </strong>
                </li>
                <li>
                  Spread over Index will remain locked for a period of 30 days
                  from loan submission date, provided{" "}
                  <strong>
                    the information submitted at pricing is verified during
                    document collection and underwriting.
                  </strong>
                </li>
                <li>
                  Gross rates are determined at the time of credit approval,
                  calculated as the sum of the (1) value of the Index as of the
                  date of credit approval, and (2) Spread over Index.
                </li>
                <li>
                  Spread over Index will remain unchanged from loan submission
                  if (1) rate setting parameters for the loan do not change from
                  submission and (2) credit approval occurs within 30 days of
                  loan submission.
                </li>
                <li>
                  Gross rates are locked for a period of 15 days from credit
                  approval date for no fee. If a loan closes after this 15-day
                  period, rates are subject to change and require re-approval
                  for closing. There are two rate lock extension options
                  available for purchase: Option 1 with two 15 day rate lock
                  extensions or Option 2 with one 30 day rate lock extension.
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>
                Please refer to Rental Loan Rates{" "}
                <a style={{ textDecoration: "underline", cursor: "pointer" }}>
                  FAQs
                </a>{" "}
                for more information
              </strong>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
