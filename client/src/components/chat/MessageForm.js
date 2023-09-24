import React from 'react'
import { Input } from "reactstrap";

function MessageForm({ msg, handleMsg, sendMessage }) {
    // console.log(msg)
  return (
    <div id="send-message">
        <Input type="textarea" rows="1" 
            onChange={(e) => handleMsg(e.target.value)} 
            value={ msg } 
            placeholder="اكتب رسالتك هنا"
        />
        <i className="fa fa-send text-muted px-3 send" onClick={ sendMessage }/>
    </div>
  )
}

export default MessageForm