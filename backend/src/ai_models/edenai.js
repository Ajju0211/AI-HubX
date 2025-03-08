import axios from "axios";

export const getEdenAiResponse = async (prompt) => {
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/summarize",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzllYTQxYjMtOTE5Yy00YTMzLTg3MDQtNjM0NTMyMTY2ZTE5IiwidHlwZSI6ImFwaV90b2tlbiJ9.8T_aQO8VgV6cJPYTzU24T4n355GGyW4FE1Q18lVspXQ",
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
