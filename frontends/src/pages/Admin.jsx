import { useEffect, useState } from "react";
import axios from "axios";
import "../style/admin-style.css";

function Admin() {
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [fileName, setFileName] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + (order.total || 0);
  }, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  const [menuData, setMenuData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    type: "",
    description: "",
  });

  const addMenuItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", menuData.name);
    formData.append("price", menuData.price);
    formData.append("category", menuData.category);
    formData.append("type", menuData.type);
    formData.append("description", menuData.description);
    formData.append("image", menuData.image);

    await fetch(`${import.meta.env.VITE_API_URL}/api/menu`, {
      method: "POST",
      body: formData,
    });

    alert("Menu Item Added");

    // Clear form
    setMenuData({
      name: "",
      price: "",
      category: "",
      image: null,
      type: "",
      description: "",
    });

    setFileName("");

    // Go to Admin Home section
    setActiveSection("dashboard");
  };

  const pendingOrders = Array.isArray(orders)
    ? orders.filter((o) => o.status === "pending")
    : [];

  const sentOrders = Array.isArray(orders)
    ? orders.filter((o) => o.status === "sent")
    : [];

  const markOrderSent = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status: "sent" }),
    });

    const updatedOrder = await response.json();

    setOrders((prevOrders) =>
      prevOrders.map((order) => (order._id === id ? updatedOrder : order)),
    );
  };

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      window.location.href = "/signin";
      return;
    }

    if (user.role !== "staff") {
      alert("Access denied");
      window.location.href = "/";
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/reservations`)
      .then((res) => setReservations(res.data));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Orders API response:", data);
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/feedback`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);

  return (
    <>
      <header className="admin-navbar">
        <div className="admin-logo">
          <img src="/images/ff logo.jpg" alt="logo" />
          <h2>Foodiee Foods</h2>
          <span className="admin-user">Hello {user?.username}</span>
        </div>

        <nav className="admin-nav-links">
          <button onClick={() => setActiveSection("dashboard")}>Home</button>
          <button onClick={() => setActiveSection("orders")}>Orders</button>
          <button onClick={() => setActiveSection("reservations")}>
            Reservations
          </button>
          <button onClick={() => setActiveSection("feedback")}>Feedback</button>
          <button onClick={() => setActiveSection("add-item")}>Add-Menu</button>
          <button onClick={handleLogout} id="admin-logout">
            Logout
          </button>
        </nav>
      </header>

      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>

        {/* SUMMARY CARDS */}

        {activeSection === "dashboard" && (
          <div className="admin-summary">
            <div className="summary-card">
              <h3>Total Reservations</h3>
              <p>{reservations.length}</p>
            </div>

            <div className="summary-card">
              <h3>Total Orders</h3>
              <p>{orders.length}</p>
            </div>

            <div className="summary-card">
              <h3>Total Revenue</h3>
              <p>₹{totalRevenue}</p>
            </div>

            <div className="summary-card">
              <h3>Feedback Messages</h3>
              <p>{feedbacks.length}</p>
            </div>
          </div>
        )}

        {/* RESERVATIONS */}

        {activeSection === "reservations" && (
          <section className="admin-section">
            <h2>Reservations</h2>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Guests</th>
                  <th>Request</th>
                </tr>
              </thead>

              <tbody>
                {reservations.map((r) => (
                  <tr key={r._id}>
                    <td>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.date}</td>
                    <td>{r.time}</td>
                    <td>{r.guests}</td>
                    <td>{r.request}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* ORDERS */}
        {activeSection === "orders" && (
          <section className="admin-section">
            {/* PENDING ORDERS */}

            <h2>Pending Orders</h2>

            <div className="orders-grid">
              {pendingOrders.map((order, index) => (
                <div key={index} className="order-card">
                  <h3>Order #{index + 1}</h3>

                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name} - ₹{item.price}
                    </p>
                  ))}

                  <p>Total: ₹{order.total}</p>

                  <button
                    className="cart-btn"
                    onClick={() => markOrderSent(order._id)}
                  >
                    Send Order
                  </button>
                </div>
              ))}
            </div>

            {/* SENT ORDERS */}

            <h2 style={{ marginTop: "40px" }}>Sent Orders</h2>

            <div className="orders-grid">
              {sentOrders.map((order, index) => (
                <div key={index} className="order-card sent">
                  <h3>Order #{index + 1}</h3>

                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name} - ₹{item.price}
                    </p>
                  ))}

                  <p>Total: ₹{order.total}</p>

                  <p>Order Sent</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* ADD MENU ITEMS*/}
        {activeSection === "add-item" && (
          <section className="admin-section">
            <h2>Add Menu Item</h2>

            <form onSubmit={addMenuItem} className="menu-form">
              <input
                placeholder="Item Name"
                onChange={(e) =>
                  setMenuData({ ...menuData, name: e.target.value })
                }
              />

              <input
                placeholder="Price"
                onChange={(e) =>
                  setMenuData({ ...menuData, price: e.target.value })
                }
              />

              <select
                onChange={(e) =>
                  setMenuData({ ...menuData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="starters">Starters</option>
                <option value="dosa">Dosa</option>
                <option value="curries">Curries</option>
                <option value="rice">Rice</option>
                <option value="breads">Breads</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  setMenuData({ ...menuData, image: file });

                  setFileName(file ? file.name : "");
                }}
              />

              {fileName && <p>Selected File: {fileName}</p>}

              <select
                onChange={(e) =>
                  setMenuData({ ...menuData, type: e.target.value })
                }
              >
                <option>veg</option>
                <option>non-veg</option>
              </select>

              <textarea
                placeholder="Description"
                onChange={(e) =>
                  setMenuData({ ...menuData, description: e.target.value })
                }
              />

              <button type="submit">Add Item</button>
            </form>
          </section>
        )}

        {/* FEEDBACK */}
        {activeSection === "feedback" && (
          <section className="admin-section">
            <h2>Customer Feedback</h2>

            <div className="feedback-grid">
              {feedbacks.map((fb, index) => (
                <div key={index} className="feedback-card">
                  <h3>{fb.name}</h3>

                  <p className="feedback-email">{fb.email}</p>

                  <p className="feedback-message">{fb.message}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Admin;
