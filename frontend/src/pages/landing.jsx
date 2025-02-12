import React, { useState, useEffect } from "react";
import Categories2 from "../components/Categories2";
import Footer2 from "../components/Footer2";
import lendio1 from "../Images/tree.png";
import Lendio from "./Lendio";
import HomeIcon from "@mui/icons-material/Home";
import { Card } from "@mui/material";
import FixAndFlipIcon from "@mui/icons-material/BuildOutlined";
import MultifamilyBridgeIcon from "@mui/icons-material/ApartmentOutlined";
import GroundUpIcon from "@mui/icons-material/ConstructionOutlined";
import StabilizedBridgeIcon from "@mui/icons-material/ViewComfyOutlined";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import SinglePropertyIcon from "@mui/icons-material/HouseOutlined";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { Link } from "@mui/material";
import Cookies from "js-cookie";
import { Grid, Box, Typography } from "@mui/material";
import Container from "../screens/Container";
import PromoNumbers from "../components/PromoNumbers";
import WhyUs from "./WhyUs";
import Hero from "../components/Hero";
import CalculatorHero from "../components/CalculatorHero";
import LoanMatching from "../components/LoanMatching";
import BusinessCategories from "../components/BusinessCategories";
import LoanForm from "../components/LoanForm";
import LoanForm2 from "../components/LoanForm2";

const mock = [
  {
    title: "Fix and Flip",
    icon: <FixAndFlipIcon />,
    value: "FixFlip",
    link: "/loan-form-realestate?type=FixFlip",
  },

  {
    title: "Ground Up",
    icon: <GroundUpIcon />,
    value: "GroundUp",
    link: "/loan-form-realestate?type=GroundUp",
  },

  {
    title: "Multifamily Bridge",
    icon: <MultifamilyBridgeIcon />,
    value: "MultifamilyBridge",
    link: "/loan-form-realestate?type=MultifamilyBridge",
  },

  {
    title: "Stabilized Bridge",
    icon: <StabilizedBridgeIcon />,
    value: "StabilizedBridge",
    link: "/loan-form-realestate?type=StabilizedBridge",
  },

  {
    title: "Rental Portfolios",
    icon: <HouseSidingIcon />,
    value: "RentalPortfolios",
    link: "/loan-form-realestate?type=RentalPortfolios",
  },

  {
    title: "Single Property",
    icon: <SinglePropertyIcon />,
    value: "SingleProperty",
    link: "/loan-form-realestate?type=SingleProperty",
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
];
function Landing() {
  const [isMobile, setIsMobile] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const firstnameCookie = Cookies.get("firstName");
  useEffect(() => {
    const emailCookie = Cookies.get("email");
    if (emailCookie) {
      setAuthenticated(true);
    }
    // Check the window width when the component mounts and on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960); // Adjust the threshold as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check when the component mounts
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div>
        <Hero />
        <PromoNumbers />
        <LoanMatching />
        <WhyUs />
        <CalculatorHero />
        <LoanForm />
        <LoanForm2 />
        {/* <Categories2 />
      <BusinessCategories /> */}
      </div>
    </div>
  );
}

export default Landing;
