import express from 'express';
import User from '../models/users.models.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Rate limiter: Prevent brute force attacks
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Allow max 5 login attempts per window per IP
    message: { message: "Too many login attempts. Try again later." }
});

// JWT Token Generation Function
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, // Payload
        process.env.JWT_SECRET, // Secret key from .env
        { expiresIn: "7d" } // Token expires in 7 days
    );
};

// Login route with validation & security
router.post(
    "/",
    loginLimiter, // Apply rate limiting
    [
        // Validation rules
        body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
        body("password").notEmpty().withMessage("Password is required")
    ],
    async (req, res) => {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // 1. Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // 2. Verify the password (bcrypt)
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // 3. Generate JWT token for authentication
            console.log(process.env.JWT_SECRET)
            const token = generateToken(user);
            const firstName = user.firstName
            const lastName = user.lastName

            // 4. Send response with token
            res.json({ message: "Login successful", token, email, firstName, lastName });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
