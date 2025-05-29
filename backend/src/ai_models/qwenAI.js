import OpenAI from "openai/index.mjs";
import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.OPENROUTER_API_KEY;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: `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`,
});

export async function getQwenAIResponse(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "qwen/qwq-32b",
      
    });

    return completion.choices[0]?.message?.content || "No response received.";
  } catch (error) {
    console.error("Error:", error);
    return "The Qwen server is currently unavailable, or your account has insufficient credits.";
  }
}
getQwenAIResponse("What is the meaning of life?")
  .then(console.log)
  .catch(console.error);
