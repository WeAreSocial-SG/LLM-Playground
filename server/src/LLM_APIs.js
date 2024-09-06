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
    model: "gpt-3.5-turbo",
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
  console.log("typhoon request made");
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
      //   max_tokens: 512,
      //   temperature: 0.6,
      //   top_p: 0.95,
      //   repetition_penalty: 1.05,
      //   stream: false,
    }),
  });
  const resJson = await res.json();
  console.log(resJson);
  console.log("got typhoon ");
  const reply = resJson.choices[0].message.content;
  console.log("reply", reply);
  return reply;
}

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

// typhoonComplete(testMessages);
