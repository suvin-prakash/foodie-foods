import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          
          <div className="footer-logo">
            <img
              src="/images/ff logo.jpg"
              height="50"
              width="50"
              alt="Foodiee Foods Logo"
            />
            <h2>FOODIEE FOODS</h2>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
            <Link to="/">
              <i className="bi bi-house-fill"></i> Home
            </Link>
          </li>

          <li>
            <Link to="/menu">
              <i className="bi bi-fork-knife"></i> Menu
            </Link>
          </li>

          <li>
            <Link to="/about">
              <i className="bi bi-info-circle"></i> About Us
            </Link>
          </li>

          <li>
            <Link to="/contact">
              <i className="bi bi-telephone-fill"></i> Contact Us
            </Link>
          </li>
            </ul>
          </div>

          <div className="footer-hours">
            <h3>Opening Hours</h3>
            <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
            <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><i className="bi bi-geo-alt-fill"></i> 123 South Indian Street, Chennai, India</p>
            <p><i className="bi bi-telephone-fill"></i> +91 98765 43210</p>
            <p><i className="bi bi-envelope-fill"></i> info@foodieefoods.com</p>

            <div className="social-icons">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter"></i>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>© 2025 Foodiee Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;