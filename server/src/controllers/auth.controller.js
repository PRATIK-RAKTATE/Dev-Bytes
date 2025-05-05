import bcrypt from 'bcryptjs';

import { User } from '../models/user.model.js'
import { generateJwtAndSetCookie } from '../utils/generateJwtSetCookie.js';
import generateVerificationToken from '../utils/generateVerificationToken.js'
import { sendVerificationEmail } from '../mailtrap/emails.js';
import { sendWelcomEmail } from '../mailtrap/emailTemplates.js';

export const signup = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required!");
        }

        const useralreadyExists = await User.findOne({ email });

        if (useralreadyExists) {
            return res.status(400).json({
                 success: false,
                  message: "User already exists"
            })
        }

        // Generate verification token first to avoid the reference error
        const verificationToken = generateVerificationToken();

        if (!verificationToken) {
            throw new Error("Failed to generate verification token");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours in ms
        });

        await user.save();

        // JWT implementation
        generateJwtAndSetCookie(res, user._id);

        try {
            await sendVerificationEmail(user.email, verificationToken);
            console.log("Verification email sent successfully");
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
            // Continue with user creation even if email fails
        }

        res.status(200).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            },
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;            // extract `code` from the JSON body
    try {
      // find a user whose token matches AND whose expiry is still in the future
      const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: Date.now() + (15 * 60 * 1000) }  // use $gt, not $get
      });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired verification code"
        });
      }
  
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      await user.save();
  
      await sendWelcomEmail(user.email, user.name);
  
      return res.json({
        success: true,
        message: "Email verified successfully"
      });
    } catch (error) {
      console.error("verifyEmail error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                success: false,
                message: "Invalid password"
            })
        }

        generateJwtAndSetCookie(res, user._id);

        user.lastLogin = Date.now();
        await user.save();

        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(200).json({
            success: true,
            message: "logged in successfully",
            user: safeUser
        });


    } catch (error) {
        console.log("error in login", error)
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const logout = async (req, res) => {
    try {
      res.clearCookie("token");
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong during logout",
      });
    }
  };
  