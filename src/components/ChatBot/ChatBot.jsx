import styles from "./ChatBot.module.css";
import { useState } from "react";

//Components
import ChatCompletion from "./ChatCompletion";
import ChatConversation from "./ChatConversation";

//VARS

const conversationLogs_start = [
  {
    role: "system",
    content: "You are an AI assistant that helps people find information.",
  },
  { role: "assistant", content: "Hi, how can I help?" },
];

export default function ChatBot() {
  //STATE
  //const [messages, setMessages] = useState(DUMMY_MESSAGE);
  const [textarea, setTextarea] = useState("");
  const [conversationLogs, setConversationLogs] = useState(
    conversationLogs_start
  );

  //SET STATE
  function onUserSend() {
    setTextarea("");
  }

  function handleOnChange(text) {
    setTextarea(text);
  }

  function updateConversationLogs(updatedVersion) {
    setConversationLogs(updatedVersion);
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.content}>
          {conversationLogs.length === 0 && <p>Start new converstation</p>}
          {conversationLogs.length > 0 &&
            conversationLogs.map((message, index) => (
              <ChatConversation
                key={index}
                role={message.role}
                message={message.content}
              />
            ))}
        </section>
        <section className={styles.bottom}>
          <ChatCompletion
            userTextarea={textarea}
            onChangeInput={handleOnChange}
            onUserSend={onUserSend}
            conversationLogs={conversationLogs}
            updateConversationLogs={updateConversationLogs}
          />
        </section>
      </main>
    </>
  );
}
