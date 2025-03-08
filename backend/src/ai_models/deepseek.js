import OpenAI from "openai/index.mjs";
import env from 'dotenv'


env.config()

const api_key = process.env.DEEP_SEEK_API;
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: api_key
});

export async function getDeepseekAIResponse(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "deepseek-chat",
  });

  return 'Not have Subscription plane' //  completion.choices[0].message.content
}
