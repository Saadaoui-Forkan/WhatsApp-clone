const Message = require('../models/Message')

// Add New Message
const newMessage = async(req,res) => {
    try {
        const {from, to, message} = req.body
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        if (data) {
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
        const { from, to } = req.body;
        const messages = await Message.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        res.json(projectedMessages);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    newMessage,
    getMessages
}