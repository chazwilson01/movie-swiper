import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://chazwilson01:5qzumzQFBDDKyIAK@cluster0.rp1ns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middlewares
app.use(express.json());
app.use(Cors(
    { origin: 'http://localhost:5000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
     },
));

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/tinder/cards", async (req, res) => {
    try {
        const dbCard = req.body;
        const newCard = await Cards.create(dbCard); // Use async/await instead of a callback
        res.status(201).send(newCard);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/tinder/cards", async (req, res) => {
    try {
        const data = await Cards.find(); // Use async/await instead of a callback
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
