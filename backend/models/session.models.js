import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    sessionId: String,
    usersEmails: [String],  
    usersID: [String], // Array of user socket IDs or emails
    createdAt: { type: Date, default: Date.now }
})

const Session = mongoose.model("Session", userSchema)

export default Session