import express from "express";
import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "uploads";

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
          if (!req.file) {
                  return res.status(400).json({ message: "No file uploaded" });
          }

      const timestamp = Date.now();
          const ext = path.extname(req.file.originalname);
          const baseName = path.basename(req.file.originalname, ext);
          const blobName = `${baseName}_${timestamp}${ext}`;

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
          await blockBlobClient.upload(req.file.buffer, req.file.buffer.length, {
                  blobHTTPHeaders: { blobContentType: req.file.mimetype },
          });

      const s3FilePath = blockBlobClient.url;

      return res.status(200).json({
              message: "File uploaded to Azure Blob Storage",
              s3FilePath: s3FilePath,
      });
    } catch (error) {
          console.error("File upload error:", error);
          res.status(500).json({ 
                                     message: "File upload failed",
                  error: error.message 
          });
    }
});

export default router;
