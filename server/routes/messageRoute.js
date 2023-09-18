const { newMessage, getMessages } = require('../controllers/messageCtr');
const router = require('express').Router()
// const { verifyToken } = require('../middlewares/authMiddleware')

router.post('/', newMessage)
router.get('/:conversationId', getMessages)

module.exports = router;