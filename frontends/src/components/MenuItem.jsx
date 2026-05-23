function MenuItem({ item, addToCart }) {
  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img src={item.image} alt={item.name} />
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
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MenuItem;