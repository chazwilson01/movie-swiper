import express from 'express'
import User from '../models/users.models.js';
import mongoose from 'mongoose';
const router = express.Router()

router.post("/", async (req, res) => {
    const user = req.body;
    if (!user.email || !user.password) {
        return res.status(400).json({success:false, message: "PLease provide all fields"})
    }

    const newUser = new User(user)

    try{ 
        await newUser.save()
        res.status(201).json({success:true, message: newUser})

    } catch(err){
        console.log(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({success: true, data: users})

    } catch(err){
        console.log("error in fetching users:", err.message)
        res.status(500).json({success:false, message: 'Server'})
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    console.log("id", id)

    try{
        await User.findByIdAndDelete(id)
        res.status(200).json({success:true, message: "Product Deleted"})
    } catch (err){
        res.status(404).json({success: false, message: "User not Found"})

    }
})

export default router