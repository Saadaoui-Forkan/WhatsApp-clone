import React, { useState, useEffect } from 'react'
import Error from '../components/Error'
import MessageForm from '../components/chat/MessageForm';
import ChatHeader from '../components/chat/ChatHeader';
import ContactHeader from '../components/chat/ContactHeader';
import Contacts from '../components/chat/Contacts';
import EditProfile from '../components/side/EditProfile';
import UserProfile from '../components/side/UserProfile';
import Messages from '../components/chat/Messages'
import { Row, Spinner } from 'reactstrap';
import axios from 'axios'

function Chat() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const getUser = async() => {
      const user = JSON.parse(localStorage.getItem('user'))
        await axios.get('/api/auth', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': user?.data.token
          }})
        .then(res => setCurrentUser(res.data))
        .catch(err => console.log(err, "err"))
    }
    getUser()
  }, [])
  console.log(currentUser)
  
  return (
    <Row className="h-100">
      <div id="contacts-section" className="col-6 col-md-4">
        <ContactHeader 
          // user={obj.user.name} 
          // toggle={toggleProfile} 
        />
        <Contacts
          // contacts={this.state.contacts}
          // messages={this.state.messages}
          // onChatNavigate={this.onChatNavigate}
        />
        <UserProfile
          // contact={this.state.contact}
          // toggle={userProfileToggle}
          // open={this.state.userProfile}
        />
        <EditProfile
          // user={this.state.user}
          // toggle={this.profileToggle}
          // open={this.state.profile}
        />
      </div>
      <div id="messages-section" className="col-6 col-md-8">
        <ChatHeader
          user = {currentUser}
        />
        <Messages />
        <MessageForm 
          // sender={sendMessage} 
          // sendType={sendType} 
        />
      </div>
    </Row>
  );
}

export default Chat