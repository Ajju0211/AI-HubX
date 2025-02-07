import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import chatRouter from "./routes/chatRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./DB/connectDB.js";
import path from "path";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'
import bodyParser from "body-parser";

dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(cors({
  origin: "https://inevoai.netlify.app",
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
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://generativelanguage.googleapis.com",
      
        ]
      }
    }
  })
);


app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 3000;

app.use(express.json());  // allows us to parse incoming requests with JSON payloads

app.use("/api/auth",limiter, authRouter);
app.use("/api/chat", chatRouter);

app.listen(PORT, () => { 
    console.log(`Server is runing ${PORT} ...`)
    connectDB();
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../front-end/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end", "dist", "index.html"));
  });
}
