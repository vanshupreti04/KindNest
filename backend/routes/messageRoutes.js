const express = require('express');
const { sendMessage, getMessagesForOrganisation, deleteMessage, acceptMessage  } = require('../controllers/messageController');
const router = express.Router();

router.post('/send', sendMessage);

// Route to get messages for a specific organisation
router.get('/organisation/:organisationId', getMessagesForOrganisation);

// Route to delete a message
router.delete('/:id', deleteMessage);

// Route to accept a message (PATCH)
router.patch('/:messageId/accept', acceptMessage);

module.exports = router;
