import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { getGeminiAiResponse } from "../ai_models/gemini.js";
import { getEdenAiResponse } from "../ai_models/edenai.js";
import { getLlamaAiResponse } from "../ai_models/mistral.js";
import { getSegmindAIResponse } from "../ai_models/segmind.js";
import { getDeepseekAIResponse } from "../ai_models/deepseek.js"
import { generateImage  } from '../ai_models/imageAI.js'

dotenv.config();
const app = express();

const models = {
  "Gemini": async (prompt) => await getGeminiAiResponse(prompt),
  "EdenAi": async (prompt) => await getEdenAiResponse(prompt),
  "": async (prompt) => await getDeepseekAIResponse(prompt),
  "Llama 30B": async (prompt) => await getLlamaAiResponse(prompt),
  "Segmind": async (prompt) => await getSegmindAIResponse(prompt),
  "Flux 1.1 (Image)": async (prompt) => await generateImage(prompt)
};

const ORIGIN_URL = process.env.ALLOWED_ORIGIN || "http://localhost:5173"

const __dirname = path.resolve();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ORIGIN_URL,
    credentials: true,
  },
});

app.use(cookieParser());
app.use(express.json());

// Middleware: Authentication
io.use(async (socket, next) => {
  const cookieHeader = socket.handshake.headers.cookie;

  if (!cookieHeader) {
    return next(new Error("Authentication error: No token found"));
  }

  const cookie = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );

  const token = cookie.token;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    socket.user_id = decode;
    next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }
});


// Socket Connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("modelResponse", async (data) => {
    const { prompt, model } = data || {};

    if(!models[model]) {
      return  socket.emit("modelResponse","Currently it is not Available")
    }
    if (!prompt || !model) {
      return socket.emit("modelResponse", { error: "Missing prompt or model" });
    }

    if (!models[model]) {
      return socket.emit("modelResponse", {
        error: `Model ${model} is not available`,
      });
    }

    try {
      const modelResponse = await models[model](prompt);
      socket.emit("modelResponse", modelResponse);
    } catch (error) {
      console.error("Something went wrong:", error);
      socket.emit("modelResponse", { error: "Failed to generate response" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


export { app, server };
