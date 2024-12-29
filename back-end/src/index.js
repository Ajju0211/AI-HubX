import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import chatRouter from "./routes/chatRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./DB/connectDB.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../front-end/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../front-end", "dist", "index.html"));
    });
  }

const PORT = process.env.PORT || 3000;

app.use(express.json());  // allows us to parse incoming requests with JSON payloads

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

app.listen(PORT, () => { 
    console.log(`Server is runing ${PORT} ...`)
    connectDB();
})