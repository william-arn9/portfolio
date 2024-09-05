import React, { useState } from 'react';
import './ContactPage.scss';

function ContactPage() {
  const [formState, setFormState] = useState('none');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Email sent successfully!') {
          setFormState('success');
        } else {
          setFormState('error');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFormState('error');
      });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="contact-page">
      <h2>Contact Me</h2>
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject Line</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="action-wrapper">
            <button type="submit" className="submit-button">
              Send Message
            </button>
            {formState === 'error' && (
              <strong className="error-message">Sorry, the message was unable to send. Please try again later or reach out to <a href="mailto: williamarn99@gmail.com">williamarn99@gmail.com</a>.</strong>
            )}
            {formState === 'success' && (
              <strong className="success-message">Sent successfully!</strong>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
