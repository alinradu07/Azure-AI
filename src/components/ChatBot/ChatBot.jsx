import ChatCompletion from "./ChatCompletion";
import styles from "./ChatBot.module.css";
import { useState } from "react";
const DUMMY_MESSAGE = [{ role: "assistant", content: "Hi, how can I help?" }];

export default function ChatBot() {
  const [messages, setMessages] = useState(DUMMY_MESSAGE);
  const [textarea, setTextarea] = useState("");
  function handleMessages() {
    setMessages([...messages, { role: "user", content: textarea }]);
    setTextarea("");
  }
  function handleOnChange(text) {
    setTextarea(text);
  }
  return (
    <>
      <main className={styles.main}>
        <section className={styles.content}>
          {messages.length === 0 && <p>Start new converstation</p>}
          {messages.length > 0 && (
            <div>
              {messages.map((message) => (
                <li
                  className={
                    message.role === "assistant"
                      ? `${styles.assistant}`
                      : `${styles.user}`
                  }
                  key={message.content}
                >
                  {message.content}
                </li>
              ))}
            </div>
          )}
        </section>
        <section className={styles.bottom}>
          <ChatCompletion
            userTextarea={textarea}
            onChangeInput={handleOnChange}
            onUserSend={handleMessages}
          />
        </section>
      </main>
    </>
  );
}
