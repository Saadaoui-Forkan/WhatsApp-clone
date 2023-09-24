import React, { useEffect } from 'react'
import moment from 'moment'

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
                {/* {moment(message.date).format("hh:mm a | MMM D") } */}
            </span>
        </div>
    </div>
</div>
  )
}

export default Message