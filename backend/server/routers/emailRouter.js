import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import User from "../models/userModel.js";
const emailRouter = express.Router();
dotenv.config();
// // SEND THE RESET PASSWORD
// Old mailgun apikey and domain?
// const mg = mailgun({
//   apiKey: "032768b8a73ea019211af5bbf29108ef-3750a53b-d022c855",
//   domain: "sandbox9bc8b50531c149729c9abf507ba74ca6.mailgun.org",
// });

const mg = mailgun({
  apiKey: "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379",
  domain: "capitalvelocity.com",
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

// Contact form submission route
emailRouter.post("/send-confirm", (req, res) => {
  const { addressData, paymentData } = req.body;

  const emailData = {
    from: `info@capitalvelocity.com`,
    to: addressData.email || "default@example.com", // You can use a default email if none is provided
    subject: "Thank You for Your Application!",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .content {
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 20px;
              background-color: #04ca31;
              color: #fff;
              text-decoration: none;
              font-weight: bold;
              border-radius: 4px;
              text-align: center;
            }
            .social-icons {
              text-align: center;
              margin: 20px 0;
            }
            .social-icons img {
              width: 30px;
              margin: 0 10px;
              cursor: pointer;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>

          <div class="email-container">
            <div class="header">
              <img src="https://i.ibb.co/DSD7bkB/cvlogo.png" alt="Transaction Room Logo" style="width: 300px; display: block; margin: 0 auto;">
              <h2>Thank You for Your Application!</h2>
            </div>
            <div class="content">
              <p>We’ve received your application and truly appreciate your interest.</p>
              <p>Our team will review your application and get back to you as soon as possible.</p>
              
              <!-- Address Details Section -->
              <h3>Contact Information</h3>
              <p><strong>First Name:</strong> ${
                addressData.firstName || "Not Provided"
              }</p>
              <p><strong>Last Name:</strong> ${
                addressData.lastName || "Not Provided"
              }</p>
              <p><strong>Business Name:</strong> ${
                addressData.businessName || "Not Provided"
              }</p>
              <p><strong>Email:</strong> ${
                addressData.email || "Not Provided"
              }</p>
              <p><strong>Business Phone:</strong> ${
                addressData.businessPhone || "Not Provided"
              }</p>
              <p><strong>Mobile Phone:</strong> ${
                addressData.mobilePhone || "Not Provided"
              }</p>

              <!-- Payment Details Section -->
              <h3>Details & Financials</h3>
              <p><strong>Credit Score:</strong> ${
                paymentData.creditScore || "Not Provided"
              }</p>
              <p><strong>Industry:</strong> ${
                paymentData.industry || "Not Provided"
              }</p>
              <p><strong>Time In Business:</strong> ${
                paymentData.timeInBusiness || "xxxx-xxxx-xxxx-xxxx"
              }</p>
              <p><strong>Annual Sales:</strong> ${
                paymentData.annualSales || "MM/YYYY"
              }</p>
              <p><strong>Product:</strong> ${
                paymentData.product || "MM/YYYY"
              }</p>

              <div style="text-align: center; margin-top: 20px;">
                <a href="https://www.capitalvelocity.com/" class="button">Explore Our Website</a>
              </div>
            </div>
            <div class="social-icons">
              <a href="https://facebook.com/Andrew-Cartwright-188861491183022" target="_blank"><img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook"></a>
              <a href="https://twitter.com" target="_blank"><img src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000" alt="Twitter X"></a>
              <a href="https://www.linkedin.com/company/dragons-and-angels/about/" target="_blank"><img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn"></a>
              <a href="https://www.youtube.com/@andrewcartwright" target="_blank"><img src="https://img.icons8.com/color/48/youtube-play.png" alt="YouTube"></a>
            </div>
            <div class="footer">
              <img src="https://i.ibb.co/DSD7bkB/cvlogo.png" alt="Capital Velocity Logo" style="width: 200px; display: block; margin: 0 auto;">
              <p>© 2025 Capital Velocity</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  mg.messages().send(emailData, (error, body) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send message" });
    }
    console.log("Email sent:", body);
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

// Contact form submission route
emailRouter.post("/send-rok-affiliate", (req, res) => {
  const { addressData } = req.body;

  const emailData = {
    from: `info@capitalvelocity.com`,
    to: addressData.email || "default@example.com", // You can use a default email if none is provided
    subject: "Thank You for Your Application!",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .content {
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 20px;
              background-color: #04ca31;
              color: #fff;
              text-decoration: none;
              font-weight: bold;
              border-radius: 4px;
              text-align: center;
            }
            .social-icons {
              text-align: center;
              margin: 20px 0;
            }
            .social-icons img {
              width: 30px;
              margin: 0 10px;
              cursor: pointer;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>

          <div class="email-container">
            <div class="header">
              <img src="https://i.ibb.co/DSD7bkB/cvlogo.png" alt="Transaction Room Logo" style="width: 300px; display: block; margin: 0 auto;">
              <h2>Thank You for Your Application!</h2>
            </div>
            <div class="content">
              <p>We’ve received your application and truly appreciate your interest.</p>
              <p>Our team will review your application and get back to you as soon as possible.</p>
              
              <!-- Address Details Section -->
              <h3>Contact Information</h3>
              <p><strong>First Name:</strong> ${
                addressData.firstName || "Not Provided"
              }</p>
              <p><strong>Last Name:</strong> ${
                addressData.lastName || "Not Provided"
              }</p>
              <p><strong>Mobile Phone:</strong> ${
                addressData.mobilePhone || "Not Provided"
              }</p>
              <p><strong>Email:</strong> ${
                addressData.email || "Not Provided"
              }</p>
              <p><strong>Business Name:</strong> ${
                addressData.businessName || "Not Provided"
              }</p>
              <p><strong>Job Title:</strong> ${
                addressData.jobTitle || "Not Provided"
              }</p>
              <p><strong>Website:</strong> ${
                addressData.website || "Not Provided"
              }</p>
              <p><strong>Business Phone:</strong> ${
                addressData.businessPhone || "Not Provided"
              }</p>


              <div style="text-align: center; margin-top: 20px;">
                <a href="https://www.capitalvelocity.com/" class="button">Explore Our Website</a>
              </div>
            </div>
            <div class="social-icons">
              <a href="https://facebook.com/Andrew-Cartwright-188861491183022" target="_blank"><img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook"></a>
              <a href="https://twitter.com" target="_blank"><img src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000" alt="Twitter X"></a>
              <a href="https://www.linkedin.com/company/dragons-and-angels/about/" target="_blank"><img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn"></a>
              <a href="https://www.youtube.com/@andrewcartwright" target="_blank"><img src="https://img.icons8.com/color/48/youtube-play.png" alt="YouTube"></a>
            </div>
            <div class="footer">
              <img src="https://i.ibb.co/DSD7bkB/cvlogo.png" alt="Capital Velocity Logo" style="width: 200px; display: block; margin: 0 auto;">
              <p>© 2025 Capital Velocity</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  mg.messages().send(emailData, (error, body) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send message" });
    }
    console.log("Email sent:", body);
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

export default emailRouter;
