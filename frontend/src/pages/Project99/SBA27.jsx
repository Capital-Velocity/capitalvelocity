import React, { useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import CheckoutSteps from "./CheckoutSteps3";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import UserDashFileUpload from "../../pages/UserDashFileUpload";
function SBA27() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const dropzoneStyle = {
    border: "2px dashed grey",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      const email = Cookies.get("email");
      const modifiedFileName = email + "_" + selectedFile.name;
      formData.append("file", selectedFile, modifiedFileName);
      console.log(modifiedFileName);
      await axios.post("https://3.139.67.124:8080/api/s3/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("File uploaded successfully");
      setSelectedFile(null); // Clear the selected file
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };
  return (
    <div>
      <ToastContainer />
      <CheckoutSteps step1 step2 step3 />
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Uploading Documents Personal Files
        </Typography>

        <Typography variant="p" style={{ fontWeight: "bold" }}>
          Please Upload the following documents : Business tax returns from the
          most recent three years (if applicable),Year of business bank
          statement (if applicable), Most recent Business and projected balance
          sheets (if applicable),Business Income statement and cash flow
          statement (if applicable),Schedule of business debts (if applicable)
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
              <Box component="main">
                <Typography variant="h4" style={{ color: "grey" }}>
                  Upload Documents
                </Typography>

                <Divider />
                <div>
                  <Container {...getRootProps()} style={dropzoneStyle}>
                    <input {...getInputProps()} />
                    {selectedFile ? (
                      <div>
                        <p>Selected File: {selectedFile.name}</p>
                        <button onClick={handleUpload}>Upload</button>
                      </div>
                    ) : (
                      <p>
                        Drag & drop your file here, or click to select a file
                      </p>
                    )}
                  </Container>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA27;
