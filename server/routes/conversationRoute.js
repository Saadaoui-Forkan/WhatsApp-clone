const { newConversation, getConversation } = require('../controllers/conversationCtr');
const router = require('express').Router()

router.post('/', newConversation)
router.get('/:userId', getConversation)

module.exports = router;