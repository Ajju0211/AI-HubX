

import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.DEEP_SEEK_API; // Store your API key in a .env file?

export async function getDeepseekAIResponse(prompt) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://ai-hubx.up.railway.app/inova.ai", // Optional
        "X-Title": "Ai-hubx", // Optional
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-zero:free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Deepseek server is down...";
  } catch (error) {
    console.error("Error:", error.message);
    return "An error occurred while fetching the response.";
  }
}
