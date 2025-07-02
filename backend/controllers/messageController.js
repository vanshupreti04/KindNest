// backend/controllers/messageController.js
const Message = require('../models/Message');
const Donator = require('../models/Donator'); // Assuming you have a Donator model

// Handle sending a message
exports.sendMessage = async (req, res) => {
  const { message, organisationId } = req.body;
  const donatorId = req.headers['donator-id']; // Extract donator ID from the request headers

  try {
    // Find the donator's details
    const donator = await Donator.findById(donatorId);
    if (!donator) {
      return res.status(404).json({ message: 'Donator not found' });
    }

    // Create a new message
    const newMessage = new Message({
      donatorName: donator.fullName,
      donatorAddress: donator.address,
      donatorPhone: donator.phoneNumber,
      message,
      organisationId,
      timestamp: new Date(),
    });

    // Save message to the database
    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
// Fetch messages for a specific organisation
exports.getMessagesForOrganisation = async (req, res) => {
  const { organisationId } = req.params; // Get organisationId from route params

  try {
    // Find messages where the organisationId matches
    const messages = await Message.find({ organisationId }).sort({ timestamp: -1 });

    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this organisation.' });
    }

    // Send the messages back as a response
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Failed to delete message' });
  }
};

// Accept Message
exports.acceptMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    // Update the message status to 'accepted'
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { $set: { status: 'accepted' } },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message accepted', updatedMessage });
  } catch (error) {
    console.error('Error accepting message:', error);
    res.status(500).json({ message: 'Error accepting message' });
  }
};
