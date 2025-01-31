import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import logo from "../Image/logo4.jpeg";
import Divider from "@mui/material/Divider";

const Footer2 = () => {
  const [marginLeft, setMarginLeft] = useState("15%");

  useEffect(() => {
    function handleResize() {
      // Check the window width and set marginLeft accordingly
      if (window.innerWidth <= 767) {
        setMarginLeft("0");
      } else {
        setMarginLeft("0");
      }
    }

    // Initial call to set the marginLeft based on the current window width
    handleResize();

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const footerStyle = {
    backgroundColor: "#ffff",
    padding: "20px",
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: marginLeft, // Dynamic marginLeft
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  };

  const gridStyle = { maxWidth: "1200px" };

  return (
    <div style={footerStyle}>
      <img src={logo} alt="Logo" style={{ width: "50px" }} />

      <div style={{ color: "grey", fontSize: 12 }}>
        Copyright © 2024 Capital Velocity. All Rights Reserved.
        <a href="/termsofUse">Terms and Conditions</a>
        {" | "}
        <a href="/privacyPolicy">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Footer2;
