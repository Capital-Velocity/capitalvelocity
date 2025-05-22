import { Link, useLocation } from "react-router-dom";
import myImg from "../assets/cvlogo.png";
// import { useLogout } from "../hooks/useLogout";
// import { useAuthContext } from "../hooks/useAuthContext";

import * as React from "react";
import { useEffect, useState } from "react";
// import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { Avatar, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const pages = ["About Us", "Explore", "My Grants", "Contact Us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //   const { logout } = useLogout();
  //   const { user } = useAuthContext();
  const [hasAdmin, setHasAdmin] = useState(false); // Default to false
  const [initial, setInitial] = useState("");

  //   const checkResearchPackage = async (email) => {
  //     try {
  //       const response = await axios.post(
  //         "https://172.212.216.8:4000/user/check-research-package",
  //         { email }
  //       );
  //       if (response.status === 200) {
  //         setHasAdmin(response.data.grantExpertEdit);
  //       }
  //     } catch (error) {
  //       console.error("Error checking research package:", error);
  //       alert("Error checking research package.");
  //     }
  //   };

  //   useEffect(() => {
  //     if (user?.email) {
  //       checkResearchPackage(user.email); // Call the function with the user's email
  //     }
  //   }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = () => {
    setHasAdmin(false);
    logout();
  };

  const handleSignOutClick = () => {
    console.log("clicked");
    const cookieNames = Object.keys(Cookies.get());
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("lastName");
    Cookies.remove("firstName");
    Cookies.remove("isAdmin");
    window.location.href = "/";
  };

  const firstnameCookie = Cookies.get("firstName");
  useEffect(() => {
    // Check if the 'resFirst' cookie exists
    const resFirstCookie = Cookies.get("firstName");
    const isAdminCookie = Cookies.get("isAdmin");

    if (isAdminCookie === "true") {
      setIsAdmin(true);
    }
    if (resFirstCookie) {
      // If the cookie exists, set the initial from the cookie
      setInitial(resFirstCookie.charAt(0).toUpperCase());
    } else {
      // If the cookie does not exist, set an empty string as the initial
      setInitial("");
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBar position="" sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo on Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              height: "auto",
              width: "20%",
            }}
          >
            <Link to="/">
              <img src={myImg} className="pt-2 h-[75px] w-[125px] scale-175" />
            </Link>
          </Box>

          {/* Logo centered on mobile */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 0,
              right: 45,
              top: "60%",
              transform: "translateY(-50%)",
              pointerEvents: "none", // ensures buttons underneath still clickable
              zIndex: 0,
            }}
          >
            <img
              src={myImg}
              alt="Logo"
              style={{ height: "100px", objectFit: "contain" }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>Home</Typography>
                </MenuItem>
              </Link>
              <Link
                to="/loan-form-realestate"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    Real Estate Loans
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                to="/fix-and-flip-calculator"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    Fix and Flip Calculator
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                to="/dscr-calculator"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    Rental DSCR Calculator
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                to="/dscr-optimizer-calculator"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    Rental DSCR Optimizer
                  </Typography>
                </MenuItem>
              </Link>
              <a
                href="https://dragonsandangels.com/invest"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>Invest</Typography>
                </MenuItem>
              </a>
              <Link
                to="/loan-form-business-loans"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    Business Loans
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                to="/project99"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    Project Epic 99
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                to="/become-partner"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    Affiliate
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                to="https://andrewcartwright.com/coaching"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>Coaching</Typography>
                </MenuItem>
              </Link>
              <Link
                to="/contactUs"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>Contact</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <Link to="/aboutUs">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "royalblue", display: "block" }}
              >
                About Us
              </Button>
            </Link>

            <Link to="/discover">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "royalblue", display: "block" }}
              >
                Explore
              </Button>
            </Link>

            <Link to="/myGrants">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "royalblue", display: "block" }}
              >
                My Grants
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "royalblue", display: "block" }}
              >
                Contact
              </Button>
            </Link> */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* {user && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ color: "royalblue" }}>
                  {user.email}
                </Typography>
                <Link to="home">
                  <Button onClick={handleClick}>Log out</Button>
                </Link>
              </Box>
            )}
            {!user && (
              <Box>
                <Link to="login">
                  <Button>Log In</Button>
                </Link>
                <Link to="signup">
                  <Button>Free Sign Up</Button>
                </Link>
              </Box>
            )} */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                href="https://andrewcartwright.com/coaching"
                target="_blank"
                variant="contained"
                sx={{
                  display: { xs: "none", md: "inline-flex" }, // ❗ Hide on mobile
                  backgroundColor: "#4CAF50",
                  borderRadius: "30px",
                }}
              >
                Coaching
              </Button>

              {firstnameCookie ? (
                <>
                  <Link
                    to="#"
                    onClick={handleSignOutClick}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#498dd6",
                        borderRadius: "30px",
                      }}
                    >
                      Sign Out
                    </Button>
                  </Link>
                  <Link
                    to="/userDash"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#498dd6",
                        display: { xs: "none", md: "flex" }, // ❗ Hide on mobile
                      }}
                    >
                      {initial ? initial : <PersonIcon />}
                    </Avatar>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#498dd6",
                        borderRadius: "30px",
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Avatar
                    sx={{
                      bgcolor: "#498dd6",
                      display: { xs: "none", md: "flex" }, // ❗ Hide on mobile
                    }}
                  >
                    {initial ? initial : <PersonIcon />}
                  </Avatar>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>

        <hr />
        <div class="hidden justify-center space-x-12 bg-white px-12 md:flex">
          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${location.pathname === "/" ? "border-gray-600" : "border-gray-300"} 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/"
          >
            <div class="css-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <span class="mt-1 leading-none">About</span>
          </a>

          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${
      location.pathname === "/loan-form-realestate"
        ? "border-gray-600"
        : "border-gray-300"
    } 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/loan-form-realestate"
          >
            <div class="css-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 16 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.07917 1.66675V9.59308L14.517 9.60475L6.43667 21.4826V13.5562L1 13.5446L9.07917 1.66675Z"
                />
              </svg>
            </div>
            <span class="mt-1 leading-none">Real Estate Loans</span>
          </a>

          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${
      location.pathname === "/fix-and-flip-calculator"
        ? "border-gray-600"
        : "border-gray-300"
    } 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/fix-and-flip-calculator"
          >
            <div class="css-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15.0012 9.99914C15.0012 11.3804 12.3138 12.5002 8.99875 12.5002C5.68366 12.5002 2.99625 11.3804 2.99625 9.99914M15.0012 9.99914C15.0012 8.61786 12.3138 7.4981 8.99875 7.4981C5.68366 7.4981 2.99625 8.61786 2.99625 9.99914M15.0012 9.99914V17.5023C15.0012 18.8836 12.3138 20.0033 8.99875 20.0033C5.68366 20.0033 2.99625 18.8836 2.99625 17.5023V9.99914M15.0012 13.5006C15.0012 14.8819 12.3138 16.0016 8.99875 16.0016C5.68366 16.0016 2.99625 14.8819 2.99625 13.5006" />
                <path d="M21.0037 9.99914C21.0037 11.3804 18.3163 12.5002 15.0012 12.5002M21.0037 6.49768V14.0008C21.0037 15.3821 18.3163 16.5019 15.0012 16.5019" />
                <path d="M21.0037 6.49768C21.0037 5.11711 18.3126 3.99664 15.0012 3.99664C11.6899 3.99664 8.99875 5.11711 8.99875 6.49768C9.0214 6.88843 9.20196 7.25317 9.49895 7.50811M21.0037 6.49768C21.0037 7.87826 18.3126 8.99873 15.0012 8.99873C14.8312 8.99873 14.6611 8.99873 14.501 8.98872" />
              </svg>
            </div>
            <span class="mt-1 leading-none">Fix and Flip Calculator</span>
          </a>
          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${
      location.pathname === "/dscr-calculator"
        ? "border-gray-600"
        : "border-gray-300"
    } 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/dscr-calculator"
          >
            <div class="css-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 7H17M6 15H7M10.2322 12.7678C9.25592 11.7915 9.25592 10.2085 10.2322 9.23223C11.2085 8.25592 12.7915 8.25592 13.7678 9.23223M19.5 18L21 19.5M10 18H6C4.34315 18 3 16.6569 3 15V7C3 5.34315 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V10M19.4749 13.0251C20.5633 14.1239 20.8026 15.8063 20.0638 17.165C19.325 18.5237 17.7829 19.2374 16.2689 18.9212C14.755 18.6049 13.6275 17.3336 13.4943 15.7928C13.3612 14.252 14.2539 12.806 15.6911 12.2348C16.9951 11.6974 18.4951 12.0107 19.4749 13.0251Z" />
              </svg>
            </div>
            <span class="mt-1 leading-none">Rental DSCR Calculator</span>
          </a>

          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${
      location.pathname === "/dscr-optimizer-calculator"
        ? "border-gray-600"
        : "border-gray-300"
    } 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/dscr-optimizer-calculator"
          >
            <div class="css-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20.1969 38.2336C11.2308 38.2336 3.96387 30.9666 3.96387 22.0006C3.96387 13.0346 11.2308 5.76758 20.1969 5.76758C29.1629 5.76758 36.4299 13.0346 36.4299 22.0006" />
                <path d="M4.88965 16.5893H35.5033" />
                <path d="M4.8916 27.4116H22.0012" />
                <path d="M27.4128 21.9987C27.4128 17.0133 26.1088 12.028 23.5043 7.67755C21.9766 5.12897 18.4197 5.12897 16.8938 7.67755C11.6812 16.3802 11.6812 27.6189 16.8938 36.3198C17.6568 37.595 18.9284 38.2335 20.1999 38.2335" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M34.6405 27.9238L39.8892 36.6806C40.36 37.467 39.6295 38.4194 38.7204 38.2029L33.7243 37.0107L28.7281 38.2011C27.8191 38.4176 27.0886 37.4652 27.5593 36.6788L32.808 27.9238C33.2174 27.2402 34.2311 27.2402 34.6405 27.9238Z"
                />
              </svg>
            </div>
            <span class="mt-1 leading-none">Rental DSCR Optimizer</span>
          </a>
          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out hover:border-gray-600 hover:text-black text-neutral-900`}
            href="https://dragonsandangels.com/invest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="css-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-banknote-icon lucide-banknote"
              >
                <rect width="20" height="12" x="2" y="6" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
            </div>
            <span className="mt-1 leading-none">Invest</span>
          </a>
          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${
      location.pathname === "/loan-form-business-loans"
        ? "border-gray-600"
        : "border-gray-300"
    } 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/loan-form-business-loans"
          >
            <div class="css-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21.0038 9.49893V6.49768C21.0038 5.1164 19.884 3.99664 18.5027 3.99664H5.49731C4.11602 3.99664 2.99627 5.1164 2.99627 6.49768V7.99831" />
                <path d="M21.0038 9.49893L18.5027 9.49894C17.1214 9.49894 16.0017 10.6187 16.0017 12C16.0017 13.3813 17.1214 14.501 18.5027 14.501H21.0038" />
                <path d="M21.0038 9.49893C21.5563 9.49893 22.0042 9.94684 22.0042 10.4994V13.5006C22.0042 14.0531 21.5563 14.501 21.0038 14.501" />
                <path d="M21.0038 14.501V17.5023C21.0038 18.8836 19.884 20.0033 18.5027 20.0033H13.0004" />
                <path d="M1.99585 12.6002V19.4031C1.99699 20.2869 3.78746 21.0037 5.99752 21.0037C8.20758 21.0037 9.99804 20.2869 9.99918 19.4031V12.6002C9.99804 11.7164 8.20644 10.9996 5.99752 10.9996C3.7886 10.9996 1.99585 11.7153 1.99585 12.6002Z" />
                <path d="M1.99585 12.6002C1.99585 13.484 3.78632 14.2009 5.99638 14.2009C8.20644 14.2009 9.99804 13.484 9.99804 12.6002" />
                <path d="M1.99642 16.0016C1.99642 16.8854 3.78689 17.6023 5.99695 17.6023C8.20701 17.6023 9.99861 16.8854 9.99861 16.0016" />
              </svg>
            </div>
            <span class="mt-1 leading-none">Business Loans</span>
          </a>

          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${
      location.pathname === "/project99" ? "border-gray-600" : "border-gray-300"
    } 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/project99"
          >
            <div class="css-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 9H1.5" />
                <path d="M5 15H3.5" />
                <path d="M5 12H2.5" />
                <path d="M5.636 5.636C8.21 3.062 12.081 2.292 15.4441 3.685C18.8072 5.078 20.9999 8.3598 20.9999 12C20.9999 15.6401 18.8072 18.9218 15.4441 20.3149C12.081 21.7079 8.20997 20.9379 5.63599 18.3639" />
                <path d="M12 7.5V8.5" />
                <path d="M12 16.5V15.5" />
                <path d="M14.1927 9.9211C13.8542 9.01649 12.964 8.43956 12 8.49998C10.8807 8.39379 9.88145 9.20102 9.75 10.3177C9.75 11.0342 10.2558 11.6511 10.9584 11.7917L13.0416 12.2083C13.7442 12.3488 14.25 12.9658 14.25 13.6823C14.1186 14.7989 13.1193 15.6062 12 15.5C11.036 15.5604 10.1458 14.9835 9.80729 14.0789" />
              </svg>
            </div>
            <span class="mt-1 leading-none">Project Epic 99</span>
          </a>
          {/* <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-xs font-medium leading-tight transition-colors ease-in-out 
        ${
          location.pathname === "/WhyUs" ? "border-gray-600" : "border-gray-300"
        } 
        hover:border-gray-600 hover:bg-transparent hover:text-neutral-900 text-neutral-700`}
            href="/WhyUs"
          >
            <div class="css-0">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.0037 10.9995V17.002C21.0037 19.2121 19.2121 21.0037 17.002 21.0037H6.99788C4.78782 21.0037 2.99622 19.2121 2.99622 17.002V6.99788C2.99622 4.78782 4.78782 2.99622 6.99788 2.99622H13.0004"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15 17H9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.29289 11.3344L12.3344 8.2929C12.5219 8.10536 12.7763 8 13.0415 8C13.3067 8 13.5611 8.10536 13.7486 8.2929L14.7071 9.25141C15.0976 9.64193 15.0976 10.2751 14.7071 10.6656L11.6656 13.7071C11.4781 13.8946 11.2237 14 10.9585 14H9.5C9.22386 14 9 13.7761 9 13.5V12.0415C9 11.7763 9.10536 11.522 9.29289 11.3344Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19 8.5C19 6.567 17.433 5 15.5 5C17.433 5 19 3.433 19 1.5C19 3.433 20.567 5 22.5 5C20.567 5 19 6.567 19 8.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <span class="mt-1 leading-none">Why Capital Velocity?</span>
          </a> */}
          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${
      location.pathname === "/become-partner"
        ? "border-gray-600"
        : "border-gray-300"
    } 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/become-partner"
          >
            <div class="css-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.6293 3.6535C12.2623 3.95042 11.7377 3.95042 11.3707 3.6535C10.5687 3.01343 9.49518 2.82752 8.52458 3.16058C7.55397 3.49364 6.82081 4.29951 6.58074 5.29719C6.49584 5.68536 6.19192 5.98811 5.80342 6.07151C4.6613 6.30332 3.70937 7.08817 3.26409 8.16515C2.81881 9.24213 2.93854 10.4701 3.58349 11.4407C3.81589 11.781 3.81589 12.229 3.58349 12.5692C2.93854 13.5399 2.81881 14.7678 3.26409 15.8448C3.70937 16.9218 4.6613 17.7066 5.80342 17.9385C6.19192 18.0218 6.49584 18.3246 6.58074 18.7128C6.82212 19.7096 7.55581 20.5141 8.52622 20.8461C9.49662 21.1781 10.5694 20.9915 11.3707 20.3515C11.7377 20.0545 12.2623 20.0545 12.6293 20.3515C13.432 20.9915 14.5063 21.1768 15.4771 20.8427C16.4479 20.5085 17.1805 19.7013 17.4193 18.7028C17.5042 18.3146 17.8081 18.0118 18.1966 17.9284C19.3388 17.6965 20.2908 16.9114 20.7359 15.8341C21.181 14.7569 21.0609 13.5288 20.4155 12.5582C20.184 12.2184 20.184 11.7716 20.4155 11.4317C21.0609 10.4612 21.181 9.23306 20.7359 8.15582C20.2908 7.07858 19.3388 6.29345 18.1966 6.0615C17.8081 5.97811 17.5042 5.67536 17.4193 5.28718C17.1779 4.29037 16.4442 3.48584 15.4738 3.15386C14.5034 2.82188 13.4306 3.00842 12.6293 3.6485V3.6535Z"
                />
                <path d="M12 3.87463V20.1244" />
                <path d="M15.0012 16.0017C15.0012 14.8967 15.897 14.0009 17.0021 14.0009" />
                <path d="M8.99876 7.99835C8.99876 9.10338 8.10295 9.99919 6.99792 9.99919" />
                <path d="M8.99876 16.0017C8.99876 14.8967 8.10295 14.0009 6.99792 14.0009" />
                <path d="M15.0012 7.99835C15.0012 9.10338 15.897 9.99919 17.0021 9.99919" />
              </svg>
            </div>
            <span class="mt-1 leading-none">Affiliate</span>
          </a>
          {/* <button class="whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100 disabled:bg-primary-180 py-2 relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-xs font-medium leading-tight transition-colors ease-in-out hover:border-gray-300 hover:bg-transparent hover:text-neutral-900 border-transparent text-neutral-700">
            <span class="absolute right-[-3px] top-[18px] min-w-[17px] items-center justify-center rounded p-1 text-center text-[8px] font-semibold uppercase tracking-wider text-white bg-secondary-700">
              New
            </span>
            <div class="css-0">
              <svg
                width="28"
                height="28"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.1969 38.2336C11.2308 38.2336 3.96387 30.9666 3.96387 22.0006C3.96387 13.0346 11.2308 5.76758 20.1969 5.76758C29.1629 5.76758 36.4299 13.0346 36.4299 22.0006"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4.88965 16.5893H35.5033"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4.8916 27.4116H22.0012"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M27.4128 21.9987C27.4128 17.0133 26.1088 12.028 23.5043 7.67755C21.9766 5.12897 18.4197 5.12897 16.8938 7.67755C11.6812 16.3802 11.6812 27.6189 16.8938 36.3198C17.6568 37.595 18.9284 38.2335 20.1999 38.2335"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M34.6405 27.9238L39.8892 36.6806C40.36 37.467 39.6295 38.4194 38.7204 38.2029L33.7243 37.0107L28.7281 38.2011C27.8191 38.4176 27.0886 37.4652 27.5593 36.6788L32.808 27.9238C33.2174 27.2402 34.2311 27.2402 34.6405 27.9238Z"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <span class="mt-1 leading-none">AI Website</span>
          </button> */}

          {/* <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-xs font-medium leading-tight transition-colors ease-in-out 
        ${
          location.pathname === "/about" ? "border-gray-600" : "border-gray-300"
        } 
        hover:border-gray-600 hover:bg-transparent hover:text-neutral-900 text-neutral-700`}
            href="/about"
          >
            <div className="css-0">
              <svg
                width="28"
                height="28"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.1969 38.2336C11.2308 38.2336 3.96387 30.9666 3.96387 22.0006C3.96387 13.0346 11.2308 5.76758 20.1969 5.76758C29.1629 5.76758 36.4299 13.0346 36.4299 22.0006"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4.88965 16.5893H35.5033"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4.8916 27.4116H22.0012"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M27.4128 21.9987C27.4128 17.0133 26.1088 12.028 23.5043 7.67755C21.9766 5.12897 18.4197 5.12897 16.8938 7.67755C11.6812 16.3802 11.6812 27.6189 16.8938 36.3198C17.6568 37.595 18.9284 38.2335 20.1999 38.2335"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M34.6405 27.9238L39.8892 36.6806C40.36 37.467 39.6295 38.4194 38.7204 38.2029L33.7243 37.0107L28.7281 38.2011C27.8191 38.4176 27.0886 37.4652 27.5593 36.6788L32.808 27.9238C33.2174 27.2402 34.2311 27.2402 34.6405 27.9238Z"
                  stroke="currentColor"
                  stroke-width="2.70438"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <span className="mt-1 leading-none">Company</span>
          </a> */}

          <a
            className={`relative flex h-20 flex-col items-center justify-center rounded-none border-b-2 bg-transparent px-0 pb-3.5 pt-4 text-sm font-semibold leading-tight transition-colors ease-in-out 
    ${
      location.pathname === "/contactUs" ? "border-gray-600" : "border-gray-300"
    } 
    hover:border-gray-600 hover:bg-transparent hover:text-black text-neutral-900`}
            href="/contactUs"
          >
            <div class="css-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="12.5" y="17.252" width="3.00125" height="3.75156" />
                <rect x="15.5" y="13.001" width="3.00125" height="8.00333" />
                <path d="M20.5032 9.99901V4.99693C20.5032 3.8919 19.6074 2.99609 18.5023 2.99609H5.49693C4.3919 2.99609 3.49609 3.8919 3.49609 4.99693V17.0019C3.49609 18.107 4.3919 19.0028 5.49693 19.0028H9.49859" />
                <path d="M9.74805 10.9992H12.4992" />
                <path d="M9.74805 7.12326H16.5009" />
                <path d="M6.6213 11.1243C6.69037 11.1243 6.74635 11.0683 6.74635 10.9992C6.74635 10.9302 6.69037 10.8742 6.6213 10.8742C6.55224 10.8742 6.49625 10.9302 6.49625 10.9992C6.49625 11.0683 6.55224 11.1243 6.6213 11.1243" />
                <path d="M6.6213 7.24831C6.69037 7.24831 6.74635 7.19232 6.74635 7.12326C6.74635 7.05419 6.69037 6.9982 6.6213 6.9982C6.55224 6.9982 6.49625 7.05419 6.49625 7.12326C6.49625 7.19232 6.55224 7.24831 6.6213 7.24831" />
                <rect x="18.502" y="15.252" width="3.00125" height="5.7524" />
              </svg>
            </div>
            <span class="mt-1 leading-none">Contact</span>
          </a>
        </div>
      </Container>
    </AppBar>
  );
}
export default Navbar;
