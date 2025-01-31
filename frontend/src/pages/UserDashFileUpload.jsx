import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import axios from "axios";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import Divider from "@mui/material/Divider";
import AntDesignSideBarUser from "../components/AntDesignSideBarUser";
import { Container } from "@mui/system";
const drawerWidth = 240;

function UserDashFileUpload(props) {
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
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

          <AntDesignSideBarUser />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
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
                <p>Drag & drop your file here, or click to select a file</p>
              )}
            </Container>
          </div>
        </Box>
      </Box>
    </div>
  );
}

UserDashFileUpload.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default UserDashFileUpload;
