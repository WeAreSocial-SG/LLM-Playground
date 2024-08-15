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
    console.log('typhoon request made')
    const res = await fetch(`${constants.ngrokUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "messages": messages,
            "model": 'llama-3-typhoon-v1.5-8b-instruct.Q4_K_M',
            "stream": false,
            "max_tokens": 2048,
            "stop": [
                "hello"
            ],
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "temperature": 0.7,
            "top_p": 0.95
        })
    })
    const resJson = await res.json();
    console.log(resJson)
    console.log('got typhoon ')
    const reply = resJson.choices[0].message.content
    console.log('reply', reply)
    return reply
}

