import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];
  const total = location.state?.total || 0;

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "COD",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    // Validations
    if (!orderInfo.name || !orderInfo.email || !orderInfo.address) {
      setMessage("❌ Name, email, and address are required.");
      return;
    }

    if (orderInfo.paymentMethod === "CARD") {
      if (!orderInfo.cardNumber || !orderInfo.cardName || !orderInfo.cardExpiry || !orderInfo.cardCVV) {
        setMessage("❌ Please fill in all credit card details.");
        return;
      }
    }

    if (cartItems.length === 0) {
      setMessage("❌ Your cart is empty!");
      return;
    }

    setIsSubmitting(true);
    setMessage("⏳ Placing your order...");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Please login to place an order.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/place-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          customer_name: orderInfo.name,
          customer_email: orderInfo.email,
          customer_address: orderInfo.address,
          payment_method: orderInfo.paymentMethod,
          card_details:
            orderInfo.paymentMethod === "CARD"
              ? {
                  number: orderInfo.cardNumber,
                  name: orderInfo.cardName,
                  expiry: orderInfo.cardExpiry,
                  cvv: orderInfo.cardCVV,
                }
              : null,
          total: total,
          cartItems: cartItems.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage(`✅ Your Order placed successfully!`);
        
        // Clear cart after successful order - try different endpoint patterns
        try {
          // Try to clear cart by deleting all items individually
          for (const item of cartItems) {
            await fetch(`http://127.0.0.1:8000/api/cart/${item.product.id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Token ${token}`,
              },
            });
          }
        } catch (err) {
          console.error("Error clearing cart:", err);
        }
        
        setTimeout(() => navigate("/ordersuccess"), 2000);
      } else {
        setMessage(`❌ Failed to place order: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setMessage(`❌ An error occurred: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <h3>Total Amount: ₹{total}</h3>

      {message && <p className="order-message">{message}</p>}

      {!message.includes("✅") && (
        <form className="checkout-form" onSubmit={submitOrder}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={orderInfo.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={orderInfo.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={orderInfo.address}
            onChange={handleInputChange}
            required
          />

          <label>Payment Method:</label>
          <select
            name="paymentMethod"
            value={orderInfo.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="CARD">Credit Card</option>
          </select>

          {orderInfo.paymentMethod === "CARD" && (
            <div className="credit-card-section">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={orderInfo.cardNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cardName"
                placeholder="Name on Card"
                value={orderInfo.cardName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cardExpiry"
                placeholder="Expiry Date (MM/YY)"
                value={orderInfo.cardExpiry}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cardCVV"
                placeholder="CVV"
                value={orderInfo.cardCVV}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Confirm Order"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
