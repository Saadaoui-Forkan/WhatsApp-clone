import React from 'react'
import Avatar from "../Avatar";
import { Row } from "reactstrap";

function ContactHeader({user, toggle}) {
  return (
    <Row className="heading">
       <Avatar 
        // src={user.avatar} 
      />
       <div>جهات الاتصال</div>
       <div className="mr-auto nav-link" onClick={toggle}>
            <i className="fa fa-bars" />
       </div>
   </Row>
  )
}

export default ContactHeader