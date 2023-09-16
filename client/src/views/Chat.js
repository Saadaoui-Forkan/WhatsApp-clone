import React, { useState } from 'react'
import Error from '../components/Error'
import MessageForm from '../components/chat/MessageForm';
import ChatHeader from '../components/chat/ChatHeader';
import ContactHeader from '../components/chat/ContactHeader';
import Contacts from '../components/chat/Contacts';
import EditProfile from '../components/side/EditProfile';
import UserProfile from '../components/side/UserProfile';
import Messages from '../components/chat/Messages'
import { Row, Spinner } from 'reactstrap';


function Chat() {
  const obj = {
    user: { id: "1", name: "عبدالله" },
    message: [
      { sender: "1", receiver: "2", content: "ككيف حالك" },
      { sender: "1", receiver: "2", content: "ككيف حالك" },
      { sender: "3", receiver: "1", content: "ككيف حالك" },
      { sender: "1", receiver: "3", content: "ككيف حالك" },
      { sender: "1", receiver: "2", content: "ككيف حالك" },
      { sender: "3", receiver: "2", content: "ككيف حالك" },
      { sender: "2", receiver: "1", content: "ككيف حالك" },
    ],
    contact: [
      { id: "2", name: "محمد" },
      { id: "3", name: "أحمد" },
    ]
  }
  return (
    <Row className="h-100">
      <div id="contacts-section" className="col-6 col-md-4">
        <ContactHeader 
          user={obj.user.name} 
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
          contact={obj.contact}
          // typing={this.state.typing}
          // toggle={this.userProfileToggle}
          // logout={logout}
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