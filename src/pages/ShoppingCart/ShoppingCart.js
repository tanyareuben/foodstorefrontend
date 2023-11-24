import React, { useState } from "react";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import "../ShoppingCart/ShoppingCart.css";

function ShoppingCart({}) {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "1 lb of Carrot",
      price: 0.99,
      quantity: 1,
      weight: 1.0,
      image: "/images/carrot.png",
    },
    {
      id: 2,
      name: "1 lb of Broccoli",
      price: 1.99,
      quantity: 1,
      weight: 1.0,
      image: "/images/broccoli.png",
    },
    {
      id: 3,
      name: "1 lb of Broccoli",
      price: 1.5,
      quantity: 1,
      weight: 1.0,
      image: "/images/broccoli.png",
    },
    {
      id: 4,
      name: "1 lb of Broccoli",
      price: 1.99,
      quantity: 1,
      weight: 1.0,
      image: "/images/broccoli.png",
    },
    {
      id: 5,
      name: "1 lb of Broccoli",
      price: 1.99,
      quantity: 1,
      weight: 1.0,
      image: "/images/broccoli.png",
    },
    {
      id: 6,
      name: "1 lb of Broccoli",
      price: 1.99,
      quantity: 1,
      weight: 1.0,
      image: "/images/broccoli.png",
    },
  ]);

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };
  const handleIncrement = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        item.quantity += 1;
      }
      return item;
    });
    removeFromCart(updatedCart);
  };

  const handleDecrement = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.quantity > 0) {
        item.quantity -= 1;
      }
      return item;
    });
    removeFromCart(updatedCart);
  };

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total weight considering quantity
  const totalWeight = cart.reduce(
    (total, item) => total + parseFloat(item.weight) * item.quantity,
    0
  );

  // Calculate shipping cost based on adjusted total weight
  const calculateShippingCost = (weight) => {
    const freeShippingLimit = 20; // Pounds
    const flatRatePer10Pounds = 5; // Adjust this based on your pricing

    if (weight <= freeShippingLimit) {
      // No shipping cost
      return 0;
    } else {
      // Calculate the shipping cost for every 10 pounds over the limit
      const weightOverLimit = weight - freeShippingLimit;
      const additionalCost =
        Math.ceil(weightOverLimit / 10) * flatRatePer10Pounds;
      return additionalCost;
    }
  };

  const shippingCost = calculateShippingCost(totalWeight);

  // Define the tax rate (e.g., 8% tax)
  const taxRate = 0.08;

  // Calculate tax amount based on the total cost of items
  const taxAmount =
    cart.reduce((total, item) => total + item.price * item.quantity, 0) *
    taxRate;

  return (
    <div className="shopping-cart-page">
      <div className="top-half">
        <div className="top-left">
          <Link to="/">
            <button className="continue">Continue Shopping</button>
          </Link>
        </div>
        <div className="top-center">
          <h2>Items ({totalItems})</h2>
        </div>
        <div className="top-right">
          <Link to="/Checkout">
            <button className="checkout_right">Checkout</button>
          </Link>
        </div>
      </div>
      <hr className="divider" />
      <div className="bottom-half">
        <div className="bottom-left">
          {cart.length === 0 ? (
            <p> Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bottom-right">
          <div className="summary-box">
            <h1>Summary</h1>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <p>
                  Subtotal: $
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
                <p>Tax: ${taxAmount.toFixed(2)}</p>
                <p>Total Weight: {totalWeight.toFixed(2)} lbs</p>
                {totalWeight > 20 && (
                  <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
                )}
                <p>
                  Total Cost (Tax & Shipping): $
                  {(
                    cart.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) +
                    taxAmount +
                    (totalWeight > 20 ? shippingCost : 0)
                  ).toFixed(2)}
                </p>
                <p>
                  {" "}
                  <Link to="/Checkout">
                    <button className="checkout">Checkout</button>
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
