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
import { Helmet } from "react-helmet";
const generateReferralCode = (firstName) => {
  const randomNumbers = Math.floor(10000 + Math.random() * 90000); // Generates 5 random digits
  return `${firstName.toUpperCase()}${randomNumbers}`;
};

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
      // youtubeLink: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      homeAddress: Yup.string().required("Home Address is required"),
      // youtubeLink: Yup.string().required("Youtube Link is required"),
      city: Yup.string().required("City is required"),
      zipCode: Yup.string().required("Zip Code is required"),
      state: Yup.string().required("State is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      let referralCode = generateReferralCode(values.firstName);

      const dataToSend = {
        ...values,
        referralCode,
      };

      // console.log("dataToSend: ", dataToSend);

      try {
        const response = await axios.post(
          "https://52.165.80.134:4000/api/referrals/addReferral",
          dataToSend
        );

        console.log(response);
        toast.success(
          "Thank you, please check your email for your affiliate code."
        );
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message); // Display "Email already registered" error
        } else {
          toast.error("Error in form submission. Try again later.");
        }
        console.error(error);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Become a Capital Velocity Partner | CapitalVelocity.com</title>
        <meta
          name="description"
          content="Partner with Capital Velocity and earn referral income by helping businesses secure fast and flexible funding. Submit your application to get started."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/become-partner"
        />
        <meta name="robots" content="index, follow" />

        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Become a Partner",
      "url": "https://www.capitalvelocity.com/become-partner",
      "description": "Join the Capital Velocity Partner Program. Refer clients and earn commissions while helping businesses get the funding they need.",
      "publisher": {
        "@type": "Organization",
        "name": "Capital Velocity",
        "url": "https://www.capitalvelocity.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.capitalvelocity.com/assets/cvlogo-BWrm997-.png"
        }
      }
    }
    `}
        </script>
      </Helmet>
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
                        Become an Affiliate Partner
                      </Typography>

                      {/* <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        Apply here
                      </Typography> */}
                      <Typography color="text.primary">
                        Looking for an opportunity to{" "}
                        <strong>work with us</strong> and help make
                        <strong> people’s dreams come true</strong>? Join our{" "}
                        <strong>affiliate program</strong> and
                        <strong> earn rewards</strong> for connecting others to
                        the financing they need.
                        <br />
                        <br />
                        As an affiliate, you’ll earn{" "}
                        <strong>$500 for every funded loan</strong> that comes
                        from the leads you refer to us. Simply send{" "}
                        <strong>qualified leads</strong> our way — once their
                        loan is successfully funded, you’ll{" "}
                        <strong>receive your payment</strong>.
                        <br />
                        <br />
                        It’s a <strong>win-win</strong>: you help clients get
                        the financing they need, and we reward you for your
                        partnership.
                        <br />
                        <br />
                        <strong>
                          Complete the form below to receive your affiliate
                          code. Make sure to share this code with all of your
                          leads, and ask them to include it in any Capital
                          Velocity loan applications. Also, remind them to
                          mention your code in any communications with Capital
                          Velocity staff.
                        </strong>
                      </Typography>
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
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
                              formik.touched.firstName &&
                              formik.errors.firstName
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                            helperText={
                              formik.touched.city && formik.errors.city
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                              formik.touched.state &&
                              Boolean(formik.errors.state)
                            }
                            helperText={
                              formik.touched.state && formik.errors.state
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                              formik.touched.phone &&
                              Boolean(formik.errors.phone)
                            }
                            helperText={
                              formik.touched.phone && formik.errors.phone
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                              formik.touched.email &&
                              Boolean(formik.errors.email)
                            }
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                          />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
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
                        </Grid> */}
                        <Grid item sm={12}>
                          <Button
                            style={{ backgroundColor: "#498dd6" }}
                            size={"large"}
                            variant={"contained"}
                            type={"submit"}
                          >
                            Apply
                          </Button>
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
                          src={
                            "https://images.pexels.com/photos/16282306/pexels-photo-16282306/free-photo-of-a-person-using-a-calculator.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          }
                          height={{ xs: "auto", md: 1 }}
                          maxHeight={{ xs: 300, md: 1 }}
                          width={1}
                          maxWidth={1}
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
    </>
  );
};

export default BecomePartner;
