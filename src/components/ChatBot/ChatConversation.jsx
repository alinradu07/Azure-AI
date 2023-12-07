import styles from "./ChatConversation.module.css";
import imgBot from "../../img/botChat_img.png";
import imgUser from "../../img/user_img.png";

export default function ChatConversation(props) {
  //ASSISTANT bubble case
  if (props.role == "assistant") {
    return (
      <>
        <div className={styles.assistant_chatBox}>
          <div className={styles.assistant_chatBox_picture}>
            <img src={imgBot} alt="bot_picture" />
          </div>
          <div className={styles.assistant_chatBox_message}>
            {props.message}
          </div>
        </div>
      </>
    );

    //USER bubble case
  } else if (props.role == "user") {
    return (
      <>
        <div className={styles.user_chatBox}>
          <div className={styles.user_chatBox_message}>{props.message}</div>
          <div className={styles.user_chatBox_picture}>
            <img src={imgUser} alt="user_picture" />
          </div>
        </div>
      </>
    );
  }
}
