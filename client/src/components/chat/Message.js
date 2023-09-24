import React, { useEffect } from 'react'

function Message({ message, scrollRef }) {
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behaviour: "smooth" })
  }, [message])
  return (
    <div 
      className={message.fromSelf ? 'message-item' : 'message-item incoming'}
      ref={ scrollRef }
    >
    <div className="d-flex flex-row">
        <div className="body m-1 mr-2">
            <div>{message.message}</div>
            <span className="small text-muted">
            </span>
        </div>
    </div>
</div>
  )
}

export default Message