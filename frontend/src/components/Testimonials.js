import React, { useEffect, useState } from 'react';
import './Testimonials.css'; // Add your styles for Testimonials

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch feedback details from the backend
  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback/getFeedback');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  // Fetch testimonials when the component mounts
  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials-section">
      <h4 className="testimonials-heading">TESTIMONIALS</h4>
      <h2 className="read-what-others-heading">Read What Others<br />Have To Say</h2>
      <div className="testimonial-container">
        {/* First card dynamically populated from the fetched testimonials */}
        {testimonials.length > 0 && (
          <div className="testimonial-card">
            <div className="image-container-1">
              {testimonials[0].image ? (
                <img
                  src={`data:image/png;base64,${testimonials[0].image}`} // Assuming base64 image
                  alt={testimonials[0].name}
                  className="testimonial-image-1"
                />
              ) : (
                <div className="testimonial-placeholder-1">No Image</div>
              )}
            </div>
            <div className="testimonial-author-1">{testimonials[0].name}</div>
            <div className="testimonial-review-1">{testimonials[0].message}</div>
          </div>
        )}

        {/* Second card with static content */}
        {testimonials.length > 1 && (
        <div className="testimonial-card">
          <div className="image-container-2">
          {testimonials[1].image ? (
            <img
            src={`data:image/png;base64,${testimonials[1].image}`} // Assuming base64 image
            alt={testimonials[1].name}
            className="testimonial-image-2"
            />
          ) : (
            <div className="testimonial-placeholder-2">No Image</div>
          )}
        </div>
        <div className="testimonial-author-2">{testimonials[1].name}</div>
        <div className="testimonial-review-2">{testimonials[1].message}</div>
      </div>
      )}
        {/* Third card with static content */}
        {testimonials.length > 2 && (
        <div className="testimonial-card">
          <div className="image-container-3">
          {testimonials[1].image ? (
            <img
            src={`data:image/png;base64,${testimonials[2].image}`} // Assuming base64 image
            alt={testimonials[2].name}
            className="testimonial-image-3"
            />
          ) : (
            <div className="testimonial-placeholder-3">No Image</div>
          )}
          </div>
          <div className="testimonial-author-3">{testimonials[2].name}</div>
          <div className="testimonial-review-3">{testimonials[2].message}</div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
