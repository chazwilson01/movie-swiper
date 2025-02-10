import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import Cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.route.js';
import loginRoutes from './routes/login.route.js';
import signupRoutes from './routes/signup.route.js';
import Swipe from "./models/swipe.modes.js"
import swipeRoutes from "./routes/swipe.route.js"
import Session from './models/session.models.js';
dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 10000;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', "https://movie-swiper-59a03.web.app"],
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

// Middleware
app.use(Cors({    
    origin: ['http://localhost:5173', "https://movie-swiper-59a03.web.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/swipe', swipeRoutes)

// Socket.io logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining a session
    socket.on('joinSession', async ({ sessionId, userEmail }) => {
        try {
            let session = await Session.findOne({ sessionId });
            let prevSwipes = await Swipe.find({sessionId, userId: userEmail})
            if (prevSwipes.length > 0) {
                socket.emit('swipeHistory', {swipes: prevSwipes})
            }
            if (!session) {
                // Create a new session if it doesn't exist
                session = new Session({ sessionId, usersEmails: [userEmail], usersID: [socket.id] });
            } else if (session.usersID.length >= 2) {
                // If the session already has 2 users, notify the client
                socket.emit('sessionFull', { message: 'Session is full. Please try another session.' });
                return;
            } else if (session.usersEmails.length === 2 && !session.usersEmails.includes(userEmail)){
                socket.emit("sessionFull", { message: 'Do not have acess to this session'})
                return
            }else {
                // Add the user to the session
                session.usersID.push(socket.id);
                session.usersEmails.push(userEmail);
            }

            await session.save();

            // Join the socket room and notify the client

            socket.join(sessionId);
            console.log(`User ${socket.id}/${userEmail} joined session ${sessionId}`);
            socket.emit('sessionJoined', { message: 'You have successfully joined the session.' });
            io.in(sessionId).emit('userJoined', {
                userId: socket.id,
                usersInSession: session.usersID.length,
                emails: session.usersEmails,
                message: session.usersID.length === 2
                    ? "Both Users are now in session"
                    : "Waiting for another user to join"
            })

            socket.on("fetchingMovies", async () => {
                let allPrevSwipes = Swipe.find({sessionId:sessionId, userId: userEmail})    
                socket.emit("swipeHistory", {swipes: allPrevSwipes})
            })

            socket.on('disconnect', async () => {
                console.log(`User ${socket.id} disconnected from session ${sessionId}`);
        
                // Remove the user from the session
                const session = await Session.findOneAndUpdate(
                    { sessionId },
                    {
                        $pull: { usersID: socket.id}
                    },
                    { new: true }
                );
                
                if (session && session.usersID.length === 0) {
                    // Delete the session if no users are left
                    await Session.deleteOne({ sessionId });
                    await Swipe.deleteMany({sessionId: sessionId})
                    console.log(`Session ${sessionId} ended and deleted.`);
                } else if (session) {
                    // Notify the remaining user that the session ended
                    const remainingUser = session.usersID[0];
                    io.to(remainingUser).emit('userLeft', { message: 'The other user has left the session.' });
                }
            });
            // Handle disconnection
        } catch (error) {
            console.error('Error handling session join:', error);
            socket.emit('error', { message: 'An error occurred while joining the session.' });
        }
    });


    // Handle swipe events
    socket.on('swipe', async ({ sessionId, userId, movieId, direction, movieTitle, imgURL }) => {
        try {
            // Store the swipe in MongoDB
            await Swipe.create({ sessionId, userId, movieId, direction, movieTitle, imgURL });

            // Only check for matches on right swipes
            if (direction === 'right') {
                // Check if any other user has also swiped right on the same movie
                const match = await Swipe.findOne({
                    sessionId,
                    movieId,
                    direction: 'right',
                    userId: { $ne: userId }  // Exclude the current user
                });

                if (match) {
                    // Emit a match event to both users in the session
                    io.to(sessionId).emit('match', {
                        imgURL,
                        movieTitle,
                        matchedUsers: [userId, match.userId]
                    });
                    console.log(`Match found! ${movieTitle} between ${userId} and ${match.userId}`);
                }
            }
        } catch (error) {
            console.error('Error handling swipe:', error);
        }
    });

    
});



// Listener
server.listen(port, () => {
    connectDB();
    console.log(`Listening on localhost:${port}`);
});
