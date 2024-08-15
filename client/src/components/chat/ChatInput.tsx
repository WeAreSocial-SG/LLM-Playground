import { KeyboardEvent, useEffect, useRef } from "react";

export default function ChatInput(props: { onSend: (s: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const internal_onButtonClick = () => {
    const value = inputRef.current!.value;
    inputRef.current!.value = "";
    if (value !== "") {
      props.onSend(value);
    }
  };

  useEffect(() => {
    const keydown = (e: any) => {
      if (e.key === "Enter") {
        internal_onButtonClick();
      }
    };
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", keydown);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("keydown", keydown);
      }
    };
  }, [inputRef.current]);

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="type your message here..."
        ref={inputRef}
      />
      <button className="interactive" onClick={internal_onButtonClick}>
        send
      </button>
    </div>
  );
}
