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

  const onSend = async (s: string) => {
    addLog(s, true);
    const newMessage = await API.completeChat(
      s,
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
        <p>auto translate: {urlParams.get("translate")}</p>
      </div>
      <MessageLogs logs={logs}></MessageLogs>
      <ChatInput onSend={onSend}></ChatInput>
    </div>
  );
}
