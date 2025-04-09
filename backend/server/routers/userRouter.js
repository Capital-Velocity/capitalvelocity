import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import axios from "axios";
import User from "../models/userModel.js";
import Referral from "../models/referralModel.js";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import EmailLog from "../models/emailLogModel.js";

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

// userRouter.post(
//   "/send-notification",
//   expressAsyncHandler(async (req, res) => {
//     const { email, page } = req.body;

//     if (!email || !page) {
//       return res.status(400).json({ message: "Email and page are required" });
//     }

//     //   const emailData = {
//     //     from: "Capital Velocity <no-reply@capitalvelocity.com>",
//     //     to: email,
//     //     subject: "Need help completing your loan application?",
//     //     html: `
//     // <div style="background-color: #f2f2f2; padding: 40px 0;">
//     //   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; color: #333;">
//     //     <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
//     //       <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
//     //     </div>

//     //     <h2 style="color: #2a2a2a;">Hi there,</h2>
//     //     <p style="font-size: 16px; line-height: 1.6;">
//     //       We noticed that you started a <strong>business loan application</strong> on our website but didn't complete it.
//     //     </p>
//     //     <p style="font-size: 16px; line-height: 1.6;">
//     //       If you have any questions or need assistance, we're here to help! You can schedule a time with one of our loan specialists to get personalized guidance.
//     //     </p>

//     //     <div style="text-align: center; margin: 30px 0;">
//     //       <a href="https://calendly.com/your-link" style="background-color: #0d6efd; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
//     //         Schedule a Meeting
//     //       </a>
//     //     </div>

//     //     <p style="font-size: 14px; color: #777;">
//     //       You visited: <em>${page}</em>
//     //     </p>

//     //     <hr style="margin: 30px 0;" />

//     //     <p style="font-size: 12px; color: #999; margin-top: 20px; text-align: center;">
//     //       © 2025 Capital Velocity, All rights reserved.
//     //     </p>
//     //   </div>
//     // </div>
//     //     `,
//     //   };

//     const emailData = {
//       from: "Capital Velocity <no-reply@capitalvelocity.com>",
//       to: email,
//       subject: "Have a real estate property in mind?",
//       html: `
//       <div style="background-color: #f2f2f2; padding: 40px 0;">
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; color: #333;">
//           <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
//             <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
//           </div>

//           <h2 style="color: #2a2a2a;">Hi there,</h2>
//           <p style="font-size: 16px; line-height: 1.6;">
//             We noticed you recently used one of our real estate calculators. That's a great first step!
//           </p>
//           <p style="font-size: 16px; line-height: 1.6;">
//             Do you already have a property in mind, or are you actively exploring options? We’d love to hear more and help you evaluate your financing opportunities.
//           </p>
//           <p style="font-size: 16px; line-height: 1.6;">
//             Schedule a free call with our team to talk through your options and get personalized guidance:
//           </p>

//           <div style="text-align: center; margin: 30px 0;">
//             <a href="https://calendly.com/your-link" style="background-color: #0d6efd; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
//               Book a Meeting
//             </a>
//           </div>

//         <p style="font-size: 14px; color: #777;">
//           You visited: <em>${page}</em>
//         </p>

//           <hr style="margin: 30px 0;" />

//           <p style="font-size: 12px; color: #999; text-align: center;">
//             © 2025 Capital Velocity, All rights reserved.
//           </p>
//         </div>
//       </div>
//     `,
//     };

//     try {
//       const body = await mg.messages().send(emailData);
//       res.send({ success: true, id: body.id });
//     } catch (err) {
//       console.error("Mailgun error:", err);
//       res.status(500).json({ message: "Failed to send email" });
//     }
//   })
// );

// Helper function to customize email content by purpose
function getEmailContent(purpose, page) {
  switch (purpose) {
    case "dscicalculator":
      return {
        subject: "Used our DSCR Calculator? Let's chat.",
        heading: "Thanks for trying our DSCR Calculator!",
        message1:
          "We noticed that you used our DSCR calculator — that’s a great first step toward evaluating your investment property.",
        message2:
          "Do you have a specific property in mind? Our team can help walk you through financing options and answer any questions.",
        message3:
          "Schedule a free call with our team to get personalized guidance:",
      };
    case "fixandflip":
      return {
        subject: "Used our Fix and Flip Calculator? Let's chat.",
        heading: "Thanks for trying our Fix and Flip Calculator!",
        message1:
          "We noticed that you used our Fix and Flip calculator — that’s a great first step toward evaluating your investment property.",
        message2:
          "Do you have a specific property in mind? Our team can help walk you through financing options and answer any questions.",
        message3:
          "Schedule a free call with our team to get personalized guidance:",
      };
    case "dscroptimizer":
      return {
        subject: "Used our Rental DSCR Optimizer? Let's chat.",
        heading: "Thanks for trying our Rental DSCR Optimizer!",
        message1:
          "We noticed that you used our Rental DSCR Optimizer calculator — that’s a great first step toward evaluating your investment property.",
        message2:
          "Do you have a specific property in mind? Our team can help walk you through financing options and answer any questions.",
        message3:
          "Schedule a free call with our team to get personalized guidance:",
      };
    case "loanform":
      return {
        subject: "Need help completing your loan application?",
        heading: "Hi there,",
        message1:
          "We noticed that you started a business loan application on our website but didn't complete it.",
        message2:
          "If you have any questions or need assistance, we're here to help!",
        message3:
          "You can schedule a time with one of our loan specialists to get personalized guidance:",
      };
    default:
      return {
        subject: "We’re here to help!",
        heading: "Hi there,",
        message1: "Thanks for visiting our site.",
        message2:
          "If there’s anything we can assist you with, feel free to reach out.",
        message3: "You can also book a time with us below:",
      };
  }
}

// Route
userRouter.post(
  "/send-notification",
  expressAsyncHandler(async (req, res) => {
    const { email, page, purpose = "general" } = req.body;

    if (!email || !page) {
      return res.status(400).json({ message: "Email and page are required" });
    }

    // Check for recent email log (within cooldown period)
    const cooldownDays = 14;
    const cutoffDate = new Date(
      Date.now() - cooldownDays * 24 * 60 * 60 * 1000
    );

    const recentLog = await EmailLog.findOne({
      email,
      purpose,
      sentAt: { $gte: cutoffDate },
    });

    if (recentLog) {
      return res.status(200).json({ message: "Email already sent recently" });
    }

    // Get dynamic email content
    const { subject, heading, message1, message2, message3 } = getEmailContent(
      purpose,
      page
    );

    // Build HTML email
    const emailData = {
      from: "Capital Velocity <no-reply@capitalvelocity.com>",
      to: email,
      subject: "Let’s move your deal forward — book your free call",
      html: `
    <div style="background-color: #f2f2f2; padding: 40px 0;">
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; color: #333;">
        <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
          <img src="https://i.imgur.com/rOpYlNu.png" alt="Capital Velocity" style="height: 160px;" />
        </div>

        <h2 style="color: #2a2a2a;">Hi there,</h2>
        <p style="font-size: 16px; line-height: 1.6;">
          This is Nina from the Transaction Room team.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          I noticed you started an inquiry on our platform—whether you're looking to buy or sell a business, or secure a real estate or business loan—but didn’t complete the process. I’d love to help you take the next step.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          No matter where you are in your journey, I’m here to simplify the process and guide you toward the best possible outcome. In a quick, free call, we can review your goals, explore your options, and map out a clear path forward.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ29MXplgsAKVPCTm6xD5ywUfB7IiB37zNiAzH4sH8ACKa13nAetj2OEFpAgkf8PzV9Zpv6To4uw" style="background-color: #0d6efd; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            👉 Schedule your call with Nina
          </a>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">
          Looking forward to supporting your success!
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          Warmly,<br />
          Nina<br />
          Transaction Room Team
        </p>

        <hr style="margin: 30px 0;" />

    <p style="font-size: 14px; color: #777;">You visited: <em>${page}</em></p>

        <p style="font-size: 12px; color: #999; text-align: center;">
          © 2025 Capital Velocity, All rights reserved.
        </p>
      </div>
    </div>
      `,
    };

    try {
      const response = await mg.messages().send(emailData);

      // Log this email
      await EmailLog.create({ email, page, purpose });

      res.status(200).json({ success: true, id: response.id });
    } catch (err) {
      console.error("Mailgun error:", err);
      res.status(500).json({ message: "Failed to send email" });
    }
  })
);

export default userRouter;
