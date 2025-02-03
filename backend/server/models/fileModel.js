import mongoose from "mongoose";

const fileModel = new mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  userEmail: String,
});

const File = mongoose.model("File", fileModel);

export default File;
