import React from 'react'
import Message from './Message'

function Messages({ messages, scrollRef }) {
  return (
    <div id="messages">
      {
        messages.map((m, key)=>(
          // console.log(m)
          <Message
            key = { key }
            message = { m }
            scrollRef = { scrollRef }
          />
        ))
      }
    </div>
  )
}

export default Messages