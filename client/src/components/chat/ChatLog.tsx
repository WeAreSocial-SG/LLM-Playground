import React from "react";
import { speak } from "../../api/textToSpeech";

export default function ChatLog(props: { isMine: boolean; message: string }) {
  const rootStyle: React.CSSProperties = {
    justifyContent: props.isMine ? "flex-end" : "flex-start",
  };

  const chatStyle: React.CSSProperties = {
    background: props.isMine ? "#338bff" : "#fff",
    color: props.isMine ? "#fff" : "#000",
    // textAlign: props.isMine ? "right" : "left",
  };

  const onSpeakerClicked = () => {
    speak(props.message);
  };

  const classes = props.isMine ? "isMine" : "isOther";

  return (
    <div className="root-chat-log" style={rootStyle}>
      <button className="interactive" onClick={onSpeakerClicked}>
        🔊
      </button>
      <div className={`chat-log ${classes}`} style={chatStyle}>
        {props.message}
      </div>
    </div>
  );
}
