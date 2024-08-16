import express from 'express';
import bodyParser from 'body-parser';
import constants from './src/constants.js';
import { groqComplete, openAIComplete, typhoonComplete } from './src/LLM_APIs.js';
import cors from 'cors';
import * as googleTranslate from '@iamtraction/google-translate';

const translate = googleTranslate.default;

const expressApp = express()
expressApp.use(bodyParser.json())
expressApp.use(cors({
    origin: '*'// put urls you want here
}));

app.use(express.static('public'))

expressApp.post("/chat", async (req, res) => {
    try {
        const jsonBody = req.body;
        switch (jsonBody.llm) {
            case "open-ai":
                const openAiReply = await openAIComplete(jsonBody.messages);
                res.json({ status: "ok", reply: openAiReply });
                break;
            case "groq-llama3":
                const groqReply = await groqComplete(jsonBody.messages)
                res.json({ status: "ok", reply: groqReply })
                break;
            case "typhoon":
                const typhoonReply = await typhoonComplete(jsonBody.messages)
                res.json({ status: "ok", reply: typhoonReply })
                break;
            default:
                res.json({ status: "error", message: "no such llm supported" })
                break;
        }
    } catch (e) {
        console.log(e)
        res.json({ status: "error", message: e })
    }
})

expressApp.post("/translate", async (req, res) => {
    try {
        const jsonBody = req.body;
        const translation = await translate(jsonBody.text, { to: jsonBody.to });
        res.json({ text: translation.text })
    } catch (e) {
        console.log(e)
        res.json({ status: "error", message: e })
    }
})

expressApp.listen(constants.expressPort, () => { console.log(`express started on port ${constants.expressPort}`) });

