const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
    const { name, message } = req.body;
    const image = req.file; 
  
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }
  
    try {
      const feedback = new Feedback({
        name,
        message,
        image: image ? image.buffer : null, // Store the image as buffer in MongoDB
      });
  
      await feedback.save();
  
      res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit feedback.' });
    }
  };

  
exports.getFeedback = async (req, res) => {
    try {
      const feedbacks = await Feedback.find(); // Fetch all feedback from the database
      const feedbackWithBase64Image = feedbacks.map(feedback => ({
        _id: feedback._id,
        name: feedback.name,
        message: feedback.message,
        image: feedback.image ? feedback.image.toString('base64') : null 
      }));
      res.status(200).json(feedbackWithBase64Image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch feedback.' });
    }
  };