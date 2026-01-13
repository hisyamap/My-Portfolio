import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRouter from './routes/email.js'
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", emailRouter);

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
}));

mongoose.connect (process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB error: ", error));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});