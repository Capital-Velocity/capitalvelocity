// s3UploadRouter.js
import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const router = express.Router();

const s3 = new aws.S3({
  credentials: {
    accessKeyId: "AKIAUBPXGEZHOILJNC7A",
    secretAccessKey: "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",
  },
  region: "us-east-2",
});

// Middleware to capture folderName from the request body
const captureFolderName = (req, res, next) => {
  req.folderName = req.body.folderName;
  next();
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "capital-uploads",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileNameWithoutExtension = file.originalname.split("_")[0];
      console.log(fileNameWithoutExtension);

      // Construct the key using the folderName and file details
      const key = `${fileNameWithoutExtension}/${Date.now()}_${
        file.originalname
      }`;
      cb(null, key);
    },
  }),
});

router.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    // The file has been uploaded to your S3 bucket.
    const s3FilePath = req.file.location; // This will contain the S3 file path.
    res.status(200).json({ message: "File uploaded to S3", s3FilePath });
  } else {
    // Something went wrong, return a 500 status code.
    res.status(500).json({ message: "File upload failed" });
  }
});

export default router;
