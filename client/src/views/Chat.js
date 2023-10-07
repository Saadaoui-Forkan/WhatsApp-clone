import React, { useState, useEffect, useRef } from 'react'
import MessageForm from '../components/chat/MessageForm';
import ChatHeader from '../components/chat/ChatHeader';
import ContactHeader from '../components/chat/ContactHeader';
import Contacts from '../components/chat/Contacts';
import EditProfile from '../components/side/EditProfile';
import UserProfile from '../components/side/UserProfile';
import Messages from '../components/chat/Messages';
import Error from '../components/Error';
import { Row } from 'reactstrap';
import axios from 'axios'

function Chat({ setIsLoggedIn }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])
  const [receiver, setReceiver] = useState(undefined)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [messages, setMessages] = useState([])
  const [editProfile, setEditProfile] = useState(false)

  const scrollRef = useRef()

  // edit profile
  const handleEditProfile = () => {
    setEditProfile(!editProfile)
  }

  useEffect(() => {
    const getUser = async() => {
      const user = JSON.parse(localStorage.getItem('user'))
        await axios.get('/api/auth/currentUser', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': user?.data?.token
          }})
        .then(res => setCurrentUser(res.data))
        .catch(err => setErr(err.response.data.msg))
    }
    getUser()
  }, [])

  // fetch users
  useEffect(() => {
    const getUsers = async () => {
      if (currentUser?._id) { 
        try {
          const res = await axios.get(`/api/auth/allusers/${currentUser._id}`);
          setUsers(res.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    getUsers();
  }, [currentUser?._id]);

  // Define Sender 
  const handleReceiver = (chat) => {
    setReceiver(chat)
  }
  
  // New Message
  const handleMsg = (text) => {
    setMsg(text)
  }

  // Send Message
  const sendMessage = async () => {
    if (msg.length === 0) {
      setErr('الرجاء إدخال نص الرسالة')
    }
    if (!receiver) {
      setErr('الرجاء تحديد الطرف المرسل إليه')

    }
    try {
      await axios.post('/api/messages/addmsg', {
        from: currentUser?._id,
        to: receiver?._id,
        message: msg
      })
    } catch (error) {
      return error.response.data
    }
    setMsg('')
    setErr('')
  }

  // Show Messages Between Receiver And Sender
  const getMsgs = async() => {
    const response = await axios.post('/api/messages/getmsg', {
      from: currentUser?._id,
      to: receiver?._id
    })
    setMessages(response.data)
  }

  useEffect(()=>{
    getMsgs()
  }, [receiver, msg ])

  return (
    <Row className="h-100">
      <div id="contacts-section" className="col-6 col-md-4">
        <ContactHeader 
          currentUser={currentUser} 
          handleEditProfile={handleEditProfile}
        />
        <Contacts users={users} handleReceiver={handleReceiver} />
        <UserProfile />
        <EditProfile 
          setCurrentUser={setCurrentUser}
          user={currentUser}
          editProfile = {editProfile}
          handleEditProfile = {handleEditProfile}
        />
      </div>
      <div id="messages-section" className="col-6 col-md-8">
        <ChatHeader
          users={users}
          receiver={receiver}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Messages messages={messages} scrollRef={scrollRef} />
        <Error error={err} />
        <MessageForm
          msg={msg}
          handleMsg={handleMsg}
          sendMessage={sendMessage}
        />
      </div>
    </Row>
  );
}

export default Chat