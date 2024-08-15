import { useEffect, useRef } from "react";
import ChatLog from "./ChatLog";

interface MessageLogsProps {
  logs: Array<{ message: string; isMine: boolean; key: string }>;
}

export default function MessageLogs(props: MessageLogsProps) {
  const mark = useRef<HTMLDivElement>(null);
  const div = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mark.current) {
      mark.current.scrollIntoView();
    }
  }, [props.logs]);

  return (
    <div className="message-logs" ref={div}>
      {props.logs.map((log) => {
        return (
          <ChatLog
            message={log.message}
            isMine={log.isMine}
            key={log.key}
          ></ChatLog>
        );
      })}
      <div className="mark" ref={mark}></div>
    </div>
  );
}
