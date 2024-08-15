import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import MessageLogs from "./MessageLogs";
import { generateRandomString } from "../../utilities";
import API from "../../api/API";

export default function Chat() {
  const [logs, setLogs] = useState<
    Array<{ message: string; isMine: boolean; key: string }>
  >([]);

  const urlParams = new URLSearchParams(window.location.search);

  const onSend = async (s: string, translate = false) => {
    let msg = s;
    if (translate) {
      msg = await API.translate({ text: s, to: "th" });
    }
    addLog(msg, true);
    const newMessage = await API.completeChat(
      msg,
      urlParams.get("llm") as string
    );
    addLog(newMessage, false);
  };

  const addLog = (message: string, isMine: boolean) => {
    setLogs((logs) => {
      return [...logs, { message, isMine, key: generateRandomString() }];
    });
  };

  return (
    <div className="root-chat">
      <div>
        <h1>Using {urlParams.get("llm")}</h1>
      </div>
      <MessageLogs logs={logs}></MessageLogs>
      <ChatInput onSend={onSend}></ChatInput>
    </div>
  );
}
