import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import './Footer.css'; // Import your CSS styles

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [name, setName] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const openModal = () => {
    setModalOpen(true);
    setSubmissionMessage('');
  };

  const closeModal = () => {
    setModalOpen(false);
    clearModalFields();
  };

  const clearModalFields = () => {
    setName('');
    setFeedbackMessage('');
    setSelectedPhoto(null);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setFeedbackMessage(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  const sendFeedback = () => {
    if (name.trim() && feedbackMessage.trim()) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('message', feedbackMessage);

      // Append the image file to FormData if selected
      if (selectedPhoto) {
        formData.append('image', selectedPhoto);
      }

      // Send the form data to the backend
      fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setSubmissionMessage(data.message || 'Feedback submitted successfully!');
          setTimeout(closeModal, 2000); // Close modal after 2 seconds
        })
        .catch((error) => {
          console.error('Error:', error);
          setSubmissionMessage('Failed to submit feedback.');
        });
    } else {
      setSubmissionMessage('Please fill in all fields before submitting.');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <p className="copyright">© 2024 KindNest. All rights reserved.</p>
      </div>
      <div className="footer-right">
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      {/* Give Feedback Button */}
      <div className="feedback-button-container">
        <button-5 className="feedback-button" onClick={openModal}>
          Give Feedback
        </button-5>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Feedback</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              className="feedback-input"
            />
            <textarea
              placeholder="Write your feedback here..."
              value={feedbackMessage}
              onChange={handleMessageChange}
              rows="4"
            ></textarea>
             <div className="add-photo-container">
              {!selectedPhoto && (
                <label htmlFor="photo-upload" className="add-photo-button">
                  Add Photo
                </label>
              )}
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
              {selectedPhoto && (
                <div className="photo-preview">
                  <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" />
                </div>
              )}
            </div>
            {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
            <div className="modal-buttons">
              <button onClick={sendFeedback} className="send-feedback-btn">Send Feedback</button>
              <button onClick={closeModal} className="cancel-feedback-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;