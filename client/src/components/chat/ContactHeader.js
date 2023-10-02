import React from 'react'
import Avatar from "../Avatar";
import { Row } from "reactstrap";

function ContactHeader({ currentUser, handleEditProfile }) {
  
  return (
    <Row className="heading">
       <Avatar 
        src={currentUser?.avatar} 
      />
       <div>
          مرحبا <h6 className='contact-header-name'>{currentUser?.name}</h6>
       </div>
       <div className="mr-auto nav-link" >
            <i className="fa fa-bars" onClick={handleEditProfile}/>
       </div>
   </Row>
  )
}

export default ContactHeader