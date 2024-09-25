import constants from "./constants.js";
import Groq from "groq-sdk";
import OpenAI from "openai";

// initiliase llm api clients
const openAi = new OpenAI({
  apiKey: constants.openAiKey,
});
const groq = new Groq({
  apiKey: constants.groqKey,
});

export async function openAIComplete(messages) {
  const chatCompletion = await openAi.chat.completions.create({
    messages: messages,
    model: "gpt-4o",
  });
  const reply = chatCompletion.choices[0].message;
  return reply.content;
}

export async function groqComplete(messages) {
  const chatCompletion = await groq.chat.completions.create({
    messages: messages,
    // model: 'llama3-8b-8192',
    model: "llama-3.1-70b-versatile",
  });
  const reply = chatCompletion.choices[0].message;
  return reply.content;
}

export async function typhoonComplete(messages) {
  const res = await fetch(`https://api.opentyphoon.ai/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${constants.typhoonKey}`,
    },
    body: JSON.stringify({
      messages: messages,
      model: "typhoon-v1.5-instruct",
      stream: false,
      stop: ["hello"],
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 0.7,
      top_p: 0.95,
    }),
  });
  const resJson = await res.json();
  const reply = resJson.choices[0].message.content;
  return reply;
}

export async function GPTAndTyphoon(messages) {
  // get completion from gpt
  const GPTChatCompletion = await openAi.chat.completions.create({
    messages: messages,
    model: "gpt-4o",
  });
  const gptReply = GPTChatCompletion.choices[0].message.content;
  // get completion from typhoon
  const typhoonHistory = [
    {
      role: "system",
      content: "You are a helpful thai Assistant. You help to take translated thai text and make them sound more natural and human. Use thai slangs if appropriate",
    },
    {
      role: "user",
      content: `Please return this text more naturally: ${gptReply}`,
    },
  ];
  const typhoonCompletion = await typhoonComplete(typhoonHistory)
  // return the final reply
  return typhoonCompletion
}




// ! --- testing  stuff below

// const testMessages = [
//   {
//     role: "system",
//     content: "You are a helpful assistant. You must answer only in Thai.",
//   },
//   {
//     role: "user",
//     content: "ขอสูตรไก่ย่าง",
//   },
// ];

// (async ()=>{
//   const res = await GPTAndTyphoon(testMessages)
//   // console.log(res)
// })();

