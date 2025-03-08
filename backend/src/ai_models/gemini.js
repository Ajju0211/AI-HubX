import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAqakAA5bIMZt2CKcQQ45Javygx4kEp8vY";


export const getGeminiAiResponse = async (prompt) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text()
}