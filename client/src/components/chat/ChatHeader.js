import React from 'react'
import { Row, DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from "reactstrap";
import Avatar from '../Avatar';

function ChatHeader({ receiver, users }) {
    // Find Receiver Avatar
    const receiverAvatar = users.find(u=> u._id === receiver?._id)
  return (
    <div>
        <Row className="heading m-0">
            <div 
                // onClick={props.toggle}
            >
                <Avatar 
                    src={receiverAvatar?.avatar} 
                />
            </div>
            <div className="text-right">
                <div>{receiver ? receiver.name : ''}</div>
                {/* <small>{status()}</small> */}
           </div>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="nav-link">
                        <i className="fa fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem >تغيير كلمة المرور</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem >تسجيل الخروج</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Row>
    </div>
  )
}

export default ChatHeader