import bcrypt from "bcryptjs"
import User from "../models/users.models.js";
import express from "express"

const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'User registered successfully', data : newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router
