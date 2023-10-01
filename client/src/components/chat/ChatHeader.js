import React from 'react'
import { Row, DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from "reactstrap";
import Avatar from '../Avatar';

function ChatHeader({ receiver, users, setIsLoggedIn }) {
    // Find Receiver Avatar
    const receiverAvatar = users.find(u=> u._id === receiver?._id)

    // logout
    const logout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false)    
    }
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
           </div>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="nav-link">
                        <i className="fa fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem >تغيير كلمة المرور</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={()=>logout()}>تسجيل الخروج</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Row>
    </div>
  )
}

export default ChatHeader