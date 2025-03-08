import { Mistral } from "@mistralai/mistralai";

// const apiKey = process.env.MISTRAL_API_KEY; s

const client = new Mistral({ apiKey: "UCOZVqfHQHWp87NzaUgb7WCAeFcefYVN" });

export const getLlamaAiResponse = async (prompt) => {
  
  const chatResponse = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [{ role: "user", content: prompt }],
  });
  return chatResponse.choices[0].message.content;
};