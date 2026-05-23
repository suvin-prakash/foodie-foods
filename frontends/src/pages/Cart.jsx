import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/cart-style.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const confirmOrder = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/signin";
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
      status: "pending",
      paymentMethod: "Cash on Delivery",
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      console.log(data);

      alert("Order placed successfully");

      localStorage.removeItem("cart");

      window.location.href = "/menu";
    } catch (error) {
      console.error(error);
      alert("Order failed");
    }
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter(
      (item, index) => index !== indexToRemove,
    );

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className="cart-page"
      style={{
        backgroundImage: "url('/images/menu-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="cart-container">
        <Link to="/menu">
          <button className="cart-btn">
            <i class="bi bi-arrow-left"></i> Back to Menu
          </button>
        </Link>

        <h1>Your Cart</h1>

        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img
              src={item._id ? `${import.meta.env.VITE_API_URL}${item.image}` : item.image}
              alt={item.name}
              className="cart-img"
            />

            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>

            <div className="cart-right">
              <button className="cart-btn" onClick={() => removeItem(index)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        ))}

        <div className="total">Total: ₹{total}</div>

        <div className="cart-actions">
          <button className="cart-btn" onClick={clearCart}>
            Clear Cart
          </button>

          <button
            className="checkout-btn"
            onClick={() => setShowCheckout(true)}
          >
            Checkout
          </button>
        </div>
        {showCheckout && (
          <div className="checkout-popup">
            <div className="checkout-box">
              <h2>Payment Method</h2>

              <div className="payment-option">
                <input type="radio" name="payment" value="cod" defaultChecked />
                Cash on Delivery
              </div>

              <div className="checkout-buttons">
                <button className="cart-btn" onClick={confirmOrder}>
                  Confirm Order
                </button>

                <button
                  className="cart-btn"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
