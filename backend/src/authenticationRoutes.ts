import { Prisma } from "@prisma/client";
import express from "express";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { decodedToken, userDetails } from "./types";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "./services/mailerService";

const router = express.Router();

const JWT_secret = process.env.JWT_secret || "123456789";

router.use(express.json());

/**
 * Register Route
 * * Responsibilities:
 * - Reads user registration details
 * - encrypts the passwod using bcrypt
 * - updates user modal with new enrty
 */


router.post("/register", async (req, res) => {
  const { firstName, lastName, password, email } =
    req.body as Prisma.UserCreateInput;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user: userDetails = await prisma.user.create({
      data: {
        firstName,
        lastName,
        password: hashedPassword,
        email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    console.log("New User registered")
    await sendVerificationEmail(user.email, user.id);
    res.status(201).json({ message: "Check your email to verify account!" });
  } catch (error) {
    res.send(error);
  }
});

/**
 * Verify Email Route
 * * Responsibilities:
 * - Read JWT token for email verification
 * - If valid then update user isVarified to tru
 */

router.get('/verify-email', async (req,res)=>{
      const {token} = req.query

      try{
        const decoded = jwt.verify(token as string, process.env.JWT_VERIFICATION_SECRET!) as { userId: string };

        const user = await prisma.user.update({
          where:{id:decoded.userId},
          data:{ isVerified:true}
        })

        if(user){
          res.status(201).json({
            status:true
        })
        }else{
          res.status(404).json({
            status:false
          })
        }
        
      }catch(error){
        res.status(403).json({
          message:"User token has expired or is not valid"
        })
      }
});


/**
 * Login Route
 * * Responsibilities:
 * - Reads user details
 * - validates then against the users table
 * - If user is valid returns user Data with JWT token
 */


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const tokenPayload: decodedToken = {
        userId: user.id,
        email: user.email,
      };

      const token = jwt.sign(tokenPayload, JWT_secret, { expiresIn: "1hr" });

      const { password, ...userData } = user;

      res.json({
        message: "login successful!",
        token: token,
        payload: {
          ...userData,
        },
      });
    } else {
      res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "An unexpected server error occurred." });
  }
});

/**
 * Validate Email Route
 * * Responsibilities:
 * - validates user Email for password resent
 */


router.post("/validate-email", async (req, res) => {
  const { email } = req.body;
  const emailId = email?.toString();
  try {
    const userData = await prisma.user.findUnique({
      where: { email: emailId?.toLocaleLowerCase() },
      select: {
        id: true,
      },
    });
    if (userData) {
      return res.json({
        isValid: true,
      });
    }
    return res.status(404).json({ exists: false, message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Register Route
 * * Responsibilities:
 * - Gets Email and new password
 * - updates user entry with new password
 */


router.patch("/password-update", async (req, res) => {
  const { email, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    if (updatedUser) {
      res.json({
        isPasswordUpdated: true,
      });
    }
    return res
      .status(405)
      .json({ exists: false, message: "Currently unable to update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
