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
import Axios from 'axios'


function Chat() {
  // const [user, setUser] = useState(null)
  const user = {
    _id: "6505686216632b776111b914",
    name: "Ahmed"
  }
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const fetchCurrentUser = async() => {
      try {
        Axios.get('/api/auth')
        .then(res => console.log(res.data))
        // console.log(response.data)
      } catch (error) {
        console.log("error")
      }
    }
    fetchCurrentUser()
  }, [])

  // useEffect(() => {
  //   const getConversations = async() => {
  //     try {
  //       const response = await axios.get('/api/conversations'+user._id)
  //       console.log(response)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // getConversations()
  // }, [user._id])
  
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
          // contact={obj.contact}
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