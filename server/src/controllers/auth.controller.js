import bcrypt from 'bcryptjs';

import { User } from '../models/user.model.js'
import { generateJwtAndSetCookie } from '../utils/generateJwtSetCookie.js';
import generateVerificationToken from '../utils/generateVerificationToken.js'

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

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = generateVerificationToken();

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
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            },
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}


export default {
    signup
}