import React, { useState, useEffect } from 'react';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerMessage, setCenterMessage] = useState('');
  const organisationId = localStorage.getItem('organisationId'); // Get organisation ID from localStorage

  useEffect(() => {
    const fetchMessages = async () => {
      if (!organisationId) {
        console.error('Organisation ID is not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/messages/organisation/${organisationId}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(
            data.messages.map((message) => ({ ...message, status: 'pending' }))
          ); // Add a status to each message
        } else {
          console.error('Failed to fetch messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [organisationId]);

  const handleAccept = async (messageId) => {
    try {
      // Update the message status in the backend (mock implementation for now)
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}/accept`, {
        method: 'PATCH',
      });

      if (response.ok) {
        // Update state locally
        setMessages(
          messages.map((message) =>
            message._id === messageId ? { ...message, status: 'accepted' } : message
          )
        );
        setCenterMessage('Request Accepted');
        setTimeout(() => setCenterMessage(''), 3000); // Clear after 3 seconds
      } else {
        console.error('Failed to update message status');
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleEventDone = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(messages.filter((message) => message._id !== messageId)); // Remove from UI
        setCenterMessage('Event Successfully Done');
        setTimeout(() => setCenterMessage(''), 3000); // Clear after 3 seconds
      } else {
        console.error('Failed to delete message:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (messages.length === 0) {
    return <div>No messages available for this organisation.</div>;
  }

  return (
    <div className="messages">
      <h2 className="messages-heading">Messages</h2>
      {centerMessage && <div className="center-message">{centerMessage}</div>}

      {messages.map((message) => (
        <div key={message._id} className="message-record">
          <p className="message-detail"><strong>Donator Name :</strong> {message.donatorName}</p>
          <p className="message-detail"><strong>Message:</strong> {message.message}</p>
          <p className="message-detail"><strong>Address:</strong> {message.donatorAddress}</p>
          <p className="message-detail"><strong>Phone Number:</strong> {message.donatorPhone}</p>
          <p className="message-detail"><strong>Date:</strong> {new Date(message.timestamp).toLocaleString()}</p>
          <div className="message-actions">
            {message.status === 'pending' && (
              <>
                <button
                  className="accept-button"
                  onClick={() => handleAccept(message._id)}
                >
                  Accept
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleEventDone(message._id)}
                >
                  Reject
                </button>
              </>
            )}
            {message.status === 'accepted' && (
              <button className="event-done-button" onClick={() => handleEventDone(message._id)}>Event Done</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
