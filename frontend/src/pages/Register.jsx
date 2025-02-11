import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signin } from "../actions/userActions";
import axios from "axios";
import Cookies from "js-cookie";
import ShortFooter from "../components/Footer2";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Container from "../screens/Container";
import { Typography } from "../../node_modules/@mui/material/index";
import { Grid } from "../../node_modules/@mui/material/index";
import { Button } from "../../node_modules/@mui/material/index";
import { TextField } from "../../node_modules/@mui/material/index";
import { useFormik } from "formik";
import * as Yup from "yup";
const LoginCover = () => {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user:", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res", res);
  };
  const { referralCode } = useParams();
  const [isValidReferral, setIsValidReferral] = useState(false);
  const [validCode, setValidCode] = useState(false);

  useEffect(() => {
    // Make an API request to check if the referral code exists in the database
    axios
      .get(
        `https://52.165.80.134:4000/api/referrals/check-referral-code/${referralCode}`
      )
      .then((response) => {
        console.log(response);
        setIsValidReferral(response.data.isValid);
        if (response.data.isValid == true) {
          setValidCode(referralCode);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [referralCode]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
          "Password must contain at least one capital letter and one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const dataToSend = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        password: values.password,
        referralCode: validCode,
      };

      try {
        const response = await axios.post(
          "https://52.165.80.134:4000/api/users/register",
          dataToSend
        );

        const {
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

        window.location.href = "/loan-form-realestate";
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;

          // Check for the specific email already registered error message
          if (errorMessage === "Email is already registered.") {
            toast.error(
              "The email address is already registered. Please visit the login page to access your account."
            );
          } else {
            toast.error(errorMessage || "An error occurred.");
          }

          setErrors({ email: errorMessage });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPasswordVisibility = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const clientId =
    "149609675442-u05v44gi07gl7o9hj3tba534dqaa0mbi.apps.googleusercontent.com";
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const convertedEmail = email.toLowerCase();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/originalFind", {
        email: email,
      })
      .then((res) => {
        localStorage.setItem("applicationInfo", JSON.stringify(res.data.user));
        console.log(res.data.user);
      })
      .catch((err) => {
        if (err) {
          console.log(error);
        }
      });

    dispatch(signin(convertedEmail, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const theme = useTheme();
  return (
    <div>
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
          style={{ marginBottom: 120 }}
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
                      Register AN Account
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
                      Create a free account to unlock exclusive access to all
                      our features and start enjoying the full experience today!
                    </Typography>
                    {isValidReferral && (
                      <p style={{ color: "darkgreen" }}>
                        Referral Code: {referralCode}
                      </p>
                    )}
                    {/* Other registration form fields */}
                  </Box>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4}>
                      <Grid item sm={6}>
                        <TextField
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="firstName"
                          name="firstName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firstName}
                          error={
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                          }
                          helperText={
                            formik.touched.firstName && formik.errors.firstName
                          }
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="lastName"
                          name="lastName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastName}
                          error={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                          }
                          helperText={
                            formik.touched.lastName && formik.errors.lastName
                          }
                        />
                      </Grid>

                      <Grid item sm={6}>
                        <TextField
                          label="Phone"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="phone"
                          name="phone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                          error={
                            formik.touched.phone && Boolean(formik.errors.phone)
                          }
                          helperText={
                            formik.touched.phone && formik.errors.phone
                          }
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          label="Email"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="email"
                          name="email"
                          type="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          label="Password"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="password"
                          name="password"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          label="Confirm Password"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmPassword}
                          error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                          }
                          helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                          }
                        />
                      </Grid>
                      {/*Another Field  */}
                      <Grid item container sm={12}>
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
                              <Link to="/login">
                                Already have an account ? Login
                              </Link>
                            </Typography>
                          </Box>
                          <Button
                            style={{ backgroundColor: "#498dd6" }}
                            size={"large"}
                            variant={"contained"}
                            type={"submit"}
                          >
                            Register
                          </Button>
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
                          "https://images.pexels.com/photos/16282306/pexels-photo-16282306/free-photo-of-a-person-using-a-calculator.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
        <ShortFooter />
      </Box>
    </div>
  );
};

export default LoginCover;
