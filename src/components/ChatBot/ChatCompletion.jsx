import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { useRef } from "react";
import styles from "./ChatCompletion.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function ChatCompletion(props) {
  const textareaRef = useRef();
  function handleOnChange() {
    console.log(textareaRef.current.value);
    props.onChangeInput(textareaRef.current.value);
  }
  const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );

  const messages = [
    {
      role: "system",
      content: "You are an AI assistant that helps people find information.",
    },

    { role: "user", content: "how many days does a week have?" },
    { role: "assistant", content: "A week typically has seven days." },
    { role: "user", content: "tell me last question that I've asked" },
  ];

  async function handleSend() {
    console.log("== Chat Completions Sample ==");

    const deploymentId = "FinGPTechBot";

    try {
      const result = await client.getChatCompletions(deploymentId, messages);
      for (const choice of result.choices) {
        console.log(choice.message);
      }
    } catch (err) {
      console.error("The sample encountered an error:", err);
    }
  }

  return (
    <>
      <div className={styles["user-input"]}>
        <textarea
          ref={textareaRef}
          value={props.userTextarea}
          onChange={handleOnChange}
          name="textarea-user"
          id="textarea-user"
          rows="5"
          placeholder="Enter text here"
        ></textarea>
        <button onClick={props.onUserSend} className={styles["button-send"]}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>

      <button className={styles["button-record"]} onClick={handleSend}>
        Record
      </button>
    </>
  );
}

export default ChatCompletion;
