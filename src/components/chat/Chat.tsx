import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import MessageLogs from "./MessageLogs";
import { generateRandomString } from "../../utilities";
import API from "../../api/API";

export default function Chat() {
  const [logs, setLogs] = useState<
    Array<{ message: string; isMine: boolean; key: string }>
  >([]);

  const onSend = async (s: string) => {
    addLog(s, true);
    const newMessage = await API.completeChat(s);
    addLog(newMessage, false);
  };

  const addLog = (message: string, isMine: boolean) => {
    setLogs((logs) => {
      return [...logs, { message, isMine, key: generateRandomString() }];
    });
  };

  return (
    <div className="root-chat">
      <MessageLogs logs={logs}></MessageLogs>
      <ChatInput onSend={onSend}></ChatInput>
    </div>
  );
}
