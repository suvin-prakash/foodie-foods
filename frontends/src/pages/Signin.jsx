import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/signin-style.css";

function Signin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [signupData, setSignupData] = useState({
    username: "",
    phone: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [staffData, setStaffData] = useState({
  staffName: "",
  staffId: "",
  password: "",
});

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        signupData,
      );

      alert(res.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("User already exists");
      } else {
        alert("Signup failed");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    /* USER LOGIN */

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        loginData,
      );

      const data = res.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "staff") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  //Staff Login
  const handleStaffLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/staff-login`,
        staffData,
      );

      const data = res.data;

      if (data.token) {
        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Staff Login Successful");

        navigate("/admin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Staff Login Failed");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/menu-banner.jpg')",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <section className="signup-page">
        <div className="signup-card">
          <Link to="/">
            <button className="back-btn">
              <i class="bi bi-x"></i>
            </button>
          </Link>
          {/* HEADER */}

          <div className="signup-header">
            <img src="/images/ff logo.jpg" alt="logo" />
            <h1>FOODIEE FOODS</h1>
          </div>

          {/* MAIN TABS */}

          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>

            <button
              className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              New User
            </button>

            <button
              className={`auth-tab ${activeTab === "staff" ? "active" : ""}`}
              onClick={() => setActiveTab("staff")}
            >
              Staff
            </button>
          </div>

          <div className="auth-content">
            {/* USER LOGIN */}

            <div
              className={`auth-section ${activeTab === "login" ? "active" : ""}`}
            >
              <h2>User Login</h2>

              <form className="signup-form" onSubmit={handleLogin}>
                <label>Mobile Number</label>

                <div className="input-group">
                  <i className="bi bi-telephone-fill"></i>
                  <input
                    type="text"
                    required
                    onChange={(e) =>
                      setLoginData({ ...loginData, username: e.target.value })
                    }
                  />
                </div>

                <label>Password</label>

                <div className="input-group">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type="password"
                    required
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="signup-btn">
                  Login →
                </button>
              </form>
            </div>

            {/* SIGNUP */}

            <div
              className={`auth-section ${activeTab === "signup" ? "active" : ""}`}
            >
              <h2>Create Account</h2>

              <p>Join us and enjoy authentic South Indian cuisine</p>

              <form className="signup-form" onSubmit={handleSignup}>
                <div className="input-group">
                  <i className="bi bi-person-fill"></i>
                  <input
                    placeholder="Full Name"
                    required
                    onChange={(e) =>
                      setSignupData({ ...signupData, username: e.target.value })
                    }
                  />
                </div>

                <div className="input-group">
                  <i className="bi bi-telephone-fill"></i>
                  <input
                    placeholder="Mobile Number"
                    required
                    onChange={(e) =>
                      setSignupData({ ...signupData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="input-group">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                  />
                </div>

                <div className="input-group">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                  />
                </div>

                <button type="submit" className="signup-btn">
                  Sign Up →
                </button>
              </form>
            </div>

            {/* STAFF */}

            <div
              className={`auth-section ${activeTab === "staff" ? "active" : ""}`}
            >
              <h2>Staff Login</h2>

              {/* STAFF LOGIN */}

              <form className="signup-form" onSubmit={handleStaffLogin}>
                <label>Staff Name</label>

                <div className="input-group">
                  <i className="bi bi-person-fill"></i>

                  <input
                    required
                    onChange={(e) =>
                      setStaffData({
                        ...staffData,
                        staffName: e.target.value,
                      })
                    }
                  />
                </div>

                <label>Staff ID</label>

                <div className="input-group">
                  <i className="bi bi-person-badge-fill"></i>

                  <input
                    required
                    onChange={(e) =>
                      setStaffData({
                        ...staffData,
                        staffId: e.target.value,
                      })
                    }
                  />
                </div>

                <label>Password</label>

                <div className="input-group">
                  <i className="bi bi-lock-fill"></i>

                  <input
                    type="password"
                    required
                    onChange={(e) =>
                      setStaffData({
                        ...staffData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <button className="signup-btn">Login</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin;
