const Message = require('../models/Message')

// Add New Message
const newMessage = async(req,res) => {
    try {
        const {from, to, message} = req.body
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })
        if (date) {
            return res.json({ msg: "Message Added" })
        }
        return res.json({ msg: "Failed to add message" })
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