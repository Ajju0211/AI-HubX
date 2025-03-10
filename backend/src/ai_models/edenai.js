import axios from "axios";
import env from 'dotenv'

env.config()

const api_token = process.env.EDEN_API_KEY;
export const getEdenAiResponse = async (prompt) => {
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/summarize",
    headers: {
      authorization:
      `Bearer ${api_token}`,
    },
    data: {
      output_sentences: 3,
      providers: "microsoft,connexun,openai,emvista",
      text: prompt,
      language: "en",
    },
  };

  try {
    const response = await axios.request(options);

    return response.data.openai.result;
  } catch (error) {
    console.log("Error in EdenAI :", error);
    return "Failed to summarize the text. Please try again later.";
  }
};
