import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import User from "../models/userModel.js";
const emailRouter = express.Router();
dotenv.config();
// SEND THE RESET PASSWORD
const mg = mailgun({
  apiKey: "032768b8a73ea019211af5bbf29108ef-3750a53b-d022c855",
  domain: "sandbox9bc8b50531c149729c9abf507ba74ca6.mailgun.org",
});

emailRouter.post("/forgotPassword", async (req, res, next) => {
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

emailRouter.get("/reset-password/:id/:token", async (req, res) => {
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

export default emailRouter;
