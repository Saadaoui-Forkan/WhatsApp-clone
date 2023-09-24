import React from 'react'
import Message from './Message'

function Messages({ messages }) {
  return (
    <div id="messages">
      {
        messages.map((m, key)=>(
          // console.log(m)
          <Message
            key = { key }
            message = { m }
          />
        ))
      }
    </div>
  )
}

export default Messages