import * as https from "https";
import * as http from "http";
import bcrypt from "bcryptjs";
import { Server } from "socket.io";
import expressAsyncHandler from "express-async-handler";
import express, { response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import cors from "cors";
import multer from "multer";
import userRouter from "./routers/userRouter.js";
import referralRouter from "./routers/referralRouter.js";
import s3UploadRouter from "./routers/s3UploadRouter.js";
import calcFormRouter from "./routers/calcFormRouter.js";
// MODELS
import User from "./models/userModel.js";
import FixForm from "./models/fixandFlipModel.js";
import GroundUp from "./models/groundUpModel.js";
import MultiFam from "./models/multiFamModel.js";
import Rental from "./models/rentalModel.js";
import Sba from "./models/sbaModel.js";
import Project99 from "./models/project99Model.js";
import SingleProperty from "./models/singlePropertyModel.js";
import StableBridge from "./models/stabilizedbridgeModel.js";
import fixandflipRouter from "./routers/fixandFlipRouter.js";
import emailRouter from "./routers/emailRouter.js";
import groundupRouter from "./routers/groundUpRouter.js";
import multiFamRouter from "./routers/multiFamRouter.js";
import rentalRouter from "./routers/rentalRouter.js";
import singlePropertyRouter from "./routers/singlePropertyRouter.js";
import stabalizedRouter from "./routers/stabalizedRouter.js";
import project99Router from "./routers/project99Router.js";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import sbaRouter from "./routers/sbaRouter.js";
dotenv.config();

const app = express();

const file = fs.readFileSync("./CA998AD09433FF13233BE933E665A870.txt");
const key = fs.readFileSync("private.key");
const cert = fs.readFileSync("certificate.crt");

const cred = {
  key,
  cert,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://eng:Rohanna01$$@cluster0.4ox0i0i.mongodb.net/?retryWrites=true&w=majority"
);

app.get(
  "/.well-known/pki-validation/CA998AD09433FF13233BE933E665A870.txt",
  (req, res) => {
    res.sendFile("/home/ubuntu/server/CA998AD09433FF13233BE933E665A870.txt");
  }
);
app.use("/api/users", userRouter);
app.use("/api/referrals", referralRouter);
app.use("/api/sba", sbaRouter);
app.use("/api/fixandFlip", fixandflipRouter);
app.use("/api/groundUp", groundupRouter);
app.use("/api/multifam", multiFamRouter);
app.use("/api/rental", rentalRouter);
app.use("/api/calculatorContact", calcFormRouter);
app.use("/api/singleProperty", singlePropertyRouter);
app.use("/api/stabilizedBridge", stabalizedRouter);
app.use("/api/emailRouter", emailRouter);
app.use("/api/project99", project99Router);
// Use the uploadRouter for handling file upload requests
app.use("/api/s3", s3UploadRouter);
const __dirname = path.resolve();

// const port = process.env.PORT || 4000;
//const port = process.env.PORT || 3001;

// const httpServer = http.createServer(cred, app);
// httpServer.listen(port, () => {
//   console.log(`Serve at https://localhost:${port}`);
// });

// // https server, used in production
const httpServer = https.createServer(cred, app);
httpServer.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});

// SEND THE RESET PASSWORD
const mg = mailgun({
  apiKey: "032768b8a73ea019211af5bbf29108ef-3750a53b-d022c855",
  domain: "sandbox9bc8b50531c149729c9abf507ba74ca6.mailgun.org",
});

app.post("/api/forgot-password", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // make sure the user exists
  if (!user) {
    res.send({ message: "This email does not exist in our records" });
    return;
  }
  //user exits and send back a one time link
  const token = jwt.sign({ _id: user.id }, process.env.RESET_PASSWORD_KEY, {
    expiresIn: "20m",
  });
  // now we need to get the link from this token
  const link = `https://18.224.30.53:8080/reset-password/${user.id}/${token}`;
  console.log(link);

  const data = {
    from: "noreply@capitalvelocity.com",
    to: user.email,
    subject: "Forgot Password",
    html: ` <h2> Please click on given link to reset your password'</h2>
      <p>${link} </p>
      `,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.json({
        error: error.message,
      });
    }
    return res.json({
      message: "Email has been sent, kindly follow the instructions",
    });
  });
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findById(req.params.id);
  res.send(`<!DOCTYPE html>
  <html>
    <head>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          min-height: 100vh;
          background: #eee;
          display: flex;
          font-family: sans-serif;
        }
        .container {
          margin: auto;
          width: 500px;
          max-width: 90%;
        }
        .container form {
          width: 100%;
          height: 100%;
          padding: 20px;
          background: white;
          border-radius: 4px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
        .container form h1 {
          text-align: center;
          margin-bottom: 24px;
          color: #222;
        }
        .container form .form-control {
          width: 100%;
          height: 40px;
          background: white;
          border-radius: 4px;
          border: 1px solid silver;
          margin: 10px 0 18px 0;
          padding: 0 10px;
        }
        .container form .btn {
          margin-left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 34px;
          color: white;
          border: none;
          outline: none;
          background-color: #00A51E;
          cursor: pointer;
          font-size: 16px;
          text-transform: uppercase;
          border-radius: 4px;
          transition: 0.3s;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <form action="" method="post">
          <h1>Reset Email for ${user.email}</h1>
          <div class="form-group">
            <label for="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
            />
          </div>
  
          <input type="submit" class="btn" value="Reset" />
        </form>
      </div>
    </body>
  </html>
  
  `);
  console.log(user.email);
  console.log(user.password);
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findById(req.params.id);
  console.log(user.name);
  if (req.body.password) {
    user.password = bcrypt.hashSync(req.body.password, 8);
  }
  const updatedUser = await user.save();

  res.send(`<!DOCTYPE html>
  <html>
    <head>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          min-height: 100vh;
          background: #eee;
          display: flex;
          font-family: sans-serif;
        }
        .container {
          margin: auto;
          width: 500px;
          max-width: 90%;
        }
        .container form {
          width: 100%;
          height: 100%;
          padding: 20px;
          background: white;
          border-radius: 4px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
        .container form h1 {
          text-align: center;
          margin-bottom: 24px;
          color: #222;
        }
        .container form .form-control {
          width: 100%;
          height: 40px;
          background: white;
          border-radius: 4px;
          border: 1px solid silver;
          margin: 10px 0 18px 0;
          padding: 0 10px;
        }
        .container form .btn {
          margin-left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 34px;
          color: white;
          border: none;
          outline: none;
          background-color: #2673c9;
          cursor: pointer;
          font-size: 16px;
          text-transform: uppercase;
          border-radius: 4px;
          transition: 0.3s;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <form action="" method="post">
          <h1>Password has been Reset</h1>
          <div class="form-group"></div>
  
          <a href="https://capitalvelocity.com/login">
            <input type="button" class="btn" value="Go to Website" />
          </a>
        </form>
      </div>
    </body>
  </html>
  `);

  console.log(user.email);
  console.log(user.password);
});

app.post("/search/:email", async (req, res) => {
  const emailToFind = req.params.email;
  const matchingEntries = [];

  const models = [
    { model: FixForm, name: "Fix and Flip" },
    { model: Sba, name: "Sba" },
    { model: GroundUp, name: "Ground Up" },
    { model: MultiFam, name: "Multi Family" },
    { model: Rental, name: "Rental" },
    { model: SingleProperty, name: "Single Property" },
    { model: StableBridge, name: "Stable Bridge" },
    { model: StableBridge, name: "Stable Bridge" },
    { model: Project99, name: "Project99" },
  ];

  try {
    for (const { model, name } of models) {
      const entries = await model.find({ userEmail: emailToFind });
      const entriesWithModel = entries.map((entry) => ({
        ...entry.toObject(),
        model: name,
      }));
      matchingEntries.push(...entriesWithModel);
    }

    res.json({ matchingEntries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for entries." });
  }
});
