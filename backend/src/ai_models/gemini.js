import { GoogleGenerativeAI } from "@google/generative-ai";
import env from 'dotenv'

env.config()

const apiKey = process.env.GEMINI_API;


export const getGeminiAiResponse = async (prompt) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text()
}