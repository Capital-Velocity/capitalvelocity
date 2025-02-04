import emailjs from "@emailjs/browser";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal"; // Import Modal from Material UI
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import Footer2 from "../components/Footer2";
import Container from "../screens/Container";
const ContactUs = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  const navigate = useNavigate();
  const form = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [captach, setCaptcha] = useState("");
  const [error, setError] = useState([]);
  const [find, findError] = useState("");
  const [timer, setTimer] = useState(null); // Store the timer
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [phoneNumber, setPhoneNumber] = useState(""); // State to store phone number

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      message: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      message: Yup.string().required("Message is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      // Send a POST request with form data to a server endpoint
      const dataToSend = {
        firstName: values.firstName,
        lastName: values.lastName,
        message: values.message,
      };
      console.log(dataToSend);
      emailjs
        .sendForm(
          "service_93rsoor",
          "template_y8orn3a",
          form.current,
          "QqP5gpDu3L3j2NB92"
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success("Thank you we will respond to you shortly.");
          },
          (error) => {
            toast.error("Error submitting form try again later.");
          }
        );
    },
  });

  const recaptachloaded = () => {
    setCaptcha("true");
  };

  const stickyPhoneButton = {
    position: "fixed",
    bottom: "16px",
    right: "16px",
    zIndex: "9999",
  };
  // Function to handle button click and show modal with phone number
  const handleButtonClick = () => {
    // Generate or fetch the phone number here
    const generatedPhoneNumber = "+1234567890"; // Replace with your phone number logic
    setPhoneNumber(generatedPhoneNumber);
    setShowModal(true); // Show the modal
  };

  return (
    <div>
      <ToastContainer />

      <Box minHeight={"100vh"} display={"flex"} marginTop={-13}>
        <Box flex={"1 1 30%"} maxWidth={"30%"} maxHeight={"100vh"} top={0}>
          <Box
            display={"flex"}
            alignItems={"center"}
            height={1}
            width={1}
            sx={{
              "& .lazy-load-image-loaded": {
                height: 1,
                width: 1,
              },
            }}
          >
            <Box
              component={LazyLoadImage}
              height={1}
              width={1}
              src={"https://assets.maccarianagency.com/backgrounds/img23.jpg"}
              alt="..."
              effect="blur"
              sx={{
                objectFit: "cover",
                "& .lazy-load-image-loaded": {
                  height: 1,
                },
              }}
            />
          </Box>
        </Box>
        <Box
          flex={{ xs: "1 1 100%", md: "1 1 70%" }}
          maxWidth={{ xs: "100%", md: "70%" }}
          paddingTop={14}
        >
          <Box height={1}>
            <Container>
              <Box maxWidth={600} margin={"0 auto"}>
                <Box marginBottom={4}>
                  <Typography
                    variant={"h3"}
                    sx={{ fontWeight: 700, color: "black" }}
                    align={"center"}
                    gutterBottom
                  >
                    Contact us
                  </Typography>
                  <Typography color="text.secondary" align={"center"}>
                    Message Capital Velocity with any question or concerns
                  </Typography>
                </Box>
                <Box>
                  <form ref={form} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          sx={{ height: 54 }}
                          label="First name"
                          variant="outlined"
                          color="primary"
                          size="medium"
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
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          sx={{ height: 54 }}
                          label="Last name"
                          variant="outlined"
                          color="primary"
                          size="medium"
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
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          sx={{ height: 54 }}
                          label="Email"
                          type="email"
                          variant="outlined"
                          color="primary"
                          size="medium"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Message"
                          multiline
                          rows={6}
                          variant="outlined"
                          color="primary"
                          size="medium"
                          name="message"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.message}
                          error={
                            formik.touched.message &&
                            Boolean(formik.errors.message)
                          }
                          helperText={
                            formik.touched.message && formik.errors.message
                          }
                          fullWidth
                        />
                      </Grid>

                      <Grid item container justifyContent={"center"} xs={12}>
                        <Button
                          sx={{ height: 54, minWidth: 150 }}
                          variant="contained"
                          style={{ backgroundColor: "#498dd6" }}
                          size="medium"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Grid>
                      <Grid item container justifyContent={"center"} xs={12}>
                        <Typography color="text.secondary">
                          We'll get back to you in 1-2 business days.
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
      {/* <Footer2 /> */}
      <Button
        sx={stickyPhoneButton}
        variant="contained"
        size="medium"
        onClick={handleButtonClick}
        style={{
          backgroundColor: "#498dd6",
          color: "white",
          borderRadius: "50%",
          width: "64px",
          height: "64px",
          fontSize: "1.5rem",
        }}
      >
        <LocalPhoneIcon />
      </Button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom style={{ color: "black" }}>
            Phone Number
          </Typography>
          <Typography variant="body2" style={{ color: "black" }}>
            Call us at : 702-570-9581
          </Typography>
          <Typography variant="body2" style={{ color: "black" }}>
            6565 Spencer St Suite 207 Las Vegas NV 89119
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ContactUs;
