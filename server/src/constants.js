import { config } from "dotenv";
config();

const constants = {
    openAiKey: process.env.OPEN_AI_KEY,
    groqKey: process.env.GROQ_KEY,
    ngrokUrl: process.env.NGROK_URL,
    expressPort: 3000,
}

export default constants