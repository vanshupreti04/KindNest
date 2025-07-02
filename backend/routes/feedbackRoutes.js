const express = require('express');
const multer = require('multer');
const feedbackController = require('../controllers/feedbackController');
const router = express.Router();

// Set up multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Submit feedback route (POST)
router.post('/', upload.single('image'), feedbackController.submitFeedback);

// Route to get all feedback
router.get('/getFeedback', feedbackController.getFeedback);
module.exports = router;

