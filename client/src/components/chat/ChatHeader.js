import React from 'react'
import { Row, DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from "reactstrap";
import moment from 'moment';
import Avatar from '../Avatar';

function ChatHeader({ user }) {
  return (
    <div>
        <Row className="heading m-0">
            <div 
                // onClick={props.toggle}
            >
                <Avatar 
                    // src={props.contact.avatar} 
                />
            </div>
            <div className="text-right">
                <div>{user ? user.name : ''}</div>
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