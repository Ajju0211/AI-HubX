import { Mistral } from "@mistralai/mistralai";
import env from 'dotenv'

env.config()
// const apiKey = process.env.MISTRAL_API_KEY; s

const client = new Mistral({ apiKey: process.env.MISTRAL_AI });

export const getLlamaAiResponse = async (prompt) => {
  
  const chatResponse = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [{ role: "user", content: prompt }],
  });
  return chatResponse.choices[0].message.content;
};