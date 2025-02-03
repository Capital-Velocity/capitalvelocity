/* eslint-disable react/no-unescaped-entities */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

const Story = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? "row" : "column"}>
        <Grid item container alignItems={"center"} xs={12} md={6}>
          <Box>
            <Typography
              variant={"h4"}
              gutterBottom
              sx={{ fontWeight: 400, color: "black" }}
            >
              It takes a little money to make a big difference.
            </Typography>
            <Typography component={"p"} sx={{ color: "black" }}>
              Banks are turning down 8 out of 10 small business loan
              applications. That means a lot of people have to give up on their
              dreams because they don't have the money they need to start or
              growth their business and/or start or complete their real estate
              project.
              <br />
              <br />
              Capital Velocity is changing that. We're helping small business
              owners and real estate entrepreneurs get the loans they need to
              turn their ideas into reality. We're backing their ambition so
              they can be the builders of American dreams.
              <br />
              <br />A strong, successful America starts with small businesses.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Box maxWidth={500} width={1}>
            <Box
              component={"img"}
              src={
                "https://img.freepik.com/free-vector/euro-coins-concept-illustration_114360-22894.jpg?w=740&t=st=1701712330~exp=1701712930~hmac=e94e72066e277c8138d9e4fa6096d1ef8537771c43b9c1e51749cf723627dee3"
              }
              width={1}
              height={1}
              sx={{
                filter:
                  theme.palette.mode === "dark" ? "brightness(0.8)" : "none",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Story;
