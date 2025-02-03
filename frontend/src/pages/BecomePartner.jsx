import { Button, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import ShortFooter from "../components/Footer2";
import Container from "../screens/Container";
const BecomePartner = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      homeAddress: "",
      city: "",
      zipCode: "",
      state: "",
      phone: "",
      email: "",
      referralCode: "",
      youtubeLink: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      homeAddress: Yup.string().required("Youtube Link is required"),
      youtubeLink: Yup.string().required("Youtube Link is required"),
      referralCode: Yup.string().required("Referral is required"),
      city: Yup.string().required("City is required"),
      zipCode: Yup.string().required("Zip Code is required"),
      state: Yup.string().required("State is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      // Send a POST request with form data to a server endpoint
      const dataToSend = {
        firstName: values.firstName,
        lastName: values.lastName,
        homeAddress: values.homeAddress,
        city: values.city,
        zipCode: values.zipCode,
        state: values.state,
        phone: values.phone,
        email: values.email,
        referralCode: values.referralCode,
        youtubeLink: values.youtubeLink,
        // Add more fields you want to include here
      };
      console.log(dataToSend);
      axios
        .post("https://3.139.67.124:8080/api/referrals/addReferral", dataToSend)
        .then((response) => {
          console.log(response);
          window.location.href = "/partner-success";
          toast.sucess("Thank you, we will reach out shortly");
        })
        .catch((error) => {
          toast.error("Error in form. Try again Later.");
          console.error(error);
        });
    },
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const clientId =
    "149609675442-u05v44gi07gl7o9hj3tba534dqaa0mbi.apps.googleusercontent.com";
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");

  const userSignin = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();

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
                      Become a Partner
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Apply here
                    </Typography>
                    <Typography color="text.secondary">
                      We will reach out with more details once we receive your
                      application
                    </Typography>
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
                          label="Home Address"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="homeAddress"
                          name="homeAddress"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.homeAddress}
                          error={
                            formik.touched.homeAddress &&
                            Boolean(formik.errors.homeAddress)
                          }
                          helperText={
                            formik.touched.homeAddress &&
                            formik.errors.homeAddress
                          }
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          label="City"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="city"
                          name="city"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.city}
                          error={
                            formik.touched.city && Boolean(formik.errors.city)
                          }
                          helperText={formik.touched.city && formik.errors.city}
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          label="Zip Code"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="zipCode"
                          name="zipCode"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.zipCode}
                          error={
                            formik.touched.zipCode &&
                            Boolean(formik.errors.zipCode)
                          }
                          helperText={
                            formik.touched.zipCode && formik.errors.zipCode
                          }
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          label="State"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="state"
                          name="state"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.state}
                          error={
                            formik.touched.state && Boolean(formik.errors.state)
                          }
                          helperText={
                            formik.touched.state && formik.errors.state
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
                          label="Youtube Link"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="youtubeLink"
                          name="youtubeLink"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.youtubeLink}
                          error={
                            formik.touched.youtubeLink &&
                            Boolean(formik.errors.youtubeLink)
                          }
                          helperText={
                            formik.touched.youtubeLink &&
                            formik.errors.youtubeLink
                          }
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          label="Ideal Referral Code"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          id="referralCode"
                          name="referralCode"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.referralCode}
                          error={
                            formik.touched.referralCode &&
                            Boolean(formik.errors.referralCode)
                          }
                          helperText={
                            formik.touched.referralCode &&
                            formik.errors.referralCode
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
                          <Button
                            style={{ backgroundColor: "#498dd6" }}
                            size={"large"}
                            variant={"contained"}
                            type={"submit"}
                          >
                            Apply
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

export default BecomePartner;
