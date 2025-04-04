import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import User from "../models/userModel.js";
import Referral from "../models/referralModel.js";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const userRouter = express.Router();

const apiKey = "6c4673b8f1605eb7e18a82f6e26e383f-667818f5-b0c6c379";
const mg = mailgun({ apiKey, domain: "capitalvelocity.com" });

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "31d" });
};

// Function to obtain the access token
async function getAccessToken() {
  try {
    const requestBody = JSON.stringify({
      grant_type: "client_credentials",
      client_id: "227",
      client_secret: "hqUIKotqZ5EDUvvcEoFV7lqLH5H1N8xT5cx5LKYZ",
    });

    const API_URL = "https://preview-api.lendio.com/oauth/token";

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post(API_URL, requestBody, { headers });
    const accessToken = response.data.access_token;
    const accessTokenExpir = new Date(Date.now() + 60 * 60 * 1000); // Expires in 1 hour

    return {
      accessToken,
      accessTokenExpir,
    };
  } catch (error) {
    console.error("API request error:", error);
    throw new Error("Failed to fetch access token");
  }
}

// // Function to obtain Lendio JWT
// userRouter.post("/login", async (req, res) => {
//   try {
//     console.log("in login route");

//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       // User not found
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     if (!bcrypt.compareSync(req.body.password, user.password)) {
//       // Password doesn't match
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error logging in. Try again later." });
//   }
// });

// Function to make an API request using the provided email.
async function getLendioJWT(email, accessToken) {
  try {
    const user = await User.findOne({ email });

    const API_URL = "https://preview-api.lendio.com/e/v1/user/token";
    const requestData = {
      user: {
        email: user.email,
        login: user.email,
        first: user.lastName,
        last: user.firstName,
      },
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(API_URL, requestData, { headers });

    const lendioJWT = response.data.data.jwt;
    const lendioJWTExpiresIn = new Date(Date.now() + 60 * 60 * 1000); // Expires in 1 hour

    return {
      lendioJWT,
      lendioJWTExpiresIn,
    };
  } catch (error) {
    console.error("API request error:", error);
    throw new Error("Failed to fetch Lendio JWT");
  }
}

// Seed route to insert users
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      // Remove all existing users if needed
      // await User.deleteMany({});
      const createdUsers = await User.insertMany(data.users);
      res.send({ createdUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error seeding users" });
    }
  })
);

// Login route
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const accessTokenObject = await getAccessToken();
      const lendioJWTObject = await getLendioJWT(
        user.email,
        accessTokenObject.accessToken
      );

      user.accessLendioToken = accessTokenObject.accessToken;
      user.accessLendioTokenExpires = accessTokenObject.accessTokenExpir;
      user.lendioJWT = lendioJWTObject.lendioJWT;
      user.lendioJWTExpires = lendioJWTObject.lendioJWTExpiresIn;

      await user.save();

      const responseData = {
        resFirst: user.firstName,
        resLast: user.lastName,
        resEmail: user.email,
        resID: user._id,
        resAdmin: user.isAdmin,
        lendioJWT: user.lendioJWT,
        lendioJwtExpiresIn: user.lendioJWTExpires,
      };

      res.json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in. Try again later." });
    }
  })
);

userRouter.post("/send-password-reset", async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a JWT token
    const resetToken = jwt.sign(
      { email }, // Payload contains the user's email
      process.env.SECRET, // Secret key for signing
      { expiresIn: "1h" } // Token valid for 1 hour
    );

    const resetUrl = `https://www.capitalvelocity.com/reset-password/${resetToken}`;

    // Send the reset email
    const data = {
      from: "Capital Velocity <info@capitalvelocity.com>",
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    mg.messages().send(data, (error, body) => {
      if (error) {
        return res.status(500).json({ error: "Error sending email." });
      }
      res
        .status(200)
        .json({ message: "Password reset email sent successfully!" });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Error processing request." });
  }
});

userRouter.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find user by email in the token payload
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password and update the user record
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Error resetting password:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Token has expired." });
    }

    res.status(400).json({ error: "Invalid token." });
  }
});

// userRouter.post(
//   "/register",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const { firstName, lastName, phone, email, password } = req.body;

//       // Check if the user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res
//           .status(400)
//           .json({ message: "Email is already registered." });
//       }

//       const hashedPassword = bcrypt.hashSync(password, 8);

//       const user = new User({
//         firstName,
//         lastName,
//         phone,
//         email,
//         password: hashedPassword,
//       });

//       const createdUser = await user.save();
//       const accessTokenObject = await getAccessToken();
//       const lendioJWTObject = await getLendioJWT(
//         user.email,
//         accessTokenObject.accessToken
//       );

//       user.accessLendioToken = accessTokenObject.accessToken;
//       user.accessLendioTokenExpires = accessTokenObject.accessTokenExpir;
//       user.lendioJWT = lendioJWTObject.lendioJWT;
//       user.lendioJWTExpires = lendioJWTObject.lendioJWTExpiresIn;

//       await user.save();

//       const responseData = {
//         resFirst: createdUser.firstName,
//         resEmail: createdUser.email,
//         resID: createdUser._id,
//         lendioJWT: user.lendioJWT,
//         lendioJwtExpiresIn: user.lendioJWTExpires,
//       };

//       res.json(responseData);
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ message: "Error registering user. Try again later." });
//     }
//   })
// );

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      const { firstName, lastName, phone, email, password, referralCode } =
        req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email is already registered." });
      }

      let codeOfPersonWhoReferred = null;

      // If referralCode is provided, check if it exists in the Referral collection
      if (referralCode) {
        const referrer = await Referral.findOne({ referralCode });
        if (!referrer) {
          return res.status(400).json({ message: "Invalid referral code." });
        }
        codeOfPersonWhoReferred = referralCode; // Save valid referral code
      }

      const hashedPassword = bcrypt.hashSync(password, 8);

      const user = new User({
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        codeOfPersonWhoReferred, // Save referral code
      });

      const createdUser = await user.save();
      const accessTokenObject = await getAccessToken();
      const lendioJWTObject = await getLendioJWT(
        user.email,
        accessTokenObject.accessToken
      );

      user.accessLendioToken = accessTokenObject.accessToken;
      user.accessLendioTokenExpires = accessTokenObject.accessTokenExpir;
      user.lendioJWT = lendioJWTObject.lendioJWT;
      user.lendioJWTExpires = lendioJWTObject.lendioJWTExpiresIn;

      await user.save();

      const responseData = {
        resFirst: createdUser.firstName,
        resLast: createdUser.lastName,
        resEmail: createdUser.email,
        resID: createdUser._id,
        lendioJWT: user.lendioJWT,
        lendioJwtExpiresIn: user.lendioJWTExpires,
      };

      res.json(responseData);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error registering user. Try again later." });
    }
  })
);

// Check token route
userRouter.post(
  "/checkToken",
  expressAsyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (
        !user ||
        !user.lendioJWT ||
        new Date(user.lendioJWTExpires) <= new Date()
      ) {
        const accessTokenObject = await getAccessToken();
        const lendioJWTObject = await getLendioJWT(
          user.email,
          accessTokenObject.accessToken
        );

        user.accessLendioToken = accessTokenObject.accessToken;
        user.accessLendioTokenExpires = accessTokenObject.accessTokenExpir;
        user.lendioJWT = lendioJWTObject.lendioJWT;
        user.lendioJWTExpires = lendioJWTObject.lendioJWTExpiresIn;

        await user.save();

        res.json(user.lendioJWT);
      } else {
        res.json({ lendioJWT: user.lendioJWT });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error checking token. Try again later." });
    }
  })
);

export default userRouter;
