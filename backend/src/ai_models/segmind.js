import axios from "axios"

const api_key = 'SG_2947b8e557ae51d5'; // Replace with your actual API key
const url = 'https://api.segmind.com/v1/llama-v3-8b-instruct';



export const getSegmindAIResponse = async (prompt) => {

  try {
  const data = {
    messages: [
      { role: 'user', content: prompt}
    ]
  };
  const response = await axios.post(url, data,{
    headers: {
      'x-api-key': api_key,
      'Content-Type' : 'application/json'
    }
  });

  return response.data?.choices[0].message.content;
} catch(error) {
  console.log("Something went wrong in Segmind AI: ",error.response)
  return "Something went wrong in SegmindAi model";
}
}