import "../style/about-style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function About() {
  return (
    <main>

      {/* Hero Section */}
      <section className="about-hero">
        <img
          src="/images/about banner.jpg"
          alt="About Us banner"
          className="about-hero-img"
        />

        <div className="about-hero-content">
          <h1>Know About Us</h1>
        </div>
      </section>

      {/* About Section */}
      <section className="about">

        <div>
          <img
            src="/images/ff ambience.jpg"
            alt="foodie foods ambience"
          />
        </div>

        <div id="about-content">

          <h1>About Us</h1>

          <p>
            Welcome to <strong>Foodiee Foods</strong>, your go-to destination
            for authentic South Indian cuisine! Our journey began with a
            passion for bringing the rich, aromatic flavors of South India
            to food lovers everywhere.
          </p>

          <p>
            From crispy dosas and fluffy idlis to aromatic biryanis and
            spicy curries, we prepare every dish with traditional recipes
            and the finest ingredients. Our chefs bring years of expertise
            to your plate, ensuring every bite transports you to the heart
            of South India.
          </p>

          <p>
            Whether you're craving a homely meal or a festive feast, we
            are here to serve you with warmth and authenticity. Join us
            for an unforgettable culinary experience!
          </p>

        </div>

      </section>

      {/* Overview Section */}
      <section className="overview">

        <h2>Our Overview</h2>

        <div className="overview-container">

          <div className="overview-box">
            <i className="bi bi-bullseye"></i>
            <h3>Our Mission</h3>
            <p>
              To bring the true taste of South India to food lovers across
              the world with fresh ingredients, traditional recipes, and
              heartwarming hospitality.
            </p>
          </div>

          <div className="overview-box">
            <i className="bi bi-award-fill"></i>
            <h3>Specialties</h3>
            <p>
              Authentic dosas, idlis, vadas, biryanis, and rich South
              Indian filter coffee – a culinary experience crafted with
              passion.
            </p>
          </div>

          <div className="overview-box">
            <i className="bi bi-shop-window"></i>
            <h3>Dining Experience</h3>
            <p>
              Enjoy a cozy and vibrant ambiance where tradition meets
              modern comfort, ensuring a delightful meal for every guest.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default About;