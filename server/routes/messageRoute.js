const { newMessage, getMessages } = require('../controllers/messageCtr');
const router = require('express').Router()

router.post('/addmsg', newMessage)
router.get('/getmsg', getMessages)

module.exports = router;