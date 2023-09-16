import React from 'react'
import { Input } from "reactstrap";
import moment from "moment";

function MessageForm() {

    const onChange = e => {
        console.log("first")
    }

    const onKeyDown = e => {
        console.log("first")
    }

    const onSend = e => {
        console.log("first")
    }
  return (
    <div id="send-message">
        <Input type="textarea" rows="1" 
            onChange={onChange} 
            onKeyDown={onKeyDown} 
            // value={message} 
            placeholder="اكتب رسالتك هنا"
        />
        <i className="fa fa-send text-muted px-3 send" onClick={onSend}/>
    </div>
  )
}

export default MessageForm