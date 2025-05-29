import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import chatRouter from "./routes/chatRoute.js";
import cors from "cors";
import { connectDB } from "./DB/connectDB.js";

import helmet from 'helmet';
import rateLimit from 'express-rate-limit'
import bodyParser from "body-parser";
import  { app,server }  from "./socket/socketio.js";

dotenv.config();

const ORIGIN_URL = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: ORIGIN_URL,
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
})

app.use(limiter);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "connect-src": ["'self'", "*"],  // Allows all connections (Only for debugging)
      }
    }
  })
);


app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;


app.use("/api/auth",limiter, authRouter);
app.use("/api/chat", chatRouter);

server.listen(PORT, () => { 
    console.log(`Server is running ${PORT} ...`)
    connectDB();
})

