import React from "react";
import { useState } from "react";
import API from "../../api/API";

export default function ChatLog(props: { isMine: boolean; message: string }) {
  const rootStyle: React.CSSProperties = {
    justifyContent: props.isMine ? "flex-end" : "flex-start",
  };

  const urlParams = new URLSearchParams(window.location.search);
  const shouldTranslate = urlParams.get("translate") === "true";

  const [audioLoading, setAudioLoading] = useState(false)

  const chatStyle: React.CSSProperties = {
    background: props.isMine ? "#338bff" : "#fff",
    color: props.isMine ? "#fff" : "#000",
  };

  const onTranslateClicked = async () => {
    const res = await API.translate({ text: props.message, to: "en" });
    alert(res);
  };

  const onSpeakerClicked = async ()=>{
    setAudioLoading(true)
    const res = await API.getAudioUrl(props.message);
    const audioPlayer = new Audio(res);
    setAudioLoading(false)
    audioPlayer.play()
  }

  const classes = props.isMine ? "isMine" : "isOther";

  return (
    <div className="root-chat-log" style={rootStyle}>
      <button className="interactive" onClick={onSpeakerClicked} disabled={audioLoading}>
        {audioLoading ? "⌛":"🔊"}
      </button>
      {shouldTranslate ? (
        <button className="interactive" onClick={onTranslateClicked}>
          🌐
        </button>
      ) : null}
      <div className={`chat-log ${classes}`} style={chatStyle}>
        {props.message}
      </div>
    </div>
  );
}
