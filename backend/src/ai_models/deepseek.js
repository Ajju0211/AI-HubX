import OpenAI from "openai/index.mjs";


const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: "sk-e22ef0aa732d4468a53dbd473e4211ac"
});

export async function getDeepseekAIResponse(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "deepseek-chat",
  });

  return 'Not have Subscription plane' //  completion.choices[0].message.content
}