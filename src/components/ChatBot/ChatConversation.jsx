import styles from "./ChatConversation.module.css";
import { useState } from "react";

//used to generate key, maybe ?
let index = 0;

export default function ChatConversation(props) { 

    //ASSISTANT bubble case
    if(props.role == "assistant"){

        return (

            <>
                <div className="assistant_chatBox">
                    <div className="assistant_chatBox_picture">
                        <img src="" alt="bot_picture" />
                    </div>
                    <div className="assistant_chatBox_message" >
                        {props.message}
                    </div>
                </div>
            </>
 
        )

    //USER bubble case 
    } else {

        return (

            <>
                <div className="user_chatBox">
                    <div className="user_chatBox_message" >
                        {props.message}
                    </div>
                    <div className="user_chatBox_picture">
                        <img src="" alt="user_picture" />
                    </div>
                </div>
            </>
        )

    }


}