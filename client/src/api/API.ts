import { generateRandomString } from "../utilities";

function getHistory() {
  const chatLogs = document.querySelectorAll(".chat-log");
  const messages = [];
  for (let index = 0; index < chatLogs.length; index++) {
    const element = chatLogs[index];
    const classes = element.classList.value;
    if (classes.includes("isMine")) {
      messages.push({
        content: element.innerHTML,
        role: "assistant",
      });
    } else {
      messages.push({
        content: element.innerHTML,
        role: "user",
      });
    }
  }
  return messages;
}

export default class API {
  static baseUrl = "http://18.143.103.236:3030";
    // static baseUrl = "http://localhost:3030";
  static async completeChat(payload: string, llm: string) {
    const messages = [
      {
        role: "system",
        content: `
           You are a helpful assistant and who only speaks in the thai language implemented in thailand. Don't speak in english at all. Don't use english letters. Dont speak in any other language
          `,
      },
      ...getHistory(),
      { role: "user", content: payload },
    ];
    const body = {
      llm: llm,
      messages: messages,
    };
    const response = await fetch(`${API.baseUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    return responseJson.reply;
  }
  static async translate(payload: { text: string; to: string }) {
    const response = await fetch(`${API.baseUrl}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: payload.to,
        text: payload.text,
      }),
    });
    const responseJson = await response.json();
    return responseJson.text;
  }
  static async getAudioUrl(text:string){
    const response = await fetch(`${API.baseUrl}/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text:text
      }),
    });
    const responseJson = await response.json();
    return `${API.baseUrl}/${responseJson.audioUrl}?makeUnique=${generateRandomString(10)}`;
  }
}
