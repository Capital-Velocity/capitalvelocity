import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const mock = [
  {
    title: 12,
    subtitle: "funded through our partners",
    suffix: "+BILLION",
  },
  {
    title: 100,
    subtitle: "lenders in our network",
    suffix: "+",
  },
  {
    title: 370000,
    subtitle: "loans funded through our partners",
    suffix: "+",
  },
];

const PromoNumbers = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const [viewPortEntered, setViewPortEntered] = useState(false);
  const setViewPortVisibility = (isVisible) => {
    if (viewPortEntered) {
      return;
    }

    setViewPortEntered(isVisible);
  };

  return (
    <Box style={{ backgroundColor: "#c0dced" }}>
      <div style={{ padding: 3, backgroundColor: "#c0dced" }}>
        <CardContent style={{ backgroundColor: "#c0dced" }}>
          <Box marginY={4}>
            <Grid container spacing={2}>
              {mock.map((item, i) => (
                <Grid key={i} item xs={12} md={4}>
                  <Typography
                    variant="h3"
                    align={"center"}
                    style={{ color: "black" }}
                    gutterBottom
                  >
                    <Box fontWeight={600}>
                      <VisibilitySensor
                        onChange={(isVisible) =>
                          setViewPortVisibility(isVisible)
                        }
                        delayedCall
                      >
                        <CountUp
                          duration={2}
                          end={viewPortEntered ? item.title : 0}
                          start={0}
                          suffix={item.suffix}
                        />
                      </VisibilitySensor>
                    </Box>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    align={"center"}
                    component="p"
                  >
                    {item.subtitle}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </div>
    </Box>
  );
};

export default PromoNumbers;
