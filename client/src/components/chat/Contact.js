import React from 'react'
import Avatar from '../Avatar'

function Contact({  user, handleReceiver }) {
  return (
    <div className="contact" 
        onClick={()=>handleReceiver(user)}
    >
       <div>
           <Avatar 
                src={user.avatar} 
            /> 
       </div>
       <div className="w-50">
           <div className="name">{user.name}</div>
           <div className="small last-message">
            انقر هنا لبدء المحادثة 
           </div>
       </div>
       <div className="flex-grow-1 text-left">
           <div className="small text-muted">
           </div>
       </div>
   </div>
  )
}

export default Contact