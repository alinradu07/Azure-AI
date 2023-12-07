import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { useRef } from "react";
import { useState } from "react";
import styles from "./ChatCompletion.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faL } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

function ChatCompletion(props) {
  const [sendIsDisabled, setSendIsDisabled] = useState(true);
  const textareaRef = useRef();

  function handleOnChange() {
    if (textareaRef.current.value.length === 0) {
      setSendIsDisabled(true);
    }

    if (textareaRef.current.value.length > 0) {
      setSendIsDisabled(false);
    }
  }

  const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );

  //API CALL
  async function handleSend() {
    //STATE UPDATE AT EACH STEP IS VITAL FOR SCREEN RENDERING GOOD DO NOT REMOVE
    if (textareaRef.current.value.length === 0) return;
    //user templatye to add
    let template = { role: "user", content: textareaRef.current.value };
    //make logs updated
    let conversationLogsUpdated = [...props.conversationLogs, template];
    props.updateConversationLogs(conversationLogsUpdated);
    textareaRef.current.value = "";
    setSendIsDisabled(true);
    const deploymentId = "FinGPTechBot";

    try {
      const result = await client.getChatCompletions(
        deploymentId,
        conversationLogsUpdated
      );
      for (const choice of result.choices) {
        //add AI response to log and update state
        conversationLogsUpdated = [...conversationLogsUpdated, choice.message];
        props.updateConversationLogs(conversationLogsUpdated);
      }
    } catch (err) {
      console.error("The sample encountered an error:", err);
      textareaRef.current.value = "";
      setSendIsDisabled(true);
    }
  }

  return (
    <>
      <div className={styles["user-input"]}>
        <textarea
          ref={textareaRef}
          onChange={handleOnChange}
          name="textarea-user"
          id="textarea-user"
          placeholder="Enter text here"
        ></textarea>

        <button
          disabled={sendIsDisabled}
          onClick={handleSend}
          className={styles["button-send"]}
        >
          <FontAwesomeIcon icon={faCircleArrowUp} />
        </button>
      </div>

      <button className={styles["button-record"]}>
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
    </>
  );
}

export default ChatCompletion;
