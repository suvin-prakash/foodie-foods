import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menuData from "../data/menuData";
import "../style/menu-style.css";

function Menu() {
  const [dbMenu, setDbMenu] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => setDbMenu(data));
  }, []);

  const allMenuItems = [...menuData, ...dbMenu];

  const [category, setCategory] = useState("all");

  const filteredMenu =
    category === "all"
      ? allMenuItems
      : allMenuItems.filter((item) => item.category === category);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${item.name} added to cart`);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="menu-hero">
        <img
          src="/images/menu-banner.jpg"
          alt="Menu banner"
          className="menu-hero-img"
        />

        <div className="menu-hero-content">
          <h1>Our Menu</h1>
          <p>
            Authentic South Indian delicacies prepared with traditional spices
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="menu-tabs">
        <div className="menu-category">
          <div className="category-tabs">
            <button
              className={`category-tab ${category === "all" ? "active" : ""}`}
              onClick={() => setCategory("all")}
            >
              All
            </button>

            <button
              className={`category-tab ${category === "starters" ? "active" : ""}`}
              onClick={() => setCategory("starters")}
            >
              Starters
            </button>

            <button
              className={`category-tab ${category === "dosa" ? "active" : ""}`}
              onClick={() => setCategory("dosa")}
            >
              Dosas
            </button>

            <button
              className={`category-tab ${category === "curries" ? "active" : ""}`}
              onClick={() => setCategory("curries")}
            >
              Curries
            </button>

            <button
              className={`category-tab ${category === "rice" ? "active" : ""}`}
              onClick={() => setCategory("rice")}
            >
              Rice
            </button>

            <button
              className={`category-tab ${category === "breads" ? "active" : ""}`}
              onClick={() => setCategory("breads")}
            >
              Breads
            </button>

            <button
              className={`category-tab ${category === "desserts" ? "active" : ""}`}
              onClick={() => setCategory("desserts")}
            >
              Desserts
            </button>

            <button
              className={`category-tab ${category === "beverages" ? "active" : ""}`}
              onClick={() => setCategory("beverages")}
            >
              Beverages
            </button>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="wrapper">
        <section className="menu-section">
          <div className="container">
            <div className="menu-grid">
              {filteredMenu.map((item, index) => (
                <div key={index} className="menu-item show">
                  <div className="menu-item-image">
                    <img
                      src={
                        item._id
                          ? `${import.meta.env.VITE_API_URL}${item.image}`
                          : item.image
                      }
                      alt={item.name}
                    />
                    {item.type === "veg" && (
                      <span className="menu-badge vegetarian">
                        <i class="bi bi-leaf-fill"></i> Veg
                      </span>
                    )}

                    {item.type === "non-veg" && (
                      <span className="menu-badge non-vegetarian">
                        <i class="bi bi-fire"></i>Non-Veg
                      </span>
                    )}
                  </div>

                  <div className="menu-item-info">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="menu-price">₹{item.price}</span>
                    </div>

                    <p>{item.description}</p>

                    <button
                      className="add-to-cart"
                      onClick={() => addToCart(item)}
                    >
                      <i class="bi bi-cart-plus-fill"></i>Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="menu-grid">
              {allMenuItems.map((item, index) => (
                <div key={index} className="menu-item">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cart Button */}
        <section className="cartlink">
          <div>
            <h3>
              View Your Cart <i class="bi bi-arrow-right"></i>
            </h3>

            <Link to="/cart">
              <button id="cart-btn">
                {" "}
                <i class="bi bi-cart-fill"></i>View Cart
              </button>
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Menu;
