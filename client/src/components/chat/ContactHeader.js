import React from 'react'
import Avatar from "../Avatar";
import { Row } from "reactstrap";

function ContactHeader({ currentUser, handleEditProfile }) {
  
  return (
    <Row className="heading">
       <Avatar 
        src={currentUser?.avatar} 
      />
       <div className='info'>
          <h6 className='contact-header-name'>{currentUser?.name}</h6>
          <p className='contact-header-about'>{currentUser?.about}</p>
       </div>
       <div className="mr-auto nav-link" >
            <i className="fa fa-bars" onClick={handleEditProfile}/>
       </div>
   </Row>
  )
}

export default ContactHeader