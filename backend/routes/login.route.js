import express from 'express'
import User from '../models/users.models.js';
import mongoose from 'mongoose';
import bcrypt from "bcryptjs"

const router = express.Router();

// Login route
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find the user by email
        const user = await User.findOne({ email });

        // 2. If user is not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 3. Verify the password (use bcrypt for security)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // 4. If login is successful, send a success response
        res.json({ message: 'Login successful', email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


export default router


