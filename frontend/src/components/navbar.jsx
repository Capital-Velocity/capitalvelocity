import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";

import logo4 from "../Image/logo4.jpeg";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const MobileLink = styled(Link)`
  color: grey;
  font-weight: 130;
  text-decoration: none;
  margin-bottom: 10px;
`;

const LegacyNavbar = () => {
  const [hasFirstNameCookie, setHasFirstNameCookie] = useState("");
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [initial, setInitial] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State variable for isAdmin

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

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
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

  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <AppBar position="sticky" style={{ background: "#ffffff", color: "grey" }}>
      <Alert
        icon={false}
        style={{
          backgroundColor: "#c5dfee",
          color: "grey",
          textAlign: "center",
        }}
        sx={{
          justifyContent: "right",
          "& .MuiAlert-message": { paddingRight: "10px" },
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <Row>
            <Col style={{ width: 150 }}>
              {firstnameCookie ? (
                <Link
                  to="#"
                  onClick={handleSignOutClick}
                  style={{ color: "grey" }}
                >
                  Sign Out
                </Link>
              ) : (
                <Link href="/login" style={{ color: "grey" }}>
                  Sign In
                </Link>
              )}
            </Col>
          </Row>
        </div>
      </Alert>
      <StyledToolbar>
        <Link href="/">
          <img src={logo4} alt="logo" style={{ height: "75px" }} />
        </Link>
        {window.innerWidth <= 600 ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <div
                      style={{ fontWeight: "bold" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Calculators
                    </div>
                    <Menu {...bindMenu(popupState)}>
                      <Link href="/DsciCalculator">
                        <MenuItem onClick={popupState.close}>
                          DSCR CALCULATOR
                        </MenuItem>
                      </Link>
                      <Link href="/FixandFlipCalc">
                        <MenuItem onClick={popupState.close}>
                          Flip and Switch Calculators
                        </MenuItem>
                      </Link>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <div variant="contained" {...bindTrigger(popupState)}>
                      Loans
                    </div>
                    {firstnameCookie ? (
                      <Menu {...bindMenu(popupState)}>
                        <Link href="/loan-form-business-loans">
                          {" "}
                          <MenuItem onClick={popupState.close}>
                            Business Loans
                          </MenuItem>
                        </Link>
                        <Link href="/loan-form-realestate">
                          {" "}
                          <MenuItem onClick={popupState.close}>
                            Real Estate Loans
                          </MenuItem>
                        </Link>
                      </Menu>
                    ) : (
                      <Menu {...bindMenu(popupState)}>
                        <Link href="/register">
                          {" "}
                          <MenuItem onClick={popupState.close}>
                            Business Loans
                          </MenuItem>
                        </Link>
                        <Link href="/register">
                          {" "}
                          <MenuItem onClick={popupState.close}>
                            Real Estate Loans
                          </MenuItem>
                        </Link>
                      </Menu>
                    )}
                  </React.Fragment>
                )}
              </PopupState>
              {firstnameCookie ? (
                <MenuItem onClick={handleMobileMenuClose}>
                  <MobileLink href="/project99">Project Epic 99</MobileLink>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleMobileMenuClose}>
                  <MobileLink href="/project99">Project Epic 99</MobileLink>
                </MenuItem>
              )}
              {firstnameCookie && (
                <MenuItem onClick={handleMobileMenuClose}>
                  <MobileLink href="/userDash">User Dashboard</MobileLink>
                </MenuItem>
              )}
              {isAdmin && (
                <MenuItem onClick={handleMobileMenuClose}>
                  <MobileLink href="/adminDash">Admin Dashboard</MobileLink>
                </MenuItem>
              )}
              <MenuItem onClick={handleMobileMenuClose}>
                <MobileLink href="/WhyUs">Why Capital Velocity?</MobileLink>
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <MobileLink href="/becomePartner">Partner</MobileLink>
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <MobileLink href="/about">Company</MobileLink>
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <MobileLink href="/contactUs">Contact Us</MobileLink>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <div
                    style={{ fontWeight: "bold" }}
                    variant="contained"
                    {...bindTrigger(popupState)}
                  >
                    Calculators
                  </div>
                  <Menu {...bindMenu(popupState)}>
                    <Link href="/DsciCalculator">
                      <MenuItem onClick={popupState.close}>
                        DSCR CALCULATOR
                      </MenuItem>
                    </Link>
                    <Link href="/FixandFlipCalc">
                      <MenuItem onClick={popupState.close}>
                        Flip and Switch Calculators
                      </MenuItem>
                    </Link>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <div
                    style={{ fontWeight: "bold" }}
                    variant="contained"
                    {...bindTrigger(popupState)}
                  >
                    Loans
                  </div>
                  {firstnameCookie ? (
                    <Menu {...bindMenu(popupState)}>
                      <Link href="/loan-form-business-loans">
                        {" "}
                        <MenuItem onClick={popupState.close}>
                          Business Loans
                        </MenuItem>
                      </Link>
                      <Link href="/loan-form-realestate">
                        {" "}
                        <MenuItem onClick={popupState.close}>
                          Real Estate Loans
                        </MenuItem>
                      </Link>
                    </Menu>
                  ) : (
                    <Menu {...bindMenu(popupState)}>
                      <Link href="/register">
                        {" "}
                        <MenuItem onClick={popupState.close}>
                          Business Loans
                        </MenuItem>
                      </Link>
                      <Link href="/register">
                        {" "}
                        <MenuItem onClick={popupState.close}>
                          Real Estate Loans
                        </MenuItem>
                      </Link>
                    </Menu>
                  )}
                </React.Fragment>
              )}
            </PopupState>

            {firstnameCookie ? (
              <Link
                href="/project99"
                style={{
                  color: "grey",
                  fontWeight: 130,
                  textDecoration: "none",
                }}
              >
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <div
                        style={{ fontWeight: "bold" }}
                        variant="contained"
                        {...bindTrigger(popupState)}
                      >
                        Project Epic 99
                      </div>
                    </React.Fragment>
                  )}
                </PopupState>
              </Link>
            ) : (
              <Link
                href="/register"
                style={{
                  color: "grey",
                  fontWeight: 130,
                  textDecoration: "none",
                }}
              >
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <div
                        style={{ fontWeight: "bold" }}
                        variant="contained"
                        {...bindTrigger(popupState)}
                      >
                        Project Epic 99
                      </div>
                    </React.Fragment>
                  )}
                </PopupState>
              </Link>
            )}
            <Link
              href="/WhyUs"
              style={{ color: "grey", fontWeight: 130, textDecoration: "none" }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <div
                      style={{ fontWeight: "bold" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Why Capital Velocity?
                    </div>
                  </React.Fragment>
                )}
              </PopupState>
            </Link>
            <Link
              href="/becomePartner"
              style={{ color: "grey", fontWeight: 130, textDecoration: "none" }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <div
                      style={{ fontWeight: "bold" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Partner
                    </div>
                  </React.Fragment>
                )}
              </PopupState>
            </Link>
            <Link
              href="/about"
              style={{ color: "grey", fontWeight: 130, textDecoration: "none" }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <div
                      style={{ fontWeight: "bold" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Company
                    </div>
                  </React.Fragment>
                )}
              </PopupState>
            </Link>
            <Link
              href="/contactUs"
              style={{ color: "grey", fontWeight: 130, textDecoration: "none" }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <div
                      style={{ fontWeight: "bold" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Contact Us
                    </div>
                  </React.Fragment>
                )}
              </PopupState>
            </Link>

            <div>
              {isAdmin && ( // Conditionally render a paragraph when resFirstCookie is found
                <Link
                  href="/admin"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#498dd6",
                      borderRadius: "30px",
                    }}
                  >
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              {firstnameCookie && (
                <Link
                  href="/userDash"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#498dd6",
                      borderRadius: "30px",
                    }}
                  >
                    User Dashboard
                  </Button>
                </Link>
              )}
              {!isAdmin && !firstnameCookie && (
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#498dd6",
                      borderRadius: "30px",
                    }}
                  >
                    Apply for Financing
                  </Button>
                </Link>
              )}
            </div>
            <Avatar
              style={{
                backgroundColor: "#498dd6",
              }}
            >
              {initial ? initial : <PersonIcon />}
            </Avatar>
          </>
        )}
      </StyledToolbar>
    </AppBar>
  );
};

export default LegacyNavbar;
