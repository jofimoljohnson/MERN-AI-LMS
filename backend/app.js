import express from "express";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import courseRouter from './routes/courseRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'
import reviewRouter from './routes/reviewRoutes.js'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/course',courseRouter)
app.use('/api/order',paymentRouter)
app.use('/api/review',reviewRouter)




connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
