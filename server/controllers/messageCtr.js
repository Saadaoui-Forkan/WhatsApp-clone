const Message = require('../models/Message')

// Add New Message
const newMessage = async(req,res) => {
    const newMsg = new Message(req.body)
    try {
        const savedMessage = await newMsg.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// Get Messages
const getMessages = async(req,res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        onsole.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    newMessage,
    getMessages
}