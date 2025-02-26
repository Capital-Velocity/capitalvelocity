import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ShortFooter from "../components/Footer2";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Container from "../screens/Container";
import { Typography } from "../../node_modules/@mui/material/index";
import { Grid } from "../../node_modules/@mui/material/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../node_modules/@mui/material/index";
import { TextField } from "../../node_modules/@mui/material/index";
const LoginCover = () => {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user:", res.profileObj);
    Cookies.set("firstName", res.profileObj.givenName);
    Cookies.set("lastName", res.profileObj.familyName);
    Cookies.set("email", res.profileObj.email);
    window.location.href = "/";
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res", res);
    toast.error("Google login Failed");
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const clientId =
    "149609675442-u05v44gi07gl7o9hj3tba534dqaa0mbi.apps.googleusercontent.com";
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [isGoogleLoginClicked, setIsGoogleLoginClicked] = React.useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const convertedEmail = email.toLowerCase();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://52.165.80.134:4000/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // Handle the response here (e.g., show a success message)
        console.log(response);
        const {
          user,
          resFirst,
          resLast,
          resEmail,
          resID,
          resAdmin,
          lendioJWT,
          lendioJwtExpiresIn,
        } = response.data;

        // Save the token and user data as cookies

        Cookies.set("firstName", resFirst);
        Cookies.set("lastName", resLast);
        Cookies.set("email", resEmail);
        Cookies.set("_id", resID);
        Cookies.set("isAdmin", resAdmin);
        Cookies.set("JWT", lendioJWT);
        Cookies.set("JWT_exp", lendioJwtExpiresIn);
        // window.location.href = "/loan-form-realestate";
        setTimeout(() => {
          window.location.href = redirect; // Full reload ensures updated cookies
        }, 100);
      })
      .catch((error) => {
        // Handle any errors here (e.g., show an error message)
        console.error("Error:", error);
        toast.error("Error Logging In. Try again Later.");
      });
  };
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

  const theme = useTheme();
  return (
    <div style={{ marginBottom: 30 }}>
      <ToastContainer />
      <Box
        sx={{
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <Container
          paddingX={0}
          paddingY={0}
          maxWidth={{ sm: 1, md: 1236 }}
          style={{ marginBottom: 100 }}
        >
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
                  <Box marginBottom={4}>
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: "medium",
                      }}
                      gutterBottom
                      variant="h4"
                      color={"text.secondary"}
                    >
                      Login
                    </Typography>

                    {/* <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Welcome back
                    </Typography> */}
                    <Typography color="text.secondary">
                      Login to manage your account.
                    </Typography>
                  </Box>
                  <form onSubmit={submitHandler}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Typography
                          variant={"subtitle2"}
                          sx={{ marginBottom: 2 }}
                        >
                          Enter your email
                        </Typography>
                        <TextField
                          label="Email *"
                          variant="outlined"
                          onSubmit={(e) =>
                            (e.target.value = (
                              "" + e.target.value
                            ).toLowerCase())
                          }
                          name={"email"}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          display="flex"
                          flexDirection={{ xs: "column", sm: "row" }}
                          alignItems={{ xs: "stretched", sm: "center" }}
                          justifyContent={"space-between"}
                          width={1}
                          marginBottom={2}
                        >
                          <Box marginBottom={{ xs: 1, sm: 0 }}>
                            <Typography variant={"subtitle2"}>
                              Enter your password
                            </Typography>
                          </Box>
                          <Typography variant={"subtitle2"}></Typography>
                        </Box>
                        <TextField
                          label="Password *"
                          variant="outlined"
                          name={"password"}
                          type={"password"}
                          fullWidth
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid item container xs={12}>
                        <Box
                          display="flex"
                          flexDirection={{ xs: "column", sm: "row" }}
                          alignItems={{ xs: "stretched", sm: "center" }}
                          justifyContent={"space-between"}
                          width={1}
                          maxWidth={600}
                          margin={"0 auto"}
                        >
                          <Box marginBottom={{ xs: 1, sm: 0 }}>
                            <Typography variant={"subtitle2"}>
                              <Link to="/register">
                                Don't have an account yet?{" "}
                                <strong>REGISTER HERE</strong>
                              </Link>
                            </Typography>
                          </Box>

                          <Box marginBottom={{ xs: 1, sm: 0 }}>
                            <Typography variant={"subtitle2"}>
                              <Link to="/forgot-password">
                                Forgot password? <strong>RESET</strong>
                              </Link>
                            </Typography>
                          </Box>

                          <Button
                            style={{ backgroundColor: "#498dd6" }}
                            size={"large"}
                            variant={"contained"}
                            type={"submit"}
                          >
                            Login
                          </Button>
                          {/*
                         
                          <GoogleLogin
                            clientId={clientId}
                            buttonText="Login Using Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={true}
                          />
                           */}
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Container>
            </Box>
            <Box
              sx={{
                flex: { xs: "0 0 100%", md: "0 0 50%" },
                position: "relative",
                maxWidth: { xs: "100%", md: "50%" },
                order: { xs: 1, md: 2 },
                minHeight: { xs: "auto", md: "calc(100vh - 58px)" },
              }}
            >
              <Box
                sx={{
                  width: { xs: 1, md: "50vw" },
                  height: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      overflow: "hidden",
                      left: "0%",
                      width: 1,
                      height: 1,
                      position: { xs: "relative", md: "absolute" },
                      clipPath: {
                        xs: "none",
                        md: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)",
                      },
                      shapeOutside: {
                        xs: "none",
                        md: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: { xs: "auto", md: 1 },
                        "& img": {
                          objectFit: "cover",
                        },
                        "& .lazy-load-image-loaded": {
                          height: 1,
                          width: 1,
                        },
                      }}
                    >
                      <Box
                        component={LazyLoadImage}
                        effect="blur"
                        src={
                          "https://images.pexels.com/photos/8296970/pexels-photo-8296970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        }
                        height={{ xs: "auto", md: 1 }}
                        maxHeight={{ xs: 300, md: 1 }}
                        width={1}
                        maxWidth={1}
                        sx={{
                          filter:
                            theme.palette.mode === "dark"
                              ? "brightness(0.7)"
                              : "none",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        {/* <ShortFooter /> */}
      </Box>
    </div>
  );
};

export default LoginCover;
