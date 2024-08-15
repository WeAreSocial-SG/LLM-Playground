import constants from "./constants.js";
import Groq from "groq-sdk";
import OpenAI from "openai";

// initiliase llm api clients
const openAi = new OpenAI({
    apiKey: constants.openAiKey
})
const groq = new Groq({
    apiKey: constants.groqKey,
});

export async function openAIComplete(messages) {
    const chatCompletion = await openAi.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
    });
    const reply = chatCompletion.choices[0].message
    return reply.content
}

export async function groqComplete(messages) {
    const chatCompletion = await groq.chat.completions.create({
        messages: messages,
        model: 'llama3-8b-8192',
    });
    const reply = chatCompletion.choices[0].message
    return reply.content
}

export async function typhoonComplete(messages) {
    // const chatCompletion = await groq.chat.completions.create({
    //     messages: messages,
    //     model: 'llama3-8b-8192',
    // });
    // const reply = chatCompletion.choices[0].message
    // return reply.content
}

