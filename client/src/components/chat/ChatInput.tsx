import { useEffect, useRef } from "react";

export default function ChatInput(props: {
  onSend: (s: string, translate?: boolean) => void;
  queryInProgress: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const internal_onButtonClick = () => {
    const value = inputRef.current!.value;
    inputRef.current!.value = "";
    if (value !== "" && !props.queryInProgress) {
      console.log("query in progress", props.queryInProgress);
      props.onSend(value);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const shouldTranslate = urlParams.get("translate") === "true";

  const sendAndTranslate = () => {
    const value = inputRef.current!.value;
    inputRef.current!.value = "";
    if (value !== "" && !props.queryInProgress) {
      console.log("query in progress", props.queryInProgress);
      props.onSend(value, true);
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
  }, [inputRef.current, props.queryInProgress]);

  return (
    <div className="chat-input">
      <input
        type="text"
        disabled={props.queryInProgress}
        placeholder={
          props.queryInProgress
            ? "Query in progress"
            : "type your message here..."
        }
        ref={inputRef}
      />
      <button
        className="interactive"
        onClick={internal_onButtonClick}
        disabled={props.queryInProgress}
      >
        send
      </button>
      {shouldTranslate ? (
        <button
          className="interactive"
          onClick={sendAndTranslate}
          disabled={props.queryInProgress}
        >
          Send in thai
        </button>
      ) : null}
    </div>
  );
}
