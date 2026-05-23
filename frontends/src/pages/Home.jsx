
import { useState } from "react";
import axios from "axios";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    request: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${import.meta.env.VITE_API_URL}/api/reservations`, formData);

    alert("Reservation requested successfully! Our team will call you for conformation");
  };

  return (
    <>
      {/* HERO SECTION */}
      <section id="home" className="hero-video">
        <div className="video-container">
          <video autoPlay muted loop id="background-video">
            <source src="/images/intro video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="hero-content">
          <h2>Authentic South Indian Cuisine</h2>
          <p>Experience the rich flavors of Madras in every bite</p>

          <div className="hero-buttons">
            <a href="#reservation">
              <button className="cta-button">Reserve Your Table</button>
            </a>

            <button className="secondary-button" onClick={() => alert("Sorry !! The video is currently unavailable. Please check back later.")}>
              <i className="bi bi-play-circle"></i> Watch Our Story
            </button>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section id="welcome" className="welcome-section">
        <div className="container">
          <h2>Welcome to Foodiee Foods</h2>

          <div className="divider">
            <i className="bi bi-fire"></i>
          </div>

          <p>
            Experience the authentic flavors of South India right in your
            neighborhood. Our chefs blend traditional recipes with modern
            techniques to bring you the perfect balance of spices and taste.
          </p>

          <div className="features">
            <div className="feature">
              <i className="bi bi-award"></i>
              <h3>Award-Winning</h3>
              <p>Recognized for our authentic South Indian cuisine</p>
            </div>

            <div className="feature">
              <i className="bi bi-leaf"></i>
              <h3>Fresh Ingredients</h3>
              <p>We use only the freshest ingredients in our dishes</p>
            </div>

            <div className="feature">
              <i className="bi bi-check-circle"></i>
              <h3>Traditional Spices</h3>
              <p>Authentic spice blends directly imported from Madras</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION SECTION */}
      <section className="reservation-section" id="reservation">
        <h2>Reserve Your Table</h2>

        <form
          id="reservationForm"
          className="reservation-form"
          onSubmit={handleSubmit}
        >
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                id="resName"
                name="name"
                placeholder="Your name"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                id="resPhone"
                name="phone"
                placeholder="Your phone number"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                id="resDate"
                name="date"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                id="resTime"
                name="time"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Guests</label>
              <select id="resGuests" name="guests" onChange={handleChange}>
                <option value="">Select Guests</option>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              name="request"
              placeholder="Any dietary requirements or special occasions?"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="reserve-btn">
            Reserve Table
          </button>
        </form>
      </section>
    </>
  );
}

export default Home;
