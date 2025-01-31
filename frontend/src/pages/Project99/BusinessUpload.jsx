import React, { useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CheckoutSteps from "./CheckoutSteps3";
import "react-toastify/dist/ReactToastify.css";

function BusinessUpload({ formData, setFormData, fieldErrors }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
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
      const email = Cookies.get("email");
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        const modifiedFileName = email + "_" + file.name;
        formData.append("file", file, modifiedFileName);
        console.log(modifiedFileName);
        await axios.post("https://3.139.67.124:8080/api/s3/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return modifiedFileName;
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      console.log("Uploaded Files:", uploadedFiles);

      // Reset selected files after upload
      setSelectedFiles([]);
      toast.success("Files uploaded successfully");
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

        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Please Upload Personal tax returns from the most recent three years
          and a Year of personal bank statement
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
                    {selectedFiles.length > 0 ? (
                      <div>
                        <ul>
                          {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
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

export default BusinessUpload;
