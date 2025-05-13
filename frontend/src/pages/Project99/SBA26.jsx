import { Container, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SBA26({ formData, setFormData }) {
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
      const formDataUpload = new FormData();
      const email = Cookies.get("email");
      const modifiedFileName = email + "_" + selectedFile.name;
      formDataUpload.append("file", selectedFile, modifiedFileName);

      const response = await axios.post(
        "https://52.165.80.134:4000/api/s3/upload",
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedUrl = response.data.s3FilePath;

      toast.success("File uploaded successfully");

      // Append to uploadedDocuments in formData
      setFormData((prevData) => ({
        ...prevData,
        uploadedDocuments: [...(prevData.uploadedDocuments || []), uploadedUrl],
      }));

      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  return (
    <div style={{ width: "100%" }}>
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

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
              <Box component="main">
                <Typography variant="h5" style={{ color: "black" }}>
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

                {/* Display uploaded documents */}
                {formData.uploadedDocuments &&
                  formData.uploadedDocuments.length > 0 && (
                    <div style={{ marginTop: "20px", color: "black" }}>
                      <Typography variant="h6">Uploaded Documents:</Typography>
                      <ul>
                        {formData.uploadedDocuments.map((url, index) => (
                          <li key={index}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Document {index + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </Box>

              <Box mt={4}>
                <Typography variant="h6" color="black" gutterBottom>
                  Referral Code
                </Typography>
                <input
                  type="text"
                  placeholder="Enter referral code"
                  value={formData.referralCode || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      referralCode: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA26;
