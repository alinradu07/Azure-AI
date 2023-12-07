import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { useRef } from "react";
import styles from "./ChatCompletion.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

function ChatCompletion(props) {
  const textareaRef = useRef();

  // not used just here
  function handleOnChange() {
    props.onChangeInput(textareaRef.current.value);
  }

  const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );

  //API CALL
  async function handleSend() {
    //STATE UPDAET AT EACH STEP IS VITAL FOR SCREEN RENDERING GOOD DO NOT REMOVE
    if (textareaRef.current.value.length === 0) return;

    //user templatye to add
    let template = { role: "user", content: textareaRef.current.value };
    // set text area '' not sure why out side but ok
    props.onUserSend();
    //make logs updated
    let conversationLogsUpdated = [...props.conversationLogs, template];
    props.updateConversationLogs(conversationLogsUpdated);
    console.log("logs updated user : ", conversationLogsUpdated);

    console.log("== ChatBot API Call ==");
    const deploymentId = "FinGPTechBot";

    try {
      const result = await client.getChatCompletions(
        deploymentId,
        conversationLogsUpdated
      );
      for (const choice of result.choices) {
        console.log("logs updated bot :", choice.message);
        //add AI response to log and update state
        conversationLogsUpdated = [...conversationLogsUpdated, choice.message];
        props.updateConversationLogs(conversationLogsUpdated);
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
          placeholder="Enter text here"
        ></textarea>

        {/* func in ChatBot comp handleMessages, sets props messages as text area  */}
        <button onClick={handleSend} className={styles["button-send"]}>
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
