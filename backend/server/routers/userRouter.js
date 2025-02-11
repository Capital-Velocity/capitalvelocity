import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import User from "../models/userModel.js";

const userRouter = express.Router();

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

// // Register route (without the email check)
// userRouter.post(
//   "/register",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const { firstName, lastName, phone, email, password } = req.body;
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
      const { firstName, lastName, phone, email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email is already registered." });
      }

      const hashedPassword = bcrypt.hashSync(password, 8);

      const user = new User({
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
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
