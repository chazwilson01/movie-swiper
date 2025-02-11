import bcrypt from "bcryptjs";
import User from "../models/users.models.js";
import express from "express";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Rate limiter to prevent brute force attacks
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit to 10 signup attempts per window per IP
    message: { message: "Too many signup attempts. Try again later." }
});

// Signup Route with Validation
router.post(
    "/",
    //loginLimiter, // Apply rate limiting
    [
        // Validation rules
        body("email")
            .isEmail()
            .withMessage("Invalid email format")
            .normalizeEmail(),
        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
            .matches(/[a-z]/)
            .withMessage("Password must contain at least one lowercase letter")
            .matches(/[A-Z]/)
            .withMessage("Password must contain at least one uppercase letter")
            .matches(/\d/)
            .withMessage("Password must contain at least one number")
            .matches(/[@$!%*?&]/)
            .withMessage("Password must contain at least one special character (@$!%*?&)"),
    ],
    async (req, res) => {
        const { email, password, firstName, lastName } = req.body;

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Hash the password with bcrypt
            const hashedPassword = await bcrypt.hash(password, 12);

            // Save the user to the database
            const newUser = new User({ email, password: hashedPassword, firstName, lastName });
            await newUser.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
