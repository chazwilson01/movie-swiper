import mongoose from 'mongoose';

const swipeSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    userId: { type: String, required: true },
    movieId: { type: Number, required: true },
    direction: { type: String, required: true }, 
    movieTitle: {type: String, required: true},
    imgURL: {type: String, required: true},
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Swipe', swipeSchema);
