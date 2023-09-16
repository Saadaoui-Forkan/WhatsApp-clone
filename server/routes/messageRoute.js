const { newMessage, getMessages } = require('../controllers/messageCtr');
const router = require('express').Router()

router.post('/', newMessage)
router.get('/:conversationId', getMessages)

module.exports = router;