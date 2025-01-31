import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageDropzone() {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        borderRadius: "5px",
        padding: "30px",
        textAlign: "center",
        background: isDragActive ? "#eee" : "#fff",
      }}
    >
      <input {...getInputProps()} />
      {image ? (
        <img src={image} style={{ maxWidth: "100%" }} alt="Uploaded" />
      ) : (
        <p
          style={{
            color: "grey",
            fontSize: "13px",
            fontWeight: "lighter",
          }}
        >
          Drag and drop an image or click to select a file
        </p>
      )}
    </div>
  );
}

export default ImageDropzone;
