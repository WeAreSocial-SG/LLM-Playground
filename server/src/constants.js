import { config } from "dotenv";
config();

const constants = {
  openAiKey: process.env.OPEN_AI_KEY,
  groqKey: process.env.GROQ_KEY,
  ngrokUrl: process.env.NGROK_URL,
  typhoonKey: process.env.TYPHOON_KEY,
  expressPort: 3030,
};

export default constants;
