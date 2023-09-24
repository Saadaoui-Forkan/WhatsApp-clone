import React, { useState, useEffect } from 'react'
import MessageForm from '../components/chat/MessageForm';
import ChatHeader from '../components/chat/ChatHeader';
import ContactHeader from '../components/chat/ContactHeader';
import Contacts from '../components/chat/Contacts';
import EditProfile from '../components/side/EditProfile';
import UserProfile from '../components/side/UserProfile';
import Messages from '../components/chat/Messages';
import Error from '../components/Error';
import { Row, Spinner } from 'reactstrap';
import axios from 'axios'
import Auth from '../Auth';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])
  const [receiver, setReceiver] = useState(undefined)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [messages, setMessages] = useState([])

  const navigate = useNavigate()

  // useEffect(()=> {
  //   if (!Auth.auth) {
  //     navigate('/login')
  //   }
  // }, [])

  // fetch current user
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

  // fetch users
  useEffect(()=> {
    const getUsers = async() => {
      try {
        const res = await axios.get(`/api/auth/allusers/${currentUser?._id}`)
        setUsers(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getUsers()
  },[currentUser?._id])

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
  }, [receiver, msg])
  console.log(messages)
  return (
    <Row className="h-100">
      <div id="contacts-section" className="col-6 col-md-4">
        <ContactHeader
          currentUser = {currentUser} 
        />
        <Contacts
          users = { users }
          handleReceiver = { handleReceiver }
        />
        <UserProfile
        />
        <EditProfile
        />
      </div>
      <div id="messages-section" className="col-6 col-md-8">
        <ChatHeader
          users = {users}
          receiver = { receiver }
        />
        <Messages
          messages = {messages}
        />
        <Error error = {err} />
        <MessageForm  
          msg = { msg }
          handleMsg = { handleMsg } 
          sendMessage = { sendMessage }
        />
      </div>
    </Row>
  );
}

export default Chat