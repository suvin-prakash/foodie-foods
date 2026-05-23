import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header ref={navbarRef}>
      <nav className="navbar">
        <div className="logo">
          <img
            src="/images/ff logo.jpg"
            height="50"
            width="50"
            alt="Foodiee Foods Logo"
          />
          <h1>FOODIEE FOODS</h1>
        </div>

        <div className="toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
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

          <li>
            {user ? (
              <span className="user-greeting">Hello {user.username}</span>
            ) : (
              <Link to="/signin">
                <button id="signin-btn">
                  <i className="bi bi-person-fill"></i> Sign In
                </button>
              </Link>
            )}
          </li>

          <button onClick={handleLogout} id="logout-btn">Logout</button>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
