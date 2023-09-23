import React from 'react'
import moment from 'moment';
import Avatar from '../Avatar'
import { Badge } from 'reactstrap';

function Contact({  user, handleSenderId }) {
    // const handleClick = (id) => {
    //     console.log(id)
    // }
  return (
    <div className="contact" 
        onClick={()=>handleSenderId(user)}
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
               {/* {message ? moment(message.date).format("hh:mm a") : ''} */}
           </div>
           {/* { unseen > 0 ? <Badge color="success">{unseen}</Badge> : ''} */}
       </div>
   </div>
  )
}

export default Contact