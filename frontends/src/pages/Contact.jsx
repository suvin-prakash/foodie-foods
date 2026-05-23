import { useState } from "react";
import axios from "axios";
import "../style/contact-style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/feedback", formData);

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <main>

      {/* Hero Section */}
      <section className="contact-hero">
        <img
          src="/images/Contact us banner.jpg"
          alt="Contact banner"
          className="contact-hero-img"
        />

        <div className="contact-hero-content">
          <h1>Get In Contact</h1>
        </div>
      </section>


      {/* Contact Info */}
      <section className="contact-info">

        <h2>Contact Information</h2>
        <p>We'd love to hear from you!</p>

        <div className="contact-details">

          <div className="contact-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d799.9112530230616!2d80.24690480176338!3d12.966640305220027!3m2!1i1024!2i768!4f13.1!5e0"
              width="180"
              height="100"
              style={{ border: "2px solid black" }}
              loading="lazy"
              title="map"
            />
          </div>

          <div className="contact-box">
            <i className="bi bi-geo-alt-fill"></i>
            <h3>Our Location</h3>
            <p>123 South Indian Street, Chennai</p>
          </div>

          <div className="contact-box">
            <i className="bi bi-telephone-fill"></i>
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="contact-box">
            <i className="bi bi-envelope-fill"></i>
            <h3>Email Us</h3>
            <p>info@foodieefoods.com</p>
          </div>

        </div>

      </section>


      {/* Contact Form */}

      <div className="contact-container">

        <section className="contact-form">

          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="contact-button">
              <i className="bi bi-send-fill"></i> Send Message
            </button>

          </form>

        </section>

      </div>

    </main>
  );
}

export default Contact;