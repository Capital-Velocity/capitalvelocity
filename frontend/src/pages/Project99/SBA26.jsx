import { Container, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutSteps from "./CheckoutSteps3";

function SBA26() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const dropzoneStyle = {
    border: "2px dashed black",
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
      await axios.post("https://52.165.80.134:4000/api/s3/upload", formData, {
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
    <div style={{ width: "100%" }}>
      {" "}
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <ToastContainer />
      <Container className="mt-20">
        <Typography variant="h4" color="black" gutterBottom>
          Uploading Documents
        </Typography>

        <Typography variant="h6" color="black" gutterBottom>
          Please upload the following documents:
        </Typography>

        <Typography variant="subtitle1" color="black" gutterBottom>
          - Purchase Contract
          <br />- Company Corporate Documentation
        </Typography>

        <Divider style={{ color: "black", marginBottom: 10 }} />

        {/* Centering the Grid Container */}
        <Grid
          container
          spacing={2}
          justifyContent="center" // This will center the content horizontally
        >
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
              <Box component="main">
                <Typography variant="h4" style={{ color: "black" }}>
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

export default SBA26;
