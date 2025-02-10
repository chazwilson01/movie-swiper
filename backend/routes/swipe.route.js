import express from 'express'
import User from '../models/users.models.js';
import Swipe from '../models/swipe.modes.js'
import mongoose from 'mongoose';
const router = express.Router()

router.delete("/:sessionId", async (req, res) => {
    const {sessionId} = req.params
    console.log("id", sessionId)

    try{
        await Swipe.deleteMany({ sessionId: sessionId})
        res.status(200).json({success:true, message: "Product Deleted"})
    } catch (err){
        res.status(404).json({success: false, message: "User not Found"})

    }
})

export default router